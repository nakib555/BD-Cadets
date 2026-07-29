import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';

interface Hotspot {
  id: string;
  name: string;
  chemical?: string;
  icon: string;
  description: string;
  bnDescription: string;
  position: string; // Tailwind class
  color: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'sunlight',
    name: 'Sunlight',
    chemical: 'Light Energy',
    icon: '☀️',
    description: 'Provides the crucial light energy absorbed by Chlorophyll in the plant leaves to initiate the food-making reaction.',
    bnDescription: 'সূর্যালোক উদ্ভিদের পাতায় থাকা ক্লোরোফিল দ্বারা শোষিত হয়ে খাদ্য তৈরির প্রক্রিয়া শুরু করার প্রয়োজনীয় শক্তি যোগায়।',
    position: 'top-[10%] left-[8%]',
    color: 'bg-amber-400 text-amber-950 border-amber-300'
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    chemical: 'CO₂',
    icon: '💨',
    description: 'Enters the leaves from the atmosphere through microscopic, adjustable pores called stomata.',
    bnDescription: 'জলবায়ু থেকে কার্বন ডাই-অক্সাইড পাতার নিচে অবস্থিত অতি ক্ষুদ্র ছিদ্র বা স্টোমাটার মাধ্যমে প্রবেশ করে।',
    position: 'top-[35%] left-[15%]',
    color: 'bg-blue-400 text-blue-950 border-blue-300'
  },
  {
    id: 'h2o',
    name: 'Water',
    chemical: 'H₂O',
    icon: '💧',
    description: 'Absorbed from the surrounding soil by roots, then transported up through the stem via xylem vessels to the leaves.',
    bnDescription: 'মূলরোমের সাহায্যে মাটি থেকে পানি ও খনিজ লবণ শোষিত হয়ে জাইলেম বাহিকার মাধ্যমে পাতায় পৌঁছায়।',
    position: 'bottom-[25%] right-[10%]',
    color: 'bg-cyan-500 text-white border-cyan-400'
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    chemical: 'O₂',
    icon: '🟢',
    description: 'Released back into the atmosphere as a vital byproduct, supporting life and breathing for humans and animals.',
    bnDescription: 'সালোকসংশ্লেষণ প্রক্রিয়ার উপজাত (byproduct) হিসেবে অক্সিজেন তৈরি হয় যা বায়ুমণ্ডলে নির্গত হয়।',
    position: 'top-[22%] right-[12%]',
    color: 'bg-emerald-500 text-white border-emerald-400'
  },
  {
    id: 'glucose',
    name: 'Glucose',
    chemical: 'C₆H₁₂O₆',
    icon: '🍬',
    description: 'The simple carbohydrate/sugar produced as food, used for cellular respiration and energy, or stored as starch.',
    bnDescription: 'উদ্ভিদের তৈরি মূল খাদ্য শর্করা বা গ্লুকোজ, যা উদ্ভিদ তার নিজের বৃদ্ধি ও শক্তির জন্য ব্যবহার করে বা স্টার্চ হিসেবে জমা রাখে।',
    position: 'bottom-[42%] left-[40%]',
    color: 'bg-orange-400 text-orange-950 border-orange-300'
  }
];

interface QuizQuestion {
  question: string;
  bnQuestion: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is the primary green pigment in plants that absorbs light energy?",
    bnQuestion: "উদ্ভিদের কোন সবুজ কণিকা আলোক শক্তি শোষণ করতে সাহায্য করে?",
    options: ["Xanthophyll (জ্যান্থোফিল)", "Chlorophyll (ক্লোরোফিল)", "Carotene (ক্যারোটিন)", "Stomata (স্টোমাটা)"],
    correctIndex: 1,
    explanation: "Chlorophyll is the green pigment in the chloroplasts of plant cells that absorbs light energy for photosynthesis."
  },
  {
    question: "Which of the following are the primary reactants (inputs) of photosynthesis?",
    bnQuestion: "নিচের কোনগুলো সালোকসংশ্লেষণের প্রধান উপাদান বা বিক্রিয়ক?",
    options: ["Oxygen and Water", "Glucose and Carbon Dioxide", "Carbon Dioxide and Water", "Oxygen and Glucose"],
    correctIndex: 2,
    explanation: "Carbon dioxide (CO₂) and Water (H₂O) are the core inputs used by plants along with sunlight to perform photosynthesis."
  },
  {
    question: "Through which plant structure does Carbon Dioxide enter the leaf?",
    bnQuestion: "পাতার কোন অংশের মধ্য দিয়ে কার্বন ডাই-অক্সাইড প্রবেশ করে?",
    options: ["Roots (মূল)", "Stomata (পত্ররন্ধ্র/স্টোমাটা)", "Xylem (জাইলেম)", "Phloem (ফ্লোয়েম)"],
    correctIndex: 1,
    explanation: "Stomata are tiny microscopic pores on the surface of leaves that regulate gas exchange (CO₂ entry and O₂ exit)."
  }
];

export default function Photosynthesis() {
  const { goBack } = useRouter();
  const { setUserData } = useData();
  const [activeTab, setActiveTab] = useState<'Overview' | 'Learn' | 'Diagram' | 'Quiz'>('Diagram');
  
  // Diagram state
  const [activeStep, setActiveStep] = useState<number>(0);
  const currentHotspot = HOTSPOTS[activeStep];

  // Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % HOTSPOTS.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + HOTSPOTS.length) % HOTSPOTS.length);
  };

  const handleSelectOption = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedOpt === null || quizSubmitted) return;
    setQuizSubmitted(true);
    if (selectedOpt === QUIZ_QUESTIONS[quizIdx].correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOpt(null);
    setQuizSubmitted(false);
    if (quizIdx < QUIZ_QUESTIONS.length - 1) {
      setQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Boost user score stats in context
      setUserData(prev => ({
        ...prev,
        bestScore: Math.min(100, Math.max(prev.bestScore, Math.round((score / QUIZ_QUESTIONS.length) * 100))),
        dailyGoalProgress: Math.min(8, prev.dailyGoalProgress + 1)
      }));
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setSelectedOpt(null);
    setQuizSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-slate-50 min-h-full pb-20 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
          <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <div className="flex flex-col items-center">
            <span className="text-[8px] font-black tracking-widest text-emerald-600 uppercase">Science Infographics</span>
            <h1 className="text-[12px] font-bold text-slate-900">Photosynthesis (সালোকসংশ্লেষণ)</h1>
          </div>
          <button className="text-emerald-600 w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center"><i className="fa-solid fa-leaf text-xs"></i></button>
      </header>

      {/* Navigation tabs */}
      <div className="bg-white flex justify-center gap-1.5 p-3 border-b border-slate-100 sticky top-[53px] z-10 shadow-sm">
          {(['Overview', 'Learn', 'Diagram', 'Quiz'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-[9px] font-black rounded-full uppercase transition-all tracking-wider ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-slate-100 text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            );
          })}
      </div>

      <div className="p-4 space-y-4">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5 animate-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-1">
                <h2 className="text-sm font-black text-slate-900">Introduction to Photosynthesis</h2>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy (from the sun) into chemical energy (glucose) using water and carbon dioxide.
                </p>
                <p className="text-[11px] text-emerald-700 leading-relaxed font-bold">
                  বাংলায়: যে প্রক্রিয়ায় সবুজ উদ্ভিদ সূর্যালোকের উপস্থিতিতে ক্লোরোফিলের সাহায্যে পানি ও কার্বন ডাই-অক্সাইড ব্যবহার করে নিজের খাদ্য (শর্করা) নিজে তৈরি করে এবং অক্সিজেন নির্গত করে, তাকে সালোকসংশ্লেষণ বলে।
                </p>
              </div>

              {/* Chemical Equation Widget */}
              <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 space-y-2">
                <p className="text-[9px] font-black text-emerald-800 uppercase tracking-widest text-center">Chemical Reaction Formula</p>
                <div className="p-3 bg-white rounded-lg border border-emerald-100 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-[12px] font-extrabold text-slate-800 tracking-wide font-mono">
                    6CO₂ + 6H₂O + Light ➔ C₆H₁₂O₆ + 6O₂
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">
                    Carbon Dioxide + Water + Sun energy ➔ Glucose + Oxygen
                  </span>
                </div>
              </div>

              {/* Input Outputs table */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/40 p-3 rounded-xl border border-blue-50 space-y-2">
                  <h3 className="text-[10px] font-black text-blue-800 uppercase tracking-wider flex items-center gap-1">
                    <span className="text-xs">📥</span> Reactants (Inputs)
                  </h3>
                  <ul className="text-[9px] font-bold text-slate-600 space-y-1 list-disc list-inside">
                    <li>Carbon Dioxide (from air)</li>
                    <li>Water (from soil)</li>
                    <li>Sunlight (energy source)</li>
                    <li>Chlorophyll (catalyst)</li>
                  </ul>
                </div>
                <div className="bg-emerald-50/40 p-3 rounded-xl border border-emerald-50 space-y-2">
                  <h3 className="text-[10px] font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <span className="text-xs">📤</span> Products (Outputs)
                  </h3>
                  <ul className="text-[9px] font-bold text-slate-600 space-y-1 list-disc list-inside">
                    <li>Glucose (stored food energy)</li>
                    <li>Oxygen (released gas)</li>
                    <li>Water vapor (byproduct)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEARN STEPS */}
          {activeTab === 'Learn' && (
            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-xs font-black text-slate-900 mb-1">Cadet Fast-Track Lessons</h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Step-by-step Photosynthesis breakdown</p>
              </div>

              {[
                { step: '01', title: 'Light Absorption (আলোক শোষণ)', desc: 'Chlorophyll in the leaf chloroplasts traps light energy from the sun. Leaves are broad and flat to maximize sunlight absorption.', color: 'border-l-amber-500' },
                { step: '02', title: 'Carbon Dioxide Uptake (কার্বন ডাই-অক্সাইড গ্রহণ)', desc: 'Leaves absorb CO2 through tiny leaf openings called stomata. Stomata can open and close using guard cells to balance gas exchange and water loss.', color: 'border-l-blue-500' },
                { step: '03', title: 'Water Transport (পানি পরিবহন)', desc: 'Water from the soil enters root hair cells through osmosis. The xylem vessels act like long biological pipes that carry water up to the leaves.', color: 'border-l-cyan-500' },
                { step: '04', title: 'Chemical Transformation (রাসায়নিক রূপান্তর)', desc: 'Inside the leaf cells, light energy is used to split water molecules. Hydrogen combines with CO2 to synthesize glucose, while oxygen is split off.', color: 'border-l-orange-500' },
                { step: '05', title: 'Food Storage & Breathing (খাদ্য সঞ্চয় ও শ্বসন)', desc: 'The produced glucose is converted to starch for long-term storage in fruits, roots, and stems. O2 gas exits through stomata, facilitating global respiration.', color: 'border-l-emerald-500' }
              ].map((item, index) => (
                <div key={index} className={`bg-white p-4 rounded-xl border border-slate-100 border-l-4 ${item.color} shadow-sm space-y-1.5`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400">STAGE {item.step}</span>
                    <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
                  </div>
                  <h3 className="text-[11px] font-black text-slate-950">{item.title}</h3>
                  <p className="text-[10px] text-slate-600 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: DIAGRAM WORKBENCH */}
          {activeTab === 'Diagram' && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              
              {/* Graphic container simulating plant layout */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="text-center">
                  <h2 className="text-xs font-black text-emerald-800 uppercase tracking-widest">Interactive Leaf Diagram</h2>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Click any hotspot or use step controls</p>
                </div>

                {/* Simulated Canvas */}
                <div className="h-64 bg-slate-50 border border-slate-100 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner">
                  
                  {/* Sky & Ground gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-100 via-sky-50 to-amber-100/40 h-[70%]" />
                  <div className="absolute bottom-0 left-0 right-0 bg-amber-900/10 border-t border-amber-900/10 h-[30%] flex items-end p-2 justify-center">
                    <span className="text-[8px] font-black tracking-widest text-amber-800 uppercase">Sub-Soil Roots Layer</span>
                  </div>

                  {/* Draw Sun in Top-Left */}
                  <div className="absolute top-4 left-4 text-center animate-pulse">
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-lg shadow-lg shadow-amber-200">☀️</div>
                    <span className="text-[7px] font-bold text-amber-800">Sun Energy</span>
                  </div>

                  {/* Draw Plant with leaves & roots using clean absolute shapes */}
                  <div className="absolute bottom-[20%] w-40 h-40 flex flex-col items-center">
                    
                    {/* Stem */}
                    <div className="w-2.5 h-28 bg-emerald-600 rounded-full relative z-0">
                      
                      {/* Leaf 1 (Left) */}
                      <div className="absolute top-[20%] right-full w-14 h-8 bg-emerald-500 rounded-tl-full rounded-br-full rotate-[-15deg] origin-right border border-emerald-600/20 shadow-sm flex items-center justify-center text-[8px] text-white font-bold">
                        Leaf
                      </div>

                      {/* Leaf 2 (Right) */}
                      <div className="absolute top-[40%] left-full w-16 h-10 bg-emerald-500 rounded-tr-full rounded-bl-full rotate-[15deg] origin-left border border-emerald-600/20 shadow-sm flex items-center justify-center text-[8px] text-white font-bold">
                        Photosyn
                      </div>

                      {/* Top Bud */}
                      <div className="absolute -top-1 left-[-4px] w-4 h-4 bg-lime-400 rounded-full shadow-sm" />
                    </div>

                    {/* Roots */}
                    <div className="absolute top-[90%] flex flex-col items-center">
                      <div className="w-1 h-8 bg-amber-700/50 rounded-full" />
                      <div className="flex gap-4 -mt-4">
                        <div className="w-5 h-4 border-l border-b border-amber-700/40 rounded-bl-xl rotate-12" />
                        <div className="w-5 h-4 border-r border-b border-amber-700/40 rounded-br-xl -rotate-12" />
                      </div>
                    </div>
                  </div>

                  {/* Hotspot buttons absolute mapping */}
                  {HOTSPOTS.map((hot, idx) => {
                    const isSelected = activeStep === idx;
                    return (
                      <button
                        key={hot.id}
                        onClick={() => setActiveStep(idx)}
                        className={`absolute p-1 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm ${
                          isSelected 
                            ? 'scale-125 z-20 ring-4 ring-emerald-500/20 font-black' 
                            : 'scale-100 hover:scale-110 opacity-70 hover:opacity-100'
                        } ${hot.position} ${hot.color}`}
                      >
                        <span className="text-[10px] px-1">{hot.icon}</span>
                        <span className="text-[8px] font-bold pr-1.5 hidden sm:inline">{hot.chemical || hot.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed hotspot panel below */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                      <span>{currentHotspot.icon}</span> {currentHotspot.name} {currentHotspot.chemical && `(${currentHotspot.chemical})`}
                    </span>
                    <span className="text-[8px] font-black text-slate-400 uppercase">Process Step {activeStep + 1} of 5</span>
                  </div>
                  <p className="text-[10px] text-slate-800 font-bold leading-relaxed">{currentHotspot.description}</p>
                  <p className="text-[9px] text-emerald-700 font-extrabold leading-relaxed">{currentHotspot.bnDescription}</p>
                </div>

                {/* Step Switcher Buttons */}
                <div className="flex justify-between gap-3 pt-1">
                  <button 
                    onClick={handlePrevStep}
                    className="flex-1 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-[10px] transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-left text-[8px]"></i> Previous Step
                  </button>
                  <button 
                    onClick={handleNextStep}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-md shadow-emerald-100 transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Next Step <i className="fa-solid fa-chevron-right text-[8px]"></i>
                  </button>
                </div>
              </div>

              {/* Science Summary banner */}
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-xl">💡</span>
                <p className="text-[9px] font-black text-emerald-900 leading-snug">
                  Remember, Cadet! Photosynthesis occurs primarily in chloroplasts during daylight. Without sunlight and chlorophyll, the chemical Magic can never happen. Keep this formula stored in your head for the admission test!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE MINI-QUIZ */}
          {activeTab === 'Quiz' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm animate-in slide-in-from-bottom-2 duration-300">
              
              {!quizFinished ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div>
                      <h3 className="text-xs font-black text-slate-900">Topic Cadet Quiz</h3>
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Test your Photosynthesis knowledge</p>
                    </div>
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                      Q {quizIdx + 1} of {QUIZ_QUESTIONS.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[11px] font-bold text-slate-900 leading-snug">
                      {QUIZ_QUESTIONS[quizIdx].question}
                    </h4>
                    <p className="text-[10px] text-emerald-700 font-extrabold leading-relaxed">
                      {QUIZ_QUESTIONS[quizIdx].bnQuestion}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                      const isSelected = selectedOpt === i;
                      const isCorrect = QUIZ_QUESTIONS[quizIdx].correctIndex === i;
                      
                      let btnStyle = 'bg-white border-slate-100 hover:border-slate-300 text-slate-700';
                      if (isSelected) {
                        btnStyle = 'bg-emerald-600 border-emerald-600 text-white';
                      }
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-green-100 border-green-300 text-green-800';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-100 border-red-300 text-red-800';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-100 text-slate-400';
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(i)}
                          className={`w-full p-2.5 rounded-xl border text-[10px] font-bold text-left transition flex justify-between items-center cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <i className="fa-solid fa-check text-green-600 text-[10px]"></i>}
                          {quizSubmitted && isSelected && !isCorrect && <i className="fa-solid fa-xmark text-red-600 text-[10px]"></i>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submission and continuation controls */}
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={selectedOpt === null}
                      className={`w-full py-2.5 rounded-xl text-[10px] font-bold transition ${
                        selectedOpt !== null 
                          ? 'bg-emerald-600 text-white shadow-sm cursor-pointer' 
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[9px] text-slate-600 font-semibold leading-relaxed">
                        <span className="text-slate-800 font-extrabold block mb-0.5">💡 explanation</span>
                        {QUIZ_QUESTIONS[quizIdx].explanation}
                      </div>
                      <button
                        onClick={handleNextQuiz}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {quizIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'} <i className="fa-solid fa-chevron-right text-[8px]"></i>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-4 py-4 animate-in zoom-in duration-300">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-2xl border border-emerald-100">🏆</div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900">Quiz Completed, Cadet!</h3>
                    <p className="text-[9px] text-slate-500 font-bold mt-0.5">You scored {score} out of {QUIZ_QUESTIONS.length}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 w-full text-[10px] font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <span>🌟 Daily Goal Progress Incremented!</span>
                  </div>

                  <div className="flex gap-2.5 w-full">
                    <button 
                      onClick={resetQuiz}
                      className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-700 transition cursor-pointer"
                    >
                      <i className="fa-solid fa-rotate-left mr-1"></i> Retake
                    </button>
                    <button 
                      onClick={() => setActiveTab('Diagram')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold transition cursor-pointer"
                    >
                      Back to Diagram
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
