import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';

import { useLanguage } from '../context/LanguageContext';

interface LocalizedString {
  bn: string;
  en: string;
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

const QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'GK',
    difficulty: 'Easy',
    question: {
      bn: "বাংলাদেশের প্রথম ক্যাডেট কলেজ কোনটি?",
      en: "Which is the first Cadet College in Bangladesh?"
    },
    options: [
      { label: 'A', text: { bn: 'সিলেট ক্যাডেট কলেজ', en: 'Sylhet Cadet College' } },
      { label: 'B', text: { bn: 'ফৌজদারহাট ক্যাডেট কলেজ', en: 'Faujdarhat Cadet College' } },
      { label: 'C', text: { bn: 'মির্জাপুর ক্যাডেট কলেজ', en: 'Mirzapur Cadet College' } },
      { label: 'D', text: { bn: 'রাজশাহী ক্যাডেট কলেজ', en: 'Rajshahi Cadet College' } }
    ],
    correctIndex: 1,
    explanation: {
      bn: "ফৌজদারহাট ক্যাডেট কলেজ ১৯৫৮ সালে চট্টগ্রামে প্রতিষ্ঠিত হয়, যা বাংলাদেশের ইতিহাসের সর্বপ্রথম ক্যাডেট কলেজ।",
      en: "Faujdarhat Cadet College was established in 1958 in Chittagong, making it the first cadet college in the history of Bangladesh."
    }
  },
  {
    id: 2,
    subject: 'Mathematics',
    difficulty: 'Medium',
    question: {
      bn: "যদি a = ৩ এবং b = -২ হয়, তবে 2a² - 3ab + b² এর মান কত?",
      en: "If a = 3 and b = -2, what is the value of 2a² - 3ab + b²?"
    },
    options: [
      { label: 'A', text: { bn: '২০', en: '20' } },
      { label: 'B', text: { bn: '৩০', en: '30' } },
      { label: 'C', text: { bn: '৪০', en: '40' } },
      { label: 'D', text: { bn: '৫০', en: '50' } }
    ],
    correctIndex: 2,
    explanation: {
      bn: "2a² - 3ab + b² = 2(3)² - 3(3)(-2) + (-2)² = 2(9) - (-18) + 4 = 18 + 18 + 4 = 40।",
      en: "2a² - 3ab + b² = 2(3)² - 3(3)(-2) + (-2)² = 2(9) - (-18) + 4 = 18 + 18 + 4 = 40."
    }
  },
  {
    id: 3,
    subject: 'English',
    difficulty: 'Medium',
    question: {
      bn: "নিচের কোনটি সঠিক বানান? (Choose the correct spelling)",
      en: "Which of the following is the correct spelling?"
    },
    options: [
      { label: 'A', text: { bn: 'Lieutennant', en: 'Lieutennant' } },
      { label: 'B', text: { bn: 'Lieutenant', en: 'Lieutenant' } },
      { label: 'C', text: { bn: 'Leiutenant', en: 'Leiutenant' } },
      { label: 'D', text: { bn: 'Lieutenent', en: 'Lieutenent' } }
    ],
    correctIndex: 1,
    explanation: {
      bn: "Lieutenant শব্দের সঠিক বানান হলো 'L-i-e-u-t-e-n-a-n-t'।",
      en: "The correct spelling of the word is 'L-i-e-u-t-e-n-a-n-t'."
    }
  },
  {
    id: 4,
    subject: 'Bangla',
    difficulty: 'Medium',
    question: {
      bn: "'কবর' কবিতাটি কে লিখেছেন?",
      en: "Who wrote the poem 'Kabar'?"
    },
    options: [
      { label: 'A', text: { bn: 'রবীন্দ্রনাথ ঠাকুর', en: 'Rabindranath Tagore' } },
      { label: 'B', text: { bn: 'কাজী নজরুল ইসলাম', en: 'Kazi Nazrul Islam' } },
      { label: 'C', text: { bn: 'পল্লীকবি জসীমউদ্দীন', en: 'Jasimuddin' } },
      { label: 'D', text: { bn: 'জীবনানন্দ দাশ', en: 'Jibanananda Das' } }
    ],
    correctIndex: 2,
    explanation: {
      bn: "পল্লীকবি জসীমউদ্দীনের বিখ্যাত কবিতা 'কবর' তাঁর 'রাখালী' কাব্যগ্রন্থের অন্তর্ভুক্ত।",
      en: "The famous poem 'Kabar' by rural poet Jasimuddin is included in his poetry book 'Rakhali'."
    }
  },
  {
    id: 5,
    subject: 'GK',
    difficulty: 'Easy',
    question: {
      bn: "ক্যাডেট কলেজ ভর্তি লিখিত পরীক্ষায় গণিতের জন্য কত নম্বর বরাদ্দ থাকে?",
      en: "How many marks are allocated for Mathematics in the Cadet College Admission Written Test?"
    },
    options: [
      { label: 'A', text: { bn: '৫০ নম্বর', en: '50 Marks' } },
      { label: 'B', text: { bn: '৬০ নম্বর', en: '60 Marks' } },
      { label: 'C', text: { bn: '১০০ নম্বর', en: '100 Marks' } },
      { label: 'D', text: { bn: '১২০ নম্বর', en: '120 Marks' } }
    ],
    correctIndex: 2,
    explanation: {
      bn: "লিখিত ভর্তি পরীক্ষা মোট ৩০০ নম্বরের হয়ে থাকে, যার মধ্যে গণিতে ১০০ নম্বর, ইংরেজিতে ১০০ নম্বর, বাংলায় ৬০ নম্বর এবং সাধারণ জ্ঞানে ৪০ নম্বর থাকে।",
      en: "The written admission test is of total 300 marks, out of which Mathematics has 100 marks, English 100 marks, Bengali 60 marks and General Knowledge 40 marks."
    }
  }
];

export default function Test() {
  const { goBack, navigate } = useRouter();
  const { userData, setUserData, markTestCompleted } = useData();
  const { t, lang } = useLanguage();
  
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

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [markedQuestions, setMarkedQuestions] = useState<{ [key: number]: boolean }>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Countdown Timer
  useEffect(() => {
    if (testSubmitted || timeLeft <= 0) {
      if (timeLeft === 0 && !testSubmitted) {
        handleSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, testSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = QUESTIONS[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (testSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: optIdx
    });
  };

  const handleToggleMark = () => {
    setMarkedQuestions({
      ...markedQuestions,
      [currentQuestion.id]: !markedQuestions[currentQuestion.id]
    });
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (testSubmitted) return;
    
    // Calculate Score
    let correctCount = 0;
    QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const finalScorePercentage = Math.round((correctCount / QUESTIONS.length) * 100);
    setScore(correctCount);
    setTestSubmitted(true);

    // Update test stats and daily goal progress
    markTestCompleted('test-session-' + Date.now(), finalScorePercentage);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setMarkedQuestions({});
    setTimeLeft(300);
    setTestSubmitted(false);
    setScore(0);
  };

  if (testSubmitted) {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
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
                  <p className="text-[14px] font-black text-slate-800 dark:text-slate-200">{score} / {QUESTIONS.length}</p>
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

              <div className="flex gap-2 w-full pt-2">
                <button 
                  onClick={handleRestart}
                  className="flex-1 py-2 rounded-[10px] border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 font-black uppercase tracking-wider text-[10px] hover:bg-blue-50 dark:hover:bg-blue-950/20 transition cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-left mr-1"></i> {t('retake_test')}
                </button>
                <button 
                  onClick={() => navigate('home')}
                  className="flex-1 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider text-[10px] shadow-sm transition cursor-pointer"
                >
                  <i className="fa-solid fa-house mr-1"></i> {t('dashboard')}
                </button>
              </div>
          </div>

          {/* Question Explanations */}
          <div className="space-y-3">
            <h3 className="text-[12px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('review_answers')}</h3>
            {QUESTIONS.map((q, idx) => {
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
                  <h4 className="text-[14px] font-black text-slate-900 dark:text-white leading-snug">{lang === 'bn' ? q.question.bn : q.question.en}</h4>
                  
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isUserChoice = selectedOpt === oIdx;
                      const isCorrectChoice = q.correctIndex === oIdx;

                      // Exact specific custom visual borders requested previously:
                      // #e0d5d5 for Option 1 (Index 0)
                      // #ebd8d8 for Option 3 (Index 2)
                      // #ecdcdc for Option 4 (Index 3)
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
                          <span>{opt.label}. {lang === 'bn' ? opt.text.bn : opt.text.en}</span>
                          {isCorrectChoice && <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-[10px]"></i>}
                          {isUserChoice && !isCorrectChoice && <i className="fa-solid fa-xmark text-red-500 dark:text-red-400 text-[10px]"></i>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50/50 dark:bg-blue-950/20 p-2.5 rounded-[10px] border border-blue-50 dark:border-blue-900/30 text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                    <span className="text-blue-700 dark:text-blue-400 font-bold block mb-0.5">💡 {t('explanation_title')}</span>
                    {lang === 'bn' ? q.explanation.bn : q.explanation.en}
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
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white dark:bg-slate-950 z-10 border-b border-slate-200 dark:border-slate-800/80 shrink-0 transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('ongoing_test')}</h1>
          <button onClick={handleSubmit} className="text-red-500 dark:text-red-400 hover:text-red-600 font-bold text-[10px] uppercase cursor-pointer">{t('end_test')}</button>
      </header>

      {/* Timer & Meta Bar */}
      <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-slate-200 dark:border-slate-800/60 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-wider">{t('subject_label')}{getSubjectName(currentQuestion.subject)}</span>
          </div>
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <i className="fa-regular fa-clock text-slate-600 dark:text-slate-400 text-[10px] animate-pulse"></i>
              <span className="text-[10px] font-extrabold text-slate-800 dark:text-slate-200 font-mono">{formatTime(timeLeft)}</span>
          </div>
      </div>

      <div className="px-5 py-4 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
              <span className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">{t('question')} {currentIdx + 1} / {QUESTIONS.length}</span>
              <span className="bg-blue-50 dark:bg-blue-950/45 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 text-[10px] font-black px-2 py-0.5 rounded-[10px] flex items-center gap-1 uppercase">
                <i className="fa-solid fa-shield text-[7px]"></i> {getDifficultyName(currentQuestion.difficulty)}
              </span>
          </div>

          <h2 className="text-[14px] font-black text-slate-900 dark:text-white mb-6 leading-relaxed bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-inner">
            {lang === 'bn' ? currentQuestion.question.bn : currentQuestion.question.en}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-6" id="quiz-options">
              {currentQuestion.options.map((opt, index) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === index;
                  return (
                    <button 
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`border-2 rounded-xl p-3.5 flex justify-between items-center transition-all duration-150 w-full text-left cursor-pointer ${
                        isSelected 
                          ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm ring-1 ring-indigo-500/30' 
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950'
                      }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg text-xs font-black flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400'
                            }`}>{opt.label}</div>
                            <span className={`text-[14px] font-black ${isSelected ? 'text-indigo-950 dark:text-indigo-100' : 'text-slate-800 dark:text-slate-200'}`}>{lang === 'bn' ? opt.text.bn : opt.text.en}</span>
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs shadow-sm">
                            <i className="fa-solid fa-check"></i>
                          </div>
                        )}
                    </button>
                  );
              })}
          </div>
      </div>

      {/* Bottom controls */}
      <div className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 p-3.5 flex justify-between gap-3.5 z-20 shadow-[0_-8px_16px_rgba(0,0,0,0.03)] shrink-0 transition-colors duration-300">
          <button 
            onClick={handlePrevious}
            disabled={currentIdx === 0}
            className={`flex-1 py-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1 transition ${
              currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer'
            }`}
          >
            <i className="fa-solid fa-chevron-left text-[8px]"></i> {t('prev')}
          </button>
          
          <button 
            onClick={handleToggleMark}
            className={`flex-1 py-2.5 rounded-[10px] border text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer ${
              markedQuestions[currentQuestion.id] 
                ? 'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/50 text-amber-700 dark:text-amber-400' 
                : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <i className="fa-regular fa-bookmark"></i> {markedQuestions[currentQuestion.id] ? t('marked') : t('mark')}
          </button>
          
          {currentIdx === QUESTIONS.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="flex-1 py-2.5 rounded-[10px] bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider hover:bg-emerald-700 shadow-sm transition cursor-pointer"
            >
              {t('submit_test')}
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-[10px] bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider hover:bg-indigo-700 shadow-sm transition cursor-pointer flex items-center justify-center gap-1"
            >
              {t('next')} <i className="fa-solid fa-chevron-right text-[8px]"></i>
            </button>
          )}
      </div>
    </div>
  );
}
