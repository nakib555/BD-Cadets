import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';

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
    area: '20,508 sq km',
    majorRivers: ['Padma', 'Meghna', 'Jamuna', 'Buriganga'],
    colleges: [
      { name: 'Mirzapur Cadet College', location: 'Tangail', type: 'Boys', est: 1965 },
      { name: "Mymensingh Girls' Cadet College", location: 'Mymensingh', type: 'Girls', est: 1984 }
    ],
    gkQuiz: {
      question: "Which river flows beside Dhaka city?",
      options: ["Padma", "Meghna", "Buriganga", "Jamuna"],
      correctIndex: 2,
      explanation: "The Buriganga River flows by the southern part of Dhaka, the capital city of Bangladesh."
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
    area: '33,908 sq km',
    majorRivers: ['Karnaphuli', 'Halda', 'Sangu', 'Feni'],
    colleges: [
      { name: 'Faujdarhat Cadet College', location: 'Chattogram', type: 'Boys', est: 1958 },
      { name: 'Cumilla Cadet College', location: 'Cumilla', type: 'Boys', est: 1983 },
      { name: "Feni Girls' Cadet College", location: 'Feni', type: 'Girls', est: 2006 }
    ],
    gkQuiz: {
      question: "Which was the very first Cadet College established in Bangladesh?",
      options: ["Jhenaidah Cadet College", "Faujdarhat Cadet College", "Mirzapur Cadet College", "Rajshahi Cadet College"],
      correctIndex: 1,
      explanation: "Faujdarhat Cadet College was established in Chittagong in 1958 as the first cadet college in the country."
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
    area: '18,174 sq km',
    majorRivers: ['Padma', 'Jamuna', 'Atrai', 'Mahananda'],
    colleges: [
      { name: 'Rajshahi Cadet College', location: 'Sardah', type: 'Boys', est: 1966 },
      { name: "Joypurhat Girls' Cadet College", location: 'Joypurhat', type: 'Girls', est: 2006 }
    ],
    gkQuiz: {
      question: "Where is the Varendra Research Museum located?",
      options: ["Dhaka", "Sylhet", "Rajshahi", "Bogura"],
      correctIndex: 2,
      explanation: "The Varendra Research Museum is the oldest museum in Bangladesh, located in the heart of Rajshahi city."
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
    area: '22,284 sq km',
    majorRivers: ['Rupsha', 'Bhairab', 'Kopotakkho', 'Pusur'],
    colleges: [
      { name: 'Jhenaidah Cadet College', location: 'Jhenaidah', type: 'Boys', est: 1963 }
    ],
    gkQuiz: {
      question: "Which UNESCO World Heritage forest is located in Khulna Division?",
      options: ["Sajek Valley", "The Sundarbans", "Ratargul Swamp", "Bishnakandi"],
      correctIndex: 1,
      explanation: "The Sundarbans, the largest mangrove forest in the world and a UNESCO site, is located in Khulna Division."
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
    area: '13,225 sq km',
    majorRivers: ['Kirtonkhola', 'Meghna', 'Payra', 'Tentulia'],
    colleges: [
      { name: 'Barishal Cadet College', location: 'Babuganj', type: 'Boys', est: 1981 }
    ],
    gkQuiz: {
      question: "Which city is historicaly known as the 'Granary of Bengal'?",
      options: ["Sylhet", "Chattogram", "Barishal", "Rangpur"],
      correctIndex: 2,
      explanation: "Barishal is known as the 'Granary of Bengal' or 'Rice Bowl' due to its vast paddy field production."
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
    area: '12,298 sq km',
    majorRivers: ['Surma', 'Kushiyara', 'Manu', 'Khowai'],
    colleges: [
      { name: 'Sylhet Cadet College', location: 'Sylhet', type: 'Boys', est: 1978 }
    ],
    gkQuiz: {
      question: "Which of these is the largest natural freshwater swamp forest in Sylhet?",
      options: ["Sundarbans", "Ratargul", "Bhawal", "Madhupur"],
      correctIndex: 1,
      explanation: "Ratargul Swamp Forest is the only freshwater swamp forest in Bangladesh, located in Sylhet."
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
    area: '16,184 sq km',
    majorRivers: ['Teesta', 'Dharla', 'Jamuna', 'Karatoya'],
    colleges: [
      { name: 'Rangpur Cadet College', location: 'Rangpur', type: 'Boys', est: 1979 }
    ],
    gkQuiz: {
      question: "Which majestic palace is located in Rangpur city?",
      options: ["Ahsan Manzil", "Tajhat Palace", "Uttara Gono Bhaban", "Lalbagh Fort"],
      correctIndex: 1,
      explanation: "Tajhat Palace is a historic royal palace located in Tajhat, Rangpur, built by Maharaja Kumar Gopal Lal Roy."
    }
  }
];

export default function InteractiveMap() {
  const { goBack } = useRouter();
  const { userData, setUserData } = useData();
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
    <div className="bg-slate-50 animate-in fade-in duration-300 min-h-full pb-20">
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
          <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-bold text-slate-900">Interactive Bangladesh Map</h1>
          <div className="w-8"></div>
      </header>

      <div className="bg-white flex justify-center gap-2 p-3 border-b border-slate-100 sticky top-[53px] z-10 shadow-sm">
          <button 
            onClick={() => setActiveTab('divisions')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors ${activeTab === 'divisions' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-700'}`}
          >
            Divisions
          </button>
          <button 
            onClick={() => setActiveTab('districts')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors ${activeTab === 'districts' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-700'}`}
          >
            Cadet Colleges
          </button>
          <button 
            onClick={() => setActiveTab('landmarks')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors ${activeTab === 'landmarks' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 hover:text-slate-700'}`}
          >
            Geography GK
          </button>
      </div>

      <div className="p-4 space-y-4">
          {/* Main map section */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
              
              {/* Map Canvas */}
              <div className="flex-1 min-h-[220px] bg-slate-50 rounded-xl relative flex items-center justify-center p-2 border border-blue-50 shadow-inner overflow-hidden">
                  <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded border border-slate-100">
                    Geographic Explorer
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
                            <span className="bg-slate-900/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">
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
                        className={`flex-1 md:flex-initial flex items-center justify-between p-2 rounded-xl text-left border cursor-pointer transition ${
                          isSelected 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-bold' 
                            : 'bg-white text-slate-700 border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${div.color}`}></span>
                          <span className="text-[10px] font-bold truncate">{div.bnName}</span>
                        </div>
                        <i className={`fa-solid fa-chevron-right text-[8px] ${isSelected ? 'text-white' : 'text-slate-400'}`}></i>
                      </button>
                    );
                  })}
              </div>
          </div>

          {/* Details Section */}
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div>
                  <h2 className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <span className="text-sm">📍</span> {selectedDiv.name} ({selectedDiv.bnName})
                  </h2>
                  <p className="text-[9px] text-slate-500 font-bold mt-0.5">Division Statistics & Cadet Directory</p>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{selectedDiv.districts} Districts</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[8px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Area</p>
                  <p className="text-xs font-bold text-slate-800">{selectedDiv.area}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-[8px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Major Rivers</p>
                  <p className="text-xs font-bold text-slate-800 truncate">{selectedDiv.majorRivers.join(', ')}</p>
                </div>
              </div>

              {/* Cadet Colleges in Division */}
              <div>
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-1.5 text-blue-600">
                  <i className="fa-solid fa-graduation-cap"></i> Cadet Colleges ({selectedDiv.colleges.length})
                </h3>
                {selectedDiv.colleges.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDiv.colleges.map((clg, i) => (
                      <div key={i} className="flex justify-between items-center bg-blue-50/40 p-2.5 rounded-xl border border-blue-50">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${clg.type === 'Boys' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                            {clg.type === 'Boys' ? '👦' : '👧'}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-800">{clg.name}</p>
                            <p className="text-[8px] text-slate-500">Location: {clg.location} • Type: {clg.type}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">Est. {clg.est}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 italic">No direct Cadet Colleges are based in this division's current administrative borders.</p>
                )}
              </div>

              {/* Geographic Mini Quiz */}
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest flex items-center gap-1.5">
                    <i className="fa-regular fa-lightbulb"></i> Divisional GK Quiz
                  </h4>
                  <span className="text-[8px] font-extrabold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full uppercase">10 Points</span>
                </div>
                <p className="text-[11px] font-bold text-slate-800 leading-snug">{selectedDiv.gkQuiz.question}</p>
                
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
                        className={`w-full p-2.5 rounded-xl border text-[10px] font-bold text-left transition flex items-center justify-between ${
                          showCorrect 
                            ? 'bg-green-100 border-green-300 text-green-800' 
                            : showIncorrect 
                              ? 'bg-red-100 border-red-300 text-red-800'
                              : isSelected 
                                ? 'bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-white border-slate-100 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {showCorrect && <i className="fa-solid fa-check text-green-600 text-[10px]"></i>}
                        {showIncorrect && <i className="fa-solid fa-xmark text-red-600 text-[10px]"></i>}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button 
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                    className={`w-full py-2 rounded-xl text-[10px] font-bold transition ${
                      quizAnswer !== null ? 'bg-indigo-600 text-white shadow-sm cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="bg-white p-3 rounded-xl border border-indigo-50 animate-in slide-in-from-bottom-2 fade-in duration-300 space-y-1">
                    <p className="text-[10px] font-black flex items-center gap-1.5">
                      {earnedPoints ? (
                        <span className="text-green-600 flex items-center gap-1"><i className="fa-solid fa-circle-check"></i> Correct! +10 Points</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation"></i> Incorrect</span>
                      )}
                    </p>
                    <p className="text-[9px] text-slate-600 leading-relaxed">{selectedDiv.gkQuiz.explanation}</p>
                  </div>
                )}
              </div>
          </div>
      </div>
    </div>
  );
}
