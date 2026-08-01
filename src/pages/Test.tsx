import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';
import questionsData from '../data/questions.json';

interface LocalizedString {
  bn?: string;
  en?: string;
}

interface Question {
  id: number;
  subject: 'GK' | 'Mathematics' | 'English' | 'Bangla';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: LocalizedString;
  options: { label: string; text: LocalizedString }[];
  correctIndex: number;
  explanation: LocalizedString;
}

// Helper to render MCQ text without being affected by global language switcher (ignores active website language)
export function renderMCQText(textObj: string | LocalizedString | undefined | null): string {
  if (!textObj) return '';
  if (typeof textObj === 'string') return textObj;
  
  const bn = textObj.bn?.trim() || '';
  const en = textObj.en?.trim() || '';
  
  if (bn && en) {
    if (bn === en) return bn;
    return `${bn} / ${en}`;
  }
  return bn || en || '';
}

const shuffleArray = (array: any[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function Test() {
  const { currentRoute, goBack, navigate } = useRouter();
  const { userData, setUserData, markTestCompleted, toggleBookmark, isBookmarked } = useData();
  const { t, lang } = useLanguage();

  // Extract navigation configurations
  const [activeTestTitle, setActiveTestTitle] = useState(currentRoute.params?.testTitle || '');
  const questionCountParam = currentRoute.params?.questionCount || 10;
  const [timeLimit, setTimeLimit] = useState(currentRoute.params?.timeLimit !== undefined ? currentRoute.params.timeLimit : 600);
  const selectedSubject = currentRoute.params?.subject || 'All';
  const selectedDifficulty = currentRoute.params?.difficulty || 'All';
  const [sessionId, setSessionId] = useState<string>(currentRoute.params?.sessionId || Date.now().toString());
  
  const getSubjectName = (key: string) => {
    switch(key) {
      case 'GK': return t('gk');
      case 'Mathematics': return t('math');
      case 'English': return t('english');
      case 'Bangla': return t('bangla');
      default: return key;
    }
  };

  const getDifficultyName = (key: string) => {
    switch(key) {
      case 'Easy': return t('easy') || 'Easy';
      case 'Medium': return t('medium') || 'Medium';
      case 'Hard': return t('hard') || 'Hard';
      default: return key;
    }
  };

  // Helper to manage seen question history in localStorage
  const HISTORY_KEY = 'cadet_test_history_v2';

  const getSeenQuestionIds = (filterKey: string): number[] => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed[filterKey]) ? parsed[filterKey] : [];
    } catch {
      return [];
    }
  };

  const saveSeenQuestionIds = (filterKey: string, ids: number[]) => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      parsed[filterKey] = ids;
      localStorage.setItem(HISTORY_KEY, JSON.stringify(parsed));
    } catch (e) {
      console.error('Failed to save seen questions history', e);
    }
  };

  const clearSeenQuestionHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('Failed to clear question history', e);
    }
  };

  // Dynamic States
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showResetAlert, setShowResetAlert] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [markedQuestions, setMarkedQuestions] = useState<{ [key: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(() => {
    return timeLimit > 0 ? timeLimit : 0;
  });
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  // Helper generator fallback if API fails
  const localGenerateQuestions = (allQuestions: Question[]): Question[] => {
    let filtered = [...allQuestions];
    
    if (selectedSubject && selectedSubject !== 'All') {
      filtered = filtered.filter(q => q.subject === selectedSubject || q.subject.toLowerCase() === selectedSubject.toLowerCase());
    }
    
    if (selectedDifficulty && selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    if (filtered.length < questionCountParam && allQuestions.length > 0) {
      let fillers = allQuestions.filter(q => !filtered.some(fq => fq.id === q.id));
      if (selectedDifficulty && selectedDifficulty !== 'All') {
        const difficultyFillers = fillers.filter(q => q.difficulty === selectedDifficulty || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
        if (difficultyFillers.length > 0) {
          filtered = [...filtered, ...shuffleArray(difficultyFillers)];
        }
      }
      if (filtered.length < questionCountParam) {
        fillers = allQuestions.filter(q => !filtered.some(fq => fq.id === q.id));
        filtered = [...filtered, ...shuffleArray(fillers)];
      }
    }

    const filterKey = `${selectedSubject}_${selectedDifficulty}`;
    const seenIds = getSeenQuestionIds(filterKey);
    let unseenCandidates = filtered.filter(q => !seenIds.includes(q.id));
    let selectedBatch: Question[] = [];

    if (unseenCandidates.length >= questionCountParam) {
      const shuffledUnseen = shuffleArray(unseenCandidates);
      selectedBatch = shuffledUnseen.slice(0, questionCountParam);
      const newSeenIds = [...seenIds, ...selectedBatch.map(q => q.id)];
      saveSeenQuestionIds(filterKey, newSeenIds);
    } else {
      const shuffledUnseen = shuffleArray(unseenCandidates);
      selectedBatch = [...shuffledUnseen];
      const neededMore = questionCountParam - selectedBatch.length;
      const seenCandidates = filtered.filter(q => !selectedBatch.some(sb => sb.id === q.id));
      const shuffledSeen = shuffleArray(seenCandidates);
      const extraBatch = shuffledSeen.slice(0, neededMore);
      selectedBatch = [...selectedBatch, ...extraBatch];
      saveSeenQuestionIds(filterKey, selectedBatch.map(q => q.id));
    }

    if (selectedBatch.length >= questionCountParam) {
      return selectedBatch;
    } else if (selectedBatch.length > 0) {
      const result: Question[] = [];
      let i = 0;
      while (result.length < questionCountParam) {
        const base = selectedBatch[i % selectedBatch.length];
        result.push({
          ...base,
          id: result.length + 1
        });
        i++;
      }
      return result;
    } else {
      return [];
    }
  };

  const SAVED_TESTS_KEY = 'cadet_saved_tests_v1';

  // Fetch questions from highly scaleable API with local fallback
  useEffect(() => {
    let active = true;
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      const isNewTest = currentRoute.params?.isNewTest;
      const paramSessionId = currentRoute.params?.sessionId;
      
      if (!isNewTest && paramSessionId) {
        try {
          const stored = localStorage.getItem(SAVED_TESTS_KEY);
          if (stored) {
            const savedTests = JSON.parse(stored);
            const savedData = savedTests[paramSessionId];
            if (active && savedData && savedData.questions && savedData.questions.length > 0) {
              setQuestions(savedData.questions);
              setCurrentIdx(savedData.currentIdx || 0);
              setSelectedAnswers(savedData.selectedAnswers || {});
              setMarkedQuestions(savedData.markedQuestions || {});
              setTimeLeft(savedData.timeLeft !== undefined ? savedData.timeLeft : (savedData.timeLimit > 0 ? savedData.timeLimit : 0));
              if (savedData.timeLimit !== undefined) setTimeLimit(savedData.timeLimit);
              if (savedData.testTitle) setActiveTestTitle(savedData.testTitle);
              setSessionId(paramSessionId);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          console.error('Failed to parse saved progress', e);
        }
      }

      if (isNewTest) {
        // We do not remove all tests, just start a fresh one with the new sessionId
      }

      try {
        const allQ = (questionsData as any).questions || [];
        const localQ = localGenerateQuestions(allQ);
        if (active) {
          setQuestions(localQ);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to generate questions:', err);
        if (active) {
          setError(lang === 'bn' ? 'প্রশ্নপত্র লোড করতে ব্যর্থ হয়েছে।' : 'Failed to load questions.');
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { active = false; };
  }, [selectedSubject, selectedDifficulty, questionCountParam, reloadTrigger]);

  // Save progress automatically
  useEffect(() => {
    if (loading || questions.length === 0) return;

    let savedTests: any = {};
    try {
      const stored = localStorage.getItem(SAVED_TESTS_KEY);
      if (stored) {
        savedTests = JSON.parse(stored);
      }
    } catch (e) {}

    if (testSubmitted) {
      delete savedTests[sessionId];
      localStorage.setItem(SAVED_TESTS_KEY, JSON.stringify(savedTests));
    } else {
      savedTests[sessionId] = {
        sessionId,
        questions,
        currentIdx,
        selectedAnswers,
        markedQuestions,
        timeLeft,
        timeLimit,
        testTitle: activeTestTitle || (lang === 'bn' ? 'চলমান পরীক্ষা' : 'Ongoing Test'),
        lastUpdated: Date.now()
      };
      localStorage.setItem(SAVED_TESTS_KEY, JSON.stringify(savedTests));
    }
  }, [questions, currentIdx, selectedAnswers, markedQuestions, timeLeft, testSubmitted, loading, timeLimit, activeTestTitle, sessionId]);

  // Dynamic Countdown or stopwatch Timer with pause support
  useEffect(() => {
    if (testSubmitted || isPaused) return;
    
    if (timeLimit > 0 && timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (timeLimit > 0) {
          return prev - 1;
        } else {
          return prev + 1; // stopwatch counting upwards
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, testSubmitted, timeLimit, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentIdx] || questions[0];

  const handleSelectOption = (optIdx: number) => {
    if (testSubmitted) return;
    triggerHaptic('light');
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optIdx
    });
  };

  const handleToggleMark = () => {
    triggerHaptic('selection');
    setMarkedQuestions({
      ...markedQuestions,
      [currentQuestion.id]: !markedQuestions[currentQuestion.id]
    });
    toggleBookmark(currentQuestion);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      triggerHaptic('light');
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      triggerHaptic('light');
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (testSubmitted) return;
    triggerHaptic('success');
    
    // Calculate Score
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const finalScorePercentage = Math.round((correctCount / questions.length) * 100);
    setScore(correctCount);
    setTestSubmitted(true);

    // Update test stats and daily goal progress
    markTestCompleted('test-session-' + Date.now(), finalScorePercentage);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setMarkedQuestions({});
    setTimeLeft(timeLimit > 0 ? timeLimit : 0);
    setTestSubmitted(false);
    setScore(0);
    setReloadTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-black text-slate-700 dark:text-slate-300">
          {lang === 'bn' ? 'প্রশ্নপত্র তৈরি হচ্ছে...' : 'Preparing Practice Session...'}
        </p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in transition-colors duration-300">
        <div className="text-4xl mb-4">⚠️</div>
        <p className="text-sm font-black text-slate-700 dark:text-slate-300 mb-6">
          {error || (lang === 'bn' ? 'কোনো প্রশ্ন পাওয়া যায়নি!' : 'No questions found!')}
        </p>
        <button 
          onClick={goBack} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
        >
          {lang === 'bn' ? 'পিছনে যান' : 'Go Back'}
        </button>
      </div>
    );
  }

  if (testSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="bg-slate-50 dark:bg-slate-900 h-full flex flex-col overflow-hidden transition-colors duration-300 animate-in fade-in duration-300">
        <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
            <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
            <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('result')}</h1>
            <div className="w-8"></div>
        </header>

        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {/* Main score badge */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col items-center text-center space-y-3 transition-colors duration-300">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-[24px] ${passed ? 'bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400'}`}>
                {passed ? '🏆' : '📚'}
              </div>
              <div>
                <h2 className="text-[16px] font-black text-slate-900 dark:text-white">{passed ? t('congrats') : t('keep_practicing')}</h2>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{passed ? t('passed_msg') : t('failed_msg')}</p>
              </div>

              <div className="grid grid-cols-3 gap-6 w-full pt-4 border-t border-slate-200 dark:border-slate-800/60 text-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('score_obtained')}</p>
                  <p className="text-[14px] font-black text-slate-800 dark:text-slate-200">{score} / {questions.length}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('accuracy')}</p>
                  <p className="text-[14px] font-black text-slate-800 dark:text-slate-200">{percentage}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('status')}</p>
                  <p className={`text-[12px] font-black uppercase ${passed ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{passed ? t('passed') : t('failed')}</p>
                </div>
              </div>

              <div className="flex gap-2 w-full pt-2 flex-wrap sm:flex-nowrap">
                <button 
                  onClick={handleRestart}
                  className="flex-1 py-2.5 px-2 rounded-[10px] border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 font-black uppercase tracking-wider text-[10px] hover:bg-blue-50 dark:hover:bg-blue-950/20 transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <i className="fa-solid fa-rotate-left"></i> {t('retake_test')}
                </button>
                <button 
                  onClick={() => {
                    clearSeenQuestionHistory();
                    triggerHaptic('success');
                    setShowResetAlert(true);
                  }}
                  className="py-2.5 px-2 rounded-[10px] border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px] hover:bg-slate-100 dark:hover:bg-slate-900 transition cursor-pointer flex items-center justify-center gap-1"
                  title="Reset repetition tracking memory"
                >
                  <i className="fa-solid fa-trash-can text-[10px]"></i> {lang === 'bn' ? 'হিসাব রিসেট' : 'Reset History'}
                </button>
                <button 
                  onClick={() => navigate('home')}
                  className="flex-1 py-2.5 px-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider text-[10px] shadow-sm transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <i className="fa-solid fa-house"></i> {t('dashboard')}
                </button>
              </div>
          </div>

          {/* Question Explanations */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('review_answers')}</h3>
            {questions.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="bg-white dark:bg-slate-950 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-2 transition-colors duration-300">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[12px] font-black text-slate-400 dark:text-slate-500">{t('question')} {idx + 1} ({getSubjectName(q.subject)})</span>
                    <span className={`text-[10px] border border-[#f1c0c4] dark:border-red-900/50 rounded-[5px] font-black px-1.5 py-0.5 uppercase ${
                      isCorrect ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 !border-green-200 dark:!border-green-800' : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                    }`}>
                      {isCorrect ? t('correct') : t('wrong')}
                    </span>
                  </div>
                  <h4 className="text-[14px] font-black text-slate-900 dark:text-white leading-snug">{renderMCQText(q.question)}</h4>
                  
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isUserChoice = selectedOpt === oIdx;
                      const isCorrectChoice = q.correctIndex === oIdx;

                      let customBorder = 'border-transparent';
                      if (!isCorrectChoice && !isUserChoice) {
                        if (oIdx === 0) customBorder = 'border-[#e0d5d5]';
                        else if (oIdx === 2) customBorder = 'border-[#ebd8d8]';
                        else if (oIdx === 3) customBorder = 'border-[#ecdcdc]';
                      }

                      return (
                        <div 
                          key={oIdx}
                          className={`p-2 rounded-[10px] text-[14px] font-black flex justify-between items-center transition ${
                            isCorrectChoice 
                              ? 'bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-900/40' 
                              : isUserChoice
                                ? 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-900/40'
                                : `bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border ${customBorder}`
                          }`}
                        >
                          <span>{opt.label}. {renderMCQText(opt.text)}</span>
                          {isCorrectChoice && <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-[10px]"></i>}
                          {isUserChoice && !isCorrectChoice && <i className="fa-solid fa-xmark text-red-500 dark:text-red-400 text-[10px]"></i>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50/50 dark:bg-blue-950/20 p-2.5 rounded-[10px] border border-blue-50 dark:border-blue-900/30 text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    <span className="text-blue-700 dark:text-blue-400 font-bold block mb-0.5">💡 {t('explanation_title')}</span>
                    {renderMCQText(q.explanation)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 relative h-full flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <header className="flex justify-between items-center p-3 sticky top-0 bg-white dark:bg-slate-950 z-10 border-b border-slate-200 dark:border-slate-800/80 shrink-0 transition-colors duration-300">
          <button onClick={() => { triggerHaptic('medium'); setShowExitConfirm(true); }} className="text-slate-800 dark:text-slate-200 w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <div className="flex flex-col items-center">
            <h1 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('ongoing_test')}</h1>
            {activeTestTitle && <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 max-w-[150px] truncate">{activeTestTitle}</span>}
          </div>
          
          {/* Time moved to top right corner */}
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/60 px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm shrink-0">
              <i className="fa-regular fa-clock text-indigo-600 dark:text-indigo-400 text-[10px] animate-pulse"></i>
              <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 font-mono">
                {timeLimit > 0 ? formatTime(timeLeft) : `⏱️ ${formatTime(timeLeft)}`}
              </span>
          </div>
      </header>

      {/* Timer & Meta Bar - Progress Bar on right of "বিষয়: বাংলা" */}
      <div className="bg-slate-50 dark:bg-slate-900 px-3 py-2 flex justify-between items-center border-b border-slate-200 dark:border-slate-800/60 shrink-0 transition-colors duration-300 animate-in fade-in">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-wider">{t('subject_label')}{getSubjectName(currentQuestion.subject)}</span>
          </div>
          
          <div className="flex items-center gap-2 flex-1 justify-end max-w-[200px]">
            <span className="text-[9px] font-black font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {currentIdx + 1}/{questions.length}
            </span>
            <div className="relative w-24 h-2 bg-slate-200/60 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300/30 dark:border-slate-700/30">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
      </div>

      {/* Pause Full-Screen Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-2xl shadow-inner">
              <i className="fa-solid fa-pause animate-pulse"></i>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'bn' ? 'পরীক্ষা সাময়িক স্থগিত' : 'Practice Session Paused'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                {lang === 'bn' ? 'সময় থামিয়ে দেওয়া হয়েছে। আপনি প্রস্তুত হলে আবার শুরু করুন।' : 'The timer is paused. Take a breath and resume whenever you are ready.'}
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex justify-around">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">{lang === 'bn' ? 'অবশিষ্ট সময়' : 'Time Left'}</span>
                <span className="font-mono text-sm text-blue-600 dark:text-blue-400">{formatTime(timeLeft)}</span>
              </div>
              <div className="border-r border-slate-200 dark:border-slate-800"></div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-bold">{lang === 'bn' ? 'উত্তর দেওয়া' : 'Answered'}</span>
                <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">{Object.keys(selectedAnswers).length} / {questions.length}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setIsPaused(false);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-play text-xs"></i>
                {lang === 'bn' ? 'পুনরায় শুরু করুন' : 'Resume Test'}
              </button>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  setShowExitConfirm(true);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 font-bold text-xs uppercase transition cursor-pointer"
              >
                {lang === 'bn' ? 'পরীক্ষা থেকে বের হন' : 'Exit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 flex-1 overflow-y-auto space-y-4">
          {/* Question Step Indicators / Dots */}
          <div className="flex gap-1.5 overflow-x-auto custom-scrollbar pb-1 justify-start">
            {questions.map((_, idx) => {
              const isCurrent = idx === currentIdx;
              const isAnswered = selectedAnswers[_.id] !== undefined;
              const isMarked = markedQuestions[_.id];

              return (
                <button
                  key={idx}
                  onClick={() => { triggerHaptic('light'); setCurrentIdx(idx); }}
                  className={`h-6.5 min-w-[26px] px-1.5 rounded-lg text-[10px] font-black flex items-center justify-center transition-all cursor-pointer border shrink-0 ${
                    isCurrent
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-105'
                      : isMarked
                        ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-900/40 animate-pulse'
                        : isAnswered
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-900/40'
                          : 'bg-slate-100/80 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {getSubjectName(currentQuestion.subject)}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleMark}
                  className={`flex items-center justify-center w-7 h-7 rounded-md border transition-colors cursor-pointer ${
                    isBookmarked(currentQuestion.id) 
                      ? 'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/50 text-amber-600 dark:text-amber-400 shadow-sm' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  aria-label="Bookmark Question"
                >
                  <i className={`fa-bookmark text-[11px] ${isBookmarked(currentQuestion.id) ? 'fa-solid' : 'fa-regular'}`}></i>
                </button>
                <span className="bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1 uppercase">
                  <i className="fa-solid fa-shield text-[8px]"></i> {getDifficultyName(currentQuestion.difficulty)}
                </span>
              </div>
          </div>

          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            {renderMCQText(currentQuestion.question)}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-2.5" id="quiz-options">
              {currentQuestion.options.map((opt, index) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === index;
                  return (
                    <button 
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`min-h-[48px] border-2 rounded-xl p-3 px-4 flex justify-between items-center transition-all duration-150 w-full text-left cursor-pointer active:scale-[0.99] ${
                        isSelected 
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/50 shadow-sm ring-2 ring-indigo-500/20' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950'
                      }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg text-xs font-black flex items-center justify-center transition-colors shrink-0 ${
                              isSelected ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400'
                            }`}>{opt.label}</div>
                            <span className={`text-sm font-bold ${isSelected ? 'text-indigo-950 dark:text-indigo-100 font-extrabold' : 'text-slate-800 dark:text-slate-200'}`}>{renderMCQText(opt.text)}</span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shadow-sm shrink-0">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                    </button>
                  );
              })}
          </div>
      </div>

      {/* Bottom controls */}
      <div className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 p-3 flex justify-between gap-2 z-20 shadow-lg shrink-0 transition-colors duration-300">
          <button 
            onClick={handlePrevious}
            disabled={currentIdx === 0}
            className={`min-h-[44px] flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1 transition ${
              currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer active:scale-95'
            }`}
          >
            <i className="fa-solid fa-chevron-left text-[9px]"></i> {t('prev')}
          </button>
          
          {/* Pause (বিরতি) Button */}
          <button 
            onClick={() => {
              triggerHaptic('light');
              setIsPaused(prev => !prev);
            }}
            className={`min-h-[44px] flex-1 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition cursor-pointer active:scale-95 ${
              isPaused
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'}`}></i> {isPaused ? (lang === 'bn' ? 'চালু' : 'Resume') : (lang === 'bn' ? 'বিরতি' : 'Pause')}
          </button>

          {/* End Test (পরীক্ষা শেষ করুন) Button */}
          <button 
            onClick={handleSubmit}
            className="min-h-[44px] flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-red-500 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-900 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition cursor-pointer active:scale-95"
          >
            <i className="fa-solid fa-stop"></i> {lang === 'bn' ? 'পরীক্ষা শেষ' : 'End Test'}
          </button>
          
          {currentIdx === questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="min-h-[44px] flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider hover:bg-emerald-700 shadow-md transition cursor-pointer active:scale-95"
            >
              {t('submit_test')}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="min-h-[44px] flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider hover:bg-indigo-700 shadow-md transition cursor-pointer active:scale-95 flex items-center justify-center gap-1"
            >
              {t('next')} <i className="fa-solid fa-chevron-right text-[9px]"></i>
            </button>
          )}
      </div>

      {/* Custom Exit Confirmation Modal (iframe-safe, no window.confirm) */}
      {showExitConfirm && (
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full space-y-4 text-center animate-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'bn' ? 'পরীক্ষা বাতিল করতে চান?' : 'Exit Session?'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {lang === 'bn' 
                  ? 'আপনি কি নিশ্চিতভাবে বের হতে চান? আপনার চলমান অগ্রগতি সংরক্ষিত রয়েছে, যা পরবর্তীতে টেস্ট ড্যাশবোর্ড থেকে পুনরায় শুরু করা যাবে।' 
                  : 'Are you sure you want to exit? Your current progress is saved, so you can resume it later from the practice dashboard.'}
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => { triggerHaptic('light'); setShowExitConfirm(false); }}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer"
              >
                {lang === 'bn' ? 'ফিরে যান' : 'Cancel'}
              </button>
              <button
                onClick={() => { triggerHaptic('medium'); goBack(); }}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase shadow-md transition cursor-pointer"
              >
                {lang === 'bn' ? 'বের হয়ে যান' : 'Exit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Reset Alert Toast/Modal */}
      {showResetAlert && (
        <div className="absolute inset-x-4 top-4 bg-slate-900/95 dark:bg-slate-950/95 text-white p-4 rounded-2xl border border-slate-800 shadow-xl z-[110] flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2.5">
            <span className="text-emerald-500 text-base">✓</span>
            <p className="text-xs font-black text-slate-100">
              {lang === 'bn' 
                ? 'প্রশ্নের ইতিহাস রিসেট করা হয়েছে। সব প্রশ্ন নতুন করে আসবে।' 
                : 'Question history reset successfully.'}
            </p>
          </div>
          <button 
            onClick={() => { triggerHaptic('light'); setShowResetAlert(false); }}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase px-2 py-1 shrink-0"
          >
            {lang === 'bn' ? 'ঠিক আছে' : 'OK'}
          </button>
        </div>
      )}
    </div>
  );
}
