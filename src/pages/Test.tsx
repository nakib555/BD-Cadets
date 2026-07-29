import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';

interface Question {
  id: number;
  subject: 'GK' | 'Mathematics' | 'English' | 'Bangla';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: { label: string; text: string }[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'GK',
    difficulty: 'Easy',
    question: "বাংলাদেশের প্রথম ক্যাডেট কলেজ কোনটি?",
    options: [
      { label: 'A', text: 'সিলেট ক্যাডেট কলেজ' },
      { label: 'B', text: 'ফৌজদারহাট ক্যাডেট কলেজ' },
      { label: 'C', text: 'মির্জাপুর ক্যাডেট কলেজ' },
      { label: 'D', text: 'রাজশাহী ক্যাডেট কলেজ' }
    ],
    correctIndex: 1,
    explanation: "ফৌজদারহাট ক্যাডেট কলেজ ১৯৫৮ সালে চট্টগ্রামে প্রতিষ্ঠিত হয়, যা বাংলাদেশের ইতিহাসের সর্বপ্রথম ক্যাডেট কলেজ।"
  },
  {
    id: 2,
    subject: 'Mathematics',
    difficulty: 'Medium',
    question: "If a = 3 and b = -2, what is the value of 2a² - 3ab + b²?",
    options: [
      { label: 'A', text: '20' },
      { label: 'B', text: '30' },
      { label: 'C', text: '40' },
      { label: 'D', text: '50' }
    ],
    correctIndex: 2,
    explanation: "2a² - 3ab + b² = 2(3)² - 3(3)(-2) + (-2)² = 2(9) - (-18) + 4 = 18 + 18 + 4 = 40."
  },
  {
    id: 3,
    subject: 'English',
    difficulty: 'Medium',
    question: "Choose the correct spelling:",
    options: [
      { label: 'A', text: 'Lieutennant' },
      { label: 'B', text: 'Lieutenant' },
      { label: 'C', text: 'Leiutenant' },
      { label: 'D', text: 'Lieutenent' }
    ],
    correctIndex: 1,
    explanation: "Lieutenant is spelled correctly with 'L-i-e-u-t-e-n-a-n-t'."
  },
  {
    id: 4,
    subject: 'Bangla',
    difficulty: 'Medium',
    question: "'কবর' কবিতাটি কে লিখেছেন?",
    options: [
      { label: 'A', text: 'রবীন্দ্রনাথ ঠাকুর' },
      { label: 'B', text: 'কাজী নজরুল ইসলাম' },
      { label: 'C', text: 'পল্লীকবি জসীমউদ্দীন' },
      { label: 'D', text: 'জীবনানন্দ দাশ' }
    ],
    correctIndex: 2,
    explanation: "পল্লীকবি জসীমউদ্দীনের বিখ্যাত কবিতা 'কবর' তাঁর 'রাখালী' কাব্যগ্রন্থের অন্তর্ভুক্ত।"
  },
  {
    id: 5,
    subject: 'GK',
    difficulty: 'Easy',
    question: "How many marks are allocated for Mathematics in the Cadet College Admission written exam?",
    options: [
      { label: 'A', text: '50 Marks' },
      { label: 'B', text: '60 Marks' },
      { label: 'C', text: '100 Marks' },
      { label: 'D', text: '120 Marks' }
    ],
    correctIndex: 2,
    explanation: "The written admission test is for 300 marks in total, of which Mathematics holds 100 marks, English holds 100 marks, Bangla holds 60 marks, and GK holds 40 marks."
  }
];

export default function Test() {
  const { goBack, navigate } = useRouter();
  const { userData, setUserData } = useData();
  
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

    // Persist scores in the Global Context
    setUserData(prev => {
      const newTestsTaken = prev.testsTaken + 1;
      const newAvgScore = Math.round((prev.avgScore * prev.testsTaken + finalScorePercentage) / newTestsTaken);
      const newBestScore = Math.max(prev.bestScore, finalScorePercentage);
      
      return {
        ...prev,
        testsTaken: newTestsTaken,
        avgScore: newAvgScore,
        bestScore: newBestScore
      };
    });
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
      <div className="bg-slate-50 animate-in fade-in duration-300 min-h-full pb-20">
        <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
            <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer"><i className="fa-solid fa-arrow-left text-sm"></i></button>
            <h1 className="text-[13px] font-bold text-slate-900">Mock Test Result</h1>
            <div className="w-8"></div>
        </header>

        <div className="p-4 space-y-4">
          {/* Main score badge */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-3">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {passed ? '🏆' : '📚'}
              </div>
              <div>
                <h2 className="text-sm font-black text-slate-900">{passed ? 'Congratulations, Cadet!' : 'Keep Studying, Cadet!'}</h2>
                <p className="text-[10px] text-slate-500 font-bold mt-0.5">{passed ? 'You passed this diagnostic mock exam.' : 'Practice makes perfect.'}</p>
              </div>

              <div className="grid grid-cols-3 gap-6 w-full pt-4 border-t border-slate-100 text-center">
                <div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Score</p>
                  <p className="text-sm font-black text-slate-800">{score} / {QUESTIONS.length}</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</p>
                  <p className="text-sm font-black text-slate-800">{percentage}%</p>
                </div>
                <div>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Status</p>
                  <p className={`text-xs font-black uppercase ${passed ? 'text-green-600' : 'text-red-500'}`}>{passed ? 'PASS' : 'FAIL'}</p>
                </div>
              </div>

              <div className="flex gap-2 w-full pt-2">
                <button 
                  onClick={handleRestart}
                  className="flex-1 py-2 rounded-xl border border-blue-200 text-blue-600 font-bold text-[10px] hover:bg-blue-50 transition cursor-pointer"
                >
                  <i className="fa-solid fa-rotate-left mr-1"></i> Retake Test
                </button>
                <button 
                  onClick={() => navigate('home')}
                  className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700 shadow-md shadow-blue-200 transition cursor-pointer"
                >
                  <i className="fa-solid fa-house mr-1"></i> Dashboard
                </button>
              </div>
          </div>

          {/* Question Explanations */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Review Explanations</h3>
            {QUESTIONS.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-black text-slate-400">Q{idx + 1} ({q.subject})</span>
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase ${
                      isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-900 leading-snug">{q.question}</h4>
                  
                  <div className="grid grid-cols-1 gap-1.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isUserChoice = selectedOpt === oIdx;
                      const isCorrectChoice = q.correctIndex === oIdx;

                      return (
                        <div 
                          key={oIdx}
                          className={`p-2 rounded-lg text-[10px] font-bold flex justify-between items-center ${
                            isCorrectChoice 
                              ? 'bg-green-50 text-green-800 border border-green-200' 
                              : isUserChoice
                                ? 'bg-red-50 text-red-800 border border-red-200'
                                : 'bg-slate-50 text-slate-600 border border-transparent'
                          }`}
                        >
                          <span>{opt.label}. {opt.text}</span>
                          {isCorrectChoice && <i className="fa-solid fa-check text-green-600 text-[10px]"></i>}
                          {isUserChoice && !isCorrectChoice && <i className="fa-solid fa-xmark text-red-500 text-[10px]"></i>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-50 text-[9px] text-slate-600 leading-relaxed font-semibold">
                    <span className="text-blue-700 font-bold block mb-0.5">💡 Explanation</span>
                    {q.explanation}
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
    <div className="animate-in fade-in duration-300 relative h-full flex flex-col bg-white">
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white z-10 border-b border-slate-100 shrink-0">
          <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-bold text-slate-900">Active Admission Mock</h1>
          <button onClick={handleSubmit} className="text-red-500 hover:text-red-600 font-bold text-[10px] uppercase cursor-pointer">End Test</button>
      </header>

      {/* Timer & Meta Bar */}
      <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[9px] font-bold uppercase tracking-wider">Subject: {currentQuestion.subject}</span>
          </div>
          <div className="bg-white border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <i className="fa-regular fa-clock text-slate-600 text-[10px] animate-pulse"></i>
              <span className="text-[10px] font-extrabold text-slate-800 font-mono">{formatTime(timeLeft)}</span>
          </div>
      </div>

      <div className="px-5 py-4 pb-28 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Question {currentIdx + 1} / {QUESTIONS.length}</span>
              <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[8px] font-black px-2 py-0.5 rounded flex items-center gap-1 uppercase">
                <i className="fa-solid fa-shield text-[7px]"></i> {currentQuestion.difficulty}
              </span>
          </div>

          <h2 className="text-[14px] font-extrabold text-slate-900 mb-6 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100 shadow-inner">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-3 mb-6" id="quiz-options">
              {currentQuestion.options.map((opt, index) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === index;
                  return (
                    <button 
                      key={index}
                      onClick={() => handleSelectOption(index)}
                      className={`border-2 rounded-xl p-3 flex justify-between items-center transition w-full text-left cursor-pointer ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/20' 
                          : 'border-slate-100 hover:border-slate-300 bg-white'
                      }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition ${
                              isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>{opt.label}</div>
                            <span className={`text-[11px] font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>{opt.text}</span>
                        </div>
                        {isSelected && <i className="fa-solid fa-circle-check text-indigo-600 text-sm"></i>}
                    </button>
                  );
              })}
          </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-3.5 flex justify-between gap-3.5 z-20 shadow-[0_-8px_16px_rgba(0,0,0,0.03)] shrink-0">
          <button 
            onClick={handlePrevious}
            disabled={currentIdx === 0}
            className={`flex-1 py-2.5 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-600 flex items-center justify-center gap-1 transition ${
              currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
            }`}
          >
            <i className="fa-solid fa-chevron-left text-[8px]"></i> Previous
          </button>
          
          <button 
            onClick={handleToggleMark}
            className={`flex-1 py-2.5 rounded-xl border text-[10px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              markedQuestions[currentQuestion.id] 
                ? 'bg-amber-100 border-amber-300 text-amber-700' 
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <i className="fa-regular fa-bookmark"></i> {markedQuestions[currentQuestion.id] ? 'Marked' : 'Mark'}
          </button>
          
          {currentIdx === QUESTIONS.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-[10px] font-bold hover:bg-emerald-700 shadow-md shadow-emerald-200 transition cursor-pointer"
            >
              Submit Exam
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-[10px] font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition cursor-pointer flex items-center justify-center gap-1"
            >
              Next <i className="fa-solid fa-chevron-right text-[8px]"></i>
            </button>
          )}
      </div>
    </div>
  );
}
