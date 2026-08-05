import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

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
    name: 'সূর্যালোক',
    chemical: 'আলোক শক্তি',
    icon: '☀️',
    description: 'Provides the crucial light energy absorbed by Chlorophyll in the plant leaves to initiate the food-making reaction.',
    bnDescription: 'সূর্যালোক উদ্ভিদের পাতায় থাকা ক্লোরোফিল দ্বারা শোষিত হয়ে খাদ্য তৈরির প্রক্রিয়া শুরু করার প্রয়োজনীয় শক্তি যোগায়।',
    position: 'top-[10%] left-[8%]',
    color: 'bg-amber-400 text-amber-950 border-amber-300'
  },
  {
    id: 'co2',
    name: 'কার্বন ডাই-অক্সাইড',
    chemical: 'CO₂',
    icon: '💨',
    description: 'Enters the leaves from the atmosphere through microscopic, adjustable pores called stomata.',
    bnDescription: 'বায়ুমণ্ডল থেকে কার্বন ডাই-অক্সাইড পাতার নিচে অবস্থিত অতি ক্ষুদ্র ছিদ্র বা স্টোমাটার মাধ্যমে প্রবেশ করে।',
    position: 'top-[35%] left-[15%]',
    color: 'bg-blue-400 text-blue-950 border-blue-300'
  },
  {
    id: 'h2o',
    name: 'পানি',
    chemical: 'H₂O',
    icon: '💧',
    description: 'Absorbed from the surrounding soil by roots, then transported up through the stem via xylem vessels to the leaves.',
    bnDescription: 'মূলরোমের সাহায্যে মাটি থেকে পানি ও খনিজ লবণ শোষিত হয়ে জাইলেম বাহিকার মাধ্যমে পাতায় পৌঁছায়।',
    position: 'bottom-[25%] right-[10%]',
    color: 'bg-cyan-500 text-white border-cyan-400'
  },
  {
    id: 'oxygen',
    name: 'অক্সিজেন',
    chemical: 'O₂',
    icon: '🟢',
    description: 'Released back into the atmosphere as a vital byproduct, supporting life and breathing for humans and animals.',
    bnDescription: 'সালোকসংশ্লেষণ প্রক্রিয়ার উপজাত (byproduct) হিসেবে অক্সিজেন তৈরি হয় যা বায়ুমণ্ডলে নির্গত হয়।',
    position: 'top-[22%] right-[12%]',
    color: 'bg-emerald-500 text-white border-emerald-400'
  },
  {
    id: 'glucose',
    name: 'গ্লুকোজ',
    chemical: 'C₆H₁₂O₆',
    icon: '🍬',
    description: 'The simple carbohydrate/sugar produced as food, used for cellular respiration and energy, or stored as starch.',
    bnDescription: 'উদ্ভিদের তৈরি মূল খাদ্য শর্বরা বা গ্লুকোজ, যা উদ্ভিদ তার নিজের বৃদ্ধি ও শক্তির জন্য ব্যবহার করে বা শ্বেতসার (স্টার্চ) হিসেবে জমা রাখে।',
    position: 'bottom-[42%] left-[40%]',
    color: 'bg-orange-400 text-orange-950 border-orange-300'
  }
];

interface QuizQuestion {
  question: string;
  bnQuestion: string;
  options: string[];
  bnOptions: string[];
  correctIndex: number;
  explanation: string;
  bnExplanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What is the primary green pigment in plants that absorbs light energy?",
    bnQuestion: "উদ্ভিদের কোন সবুজ কণিকা আলোক শক্তি শোষণ করতে সাহায্য করে?",
    options: ["Xanthophyll", "Chlorophyll", "Carotene", "Stomata"],
    bnOptions: ["জ্যান্থোফিল (Xanthophyll)", "ক্লোরোফিল (Chlorophyll)", "ক্যারোটিন (Carotene)", "পত্ররন্ধ্র (Stomata)"],
    correctIndex: 1,
    explanation: "Chlorophyll is the green pigment in plant chloroplasts that absorbs light energy for photosynthesis.",
    bnExplanation: "ক্লোরোফিল হলো উদ্ভিদের ক্লোরোপ্লাস্টে অবস্থিত সবুজ কণিকা যা সালোকসংশ্লেষণের জন্য আলোক শক্তি শোষণ করে।"
  },
  {
    question: "Which of the following are the primary reactants (inputs) of photosynthesis?",
    bnQuestion: "নিচের কোনগুলো সালোকসংশ্লেষণের প্রধান উপাদান বা বিক্রিয়ক?",
    options: ["Oxygen and Water", "Glucose and Carbon Dioxide", "Carbon Dioxide and Water", "Oxygen and Glucose"],
    bnOptions: ["অক্সিজেন এবং পানি", "গ্লুকোজ এবং কার্বন ডাই-অক্সাইড", "কার্বন ডাই-অক্সাইড এবং পানি", "অক্সিজেন এবং গ্লুকোজ"],
    correctIndex: 2,
    explanation: "Carbon Dioxide (CO₂) and Water (H₂O) are the primary reactants of photosynthesis, along with sunlight.",
    bnExplanation: "সূর্যালোকের পাশাপাশি কার্বন ডাই-অক্সাইড (CO₂) এবং পানি (H₂O) হলো উদ্ভিদের সালোকসংশ্লেষণের প্রধান উপাদান বা বিক্রিয়ক।"
  },
  {
    question: "Through which plant structure does Carbon Dioxide enter the leaf?",
    bnQuestion: "পাতার কোন অংশের মধ্য দিয়ে কার্বন ডাই-অক্সাইড প্রবেশ করে?",
    options: ["Roots", "Stomata", "Xylem", "Phloem"],
    bnOptions: ["মূল (Roots)", "পত্ররন্ধ্র (Stomata)", "জাইলেম (Xylem)", "ফ্লোয়েম (Phloem)"],
    correctIndex: 1,
    explanation: "Stomata are the tiny pores on the leaf surface that regulate gas exchange, allowing Carbon Dioxide to enter.",
    bnExplanation: "স্টোমাটা বা পত্ররন্ধ্র হলো পাতার পৃষ্ঠে থাকা অত্যন্ত ক্ষুদ্র ছিদ্র যা গ্যাস আদান-প্রদান (কার্বন ডাই-অক্সাইড প্রবেশ এবং অক্সিজেন নির্গমন) নিয়ন্ত্রণ করে।"
  }
];

export default function Photosynthesis() {
  const { goBack } = useRouter();
  const { markNoteCompleted } = useData();
  const { t, lang } = useLanguage();
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
      markNoteCompleted('photosynthesis');
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
    <div className="bg-slate-50/50 dark:bg-slate-900 min-h-full pb-6 animate-in fade-in duration-300 transition-colors duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">বিজ্ঞান ইনফোগ্রাফিকস</span>
            <h1 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">সালোকসংশ্লেষণ (Photosynthesis)</h1>
          </div>
          <button className="text-emerald-600 dark:text-emerald-400 w-8 h-8 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center"><i className="fa-solid fa-leaf text-xs"></i></button>
      </header>

      {/* Navigation tabs */}
      <div className="bg-white dark:bg-slate-950 flex justify-center gap-1.5 p-3 border-b border-slate-200 dark:border-slate-800/85 sticky top-[53px] z-10 shadow-sm transition-colors duration-300">
          {(['Overview', 'Learn', 'Diagram', 'Quiz'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            const labels = {
              Overview: 'সারসংক্ষেপ',
              Learn: 'ধাপসমূহ',
              Diagram: 'চিত্র',
              Quiz: 'কুইজ'
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 text-xs font-black rounded-full uppercase transition-all tracking-wider ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
      </div>

      <div className="p-4 space-y-4">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'Overview' && (
            <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-5 animate-in slide-in-from-bottom-2 duration-300 transition-colors duration-300">
              <div className="space-y-1">
                <h2 className="text-sm font-black text-slate-900 dark:text-white">সালোকসংশ্লেষণের পরিচয়</h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                  Photosynthesis বা সালোকসংশ্লেষণ হলো এমন একটি প্রক্রিয়া যার মাধ্যমে সবুজ উদ্ভিদ, শৈবাল এবং কিছু ব্যাকটেরিয়া পানি ও কার্বন ডাই-অক্সাইড ব্যবহার করে আলোক শক্তিকে (সূর্য থেকে) রাসায়নিক শক্তিতে (গ্লুকোজ) রূপান্তরিত করে।
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed font-bold">
                  যে প্রক্রিয়ায় সবুজ উদ্ভিদ সূর্যালোকের উপস্থিতিতে ক্লোরোফিলের সাহায্যে পানি ও কার্বন ডাই-অক্সাইড ব্যবহার করে নিজের খাদ্য (শর্করা) নিজে তৈরি করে এবং অক্সিজেন নির্গত করে, তাকে সালোকসংশ্লেষণ বলে।
                </p>
              </div>

              {/* Chemical Equation Widget */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 space-y-2">
                <p className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest text-center">রাসায়নিক বিক্রিয়া সূত্র</p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900/40 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-xs font-extrabold text-slate-800 dark:text-white tracking-wide font-mono">
                    6CO₂ + 6H₂O + Light ➔ C₆H₁₂O₆ + 6O₂
                  </span>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase">
                    কার্বন ডাই-অক্সাইড + পানি + আলোক শক্তি ➔ গ্লুকোজ + অক্সিজেন
                  </span>
                </div>
              </div>

              {/* Input Outputs table */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/40 dark:bg-blue-950/10 p-3 rounded-xl border border-blue-50/50 dark:border-blue-900/20 space-y-2">
                  <h3 className="text-xs font-black text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1">
                    <span className="text-xs">📥</span> বিক্রিয়কসমূহ (ইনপুট)
                  </h3>
                  <ul className="text-xs font-bold text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    <li>কার্বন ডাই-অক্সাইড (বাতাস থেকে)</li>
                    <li>পানি (মাটি থেকে)</li>
                    <li>সূর্যালোক (শক্তির প্রধান উৎস)</li>
                    <li>ক্লোরোফিল (প্রভাবক/অনুকুলক)</li>
                  </ul>
                </div>
                <div className="bg-emerald-50/40 dark:bg-emerald-950/10 p-3 rounded-xl border border-emerald-50/50 dark:border-emerald-900/20 space-y-2">
                  <h3 className="text-xs font-black text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                    <span className="text-xs">📤</span> উৎপাদসমূহ (আউটপুট)
                  </h3>
                  <ul className="text-xs font-bold text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                    <li>গ্লুকোজ (সঞ্চিত খাদ্য শক্তি)</li>
                    <li>অক্সিজেন (মুক্ত গ্যাস)</li>
                    <li>জলীয় বাষ্প (উপজাত)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEARN STEPS */}
          {activeTab === 'Learn' && (
            <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
                <h2 className="text-xs font-black text-slate-900 dark:text-white mb-1">ক্যাডেট ফাস্ট-ট্র্যাক পাঠ</h2>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ধাপে ধাপে সালোকসংশ্লেষণের ব্যাখ্যা</p>
              </div>

              {[
                { step: '০১', title: 'আলোক শোষণ (Light Absorption)', desc: 'পাতার ক্লোরোপ্লাস্টে থাকা ক্লোরোফিল সূর্যের আলোক শক্তিকে ধারণ করে। সূর্যালোক সর্বাধিক শোষণের জন্য পাতাগুলো চওড়া ও চ্যাপ্টা হয়।', color: 'border-l-amber-500' },
                { step: '০২', title: 'কার্বন ডাই-অক্সাইড গ্রহণ (Carbon Dioxide Uptake)', desc: 'উদ্ভিদ পাতার অতি ক্ষুদ্র পত্ররন্ধ্র বা স্টোমাটার মাধ্যমে বাতাস থেকে কার্বন ডাই-অক্সাইড শোষণ করে। গ্যাস আদান-প্রদান ও প্রস্বেদন সামঞ্জস্য করতে রক্ষীকোষ স্টোমাটা খোলা ও বন্ধ হওয়া নিয়ন্ত্রণ করে।', color: 'border-l-blue-500' },
                { step: '০৩', title: 'পানি পরিবহন (Water Transport)', desc: 'অসমোসিস প্রক্রিয়ায় মাটি থেকে পানি মূলরোম কোষে প্রবেশ করে। জাইলেম বাহিকা নামক নালীর মাধ্যমে এই পানি পাতায় বাহিত হয়।', color: 'border-l-cyan-500' },
                { step: '০৪', title: 'রাসায়নিক রূপান্তর (Chemical Transformation)', desc: 'পাতার কোষের ভেতরে আলোক শক্তি ব্যবহার করে পানির অণু ভেঙে ফেলা হয়। হাইড্রোজেন কার্বন ডাই-অক্সাইডের সাথে যুক্ত হয়ে গ্লুকোজ তৈরি করে এবং অক্সিজেন মুক্ত হয়।', color: 'border-l-orange-500' },
                { step: '০৫', title: 'খাদ্য সঞ্চয় ও শ্বসন (Food Storage & Breathing)', desc: 'উৎপাদিত গ্লুকোজ দীর্ঘমেয়াদী সঞ্চয়ের জন্য স্টার্চ বা শ্বেতসারে রূপান্তরিত হয়ে ফল, মূল বা কাণ্ডে জমা থাকে। অক্সিজেন গ্যাস স্টোমাটা দিয়ে বাতাসে নির্গত হয়, যা সমগ্র জীবজগতের শ্বাসকার্যে সহায়তা করে।', color: 'border-l-emerald-500' }
              ].map((item, index) => (
                <div key={index} className={`bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 border-l-4 ${item.color} shadow-sm space-y-1.5 transition-colors duration-300`}>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500">ধাপ {item.step}</span>
                    <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  </div>
                  <h3 className="text-xs font-black text-slate-950 dark:text-white">{item.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: DIAGRAM WORKBENCH */}
          {activeTab === 'Diagram' && (
            <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              
              {/* Graphic container simulating plant layout */}
              <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4 transition-colors duration-300">
                <div className="text-center">
                  <h2 className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest">ইন্টারেক্টিভ পাতার চিত্র</h2>
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">যেকোনো হটস্পটে ক্লিক করুন বা বাটন ব্যবহার করে ধাপগুলো দেখুন</p>
                </div>

                {/* Simulated Canvas */}
                <div className="h-64 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/50 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner transition-colors duration-300">
                  
                  {/* Sky & Ground gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 via-sky-50/10 to-amber-100/10 dark:from-sky-950/20 dark:to-slate-900/20 h-[70%]" />
                  <div className="absolute bottom-0 left-0 right-0 bg-amber-900/10 dark:bg-slate-950/40 border-t border-amber-900/10 dark:border-slate-800/80 h-[30%] flex items-end p-2 justify-center">
                    <span className="text-xs font-black tracking-widest text-amber-800 dark:text-amber-550 uppercase">মাটির নিচের মূল স্তর (Sub-Soil Roots)</span>
                  </div>

                  {/* Draw Sun in Top-Left */}
                  <div className="absolute top-4 left-4 text-center animate-pulse">
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-lg shadow-lg shadow-amber-200 dark:shadow-none">☀️</div>
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-550">সৌর শক্তি</span>
                  </div>

                  {/* Draw Plant with leaves & roots using clean absolute shapes */}
                  <div className="absolute bottom-[20%] w-40 h-40 flex flex-col items-center">
                    
                    {/* Stem */}
                    <div className="w-2.5 h-28 bg-emerald-600 rounded-full relative z-0">
                      
                      {/* Leaf 1 (Left) */}
                      <div className="absolute top-[20%] right-full w-14 h-8 bg-emerald-500 rounded-tl-full rounded-br-full rotate-[-15deg] origin-right border border-emerald-600/20 shadow-sm flex items-center justify-center text-xs text-white font-bold">
                        পাতা
                      </div>

                      {/* Leaf 2 (Right) */}
                      <div className="absolute top-[40%] left-full w-16 h-10 bg-emerald-500 rounded-tr-full rounded-bl-full rotate-[15deg] origin-left border border-emerald-600/20 shadow-sm flex items-center justify-center text-xs text-white font-bold">
                        সালোকসংশ্লেষণ
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
                        <span className="text-xs px-1">{hot.icon}</span>
                        <span className="text-xs font-bold pr-1.5 hidden sm:inline">{hot.chemical || hot.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed hotspot panel below */}
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 space-y-2 transition-colors duration-300">
                  <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800 pb-2">
                    <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      <span>{currentHotspot.icon}</span> {currentHotspot.name} {currentHotspot.chemical && `(${currentHotspot.chemical})`}
                    </span>
                    <span className="text-xs font-black text-slate-400 dark:text-slate-550 uppercase">প্রক্রিয়ার ধাপ {activeStep + 1} / ৫</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-bold leading-relaxed">{currentHotspot.bnDescription}</p>
                </div>

                {/* Step Switcher Buttons */}
                <div className="flex justify-between gap-3 pt-1">
                  <button 
                    onClick={handlePrevStep}
                    className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-left text-xs"></i> পূর্ববর্তী ধাপ
                  </button>
                  <button 
                    onClick={handleNextStep}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-100/20 transition flex items-center justify-center gap-1 cursor-pointer border border-transparent"
                  >
                    পরবর্তী ধাপ <i className="fa-solid fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>

              {/* Science Summary banner */}
              <div className="bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-xl flex items-center gap-3 transition-colors duration-300">
                <span className="text-xl">💡</span>
                <p className="text-xs font-black text-emerald-900 dark:text-emerald-400 leading-snug">
                  মনে রেখো, ক্যাডেট! সালোকসংশ্লেষণ সাধারণত দিনের আলোতে ক্লোরোপ্লাস্টের মধ্যে ঘটে। সূর্যালোক এবং ক্লোরোফিল ছাড়া এই রাসায়নিক প্রক্রিয়া অসম্ভব। ক্যাডেট কলেজ ভর্তি পরীক্ষার জন্য এই সূত্রটি ভালোভাবে মনে রেখো!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: INTERACTIVE MINI-QUIZ */}
          {activeTab === 'Quiz' && (
            <div className="bg-white dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm animate-in slide-in-from-bottom-2 duration-300 transition-colors duration-300">
              
              {!quizFinished ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                    <div>
                      <h3 className="text-xs font-black text-slate-900 dark:text-white">টপিক কুইজ</h3>
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">সালোকসংশ্লেষণ সম্পর্কিত তোমার জ্ঞান যাচাই করো</p>
                    </div>
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 px-2 py-0.5 rounded-full">
                      প্রশ্ন {quizIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {lang === 'bn' ? QUIZ_QUESTIONS[quizIdx].bnQuestion : QUIZ_QUESTIONS[quizIdx].question}
                    </h4>
                  </div>

                  <div className="flex flex-col gap-2">
                    {(lang === 'bn' ? QUIZ_QUESTIONS[quizIdx].bnOptions : QUIZ_QUESTIONS[quizIdx].options).map((opt, i) => {
                      const isSelected = selectedOpt === i;
                      const isCorrect = QUIZ_QUESTIONS[quizIdx].correctIndex === i;
                      
                      let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700';
                      if (isSelected) {
                        btnStyle = 'bg-emerald-600 border-emerald-600 text-white dark:text-white';
                      }
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-green-100 dark:bg-green-950/30 border-green-300 dark:border-green-800 text-green-800 dark:text-green-400';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-100 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-400';
                        } else {
                          btnStyle = 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-900 text-slate-400 dark:text-slate-600';
                        }
                      }

                      return (
                        <button
                          key={i}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(i)}
                          className={`w-full p-2.5 rounded-xl border text-xs font-bold text-left transition flex justify-between items-center cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-xs"></i>}
                          {quizSubmitted && isSelected && !isCorrect && <i className="fa-solid fa-xmark text-red-600 dark:text-red-400 text-xs"></i>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submission and continuation controls */}
                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizSubmit}
                      disabled={selectedOpt === null}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                        selectedOpt !== null 
                          ? 'bg-emerald-600 text-white shadow-sm cursor-pointer' 
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      উত্তর জমা দিন
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-bold leading-relaxed">
                        <span className="text-slate-800 dark:text-slate-200 font-extrabold block mb-0.5">💡 ব্যাখ্যা</span>
                        {lang === 'bn' ? QUIZ_QUESTIONS[quizIdx].bnExplanation : QUIZ_QUESTIONS[quizIdx].explanation}
                      </div>
                      <button
                        onClick={handleNextQuiz}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {quizIdx < QUIZ_QUESTIONS.length - 1 ? 'পরবর্তী প্রশ্ন' : 'কুইজ শেষ করুন'} <i className="fa-solid fa-chevron-right text-xs"></i>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-4 py-4 animate-in zoom-in duration-300">
                  <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/20 rounded-full flex items-center justify-center text-2xl border border-emerald-100 dark:border-emerald-900/30">🏆</div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">কুইজ সম্পন্ন হয়েছে, ক্যাডেট!</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">তুমি {QUIZ_QUESTIONS.length} টির মধ্যে {score} টি সঠিক উত্তর দিয়েছ</p>
                  </div>
                     
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30 w-full text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-2">
                    <span>🌟 দৈনিক লক্ষ্য অগ্রগতি বৃদ্ধি পেয়েছে!</span>
                  </div>
   
                  <div className="flex gap-2.5 w-full">
                    <button 
                      onClick={resetQuiz}
                      className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                    >
                      <i className="fa-solid fa-rotate-left mr-1"></i> আবার খেলুন
                    </button>
                    <button 
                      onClick={() => setActiveTab('Diagram')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
                    >
                      <i className="fa-solid fa-house mr-1"></i> চিত্রে ফিরে যান
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
