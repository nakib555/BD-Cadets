import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

export default function Achievements() {
  const { goBack } = useRouter();
  const { cadetName, cadetCollege, setCadetName, setCadetCollege } = useData();
  const { t } = useLanguage();

  const [badgeSubTab, setBadgeSubTab] = useState<'badges' | 'milestones' | 'certificates'>('badges');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(cadetName);
  const [collegeInput, setCollegeInput] = useState(cadetCollege);

  const saveProfile = () => {
    setCadetName(nameInput);
    setCadetCollege(collegeInput);
    setIsEditingProfile(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300 animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95">
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('cadet_profile')}</h1>
          <div className="w-8"></div>
      </header>

      {/* Profile Bio Card */}
      <div className="p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex gap-4 items-center shadow-sm relative overflow-hidden transition-colors duration-300">
              {/* Dynamic decorative shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <div className="absolute bottom-0 right-10 w-24 h-24 bg-amber-500/5 rounded-full blur-xl -mb-10 pointer-events-none"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-md relative group">
                  <div className="w-full h-full bg-slate-950 rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-xl">🎖️</span>
                      <span className="text-xs font-black text-amber-400 uppercase tracking-widest mt-0.5">{t('rank_1')}</span>
                  </div>
              </div>
              
              <div className="flex-1 space-y-1">
                  {!isEditingProfile ? (
                    <div className="space-y-2 py-1">
                        <div>
                            <h2 className="text-sm font-black text-slate-950 dark:text-white tracking-wide">{cadetName}</h2>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{cadetCollege}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">{t('class_viii')}</span>
                            <span className="text-xs bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">{t('gold_cadet')}</span>
                        </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                        <input 
                          type="text" 
                          value={nameInput} 
                          onChange={(e) => setNameInput(e.target.value)}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        <input 
                          type="text" 
                          value={collegeInput} 
                          onChange={(e) => setCollegeInput(e.target.value)}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs font-bold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                        />
                        <div className="flex gap-2 mt-1">
                            <button onClick={saveProfile} className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-xs font-black uppercase cursor-pointer">{t('save')}</button>
                            <button onClick={() => setIsEditingProfile(false)} className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl text-xs font-black uppercase cursor-pointer">{t('cancel')}</button>
                        </div>
                    </div>
                  )}
              </div>
              
              {!isEditingProfile && (
                <button onClick={() => setIsEditingProfile(true)} className="absolute top-3 right-3 text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400 transition cursor-pointer">
                    <i className="fa-solid fa-pen text-xs"></i>
                </button>
              )}
          </div>
      </div>

      <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300 pt-2">
          
          {/* Motivation Quote */}
          <div className="px-4">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl p-5 flex justify-between items-center relative overflow-hidden shadow-sm border border-indigo-100/50 dark:border-indigo-900/30">
                  <div className="relative z-10 max-w-[75%] space-y-1.5">
                      <h2 className="text-sm font-black text-indigo-900 dark:text-indigo-200 mb-1">{t('keep_going_cadet')}</h2>
                      <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400">{t('top_10_percent')}</p>
                  </div>
                  <div className="relative z-10 w-11 h-11 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md border border-indigo-100/20 text-yellow-500 text-xl">
                      <i className="fa-solid fa-fire-flame-curved"></i>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                      <i className="fa-solid fa-trophy text-[100px]"></i>
                  </div>
              </div>
          </div>

          {/* Simple Stats Row */}
          <div className="mx-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex justify-between items-center shadow-sm transition-colors duration-300">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-ranking-star text-amber-500 text-xs"></i>
                  {t('national_rank')}
              </span>
              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-100/30 dark:border-amber-900/20 px-3 py-1 rounded-full">
                  <span className="text-sm font-black text-amber-600 dark:text-amber-400">12,450</span>
                  <span className="text-xs font-black text-amber-500 uppercase tracking-widest">{t('pts')}</span>
              </div>
          </div>

          {/* Sub Navigation */}
          <div className="bg-white dark:bg-slate-950 flex px-4 text-xs font-black text-slate-400 dark:text-slate-500 text-center border-b border-slate-200 dark:border-slate-800/60 sticky top-[60px] z-10 transition-colors duration-300">
              {['badges', 'milestones', 'certificates'].map((tab) => {
                const isSelected = badgeSubTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setBadgeSubTab(tab as any)}
                    className={`flex-1 py-3 border-b-2 uppercase tracking-widest font-black transition-all ${
                      isSelected 
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                        : 'border-transparent hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                    {t(tab)}
                  </button>
                );
              })}
          </div>

          {/* Content display based on sub-tabs */}
          {badgeSubTab === 'badges' && (
            <div className="p-4 grid grid-cols-4 gap-y-6 gap-x-2 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/60 transition-colors duration-300">
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center shadow-inner border border-[#e1d5a7] dark:border-amber-900/40 text-amber-500 text-2xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-book-open"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 text-center leading-tight">First Test<br />Completed</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/40 rounded-2xl flex items-center justify-center shadow-inner border border-orange-200 dark:border-orange-900/40 text-orange-500 text-2xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-fire"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 text-center leading-tight">7 Days<br />Streak</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center shadow-inner border border-indigo-200 dark:border-indigo-900/40 text-indigo-500 text-2xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-medal"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Top 10%<br />Score</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 group cursor-pointer opacity-50 hover:opacity-100 transition">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-inner border border-slate-200 dark:border-slate-800 text-slate-400 text-xl">
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500 text-center leading-tight">1000+<br />Questions</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-950/40 rounded-2xl flex items-center justify-center shadow-inner border border-yellow-200 dark:border-yellow-900/40 text-yellow-500 text-xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-star"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Early Bird<br />Learner</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/40 rounded-2xl flex items-center justify-center shadow-inner border border-blue-200 dark:border-blue-900/40 text-blue-500 text-xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-crown"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Subject<br />Master</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-red-100 dark:bg-red-950/40 rounded-2xl flex items-center justify-center shadow-inner border border-red-200 dark:border-red-900/40 text-red-500 text-xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-heart"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-xs text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Perfect Score<br />in a Test</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900/20 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 text-lg">
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500 text-center leading-tight">More</span>
                </div>
            </div>
          )}

          {badgeSubTab === 'milestones' && (
            <div className="p-4 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/60 space-y-3.5 transition-colors duration-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800/60 flex justify-between items-center">
                    <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase">Sovereign Scholar</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Score above 95% in any 5 mock tests</p>
                    </div>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">3/5 Completed</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800/60 flex justify-between items-center">
                    <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase">Endurance Driller</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Maintain a study streak of 20 consecutive days</p>
                    </div>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400">12/20 Streak</span>
                </div>
            </div>
          )}

          {badgeSubTab === 'certificates' && (
            <div className="p-8 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/60 text-center space-y-4 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl mx-auto"><i className="fa-solid fa-graduation-cap"></i></div>
                <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase">College Preparation Cadet</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold max-w-[220px] mx-auto mt-1">Unlock this digital cadet badge & certificate by completing the entire entrance syllabus mock exams.</p>
                </div>
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded-2xl text-xs font-black uppercase tracking-wider cursor-not-allowed">Locked • Complete Syllabi</button>
            </div>
          )}
      </div>
    </div>
  );
}
