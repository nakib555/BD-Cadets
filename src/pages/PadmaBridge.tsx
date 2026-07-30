import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';
import imgSurvey from '../assets/images/Survey-&-Investigation.png';
import imgPileCap from '../assets/images/Pile-Cap-Construction.png';
import imgPier from '../assets/images/Pier-Construction.png';
import imgTruss from '../assets/images/Truss-Launching.png';
import imgDeck from '../assets/images/Deck-Installation.png';
import imgRail from '../assets/images/Rail-Installation.png';
import imgFinishing from '../assets/images/Finishing-Work.png';

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
  { number: '৬.১৫ কিমি', label: 'মূল সেতুর দৈর্ঘ্য', icon: '🌉' },
  { number: '৪২ টি', label: 'সাপোর্ট পিলার', icon: '🏛️' },
  { number: '১২২ মিটার', label: 'গভীরতম পাইল গভীরতা', icon: '⚓' },
  { number: '৪১ টি', label: 'স্টিল ট্রাস স্প্যান', icon: '📐' },
  { number: 'দ্বিতল', label: 'বহুমুখী ডেক', icon: '🚆' },
  { number: '১.২%', label: 'বার্ষিক জিডিপি প্রবৃদ্ধি', icon: '📈' }
];

const ENGINEERING_HOTSPOTS: EngineeringHotspot[] = [
  {
    id: 'upper-deck',
    name: 'উপরের ডেক (মহাসড়ক)',
    details: 'Features a modern 4-lane highway with a width of 18.10 meters. It enables rapid vehicular transport across the turbulent Padma River.',
    bnDetails: 'উপরিভাগে রয়েছে ১৮.১০ মিটার চওড়া ৪-লেনের মহাসড়ক, যা পদ্মা নদীর ওপর দ্রুত যানবাহন পারাপার নিশ্চিত করে।',
    icon: '🚗',
    position: 'top-[22%] left-[40%]'
  },
  {
    id: 'lower-deck',
    name: 'নিচের ডেক (রেলপথ)',
    details: 'Houses a dual-gauge single track railway, bridging the gap between southwestern rail networks and the capital, Dhaka.',
    bnDetails: 'নিম্নভাগে রয়েছে ব্রডগেজ ও মিটারগেজ ট্রেনের জন্য সিঙ্গেল ট্র্যাক রেলপথ, যা দক্ষিণ-পশ্চিমাঞ্চলের রেল নেটওয়ার্ককে ঢাকার সাথে যুক্ত করেছে।',
    icon: '🚆',
    position: 'bottom-[35%] left-[40%]'
  },
  {
    id: 'steel-truss',
    name: 'ইস্পাত ওয়ারেন ট্রাস',
    details: 'The bridge superstructure is constructed using 41 heavy-duty steel truss spans, each measuring 150 meters in length.',
    bnDetails: 'সেতুর মূল অবকাঠামো তৈরিতে ব্যবহার করা হয়েছে ৪১টি শক্তিশালী স্টিল ট্রাস স্প্যান, যার প্রতিটির দৈর্ঘ্য ১৫০ মিটার।',
    icon: '⚙️',
    position: 'top-[42%] left-[24%]'
  },
  {
    id: 'pile-foundation',
    name: 'বিশ্ব রেকর্ড পাইল',
    details: 'Supported by steel pipes driven up to 122 meters deep into the riverbed—the deepest pile foundation of any bridge in the world.',
    bnDetails: 'নদীর তলদেশে ১২২ মিটার গভীর পর্যন্ত ড্রাইভ করা ইস্পাতের পাইল দ্বারা সমর্থিত, যা বিশ্বের যেকোনো সেতুর জন্য গভীরতম পাইল ফাউন্ডেশন।',
    icon: '⚓',
    position: 'bottom-[12%] left-[28%]'
  },
  {
    id: 'mawa-point',
    name: 'মাওয়া সংযোগ পয়েন্ট',
    details: 'Located in Munshiganj district, serving as the eastern gateway connecting the capital city, Dhaka, to the bridge.',
    bnDetails: 'মুन्সীগঞ্জ জেলায় অবস্থিত এই প্রান্তটি রাজধানী ঢাকাকে পদ্মা সেতুর সাথে সংযুক্তকারী পূর্ব গেটওয়ে হিসেবে কাজ করে।',
    icon: '📍',
    position: 'top-[35%] left-[5%]'
  },
  {
    id: 'janjira-point',
    name: 'জাজিরা সংযোগ পয়েন্ট',
    details: 'Located in Shariatpur district, serving as the western gateway connecting 21 southwestern districts of Bangladesh.',
    bnDetails: 'শরীয়তপুর জেলায় অবস্থিত এই প্রান্তটি বাংলাদেশের দক্ষিণ-পশ্চিমাঞ্চলের ২১টি জেলাকে সংযুক্তকারী পশ্চিম গেটওয়ে।',
    icon: '📍',
    position: 'top-[35%] right-[5%]'
  }
];



interface ConstructionStep {
  step: number;
  name: string;
  bnName: string;
  icon: string;
  tx: number;
  ty: number;
  scale: number;
  desc: string;
  bnDesc: string;
  image?: string;
}

const CONSTRUCTION_STEPS: ConstructionStep[] = [
  {
    step: 1,
    name: 'Survey & Investigation',
    bnName: 'জরিপ ও অনুসন্ধান',
    icon: '🚢',
    tx: 34,
    ty: -40,
    scale: 2.6,
    desc: 'Bathymetric survey, extensive soil investigation, and detailed topographic mapping of the riverbed channels.',
    bnDesc: 'নদীর তলদেশের গভীরতা পরিমাপ, ব্যাপক মাটির পরীক্ষা এবং বিস্তারিত টপোগ্রাফিক ম্যাপিং সম্পন্ন করা।',
    image: imgSurvey
  },
  {
    step: 2,
    name: 'Pile Driving',
    bnName: 'পাইল ড্রাইভিং',
    icon: '🏗️',
    tx: 24,
    ty: -40,
    scale: 2.6,
    desc: 'Driving heavy-duty steel pipe piles deep into the sandy riverbed using the world\'s most powerful hydraulic hammers.',
    bnDesc: 'বিশ্বের সবচেয়ে শক্তিশালী হাইড্রোলিক হ্যামার দিয়ে নদীর তলদেশের বালিতে ইস্পাতের পাইপ ডেকোড়ানো।',
    image: imgPileCap
  },
  {
    step: 3,
    name: 'Pile Cap Construction',
    bnName: 'পাইল ক্যাপ নির্মাণ',
    icon: '🧱',
    tx: 14,
    ty: -40,
    scale: 2.6,
    desc: 'Reinforcing and pouring ultra-high-strength concrete pile caps above the piles to anchor the massive concrete piers.',
    bnDesc: 'পাইলগুলোর ওপর অতি-শক্তিশালী কংক্রিটের ক্যাপ ঢালাই করে পিলারের ভিত্তি মজবুত করা।',
    image: imgPileCap
  },
  {
    step: 4,
    name: 'Pier Construction',
    bnName: 'পিলার নির্মাণ',
    icon: '🏛️',
    tx: 4,
    ty: -40,
    scale: 2.6,
    desc: 'Erection of high-density reinforced concrete pier shafts and heavy pier caps to support the steel truss superstructure.',
    bnDesc: 'ইস্পাত ট্রাস সুপারস্ট্রাকচারকে ধরে রাখার জন্য শক্তিশালী কংক্রিটের পিলর ও পিলার ক্যাপ নির্মাণ।',
    image: imgPier
  },
  {
    step: 5,
    name: 'Truss Launching',
    bnName: 'ট্রাস স্থাপন',
    icon: '⚓',
    tx: -6,
    ty: -40,
    scale: 2.6,
    desc: 'Pre-assembled steel Warren truss spans are lifted and launched into position using the world\'s largest floating crane, Tian Yi.',
    bnDesc: 'বিশ্বের বৃহত্তম ভাসমান ক্রেন ‘তিয়ান ই’ দিয়ে একত্রিত ট্রাস স্প্যানগুলো পিলারের ওপর স্থাপন।',
    image: imgTruss
  },
  {
    step: 6,
    name: 'Deck Installation',
    bnName: 'ডেক স্থাপন',
    icon: '🛣️',
    tx: -16,
    ty: -40,
    scale: 2.6,
    desc: 'Installing the orthotropic steel roadway deck on top and pre-cast concrete railway slabs inside the truss structure.',
    bnDesc: 'ট্রাসের ওপর সড়কপথের স্টিল ডেক এবং ট্রাসের ভেতরের অংশে রেলওয়ের কংক্রিট স্ল্যাব স্থাপন।',
    image: imgDeck
  },
  {
    step: 7,
    name: 'Rail Installation',
    bnName: 'রেলপথ স্থাপন',
    icon: '🚆',
    tx: -26,
    ty: -40,
    scale: 2.6,
    desc: 'Laying dual-gauge single track railway lines, signaling systems, and electrification structures inside the lower deck.',
    bnDesc: 'দ্বিতীয় ডেক বা নিচের তলায় ডুয়েল-গেজ সিঙ্গেল ট্র্যাক রেললাইন, সংকেত ব্যবস্থা ও বিদ্যুতায়ন স্থাপন।',
    image: imgRail
  },
  {
    step: 8,
    name: 'Finishing Work',
    bnName: 'চূড়ান্ত সমাপ্তিকরণ',
    icon: '🏁',
    tx: -36,
    ty: -40,
    scale: 2.6,
    desc: 'Applying dual-layer asphalt wearing course, safety expansion joints, modern architectural lighting, and safety signages.',
    bnDesc: 'দ্বি-স্তরবিশিষ্ট বিটুমিনাস পিচ ঢালাই, সম্প্রসারণ জয়েন্ট স্থাপন, আধুনিক আলোকসজ্জা এবং ট্রাফিক চিহ্ন যুক্ত করা।',
    image: imgFinishing
  }
];

const TIMELINE: TimelineEvent[] = [
  {
    year: '২০১৪',
    title: 'নির্মাণ কাজের সূচনা',
    desc: 'The official physical work on the bridge commenced with domestic funding, demonstrating national self-reliance.',
    bnDesc: 'নিজস্ব অর্থায়নে মূল সেতুর নির্মাণ কাজ আনুষ্ঠানিকভাবে শুরু হয়, যা বাংলাদেশের স্বনির্ভরতার এক অনন্য দৃষ্টান্ত।'
  },
  {
    year: '২০১৭',
    title: 'প্রথম স্প্যান স্থাপন',
    desc: 'The very first steel truss span was placed on Piers 37 and 38, marking a monumental engineering milestone.',
    bnDesc: '৩৭ ও ৩৮ নম্বর পিলারের ওপর প্রথম স্টিল ট্রাস স্প্যানটি স্থাপন করা হয়, যা সেতুর প্রথম দৃশ্যমান অংশ।'
  },
  {
    year: '২০২০',
    title: 'সর্বশেষ স্প্যান স্থাপন',
    desc: 'On December 10, the 41st and final span was installed, fully connecting the two banks of the mighty river.',
    bnDesc: '১০ ডিসেম্বর সেতুর ৪১তম এবং শেষ স্প্যানটি বসানোর মাধ্যমে নদীর দুই পারের সংযোগ সম্পূর্ণ হয়।'
  },
  {
    year: '২০২২',
    title: 'মহতি শুভ উদ্বোধন',
    desc: 'Inaugurated on June 25 by Prime Minister Sheikh Hasina, opening a new era of connectivity and prosperity.',
    bnDesc: '২৫ জুন প্রধানমন্ত্রী শেখ হাসিনা আনুষ্ঠানিকভাবে সেতুটির শুভ উদ্বোধন করেন, যা যোগাযোগ খাতে এক ঐতিহাসিক যুগের সূচনা করে।'
  }
];

const QUIZ: BridgeQuizQuestion[] = [
  {
    question: "What is the total length of the main superstructure of the Padma Bridge?",
    bnQuestion: "পদ্মা সেতুর মূল কাঠামোর মোট দৈর্ঘ্য কত?",
    options: ["৫.১৫ কিমি", "৬.১৫ কিমি", "৭.১৫ কিমি", "৬.৫০ কিমি"],
    correctIndex: 1,
    explanation: "পদ্মা সেতুর মূল অংশের দৈর্ঘ্য ঠিক ৬.১৫ কিলোমিটার (৩.৮২ মাইল)।"
  },
  {
    question: "Padma Bridge is a double-decker bridge. What runs on the lower deck?",
    bnQuestion: "পদ্মা সেতু একটি দ্বিতল সেতু। এর নিচের তলায় কী চলে?",
    options: ["৪-লেনের মহাসড়ক", "পথচারী ফুটপাত", "সিঙ্গেল-ট্র্যাক ডুয়েল-গেজ রেলপথ", "শুধুমাত্র গ্যাস ও পানির পাইপলাইন"],
    correctIndex: 2,
    explanation: "সেতুর উপরের তলায় যানবাহন চলাচলের জন্য ৪-লেনের মহাসড়ক এবং নিচের তলায় একটি ডুয়েল-গেজ সিঙ্গেল ট্র্যাক রেলপথ রয়েছে।"
  },
  {
    question: "Which record does the foundation of the Padma Bridge hold globally?",
    bnQuestion: "পদ্মা সেতুর ফাউন্ডেশন বিশ্বব্যাপী কোন রেকর্ডের অধিকারী?",
    options: [
      "আজ পর্যন্ত নির্মিত সবচেয়ে চওড়া স্প্যান", 
      "বিশ্বের দীর্ঘতম/গভীরতম পাইল ফাউন্ডেশন (১২২ মিটার)", 
      "সবচেয়ে উঁচু কংক্রিট পিলার", 
      "সবচেয়ে ব্যয়বহুল বেসরকারি সেতু প্রকল্প"
    ],
    correctIndex: 1,
    explanation: "পদ্মা সেতুর পাইলগুলো নদীর তলদেশে ১২২ মিটার গভীর পর্যন্ত প্রবেশ করানো হয়েছে, যা বিশ্বব্যাপী যেকোনো সেতুর জন্য গভীরতম পাইল ফাউন্ডেশন রেকর্ড।"
  },
  {
    question: "How many piers (columns) and spans make up the main Padma Bridge structure?",
    bnQuestion: "পদ্মা সেতুতে মোট কতটি পিলার ও স্প্যান রয়েছে?",
    options: ["৪০টি পিলার ও ৩৯টি স্প্যান", "৪২টি পিলার ও ৪১টি স্প্যান", "৪৫টি পিলার ও ৪৪টি স্প্যান", "৪১টি পিলার ও ৪২টি স্প্যান"],
    correctIndex: 1,
    explanation: "মূল সেতুতে ৪২টি পিলার এবং ৪১টি ইস্পাতের স্প্যান রয়েছে (প্রতিটি স্প্যানের দৈর্ঘ্য ১৫০ মিটার)।"
  }
];

export default function PadmaBridge() {
  const { goBack } = useRouter();
  const { setUserData } = useData();
  const [activeTab, setActiveTab] = useState<'Facts' | 'Engineering' | 'Timeline' | 'Quiz'>('Facts');

  // Engineering Schematic interactive state
  const [activeHotspot, setActiveHotspot] = useState<string>('upper-deck');
  const currentHotspot = ENGINEERING_HOTSPOTS.find(h => h.id === activeHotspot) || ENGINEERING_HOTSPOTS[0];

  // Engineering Interactive Infographic Mode State
  const [engMode, setEngMode] = useState<'explorer' | 'resilience'>('explorer');
  const [activeStepNum, setActiveStepNum] = useState<number>(1);

  // Resilience Simulator State
  const [seismicValue, setSeismicValue] = useState<number>(0);
  const [windValue, setWindValue] = useState<number>(0);
  const [vesselStatus, setVesselStatus] = useState<'idle' | 'sailing' | 'collided' | 'protected'>('idle');

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
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
        <button 
          id="padma-back-btn"
          onClick={goBack} 
          className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase">জাতীয় গৌরব সা. জ্ঞান</span>
          <h1 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-wider">পদ্মা সেতু ইনফোগ্রাফিক</h1>
        </div>
        <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
          <span className="text-sm">🌉</span>
        </div>
      </header>

      {/* Navigation tabs */}
      <div className="bg-white dark:bg-slate-950 flex justify-center gap-1.5 p-3 border-b border-slate-200 dark:border-slate-800/85 sticky top-[53px] z-10 shadow-sm transition-colors duration-300">
        {(['Facts', 'Engineering', 'Timeline', 'Quiz'] as const).map((tab) => {
          const isSelected = activeTab === tab;
          const labels = {
            Facts: 'তথ্যসমূহ',
            Engineering: 'প্রকৌশল',
            Timeline: 'সময়রেখা',
            Quiz: 'কুইজ'
          };
          return (
            <button
              key={tab}
              id={`padma-tab-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-[9px] font-black rounded-full uppercase transition-all tracking-wider cursor-pointer ${
                isSelected 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* Outer content container */}
      <div className="p-4 space-y-4">
        
        {/* Title Block */}
        <div className="text-center space-y-1">
          <h1 className="text-[20px] font-black text-slate-900 dark:text-white uppercase leading-[1.15] tracking-tight">
            পদ্মা বহুমুখী সেতু
          </h1>
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
            বাংলাদেশের দীর্ঘতম বহুমুখী সেতু (Padma Multipurpose Bridge)
          </p>
          <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mt-2"></div>
        </div>

        {/* TAB 1: KEY FACTS */}
        {activeTab === 'Facts' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            
            {/* Section heading */}
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1">
                <span>📊</span> মূল তথ্যসমূহ
              </h2>
              <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                পদ্মা সেতু বাংলাদেশের একটি স্বপ্নের মেগা-প্রকল্প, যা সম্পূর্ণ নিজস্ব অর্থায়নে বাস্তবায়িত হয়েছে। এটি দেশের দক্ষিণ-পশ্চিমাঞ্চলের ২১টি জেলাকে সরাসরি রাজধানী ঢাকার সাথে যুক্ত করে একটি অভূতপূর্ব অর্থনৈতিক বিপ্লবের সূচনা করেছে।
              </p>
            </div>

            {/* Facts Grid */}
            <div className="grid grid-cols-2 gap-3">
              {FACTS.map((fact, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-950 p-3 rounded-[12px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-1 transition duration-300 hover:border-blue-200 dark:hover:border-blue-900/50"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{fact.icon}</span>
                    <span className="text-[8px] font-black text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded-full uppercase">সা. জ্ঞান</span>
                  </div>
                  <div>
                    <p className="text-[18px] font-black text-blue-600 dark:text-blue-400 leading-none">
                      {fact.number}
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {fact.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Body Paragraph */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-[12px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                <span>💡</span> ঐতিহাসিক গুরুত্ব
              </h3>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                এই মেগা-কাঠামোটি নির্মাণের পূর্বে যাত্রীদের প্রমত্তা পদ্মা নদী পার হতে ধীরগতির ও অনিশ্চিত ফেরির ওপর নির্ভর করতে হতো। বর্ষাকালে নদী পারাপার অত্যন্ত ঝুঁকিপূর্ণ হতো এবং ঘাটে মাইলের পর মাইল পণ্যবাহী ট্রাকের জটলা তৈরি হতো। এই সেতু যাতায়াতের সময়কে কয়েক দিন থেকে মাত্র কয়েক মিনিটে নামিয়ে এনেছে।
              </p>
              <div className="bg-blue-50/50 dark:bg-blue-950/10 p-3 rounded-[10px] border border-blue-100/50 dark:border-blue-900/20 text-[10px] font-extrabold text-blue-800 dark:text-blue-300 leading-snug">
                🇧🇩 <strong>তুমি কি জানতে?</strong> বাংলাদেশ বিভিন্ন আন্তর্জাতিক ঋণের প্রস্তাব ফিরিয়ে দিয়ে সম্পূর্ণ নিজস্ব অর্থায়নে এই সেতুটি নির্মাণ করেছে, যা দেশের আত্মমর্যাদা ও প্রকৌশল সক্ষমতার চূড়ান্ত প্রতীক।
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ENGINEERING MARVEL */}
        {activeTab === 'Engineering' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            
            {/* Style injection for wind simulation wave animation */}
            <style>{`
              @keyframes wave {
                0% { transform: translateX(0); }
                100% { transform: translateX(500px); }
              }
            `}</style>

            {/* Section heading */}
            <div className="space-y-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="space-y-0.5">
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1">
                  <span>⚙️</span> প্রকৌশল বিস্ময়
                </h2>
                <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                  পদ্মা নদী পানির প্রবাহের দিক থেকে বিশ্বে দ্বিতীয় অবস্থানে রয়েছে। এর তীব্র স্রোতের ওপর দ্বি-স্তরের সেতু নির্মাণ করা ছিল সিভিল ইঞ্জিনিয়ারিংয়ের ইতিহাসে এক ঐতিহাসিক মাইলফলক।
                </p>
              </div>

              {/* Mode Toggle Selector */}
              <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-full border border-slate-200 dark:border-slate-800 w-full sm:w-auto shrink-0">
                <button
                  id="eng-mode-explorer-btn"
                  onClick={() => setEngMode('explorer')}
                  className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
                    engMode === 'explorer'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  🔍 ব্লুপ্রিন্টস
                </button>
                <button
                  id="eng-mode-resilience-btn"
                  onClick={() => setEngMode('resilience')}
                  className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition cursor-pointer ${
                    engMode === 'resilience'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  ⚡ স্ট্রেস ল্যাব
                </button>
              </div>
            </div>

            {/* MODE 1: INTERACTIVE BLUEPRINT EXPLORER */}
            {engMode === 'explorer' && (
              <div className="space-y-4">
                {/* Visual Explorer canvas with panning image */}
                <div className="bg-white dark:bg-slate-950 p-4 rounded-[12px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
                  
                  {/* Explorer Header */}
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      🏗️ নির্মাণ যাত্রা (৮টি ধাপ)
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">৮ ধাপের ইনফোগ্রাফিক</span>
                  </div>

                  {/* Panoramic Visual Canvas Wrapper */}
                  <div className="relative aspect-[3/2] w-full bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-[10px] overflow-hidden group shadow-md">
                    
                    {/* The Interactive Panning Image */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={`step-${activeStepNum}`}
                          src={CONSTRUCTION_STEPS.find(s => s.step === activeStepNum)?.image}
                          alt={`Step ${activeStepNum}`}
                          className="w-full h-full object-cover select-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </AnimatePresence>
                    </div>

                    {/* Step indicator overlay */}
                    <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded border border-slate-700/50 text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1.5 z-10 select-none">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>ধাপ: {activeStepNum} / ৮</span>
                    </div>

                    {/* Dynamic overlay visual locator frame */}
                    <div className="absolute inset-0 border-[6px] border-blue-500/10 pointer-events-none z-10 flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-dashed border-blue-500/30 rounded animate-ping absolute"></div>
                      <div className="w-20 h-20 border-2 border-blue-400/25 rounded relative"></div>
                    </div>
                  </div>

                  {/* Interactive Buttons / Navigation */}
                  <div className="space-y-4">
                    {/* Step Indicator Bubbles */}
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/80 max-w-lg mx-auto">
                      <button
                        id="step-prev-btn"
                        disabled={activeStepNum === 1}
                        onClick={() => setActiveStepNum(prev => Math.max(1, prev - 1))}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                          activeStepNum === 1
                            ? 'text-slate-300 dark:text-slate-700 border-transparent cursor-not-allowed'
                            : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-850 hover:bg-slate-100 cursor-pointer'
                        }`}
                      >
                        <i className="fa-solid fa-chevron-left text-xs"></i>
                      </button>
                      
                      <div className="flex items-center gap-1.5">
                        {CONSTRUCTION_STEPS.map((s) => (
                          <button
                            key={s.step}
                            id={`step-indicator-${s.step}`}
                            onClick={() => setActiveStepNum(s.step)}
                            className={`w-7 h-7 rounded-full text-[11px] font-black flex items-center justify-center transition-all cursor-pointer ${
                              activeStepNum === s.step
                                ? 'bg-blue-600 text-white shadow animate-pulse'
                                : 'bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-850 hover:bg-slate-100'
                            }`}
                          >
                            {s.step}
                          </button>
                        ))}
                      </div>

                      <button
                        id="step-next-btn"
                        disabled={activeStepNum === 8}
                        onClick={() => setActiveStepNum(prev => Math.min(8, prev + 1))}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition border ${
                          activeStepNum === 8
                            ? 'text-slate-300 dark:text-slate-700 border-transparent cursor-not-allowed'
                            : 'bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-850 hover:bg-slate-100 cursor-pointer'
                        }`}
                      >
                        <i className="fa-solid fa-chevron-right text-xs"></i>
                      </button>
                    </div>

                    {/* Selected Step Detail Panel */}
                    {(() => {
                      const activeStep = CONSTRUCTION_STEPS.find(s => s.step === activeStepNum) || CONSTRUCTION_STEPS[0];
                      return (
                        <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-[10px] border border-slate-200/60 dark:border-slate-800/80 space-y-2 transition-all duration-300">
                          <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800 pb-2">
                            <h4 className="text-sm font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                              <span>{activeStep.icon}</span> ধাপ {activeStep.step}: {activeStep.bnName}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">নির্মাণ ধাপ</span>
                          </div>
                          <p className="text-[11px] text-emerald-950 dark:text-emerald-350 font-extrabold leading-relaxed">
                            {activeStep.bnDesc}
                          </p>
                        </div>
                      );
                    })()}
                  </div>

                </div>
              </div>
            )}

            {/* MODE 2: STRESS LAB / RESILIENCE SIMULATOR */}
            {engMode === 'resilience' && (
              <div className="space-y-4 animate-in zoom-in-95 duration-200">
                <div className="bg-white dark:bg-slate-950 p-4 rounded-[12px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4">
                  <div className="text-center">
                    <span className="text-[10px] font-black tracking-widest text-blue-500 dark:text-blue-400 uppercase">স্ট্রেস ল্যাব</span>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase mt-0.5">কাঠামোগত স্থায়িত্ব সিমুলেটর</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug max-w-md mx-auto mt-1">
                      ভূমিকম্প এবং প্রচণ্ড বাতাসের তীব্রতা নিয়ন্ত্রণ করে দেখুন দ্বিতল ইস্পাত সেতুর সুরক্ষা ব্যবস্থা কীভাবে মানিয়ে নেয়!
                    </p>
                  </div>

                  {/* Bridge visual schematic block that shakes/sways dynamically */}
                  <div className="h-44 bg-slate-900 border border-slate-800/60 rounded-[10px] relative overflow-hidden flex flex-col justify-center items-center px-4 shadow-inner">
                    
                    {/* Sky / Lightning Background Effect if stress is critical */}
                    {(seismicValue >= 8 || windValue >= 180) && (
                      <div className="absolute inset-0 bg-red-950/25 animate-pulse flex items-center justify-center z-0">
                        <span className="text-red-500 text-fluid-heading opacity-10 animate-ping">⚠️ সীমা অতিক্রম করেছে ⚠️</span>
                      </div>
                    )}

                    {/* Wind particles streaming across the screen based on wind value */}
                    {windValue > 0 && (
                      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        {[...Array(6)].map((_, idx) => (
                          <div
                            key={idx}
                            style={{
                              position: 'absolute',
                              top: `${15 + idx * 14}%`,
                              left: '-100px',
                              width: `${30 + (windValue / 5)}px`,
                              height: '1.5px',
                              background: 'rgba(255, 255, 255, 0.25)',
                              boxShadow: '0 0 4px rgba(255, 255, 255, 0.2)',
                              animation: `wave ${2.0 - (windValue / 150)}s linear ${idx * 0.3}s infinite`
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Animated, reactive bridge truss representation */}
                    <motion.div
                      className="w-full max-w-sm flex flex-col items-center relative z-10"
                      animate={{
                        x: seismicValue > 0 ? [-seismicValue * 1.5, seismicValue * 1.5, -seismicValue * 1.5, 0] : 0,
                        y: windValue > 0 ? [-windValue * 0.05, windValue * 0.05, -windValue * 0.05, 0] : 0,
                        rotate: windValue > 0 ? [-windValue * 0.015, windValue * 0.015, -windValue * 0.015, 0] : 0
                      }}
                      transition={{
                        x: { repeat: Infinity, duration: 0.1, ease: 'linear' },
                        y: { repeat: Infinity, duration: 0.15, ease: 'linear' },
                        rotate: { repeat: Infinity, duration: 0.25, ease: 'linear' }
                      }}
                    >
                      {/* Upper deck cars (glowing dots moving across) */}
                      <div className="w-full h-1 bg-slate-700 rounded-full flex justify-between items-center relative px-4">
                        <span className={`w-1.5 h-1.5 rounded bg-amber-400 absolute left-4 animate-bounce ${windValue >= 180 ? 'hidden' : ''}`}></span>
                        <span className={`w-1.5 h-1.5 rounded bg-sky-400 absolute right-12 animate-bounce ${windValue >= 180 ? 'hidden' : ''}`}></span>
                      </div>

                      {/* Warren Truss steel diagonal lattice lines */}
                      <div className="w-[85%] h-8 border-y-2 border-slate-500 relative flex items-center justify-around overflow-hidden my-1 bg-slate-900/40 backdrop-blur-sm">
                        {[...Array(7)].map((_, i) => (
                          <span key={i} className="text-slate-400/50 font-mono text-[14px]">/\</span>
                        ))}
                        {/* Status text overlay */}
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black tracking-widest text-white/40">
                          {seismicValue > 0 ? 'ভূমিকম্প সুরক্ষা সক্রিয়' : windValue > 120 ? 'বায়ুগতিশীল সুরক্ষা সক্রিয়' : 'দ্বিতল ওয়ারেন ট্রাস (DOUBLE DECK)'}
                        </div>
                      </div>

                      {/* Lower deck rail track */}
                      <div className="w-full h-1.5 bg-yellow-600/40 border-y border-yellow-700/50 rounded-sm relative flex items-center px-8">
                        <span className={`w-3.5 h-1 bg-emerald-500 rounded-sm absolute left-1/3 ${windValue >= 180 ? 'hidden' : 'animate-pulse'}`}></span>
                      </div>

                      {/* Bridge support piers */}
                      <div className="w-full flex justify-around items-start h-12 pt-0.5 relative">
                        {/* Pier 1 */}
                        <div className="w-4 h-full bg-slate-600 rounded-b shadow relative">
                          <div className={`h-1.5 w-5 bg-amber-500 rounded-sm absolute -top-1 left-1/2 -translate-x-1/2 transition-transform duration-100 ${seismicValue > 0 ? 'scale-x-125 bg-emerald-500' : ''}`}></div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-8 bg-slate-500/30 rounded-b"></div>
                        </div>
                        {/* Pier 2 */}
                        <div className="w-4 h-full bg-slate-600 rounded-b shadow relative">
                          <div className={`h-1.5 w-5 bg-amber-500 rounded-sm absolute -top-1 left-1/2 -translate-x-1/2 transition-transform duration-100 ${seismicValue > 0 ? 'scale-x-125 bg-emerald-500' : ''}`}></div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-8 bg-slate-500/30 rounded-b"></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Ship Collision Element */}
                    <AnimatePresence>
                      {vesselStatus === 'sailing' && (
                        <motion.div
                          className="absolute bottom-1.5 left-2 z-20 text-lg select-none"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 120, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.8, ease: 'linear' }}
                        >
                          🚢
                        </motion.div>
                      )}
                      {vesselStatus === 'collided' && (
                        <motion.div
                          className="absolute bottom-1.5 left-[120px] z-20 text-lg select-none"
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 0.3 }}
                        >
                          💥
                        </motion.div>
                      )}
                      {vesselStatus === 'protected' && (
                        <motion.div
                          className="absolute bottom-0.5 left-[105px] right-[105px] h-8 bg-blue-500/20 border-2 border-blue-400/40 rounded-full flex items-center justify-center text-[8px] font-black text-blue-300 z-10 animate-pulse"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          🛡️ ফেন্ডার সক্রিয় (FENDER ACTIVE)
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Water floor indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-sky-950/80 to-sky-900/50 border-t border-sky-800/40 z-0"></div>
                  </div>

                  {/* Dual controls columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    
                    {/* Control 1: Richter scale earthquake */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/85 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                          📳 ভূমিকম্পের তীব্রতা
                        </span>
                        <span className={`text-xs font-black px-2 py-0.5 rounded ${
                          seismicValue === 0 ? 'bg-slate-200 text-slate-600 dark:bg-slate-850 dark:text-slate-400' :
                          seismicValue <= 4 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          seismicValue <= 8 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse'
                        }`}>
                          {seismicValue.toFixed(1)} রিক্টার
                        </span>
                      </div>
                      <input
                        type="range"
                        id="seismic-range"
                        min="0"
                        max="9"
                        step="0.5"
                        value={seismicValue}
                        onChange={(e) => setSeismicValue(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug font-bold">
                        {seismicValue === 0 ? 'কোনো ভূমিকম্প সনাক্ত করা হয়নি। সিস্টেমটি পর্যবেক্ষণ মোডে আছে।' :
                         seismicValue <= 4 ? 'সামান্য কম্পন। পিলারের স্বয়ংক্রিয় নমনীয়তার দ্বারা স্থিতিশীল রয়েছে।' :
                         seismicValue <= 8 ? 'ডিজাইন লিমিট (৮.০): মাল্টি-ডিরেকショナル ফ্রিকশন পেন্ডুলাম বিয়ারিং মসৃণভাবে গ্লাইড করছে এবং ট্রাস স্প্যানকে রক্ষা করছে।' :
                         'ঝুঁকিপূর্ণ! ডিজাইনের সীমার বাইরে। স্বয়ংক্রিয় জরুরি ট্রানজিট লকডাউন শুরু হয়েছে।'}
                      </p>
                    </div>

                    {/* Control 2: Wind load speed */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/85 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                          🌬️ টাইফুন বাতাসের গতি
                        </span>
                        <span className={`text-xs font-black px-2 py-0.5 rounded ${
                          windValue === 0 ? 'bg-slate-200 text-slate-600 dark:bg-slate-850 dark:text-slate-400' :
                          windValue <= 100 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          windValue <= 180 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 animate-pulse'
                        }`}>
                          {windValue} কিমি/ঘণ্টা
                        </span>
                      </div>
                      <input
                        type="range"
                        id="wind-range"
                        min="0"
                        max="250"
                        step="10"
                        value={windValue}
                        onChange={(e) => setWindValue(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug font-bold">
                        {windValue === 0 ? 'শান্ত বাতাস। স্বাভাবিক গতিতে গাড়ি চলছে।' :
                         windValue <= 100 ? 'মাঝারি বাতাস। স্টিল ওয়ারেন ট্রাসের বিশেষ অ্যারোডাইনামিক ডিজাইন বাতাসকে সহজে প্রবাহিত করে দিচ্ছে।' :
                         windValue <= 180 ? 'তীব্র সাইক্লোন। সেফটি এক্সপানশন জয়েন্ট ট্রাস স্প্যানকে নিরাপদে সামান্য বেঁকে যাওয়ার জায়গা দেয়।' :
                         'যাতায়াত বন্ধ। প্রচণ্ড বাতাসে ভয়াবহ কম্পন এড়াতে সেতুর বিশেষ জ্যামিতিক নকশা কার্যকর।'}
                      </p>
                    </div>

                  </div>

                  {/* Active Protection / Vessel Fender Simulation */}
                  <div className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="space-y-0.5 text-center sm:text-left">
                      <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase">জাহাজ সংঘর্ষ সুরক্ষা (Vessel Protection)</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed font-bold">
                        পিলারের নিচের পাইল ক্যাপগুলোতে কংক্রিট ও স্টিলের তৈরি শক-অ্যাবজর্বার ফেন্ডার রয়েছে যা ৫০,০০০ টন ওজনের কার্গো জাহাজের ধাক্কা থেকে স্তম্ভগুলোকে রক্ষা করে।
                      </p>
                    </div>

                    <button
                      id="trigger-collision-btn"
                      disabled={vesselStatus === 'sailing' || vesselStatus === 'collided'}
                      onClick={() => {
                        setVesselStatus('sailing');
                        setTimeout(() => {
                          setVesselStatus('collided');
                          setTimeout(() => {
                            setVesselStatus('protected');
                            setTimeout(() => {
                              setVesselStatus('idle');
                            }, 3500);
                          }, 1000);
                        }, 1800);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer select-none ${
                        vesselStatus === 'sailing' || vesselStatus === 'collided'
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md active:scale-95'
                      }`}
                    >
                      {vesselStatus === 'idle' ? '🚢 কার্গো জাহাজ ছাড়ুন' :
                       vesselStatus === 'sailing' ? '🚢 জাহাজ এগিয়ে আসছে...' :
                       vesselStatus === 'collided' ? '💥 ধাক্কা প্রতিহত হয়েছে!' :
                       '🛡️ ফেন্ডার শক্তি শোষণ করছে...'}
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: TIMELINE */}
        {activeTab === 'Timeline' && (
          <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
            
            {/* Section heading */}
            <div className="space-y-1">
              <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-1">
                <span>📅</span> সময়রেখা
              </h2>
              <p className="text-[11px] text-slate-650 dark:text-slate-300 leading-relaxed font-semibold">
                পদ্মা সেতুর নির্মাণ কাজ শুরুর দিন থেকে এর সফল উদ্বোধন পর্যন্ত মাইলফলক অর্জনগুলোর সময়রেখা নিচে দেওয়া হলো।
              </p>
            </div>

            {/* Vertical timeline layout */}
            <div className="relative pl-6 border-l-2 border-blue-500/30 dark:border-blue-900/30 space-y-4 py-2">
              {TIMELINE.map((evt, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center"></span>
                  
                  <div className="flex justify-between items-baseline">
                    <span className="text-[15px] font-black text-blue-600 dark:text-blue-400">
                      {evt.year}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500">ধাপ {idx + 1}</span>
                  </div>

                  <h3 className="text-xs font-black text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>

                  <p className="text-[11px] font-extrabold text-blue-950 dark:text-blue-300 leading-relaxed">
                    {evt.bnDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: GK QUIZ */}
        {activeTab === 'Quiz' && (
          <div className="bg-white dark:bg-slate-950 p-4 rounded-[12px] border border-slate-200 dark:border-slate-800/80 shadow-sm animate-in slide-in-from-bottom-2 duration-300 transition-colors duration-300">
            
            {!quizFinished ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white">পদ্মা সেতু কুইজ</h3>
                    <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">পদ্মা সেতু সম্পর্কিত সাধারণ জ্ঞান পরীক্ষা করো</p>
                  </div>
                  <span className="text-[9px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 px-2 py-0.5 rounded-full">
                    প্রশ্ন {quizIdx + 1} / {QUIZ.length}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-snug">
                    {QUIZ[quizIdx].bnQuestion}
                  </h4>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {QUIZ[quizIdx].options.map((opt, i) => {
                    const isSelected = selectedOpt === i;
                    const isCorrect = QUIZ[quizIdx].correctIndex === i;
                    
                    let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700';
                    if (isSelected) {
                      btnStyle = 'bg-blue-600 border-blue-600 text-white dark:text-white';
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
                        id={`option-${i}`}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectOption(i)}
                        className={`w-full p-2.5 rounded-[10px] border text-[10px] font-bold text-left transition flex justify-between items-center cursor-pointer ${btnStyle}`}
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
                    className={`w-full py-2.5 rounded-[10px] text-[10px] font-bold transition ${
                      selectedOpt !== null 
                        ? 'bg-blue-600 text-white shadow-sm cursor-pointer' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    উত্তর জমা দিন
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-[10px] border border-slate-200 dark:border-slate-800 text-[10px] text-slate-650 dark:text-slate-400 font-bold leading-relaxed">
                      <span className="text-slate-800 dark:text-slate-200 font-extrabold block mb-0.5">💡 ব্যাখ্যা</span>
                      {QUIZ[quizIdx].explanation}
                    </div>
                    <button
                      id="next-quiz-btn"
                      onClick={handleNextQuiz}
                      className="w-full py-2.5 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {quizIdx < QUIZ.length - 1 ? 'পরবর্তী প্রশ্ন' : 'কুইজ শেষ করুন'} <i className="fa-solid fa-chevron-right text-[8px]"></i>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center space-y-4 py-4 animate-in zoom-in duration-300">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/20 rounded-full flex items-center justify-center text-2xl border border-blue-100 dark:border-blue-900/30">🏆</div>
                <div>
                  <h3 className="text-[16px] font-black text-slate-900 dark:text-white">পদ্মা সেতু কুইজ সম্পন্ন!</h3>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">তুমি {QUIZ.length} টির মধ্যে {quizScore} টি সঠিক উত্তর দিয়েছ</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-[10px] border border-blue-100 dark:border-blue-900/30 w-full text-[10px] font-bold text-blue-800 dark:text-blue-400 flex items-center justify-center gap-2">
                  <span>🌟 প্রোফাইলে ক্যাডেট সাধারণ জ্ঞান স্কোর বৃদ্ধি পেয়েছে!</span>
                </div>

                <div className="flex gap-2.5 w-full">
                  <button 
                    id="retry-quiz-btn"
                    onClick={resetQuiz}
                    className="flex-1 py-2 rounded-[10px] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-[10px] font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-rotate-left mr-1"></i> আবার চেষ্টা করুন
                  </button>
                  <button 
                    id="back-to-facts-btn"
                    onClick={() => setActiveTab('Facts')}
                    className="flex-1 py-2 rounded-[10px] bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition cursor-pointer"
                  >
                    <i className="fa-solid fa-house mr-1"></i> তথ্যে ফিরে যান
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-[10px] text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800 pt-4 pb-2">
          উৎস: বাংলাদেশ সেতু কর্তৃপক্ষ (Bangladesh Bridge Authority)
        </footer>

      </div>
    </div>
  );
}
