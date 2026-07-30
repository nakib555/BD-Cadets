import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

interface CadetCollege {
  name: string;
  location: string;
  type: 'Boys' | 'Girls';
  est: number;
}

interface DivisionData {
  id: string;
  name: string;
  bnName: string;
  color: string;
  mapClip: string;
  bgPos: string;
  districts: number;
  area: string;
  majorRivers: string[];
  colleges: CadetCollege[];
  gkQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const DIVISIONS: DivisionData[] = [
  {
    id: 'dhaka',
    name: 'Dhaka Division',
    bnName: 'ঢাকা বিভাগ',
    color: 'bg-red-500',
    mapClip: 'polygon(30% 25%, 55% 20%, 65% 45%, 55% 75%, 35% 75%, 25% 50%)',
    bgPos: 'top-[35%] left-[38%]',
    districts: 13,
    area: '২০,৫০৮ বর্গ কিমি',
    majorRivers: ['পদ্মা', 'মেঘনা', 'যমুনা', 'বুড়িগঙ্গা'],
    colleges: [
      { name: 'মির্জাপুর ক্যাডেট কলেজ', location: 'টাঙ্গাইল', type: 'Boys', est: 1965 },
      { name: 'ময়মনসিংহ গার্লস ক্যাডেট কলেজ', location: 'ময়মনসিংহ', type: 'Girls', est: 1984 }
    ],
    gkQuiz: {
      question: "কোন নদীটি ঢাকা শহরের পাশ দিয়ে প্রবাহিত হয়েছে?",
      options: ["পদ্মা", "মেঘনা", "বুড়িগঙ্গা", "যমুনা"],
      correctIndex: 2,
      explanation: "বুড়িগঙ্গা নদী বাংলাদেশের রাজধানী ঢাকা শহরের দক্ষিণ পাশ দিয়ে প্রবাহিত হয়েছে।"
    }
  },
  {
    id: 'chattogram',
    name: 'Chattogram Division',
    bnName: 'চট্টগ্রাম বিভাগ',
    color: 'bg-emerald-500',
    mapClip: 'polygon(60% 45%, 95% 40%, 100% 90%, 80% 100%, 60% 80%, 55% 60%)',
    bgPos: 'top-[60%] left-[65%]',
    districts: 11,
    area: '৩৩,৯০৮ বর্গ কিমি',
    majorRivers: ['কর্ণফুলী', 'হালদা', 'সাঙ্গু', 'ফেনী'],
    colleges: [
      { name: 'ফৌজদারহাট ক্যাডেট কলেজ', location: 'চট্টগ্রাম', type: 'Boys', est: 1958 },
      { name: 'কুমিল্লা ক্যাডেট কলেজ', location: 'কুমিল্লা', type: 'Boys', est: 1983 },
      { name: 'ফেনী গার্লস ক্যাডেট কলেজ', location: 'ফেনী', type: 'Girls', est: 2006 }
    ],
    gkQuiz: {
      question: "বাংলাদেশে প্রতিষ্ঠিত সর্বপ্রথম ক্যাডেট কলেজ কোনটি ছিল?",
      options: ["ঝিনাইদহ ক্যাডেট কলেজ", "ফৌজদারহাট ক্যাডেট কলেজ", "মির্জাপুর ক্যাডেট কলেজ", "রাজশাহী ক্যাডেট কলেজ"],
      correctIndex: 1,
      explanation: "ফৌজদারহাট ক্যাডেট কলেজ ১৯৫৮ সালে চট্টগ্রামে প্রতিষ্ঠিত হয়, যা দেশের সর্বপ্রথম ক্যাডেট কলেজ।"
    }
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi Division',
    bnName: 'রাজশাহী বিভাগ',
    color: 'bg-orange-500',
    mapClip: 'polygon(5% 25%, 35% 25%, 40% 50%, 25% 60%, 10% 50%)',
    bgPos: 'top-[30%] left-[15%]',
    districts: 8,
    area: '১৮,১৭৪ বর্গ কিমি',
    majorRivers: ['পদ্মা', 'যমুনা', 'আত্রাই', 'মহানন্দা'],
    colleges: [
      { name: 'রাজশাহী ক্যাডেট কলেজ', location: 'সারদাহ', type: 'Boys', est: 1966 },
      { name: 'জয়পুরহাট গার্লস ক্যাডেট কলেজ', location: 'জয়পুরহাট', type: 'Girls', est: 2006 }
    ],
    gkQuiz: {
      question: "বরেন্দ্র গবেষণা জাদুঘর কোথায় অবস্থিত?",
      options: ["ঢাকা", "সিলেট", "রাজশাহী", "বগুড়া"],
      correctIndex: 2,
      explanation: "বরেন্দ্র গবেষণা জাদুঘরটি রাজশাহী শহরের প্রাণকেন্দ্রে অবস্থিত এবং এটি বাংলাদেশের প্রাচীনতম জাদুঘর।"
    }
  },
  {
    id: 'khulna',
    name: 'Khulna Division',
    bnName: 'খুলনা বিভাগ',
    color: 'bg-blue-500',
    mapClip: 'polygon(15% 60%, 35% 55%, 40% 75%, 30% 95%, 15% 85%)',
    bgPos: 'top-[65%] left-[22%]',
    districts: 10,
    area: '২২,২৮৪ বর্গ কিমি',
    majorRivers: ['রূপসা', 'ভৈরব', 'কপোতাক্ষ', 'পশুর'],
    colleges: [
      { name: 'ঝিনাইদহ ক্যাডেট কলেজ', location: 'ঝিনাইদহ', type: 'Boys', est: 1963 }
    ],
    gkQuiz: {
      question: "ইউনেস্কো ওয়ার্ল্ড হেরিটেজ ঘোষিত কোন বনটি খুলনা বিভাগে অবস্থিত?",
      options: ["সাজেক ভ্যালি", "সুন্দরবন", "রাতারগুল সোয়াম্প ফরেস্ট", "বিছনাকান্দি"],
      correctIndex: 1,
      explanation: "সুন্দরবন হলো বিশ্বের বৃহত্তম ম্যানগ্রোভ বন এবং ইউনেস্কো হেরিটেজ সাইট, যা খুলনা বিভাগে অবস্থিত।"
    }
  },
  {
    id: 'barishal',
    name: 'Barishal Division',
    bnName: 'বরিশাল বিভাগ',
    color: 'bg-purple-500',
    mapClip: 'polygon(35% 75%, 55% 75%, 55% 95%, 35% 95%)',
    bgPos: 'top-[78%] left-[42%]',
    districts: 6,
    area: '১৩,২২৫ বর্গ কিমি',
    majorRivers: ['কীর্তনখোলা', 'মেঘনা', 'পায়রা', 'তেঁতুলিয়া'],
    colleges: [
      { name: 'বরিশাল ক্যাডেট কলেজ', location: 'বাবুগঞ্জ', type: 'Boys', est: 1981 }
    ],
    gkQuiz: {
      question: "ঐতিহাসিকভাবে কোন শহরটিকে 'বাংলার শস্যভাণ্ডার' বলা হয়?",
      options: ["সিলেট", "চট্টগ্রাম", "বরিশাল", "রংপুর"],
      correctIndex: 2,
      explanation: "অত্যধিক ধান উৎপাদনের কারণে বরিশালকে ঐতিহাসিকভাবে 'বাংলার শস্যভাণ্ডার' বলা হয়ে থাকে।"
    }
  },
  {
    id: 'sylhet',
    name: 'Sylhet Division',
    bnName: 'সিলেট বিভাগ',
    color: 'bg-pink-500',
    mapClip: 'polygon(60% 15%, 85% 15%, 85% 40%, 60% 40%)',
    bgPos: 'top-[25%] left-[68%]',
    districts: 4,
    area: '১২,২৯৮ বর্গ কিমি',
    majorRivers: ['সুরমা', 'কুশিয়ারা', 'মনু', 'খোয়াই'],
    colleges: [
      { name: 'সিলেট ক্যাডেট কলেজ', location: 'সিলেট', type: 'Boys', est: 1978 }
    ],
    gkQuiz: {
      question: "সিলেটের বৃহত্তম প্রাকৃতিক মিষ্টি পানির জলাবন কোনটি?",
      options: ["সুন্দরবন", "রাতারগুল", "ভাওয়াল", "মধুপুর"],
      correctIndex: 1,
      explanation: "রাতারগুল সোয়াম্প ফরেস্ট হলো বাংলাদেশের একমাত্র সুপেয় পানির জলাবন, যা সিলেটে অবস্থিত।"
    }
  },
  {
    id: 'rangpur',
    name: 'Rangpur Division',
    bnName: 'রংপুর বিভাগ',
    color: 'bg-teal-500',
    mapClip: 'polygon(15% 0, 45% 0, 35% 25%, 15% 25%)',
    bgPos: 'top-[12%] left-[25%]',
    districts: 8,
    area: '১৬,১৮৪ বর্গ কিমি',
    majorRivers: ['তিস্তা', 'ধরলা', 'যমুনা', 'করতোয়া'],
    colleges: [
      { name: 'রংপুর ক্যাডেট কলেজ', location: 'রংপুর', type: 'Boys', est: 1979 }
    ],
    gkQuiz: {
      question: "রংপুর শহরে কোন ঐতিহাসিক রাজপ্রাসাদটি অবস্থিত?",
      options: ["আহসান মঞ্জিল", "তাজহাট রাজবাড়ী", "উত্তরা গণভবন", "লালবাগ কেল্লা"],
      correctIndex: 1,
      explanation: "তাজহাট রাজবাড়ী রংপুর শহরের তাজহাটে অবস্থিত একটি ঐতিহাসিক রাজপ্রাসাদ, যা মহারাজা কুমার গোপাল লাল রায় নির্মাণ করেছিলেন।"
    }
  }
];

export default function InteractiveMap() {
  const { goBack } = useRouter();
  const { userData, setUserData } = useData();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'divisions' | 'districts' | 'landmarks'>('divisions');
  const [selectedDiv, setSelectedDiv] = useState<DivisionData>(DIVISIONS[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [earnedPoints, setEarnedPoints] = useState<boolean>(false);

  const handleSelectDivision = (division: DivisionData) => {
    setSelectedDiv(division);
    setQuizAnswer(null);
    setQuizSubmitted(false);
    setEarnedPoints(false);
  };

  const handleQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setQuizAnswer(index);
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === null || quizSubmitted) return;
    setQuizSubmitted(true);
    if (quizAnswer === selectedDiv.gkQuiz.correctIndex) {
      setEarnedPoints(true);
      // Give points to the user for answering correctly
      setUserData(prev => ({
        ...prev,
        bestScore: Math.min(100, prev.bestScore + 1) // increment user virtual stats
      }));
    }
  };

  return (
    <div className="bg-slate-50/50 dark:bg-slate-900 animate-in fade-in duration-300 min-h-full pb-6 transition-colors duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{lang === 'bn' ? 'ইন্টারেক্টিভ বাংলাদেশ মানচিত্র' : 'Interactive BD Map'}</h1>
          <div className="w-8"></div>
      </header>

      <div className="bg-white dark:bg-slate-950 flex justify-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800/80 sticky top-[53px] z-10 shadow-sm transition-colors duration-300">
          <button 
            onClick={() => setActiveTab('divisions')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors ${activeTab === 'divisions' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            {lang === 'bn' ? 'বিভাগসমূহ' : 'Divisions'}
          </button>
          <button 
            onClick={() => setActiveTab('districts')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors ${activeTab === 'districts' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            {lang === 'bn' ? 'ক্যাডেট কলেজসমূহ' : 'Cadet Colleges'}
          </button>
          <button 
            onClick={() => setActiveTab('landmarks')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors ${activeTab === 'landmarks' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            {lang === 'bn' ? 'ভৌগোলিক সা. জ্ঞান' : 'Geo GK'}
          </button>
      </div>

      <div className="p-4 space-y-4">
          {/* Main map section */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row gap-4 transition-colors duration-300">
              
              {/* Map Canvas */}
              <div className="flex-1 min-h-[220px] bg-slate-50 dark:bg-slate-900 rounded-[10px] relative flex items-center justify-center p-2 border border-blue-50/50 dark:border-slate-800 shadow-inner overflow-hidden">
                  <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-white dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                    {lang === 'bn' ? 'ভৌগোলিক অন্বেষণকারী' : 'Geo Explorer'}
                  </div>
                  {/* Outer Bangladesh Simulated Container */}
                  <div className="w-48 h-56 relative opacity-90 transition-all duration-300">
                      {/* Simulated map layers */}
                      {DIVISIONS.map((div) => {
                        const isSelected = selectedDiv.id === div.id;
                        return (
                          <button
                            key={div.id}
                            onClick={() => handleSelectDivision(div)}
                            className={`absolute w-full h-full transition-all duration-300 focus:outline-none cursor-pointer ${
                              isSelected ? 'opacity-100 scale-102 drop-shadow-md z-10' : 'opacity-65 hover:opacity-85 hover:scale-[1.01]'
                            }`}
                            style={{ clipPath: div.mapClip }}
                          >
                            <div className={`w-full h-full ${div.color} border border-white/20`} />
                          </button>
                        );
                      })}

                      {/* Display Labels for selected */}
                      {DIVISIONS.map((div) => {
                        const isSelected = selectedDiv.id === div.id;
                        return (
                          <div 
                            key={div.id} 
                            className={`absolute ${div.bgPos} pointer-events-none transition-all duration-300 ${isSelected ? 'scale-110 z-20' : 'scale-90 opacity-60'}`}
                          >
                            <span className="bg-slate-900/90 dark:bg-slate-950/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                              {div.bnName}
                            </span>
                          </div>
                        );
                      })}
                  </div>
              </div>

              {/* Selector Sidebar */}
              <div className="w-full md:w-[150px] flex flex-wrap md:flex-col gap-2 shrink-0">
                  {DIVISIONS.map((div) => {
                    const isSelected = selectedDiv.id === div.id;
                    return (
                      <button 
                        key={div.id}
                        onClick={() => handleSelectDivision(div)}
                        className={`flex-1 md:flex-initial flex items-center justify-between p-2 rounded-[10px] text-left border cursor-pointer transition ${
                          isSelected 
                            ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-sm font-bold' 
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${div.color}`}></span>
                          <span className="text-[10px] font-black truncate">{div.bnName}</span>
                        </div>
                        <i className={`fa-solid fa-chevron-right text-[8px] ${isSelected ? 'text-white' : 'text-slate-400'}`}></i>
                      </button>
                    );
                  })}
              </div>
          </div>

          {/* Details Section */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4 transition-colors duration-300">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <div>
                  <h2 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-sm">📍</span> {selectedDiv.bnName}
                  </h2>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">বিভাগীয় পরিসংখ্যান ও ক্যাডেট ডিরেক্টরি</p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">{selectedDiv.districts} টি জেলা</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800/50">
                  <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">মোট আয়তন</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedDiv.area}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800/50">
                  <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">প্রধান নদীসমূহ</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{selectedDiv.majorRivers.join(', ')}</p>
                </div>
              </div>

              {/* Cadet Colleges in Division */}
              <div>
                <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <i className="fa-solid fa-graduation-cap"></i> ক্যাডেট কলেজসমূহ ({selectedDiv.colleges.length})
                </h3>
                {selectedDiv.colleges.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDiv.colleges.map((clg, i) => (
                      <div key={i} className="flex justify-between items-center bg-blue-50/40 dark:bg-blue-950/10 p-2.5 rounded-[10px] border border-blue-50/50 dark:border-blue-900/20">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${clg.type === 'Boys' ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400'}`}>
                            {clg.type === 'Boys' ? '👦' : '👧'}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{clg.name}</p>
                            <p className="text-[8px] text-slate-500 dark:text-slate-400">অবস্থান: {clg.location} • ধরণ: {clg.type === 'Boys' ? 'ছাত্র' : 'ছাত্রী'}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md">প্রতিষ্ঠিত: {clg.est}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">এই বিভাগের বর্তমান প্রশাসনিক সীমানায় কোনো সরাসরি ক্যাডেট কলেজ নেই।</p>
                )}
              </div>

              {/* Geographic Mini Quiz */}
              <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-4 rounded-[10px] border border-indigo-100/50 dark:border-indigo-900/30 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[12px] font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fa-regular fa-lightbulb"></i> বিভাগীয় সা. জ্ঞান কুইজ
                  </h4>
                  <span className="text-[8px] font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded-full uppercase">১০ পয়েন্ট</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug">{selectedDiv.gkQuiz.question}</p>
                
                <div className="flex flex-col gap-2">
                  {selectedDiv.gkQuiz.options.map((opt, i) => {
                    const isSelected = quizAnswer === i;
                    const showCorrect = quizSubmitted && i === selectedDiv.gkQuiz.correctIndex;
                    const showIncorrect = quizSubmitted && isSelected && i !== selectedDiv.gkQuiz.correctIndex;

                    return (
                      <button 
                        key={i}
                        disabled={quizSubmitted}
                        onClick={() => handleQuizOption(i)}
                        className={`w-full p-2.5 rounded-[10px] border text-[10px] font-bold text-left transition flex items-center justify-between ${
                          showCorrect 
                            ? 'bg-green-100 dark:bg-green-950/30 border-green-300 dark:border-green-900 text-green-800 dark:text-green-300' 
                            : showIncorrect 
                              ? 'bg-red-100 dark:bg-red-950/30 border-red-300 dark:border-red-900 text-red-800 dark:text-red-300'
                              : isSelected 
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{opt}</span>
                        {showCorrect && <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-[10px]"></i>}
                        {showIncorrect && <i className="fa-solid fa-xmark text-red-600 dark:text-red-400 text-[10px]"></i>}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button 
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                    className={`w-full py-2 rounded-[10px] text-[10px] font-bold transition ${
                      quizAnswer !== null ? 'bg-indigo-600 text-white shadow-sm cursor-pointer' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    উত্তর জমা দিন
                  </button>
                ) : (
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-[10px] border border-indigo-50 dark:indigo-900/30 space-y-1 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <p className="text-[10px] font-black flex items-center gap-1.5">
                      {earnedPoints ? (
                        <span className="text-green-600 dark:text-green-400 flex items-center gap-1"><i className="fa-solid fa-circle-check"></i> সঠিক উত্তর! +১০ পয়েন্ট</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation"></i> ভুল উত্তর</span>
                      )}
                    </p>
                    <p className="text-[9px] text-slate-600 dark:text-slate-400 leading-relaxed">{selectedDiv.gkQuiz.explanation}</p>
                  </div>
                )}
              </div>
          </div>
      </div>
    </div>
  );
}
