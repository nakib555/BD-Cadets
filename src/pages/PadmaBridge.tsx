import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';

interface FactItem {
  number: string;
  label: string;
  icon: string;
}

interface EngineeringHotspot {
  id: string;
  name: string;
  details: string;
  bnDetails: string;
  icon: string;
  position: string; // absolute position classes
}

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  bnDesc: string;
}

interface BridgeQuizQuestion {
  question: string;
  bnQuestion: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const FACTS: FactItem[] = [
  { number: '6.15 km', label: 'Main Bridge Length', icon: '🌉' },
  { number: '42 Piers', label: 'Support Columns', icon: '🏛️' },
  { number: '122 m', label: 'Deepest Pile Depth', icon: '⚓' },
  { number: '41 Spans', label: 'Steel Truss Spans', icon: '📐' },
  { number: 'Double', label: 'Deck Multi-purpose', icon: '🚆' },
  { number: '1.2%', label: 'Annual GDP Boost', icon: '📈' }
];

const ENGINEERING_HOTSPOTS: EngineeringHotspot[] = [
  {
    id: 'upper-deck',
    name: 'Upper Deck (Roadway)',
    details: 'Features a modern 4-lane highway with a width of 18.10 meters. It enables rapid vehicular transport across the turbulent Padma River.',
    bnDetails: 'উপরিভাগে রয়েছে ১৮.১০ মিটার চওড়া ৪-লেনের মহাসড়ক, যা পদ্মা নদীর ওপর দ্রুত যানবাহন পারাপার নিশ্চিত করে।',
    icon: '🚗',
    position: 'top-[22%] left-[40%]'
  },
  {
    id: 'lower-deck',
    name: 'Lower Deck (Railway)',
    details: 'Houses a dual-gauge single track railway, bridging the gap between southwestern rail networks and the capital, Dhaka.',
    bnDetails: 'নিম্নভাগে রয়েছে ব্রডগেজ ও মিটারগেজ ট্রেনের জন্য সিঙ্গেল ট্র্যাক রেলপথ, যা দক্ষিণ-পশ্চিমাঞ্চলের রেল নেটওয়ার্ককে ঢাকার সাথে যুক্ত করেছে।',
    icon: '🚆',
    position: 'bottom-[35%] left-[40%]'
  },
  {
    id: 'steel-truss',
    name: 'Steel Warren Truss',
    details: 'The bridge superstructure is constructed using 41 heavy-duty steel truss spans, each measuring 150 meters in length.',
    bnDetails: 'সেতুর মূল অবকাঠামো তৈরিতে ব্যবহার করা হয়েছে ৪১টি শক্তিশালী স্টিল ট্রাস স্প্যান, যার প্রতিটির দৈর্ঘ্য ১৫০ মিটার।',
    icon: '⚙️',
    position: 'top-[42%] left-[24%]'
  },
  {
    id: 'pile-foundation',
    name: 'World Record Piles',
    details: 'Supported by steel pipes driven up to 122 meters deep into the riverbed—the deepest pile foundation of any bridge in the world.',
    bnDetails: 'নদীর তলদেশে ১২২ মিটার গভীর পর্যন্ত ড্রাইভ করা ইস্পাতের পাইল দ্বারা সমর্থিত, যা বিশ্বের যেকোনো সেতুর জন্য গভীরতম পাইল ফাউন্ডেশন।',
    icon: '⚓',
    position: 'bottom-[12%] left-[28%]'
  },
  {
    id: 'mawa-point',
    name: 'Mawa Connecting Point',
    details: 'Located in Munshiganj district, serving as the eastern gateway connecting the capital city, Dhaka, to the bridge.',
    bnDetails: 'মুন্সীগঞ্জ জেলায় অবস্থিত এই প্রান্তটি রাজধানী ঢাকাকে পদ্মা সেতুর সাথে সংযুক্তকারী পূর্ব গেটওয়ে হিসেবে কাজ করে।',
    icon: '📍',
    position: 'top-[35%] left-[5%]'
  },
  {
    id: 'janjira-point',
    name: 'Janjira Connecting Point',
    details: 'Located in Shariatpur district, serving as the western gateway connecting 21 southwestern districts of Bangladesh.',
    bnDetails: 'শরীয়তপুর জেলায় অবস্থিত এই প্রান্তটি বাংলাদেশের দক্ষিণ-পশ্চিমাঞ্চলের ২১টি জেলাকে সংযুক্তকারী পশ্চিম গেটওয়ে।',
    icon: '📍',
    position: 'top-[35%] right-[5%]'
  }
];

const TIMELINE: TimelineEvent[] = [
  {
    year: '2014',
    title: 'Construction Kickoff',
    desc: 'The official physical work on the bridge commenced with domestic funding, demonstrating national self-reliance.',
    bnDesc: 'নিজস্ব অর্থায়নে মূল সেতুর নির্মাণ কাজ আনুষ্ঠানিকভাবে শুরু হয়, যা বাংলাদেশের স্বনির্ভরতার এক অনন্য দৃষ্টান্ত।'
  },
  {
    year: '2017',
    title: 'First Span Installed',
    desc: 'The very first steel truss span was placed on Piers 37 and 38, marking a monumental engineering milestone.',
    bnDesc: '৩৭ ও ৩৮ নম্বর পিলারের ওপর প্রথম স্টিল ট্রাস স্প্যানটি স্থাপন করা হয়, যা সেতুর প্রথম দৃশ্যমান অংশ।'
  },
  {
    year: '2020',
    title: 'Final Span Joint',
    desc: 'On December 10, the 41st and final span was installed, fully connecting the two banks of the mighty river.',
    bnDesc: '১০ ডিসেম্বর সেতুর ৪১তম এবং শেষ স্প্যানটি বসানোর মাধ্যমে নদীর দুই পারের সংযোগ সম্পূর্ণ হয়।'
  },
  {
    year: '2022',
    title: 'The Grand Opening',
    desc: 'Inaugurated on June 25 by Prime Minister Sheikh Hasina, opening a new era of connectivity and prosperity.',
    bnDesc: '২৫ জুন প্রধানমন্ত্রী শেখ হাসিনা আনুষ্ঠানিকভাবে সেতুটির শুভ উদ্বোধন করেন, যা যোগাযোগ খাতে এক ঐতিহাসিক যুগের সূচনা করে।'
  }
];

const QUIZ: BridgeQuizQuestion[] = [
  {
    question: "What is the total length of the main superstructure of the Padma Bridge?",
    bnQuestion: "পদ্মা সেতুর মূল কাঠামোর মোট দৈর্ঘ্য কত?",
    options: ["5.15 km", "6.15 km", "7.15 km", "6.50 km"],
    correctIndex: 1,
    explanation: "The main bridge length of the Padma Bridge is exactly 6.15 kilometers (3.82 miles)."
  },
  {
    question: "Padma Bridge is a double-decker bridge. What runs on the lower deck?",
    bnQuestion: "পদ্মা সেতু একটি দ্বিতল সেতু। এর নিচের তলায় কী চলে?",
    options: ["4-lane Highway (মহাসড়ক)", "Pedestrian Walkway (ফুটপাত)", "Single-track Dual-gauge Railway (রেলপথ)", "Gas & Water Pipelines only"],
    correctIndex: 2,
    explanation: "The upper deck is for road transport (4-lane highway) and the lower deck carries a single-track dual-gauge railway."
  },
  {
    question: "Which record does the foundation of the Padma Bridge hold globally?",
    bnQuestion: "পদ্মা সেতুর ফাউন্ডেশন বিশ্বব্যাপী কোন রেকর্ডের অধিকারী?",
    options: [
      "Widest bridge span ever designed", 
      "Deepest pile foundation in the world (122m)", 
      "Tallest concrete piers ever built", 
      "Most expensive private bridge project"
    ],
    correctIndex: 1,
    explanation: "The piles of Padma Bridge are driven up to 122 meters deep into the riverbed, which is the deepest pile foundation for any bridge globally."
  },
  {
    question: "How many piers (columns) and spans make up the main Padma Bridge structure?",
    bnQuestion: "পদ্মা সেতুতে মোট কতটি পিলার ও স্প্যান রয়েছে?",
    options: ["40 Piers and 39 Spans", "42 Piers and 41 Spans", "45 Piers and 44 Spans", "41 Piers and 42 Spans"],
    correctIndex: 1,
    explanation: "The main bridge contains 42 support piers and 41 steel spans (each span being 150 meters long)."
  }
];

export default function PadmaBridge() {
  const { goBack } = useRouter();
  const { setUserData } = useData();
  const [activeTab, setActiveTab] = useState<'Facts' | 'Engineering' | 'Timeline' | 'Quiz'>('Facts');

  // Engineering Schematic interactive state
  const [activeHotspot, setActiveHotspot] = useState<string>('upper-deck');
  const currentHotspot = ENGINEERING_HOTSPOTS.find(h => h.id === activeHotspot) || ENGINEERING_HOTSPOTS[0];

  // Quiz state
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleSelectOption = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOpt(index);
  };

  const handleQuizSubmit = () => {
    if (selectedOpt === null || quizSubmitted) return;
    setQuizSubmitted(true);
    if (selectedOpt === QUIZ[quizIdx].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOpt(null);
    setQuizSubmitted(false);
    if (quizIdx < QUIZ.length - 1) {
      setQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      // Update cadet progress context
      setUserData(prev => ({
        ...prev,
        bestScore: Math.min(100, Math.max(prev.bestScore, Math.round((quizScore / QUIZ.length) * 100))),
        dailyGoalProgress: Math.min(8, prev.dailyGoalProgress + 1)
      }));
    }
  };

  const resetQuiz = () => {
    setQuizIdx(0);
    setSelectedOpt(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 animate-in fade-in duration-300 transition-colors duration-300">
      
      {/* Header */}
      <header className="flex justify-between items-center p-fluid-card bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-[#d8dfe7] dark:border-slate-800/80 shadow-sm transition-colors duration-300">
        <button 
          id="padma-back-btn"
          onClick={goBack} 
          className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase">National Pride GK</span>
          <h1 className="text-fluid-label font-black text-slate-900 dark:text-white uppercase tracking-wider">Padma Bridge Infographic</h1>
        </div>
        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
          <span className="text-sm">🌉</span>
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="bg-white dark:bg-slate-950 flex justify-center gap-1.5 p-fluid-card border-b border-[#d8dfe7] dark:border-slate-800/85 sticky top-[53px] z-10 shadow-sm transition-colors duration-300">
        {(['Facts', 'Engineering', 'Timeline', 'Quiz'] as const).map((tab) => {
          const isSelected = activeTab === tab;
          return (
            <button
              key={tab}
              id={`padma-tab-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-fluid-icon-lbl font-black rounded-full uppercase transition-all tracking-wider cursor-pointer ${
                isSelected 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Outer padding 20-24px dynamic as requested */}
      <div className="p-fluid-outer space-y-fluid-section">
        
        {/* Title Block with Exact Requested Typography Sizes */}
        <div className="text-center space-y-fluid-small">
          <h1 className="text-fluid-title font-black text-slate-900 dark:text-white uppercase leading-[1.15] tracking-tight">
            PADMA BRIDGE
          </h1>
          <p className="text-fluid-subtitle font-medium text-slate-500 dark:text-slate-400 leading-tight">
            Bangladesh's Longest Multipurpose Bridge
          </p>
          <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* TAB 1: KEY FACTS */}
        {activeTab === 'Facts' && (
          <div className="space-y-fluid-section animate-in slide-in-from-bottom-2 duration-300">
            
            {/* Section heading: Key Facts (Size: 18-20 px) */}
            <div className="space-y-fluid-heading">
              <h2 className="text-fluid-heading font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-fluid-small">
                <span>📊</span> KEY FACTS
              </h2>
              <p className="text-fluid-body font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                Padma Bridge is a dream project of Bangladesh, executed completely with national funding. It acts as a massive economic booster and connects the capital directly with 21 southwest districts.
              </p>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 gap-fluid-medium">
              {FACTS.map((fact, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-950 p-fluid-card rounded-[12px] border border-[#d8dfe7] dark:border-slate-800/80 shadow-sm space-y-fluid-small transition duration-300 hover:border-blue-200 dark:hover:border-blue-900/50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base min-[375px]:text-lg">{fact.icon}</span>
                    <span className="text-fluid-icon-lbl font-black text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-1.5 min-[375px]:px-2 py-0.5 rounded-full uppercase">GK Stat</span>
                  </div>
                  <div>
                    {/* Fact Number: 22-24 px */}
                    <p className="text-fluid-stat font-bold text-blue-600 dark:text-blue-400 leading-none">
                      {fact.number}
                    </p>
                    {/* Fact Label: 13-14 px */}
                    <p className="text-fluid-label font-medium text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {fact.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Body Paragraph */}
            <div className="bg-white dark:bg-slate-950 p-fluid-card rounded-[12px] border border-[#d8dfe7] dark:border-slate-800/80 shadow-sm space-y-fluid-heading">
              <h3 className="text-fluid-body font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-[#d8dfe7] dark:border-slate-800 pb-2">
                💡 Historical Significance
              </h3>
              <p className="text-fluid-body font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                Before this mega-structure, travelers had to rely on slow, unpredictable ferries to cross the ferocious Padma River. During monsoons, these crossings were highly perilous and caused massive cargo bottlenecks. The bridge reduces travel times from days to mere minutes.
              </p>
              <div className="bg-blue-50/50 dark:bg-blue-950/10 p-3 rounded-[10px] border border-blue-100/50 dark:border-blue-900/20 text-fluid-icon-lbl font-medium text-blue-800 dark:text-blue-300 leading-snug">
                🇧🇩 <strong>Did you know?</strong> Bangladesh rejected international credit offers and built this bridge entirely on self-financing, cementing it as a symbol of domestic sovereignty.
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENGINEERING MARVEL */}
        {activeTab === 'Engineering' && (
          <div className="space-y-fluid-section animate-in slide-in-from-bottom-2 duration-300">
            
            {/* Section heading: Engineering (Size: 18-20 px) */}
            <div className="space-y-fluid-heading">
              <h2 className="text-fluid-heading font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-fluid-small">
                <span>⚙️</span> ENGINEERING
              </h2>
              <p className="text-fluid-body font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                The Padma River ranks among the most turbulent and fast-flowing rivers in the world, second only to the Amazon in river discharge. Designing a stable structure on shifting sandy silts was a historic triumph.
              </p>
            </div>

            {/* Interactive Bridge schematic view (Width: 390-430 px) */}
            <div className="bg-white dark:bg-slate-950 p-fluid-card rounded-[12px] border border-[#d8dfe7] dark:border-slate-800/80 shadow-sm space-y-fluid-heading">
              <div className="text-center">
                <span className="text-fluid-icon-lbl font-black tracking-widest text-slate-400 dark:text-slate-500 uppercase">Interactive Double-Decker Schematic</span>
                <p className="text-fluid-body font-bold text-slate-500 dark:text-slate-400 mt-0.5">Click a hotspot badge to view specs</p>
              </div>

              {/* Dynamic Map Canvas / Schematic */}
              <div className="h-60 min-[375px]:h-64 bg-slate-50 dark:bg-slate-900 border border-[#d8dfe7] dark:border-slate-800/50 rounded-[10px] relative overflow-hidden flex flex-col justify-between p-fluid-card shadow-inner">
                
                {/* Sky Layer with Cloud & birds */}
                <div className="absolute top-2 right-4 flex gap-1 items-center opacity-40">
                  <span className="text-fluid-icon-lbl">☁️</span>
                  <span className="text-fluid-body">☁️</span>
                </div>

                {/* River water bottom layer */}
                <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-gradient-to-t from-sky-300/40 to-sky-100/10 dark:from-sky-950/50 dark:to-slate-900/10 border-t border-sky-200/50 dark:border-sky-900/30 flex items-end justify-center p-1.5 z-0">
                  <span className="text-fluid-icon-lbl font-bold text-sky-700/60 dark:text-sky-400/40 tracking-widest uppercase">Padma River Flow</span>
                </div>

                {/* Drawn Bridge structure using beautiful absolute positioning */}
                <div className="absolute top-[28%] bottom-[25%] left-[8%] right-[8%] flex flex-col justify-center relative">
                  
                  {/* Upper deck road line */}
                  <div className="h-2 bg-slate-700 dark:bg-slate-800 rounded-full w-full relative flex items-center justify-between z-10">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-fluid-icon-lbl font-medium text-slate-400 bg-white dark:bg-slate-950 px-1 rounded border border-[#d8dfe7] dark:border-slate-900 scale-90">Upper Roadway</span>
                  </div>

                  {/* Steel Truss Warren zig-zag lines */}
                  <div className="h-10 w-full flex items-center justify-between relative px-2 my-1 border-y border-dashed border-slate-300 dark:border-slate-800">
                    {/* Visual zig-zags */}
                    <div className="absolute inset-0 flex justify-around items-center opacity-30 select-none pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <span key={i} className="text-slate-400 font-mono text-fluid-heading">/\</span>
                      ))}
                    </div>
                    <span className="text-fluid-label font-bold text-slate-400 dark:text-slate-500 w-full text-center tracking-widest">WARREN STEEL TRUSS</span>
                  </div>

                  {/* Lower deck rail line */}
                  <div className="h-2.5 bg-yellow-600/30 border-y-2 border-yellow-700/40 w-full relative flex items-center justify-center z-10">
                    <span className="text-fluid-icon-lbl font-medium text-yellow-800 dark:text-yellow-500 scale-90">Lower Railway</span>
                  </div>

                  {/* Steel Piers/Piles descending into riverbed */}
                  <div className="absolute top-full left-[25%] -translate-x-1/2 h-14 min-[375px]:h-16 w-3 bg-slate-400 dark:bg-slate-700 shadow-inner rounded-b flex flex-col justify-end items-center">
                    <div className="h-10 w-1 bg-red-500/50 absolute top-full"></div>
                  </div>
                  <div className="absolute top-full left-[75%] -translate-x-1/2 h-14 min-[375px]:h-16 w-3 bg-slate-400 dark:bg-slate-700 shadow-inner rounded-b flex flex-col justify-end items-center">
                    <div className="h-10 w-1 bg-red-500/50 absolute top-full"></div>
                  </div>
                </div>

                {/* Hotspot buttons absolute mapping - scales smoothly based on width */}
                {ENGINEERING_HOTSPOTS.map((hot) => {
                  const isSelected = activeHotspot === hot.id;
                  return (
                    <button
                      key={hot.id}
                      id={`hotspot-${hot.id}`}
                      onClick={() => setActiveHotspot(hot.id)}
                      className={`absolute p-1 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md ${
                        isSelected 
                          ? 'scale-125 z-25 ring-4 ring-blue-500/20 font-black' 
                          : 'scale-100 hover:scale-110 opacity-75 hover:opacity-100 z-10'
                      } ${hot.position} ${
                        isSelected ? 'bg-blue-600 text-white border-blue-400' : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span className="text-fluid-icon-lbl px-1">{hot.icon}</span>
                      <span className="text-fluid-icon-lbl font-black pr-1 hidden min-[380px]:inline">{hot.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Hotspot Detail Panel */}
              <div className="bg-slate-50 dark:bg-slate-900 p-fluid-card rounded-[10px] border border-[#d8dfe7] dark:border-slate-800/80 space-y-fluid-small transition-colors duration-300">
                <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800 pb-2">
                  <span className="text-fluid-label font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center gap-fluid-small">
                    <span>{currentHotspot.icon}</span> {currentHotspot.name}
                  </span>
                  <span className="text-fluid-icon-lbl font-normal text-slate-400 dark:text-slate-500 uppercase">Hotspot Specification</span>
                </div>
                <p className="text-fluid-body text-slate-700 dark:text-slate-300 font-normal leading-relaxed">{currentHotspot.details}</p>
                <p className="text-fluid-body text-blue-700 dark:text-blue-400 font-bold leading-relaxed">{currentHotspot.bnDetails}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TIMELINE */}
        {activeTab === 'Timeline' && (
          <div className="space-y-fluid-section animate-in slide-in-from-bottom-2 duration-300">
            
            {/* Section heading: Timeline (Size: 18-20 px) */}
            <div className="space-y-fluid-heading">
              <h2 className="text-fluid-heading font-bold text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-fluid-small">
                <span>📅</span> TIMELINE
              </h2>
              <p className="text-fluid-body font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                Take a look back at the milestone years that defined the successful execution of Bangladesh's premier self-funded national project.
              </p>
            </div>

            {/* Vertical timeline layout */}
            <div className="relative pl-6 border-l-2 border-blue-500/30 dark:border-blue-900/30 space-y-fluid-section py-2">
              {TIMELINE.map((evt, idx) => (
                <div key={idx} className="relative space-y-fluid-small">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center"></span>
                  
                  <div className="flex justify-between items-baseline">
                    {/* Year: 16-18 px bold */}
                    <span className="text-fluid-year font-bold text-blue-600 dark:text-blue-400">
                      {evt.year}
                    </span>
                    <span className="text-fluid-icon-lbl font-normal text-slate-400 dark:text-slate-500">Stage {idx + 1}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-fluid-body font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>

                  {/* Description: 13-14 px regular */}
                  <p className="text-fluid-body font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                    {evt.desc}
                  </p>
                  <p className="text-fluid-body font-bold text-blue-700 dark:text-blue-400">
                    {evt.bnDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GK QUIZ */}
        {activeTab === 'Quiz' && (
          <div className="bg-white dark:bg-slate-950 p-fluid-card rounded-[12px] border border-[#d8dfe7] dark:border-slate-800/80 shadow-sm animate-in slide-in-from-bottom-2 duration-300 transition-colors duration-300">
            
            {!quizFinished ? (
              <div className="space-y-fluid-heading">
                <div className="flex justify-between items-center border-b border-[#d8dfe7] dark:border-slate-800 pb-2">
                  <div>
                    <h3 className="text-fluid-body font-bold text-slate-900 dark:text-white">Topic Cadet Quiz</h3>
                    <p className="text-fluid-icon-lbl font-normal text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">Test your Padma Bridge knowledge</p>
                  </div>
                  <span className="text-fluid-icon-lbl font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 px-2.5 py-0.5 rounded-full">
                    Q {quizIdx + 1} of {QUIZ.length}
                  </span>
                </div>

                <div className="space-y-fluid-small">
                  <h4 className="text-fluid-heading font-bold text-slate-900 dark:text-white leading-snug">
                    {QUIZ[quizIdx].question}
                  </h4>
                  <p className="text-fluid-body text-blue-700 dark:text-blue-400 font-bold leading-relaxed">
                    {QUIZ[quizIdx].bnQuestion}
                  </p>
                </div>

                <div className="flex flex-col gap-fluid-small pt-2">
                  {QUIZ[quizIdx].options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isCorrect = QUIZ[quizIdx].correctIndex === i;
                    
                    let btnStyle = 'bg-white dark:bg-slate-900 border-[#d8dfe7] dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:text-slate-700';
                    if (isSelected) {
                      btnStyle = 'bg-blue-600 border-blue-600 text-white dark:text-white';
                    }
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-green-100 dark:bg-green-950/30 border-green-300 dark:border-green-800 text-green-800 dark:text-green-400';
                      } else if (isSelected) {
                        btnStyle = 'bg-red-100 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-800 dark:text-red-400';
                      } else {
                        btnStyle = 'bg-slate-50 dark:bg-slate-950/50 border-[#d8dfe7] dark:border-slate-900 text-slate-400 dark:text-slate-600';
                      }
                    }

                    return (
                      <button
                        key={i}
                        id={`option-${i}`}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(i)}
                        className={`w-full p-fluid-card rounded-[10px] border text-fluid-body font-bold text-left transition flex justify-between items-center cursor-pointer ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-[10px]"></i>}
                        {quizSubmitted && isSelected && !isCorrect && <i className="fa-solid fa-xmark text-red-600 dark:text-red-400 text-[10px]"></i>}
                      </button>
                    );
                  })}
                </div>

                {/* Submission and continuation controls */}
                {!quizSubmitted ? (
                  <button
                    id="submit-ans-btn"
                    onClick={handleQuizSubmit}
                    disabled={selectedOpt === null}
                    className={`w-full py-2.5 rounded-[10px] text-fluid-body font-bold transition ${
                      selectedOpt !== null 
                        ? 'bg-blue-600 text-white shadow-sm cursor-pointer' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="space-y-fluid-heading">
                    <div className="bg-slate-50 dark:bg-slate-900 p-fluid-card rounded-[10px] border border-[#d8dfe7] dark:border-slate-800 text-fluid-body text-slate-650 dark:text-slate-400 font-semibold leading-relaxed">
                      <span className="text-slate-800 dark:text-slate-200 font-extrabold block mb-0.5">💡 Explanation</span>
                      {QUIZ[quizIdx].explanation}
                    </div>
                    <button
                      id="next-quiz-btn"
                      onClick={handleNextQuiz}
                      className="w-full py-2.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-fluid-body font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {quizIdx < QUIZ.length - 1 ? 'Next Question' : 'Finish Quiz'} <i className="fa-solid fa-chevron-right text-[8px]"></i>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-fluid-heading py-4 animate-in zoom-in duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/20 rounded-full flex items-center justify-center text-2xl border border-blue-100 dark:border-blue-900/30">🏆</div>
                <div>
                  <h3 className="text-fluid-body font-bold text-slate-900 dark:text-white">Bridge GK Mastered!</h3>
                  <p className="text-fluid-body text-slate-500 dark:text-slate-400 font-bold mt-0.5">You scored {quizScore} out of {QUIZ.length}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 p-fluid-card rounded-[10px] border border-blue-100 dark:border-blue-900/30 w-full text-fluid-body font-bold text-blue-800 dark:text-blue-400 flex items-center justify-center gap-2">
                  <span>🌟 Cadet GK Score Incremented in Profile!</span>
                </div>

                <div className="flex gap-2.5 w-full">
                  <button 
                    id="retry-quiz-btn"
                    onClick={resetQuiz}
                    className="flex-1 py-2 rounded-[10px] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-fluid-body font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-rotate-left mr-1"></i> Retake
                  </button>
                  <button 
                    id="back-to-facts-btn"
                    onClick={() => setActiveTab('Facts')}
                    className="flex-1 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-fluid-body font-bold transition cursor-pointer"
                  >
                    Back to Facts
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer: 11-12 px requested */}
        <footer className="text-center text-fluid-footer text-slate-400 dark:text-slate-500 border-t border-[#d8dfe7] dark:border-slate-800 pt-4 pb-2">
          Source: Bangladesh Bridge Authority
        </footer>

      </div>
    </div>
  );
}
