import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';

export default function Achievements() {
  const { goBack } = useRouter();
  const { userData, isDark, setIsDark } = useData();
  const { t, setLang, lang } = useLanguage();

  // Tab state
  const [activeTab, setActiveTab] = useState<'achievements' | 'settings'>('achievements');
  
  // Badge sub-tabs
  const [badgeSubTab, setBadgeSubTab] = useState<'badges' | 'milestones' | 'certificates'>('badges');

  // Interactive profile edits
  const [cadetName, setCadetName] = useState(() => localStorage.getItem('cadet_name') || 'Arif Al-Hasan');
  const [cadetCollege, setCadetCollege] = useState(() => localStorage.getItem('cadet_college') || 'Mirzapur Cadet College');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(cadetName);
  const [collegeInput, setCollegeInput] = useState(cadetCollege);

  // Settings states
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('sound_enabled') !== 'false');

  const saveProfile = () => {
    setCadetName(nameInput);
    setCadetCollege(collegeInput);
    localStorage.setItem('cadet_name', nameInput);
    localStorage.setItem('cadet_college', collegeInput);
    setIsEditingProfile(false);
  };

  const handleSoundToggle = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem('sound_enabled', String(nextVal));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300 animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('cadet_profile')}</h1>
          <button 
            onClick={() => setActiveTab(activeTab === 'achievements' ? 'settings' : 'achievements')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition cursor-pointer ${
              activeTab === 'settings' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' 
                : 'bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
              <i className="fa-solid fa-gear text-sm"></i>
          </button>
      </header>

      {/* Profile Bio Card */}
      <div className="p-4">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-[10px] p-4 flex gap-4 items-center shadow-sm relative overflow-hidden transition-colors duration-300">
                  
              {/* Cadet Badge Aura */}
              <div className="w-16 h-16 rounded-[10px] bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-md relative group">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex flex-col items-center justify-center">
                      <span className="text-[20px]">🎖️</span>
                      <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest mt-0.5">{t('rank_1')}</span>
                  </div>
              </div>

              <div className="flex-1 space-y-1">
                  {isEditingProfile ? (
                    <div className="space-y-2 py-1">
                        <input 
                          type="text" 
                          value={nameInput} 
                          onChange={(e) => setNameInput(e.target.value)}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-[10px] text-[11px] font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          placeholder="Cadet Name"
                        />
                        <input 
                          type="text" 
                          value={collegeInput} 
                          onChange={(e) => setCollegeInput(e.target.value)}
                          className="w-full px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-[10px] text-[9px] font-bold bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                          placeholder="Cadet College"
                        />
                        <div className="flex gap-2">
                            <button onClick={saveProfile} className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-[10px] text-[8px] font-black uppercase cursor-pointer">{t('save')}</button>
                            <button onClick={() => setIsEditingProfile(false)} className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-[10px] text-[8px] font-black uppercase cursor-pointer">{t('cancel')}</button>
                        </div>
                    </div>
                  ) : (
                    <>
                        <div className="flex justify-between items-start">
                            <h2 className="text-[14px] font-[Georgia] font-black text-slate-950 dark:text-white tracking-wide">{cadetName}</h2>
                            <button onClick={() => { setNameInput(cadetName); setCollegeInput(cadetCollege); setIsEditingProfile(true); }} className="text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer text-[12px]">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                        </div>
                        <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{cadetCollege}</p>
                        <div className="flex gap-1.5 items-center pt-1">
                            <span className="text-[8px] bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold">{t('class_viii')}</span>
                            <span className="text-[8px] bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold">{t('gold_cadet')}</span>
                        </div>
                    </>
                  )}
              </div>
          </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="mx-4 mb-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-1.5 rounded-[10px] flex shadow-sm transition-colors duration-300">
          <button 
            onClick={() => setActiveTab('achievements')}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-[10px] transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'achievements' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
              <i className="fa-solid fa-trophy text-[12px]"></i> {t('badges_and_stats')}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-[10px] transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'settings' 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
              <i className="fa-solid fa-user-gear text-[12px]"></i> {t('settings')}
          </button>
      </div>

      {/* TAB CONTENT: ACHIEVEMENTS */}
      {activeTab === 'achievements' && (
        <div className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
          
          {/* Motivation Quote */}
          <div className="px-4">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 rounded-[10px] p-5 flex justify-between items-center relative overflow-hidden shadow-sm border border-indigo-100/50 dark:border-indigo-900/30">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="relative z-10">
                      <h2 className="text-[14px] font-[Georgia] font-black text-indigo-900 dark:text-indigo-200 mb-1">{t('keep_going_cadet')}</h2>
                      <p className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400">{t('top_10_percent')}</p>
                  </div>
                  <div className="relative z-10 w-11 h-11 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md border border-indigo-100/20 text-yellow-500 text-[20px]">
                      <i className="fa-solid fa-trophy"></i>
                  </div>
              </div>
          </div>

          {/* Points Card */}
          <div className="mx-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-[10px] p-4 flex justify-between items-center shadow-sm transition-colors duration-300">
              <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <i className="fa-solid fa-coins text-amber-500"></i> {t('total_cadet_points')}
              </span>
              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-100/30 dark:border-amber-900/20 px-3 py-1 rounded-full">
                  <span className="text-[13px] font-black text-amber-600 dark:text-amber-400">12,450</span>
                  <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">{t('pts')}</span>
              </div>
          </div>

          {/* Sub-tabs */}
          <div className="bg-white dark:bg-slate-950 flex px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 text-center border-b border-slate-200 dark:border-slate-800/60 sticky top-[60px] z-10 transition-colors duration-300">
              {(['badges', 'milestones', 'certificates'] as const).map((tab) => {
                const isSelected = badgeSubTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setBadgeSubTab(tab)}
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
                    <div className="w-14 h-14 bg-amber-100 dark:bg-amber-950/40 rounded-[10px] flex items-center justify-center shadow-inner border border-[#e1d5a7] dark:border-amber-900/40 text-amber-500 text-[24px] relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-shield-cat"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-[8px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight">First Test<br />Completed</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950/40 rounded-[10px] flex items-center justify-center shadow-inner border border-orange-200 dark:border-orange-900/40 text-orange-500 text-2xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-fire"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-[8px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight">7 Days<br />Streak</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950/40 rounded-[10px] flex items-center justify-center shadow-inner border border-indigo-200 dark:border-indigo-900/40 text-indigo-500 text-2xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-medal"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-[8px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Top 10%<br />Score</span>
                </div>
                
                <div className="flex flex-col items-center gap-2 group cursor-pointer opacity-50 hover:opacity-100 transition">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-slate-900 rounded-[10px] flex items-center justify-center shadow-inner border border-slate-200 dark:border-slate-800 text-slate-400 text-xl">
                        <i className="fa-solid fa-layer-group"></i>
                    </div>
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 text-center leading-tight">1000+<br />Questions</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-950/40 rounded-[10px] flex items-center justify-center shadow-inner border border-yellow-200 dark:border-yellow-900/40 text-yellow-500 text-xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-star"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-[8px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Early Bird<br />Learner</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/40 rounded-[10px] flex items-center justify-center shadow-inner border border-blue-200 dark:border-blue-900/40 text-blue-500 text-xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-crown"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-[8px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Subject<br />Master</span>
                </div>

                <div className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 bg-red-100 dark:bg-red-950/40 rounded-[10px] flex items-center justify-center shadow-inner border border-red-200 dark:border-red-900/40 text-red-500 text-xl relative group-hover:scale-105 transition">
                        <i className="fa-solid fa-heart"></i>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center text-[8px] text-white"><i className="fa-solid fa-check"></i></div>
                    </div>
                    <span className="text-[8px] font-black text-slate-700 dark:text-slate-300 text-center leading-tight">Perfect Score<br />in a Test</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900/20 rounded-[10px] flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-700 text-lg">
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <span className="text-[8px] font-black text-slate-400 dark:text-slate-500 text-center leading-tight">More</span>
                </div>
            </div>
          )}

          {badgeSubTab === 'milestones' && (
            <div className="p-4 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/60 space-y-3.5 transition-colors duration-300">
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-[10px] border border-slate-200 dark:border-slate-800/60 flex justify-between items-center">
                    <div>
                        <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Sovereign Scholar</h4>
                        <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">Score above 95% in any 5 mock tests</p>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">3/5 Completed</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-[10px] border border-slate-200 dark:border-slate-800/60 flex justify-between items-center">
                    <div>
                        <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Endurance Driller</h4>
                        <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">Maintain a study streak of 20 consecutive days</p>
                    </div>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">12/20 Streak</span>
                </div>
            </div>
          )}

          {badgeSubTab === 'certificates' && (
            <div className="p-8 bg-white dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800/60 text-center space-y-4 transition-colors duration-300">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xl mx-auto"><i className="fa-solid fa-graduation-cap"></i></div>
                <div>
                    <h4 className="text-[11px] font-black text-slate-900 dark:text-white uppercase">College Preparation Cadet</h4>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold max-w-[220px] mx-auto mt-1">Unlock this digital cadet badge & certificate by completing the entire entrance syllabus mock exams.</p>
                </div>
                <button className="px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded-[10px] text-[9px] font-black uppercase tracking-wider cursor-not-allowed">Locked • Complete Syllabi</button>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SETTINGS & PREFERENCES */}
      {activeTab === 'settings' && (
        <div className="p-4 space-y-4 animate-in slide-in-from-bottom-2 duration-300">
          
          {/* Theme custom settings block */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-[10px] p-4 space-y-4 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800/60">
                  <i className="fa-solid fa-palette text-blue-600 dark:text-blue-400 text-xs"></i>
                  <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('appearance_theme')}</h3>
              </div>

              {/* DARK MODE TOGGLE SWITCH ROW */}
              <div className="flex justify-between items-center py-1">
                  <div className="space-y-0.5">
                      <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">{t('global_dark_mode')}</span>
                      <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">{t('enable_dark_mode_desc')}</p>
                  </div>
                  
                  {/* Beautiful Toggle Switch */}
                  <button 
                    onClick={() => setIsDark(!isDark)}
                    className={`w-14 h-7 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer ${
                      isDark 
                        ? 'bg-emerald-500 justify-end shadow-inner shadow-emerald-700/20' 
                        : 'bg-slate-200 dark:bg-slate-800 justify-start'
                    }`}
                  >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-[9px] transition-all duration-300">
                          {isDark ? '🌙' : '☀️'}
                      </div>
                  </button>
              </div>

              {/* Visual Status Indicator */}
              <div className={`p-3 rounded-[10px] border text-[9px] font-black text-center transition-all ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-emerald-400' 
                  : 'bg-emerald-50/50 border-emerald-100/40 text-emerald-800'
              }`}>
                  {isDark 
                    ? t('midnight_theme_active') 
                    : t('classic_theme_active')}
              </div>
          </div>

          {/* Localization preferences settings block */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-[10px] p-4 space-y-4 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800/60">
                  <i className="fa-solid fa-globe text-blue-600 dark:text-blue-400 text-xs"></i>
                  <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('language_and_sound')}</h3>
              </div>

              {/* Language select buttons row */}
              <div className="flex justify-between items-center py-1">
                  <div className="space-y-0.5">
                      <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">{t('study_language')}</span>
                      <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">{t('study_language_desc')}</p>
                  </div>
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200/50 dark:border-slate-800/40">
                      <button 
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 text-[8px] font-black uppercase rounded-md transition ${
                          lang === 'en' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                          English
                      </button>
                      <button 
                        onClick={() => setLang('bn')}
                        className={`px-3 py-1 text-[8px] font-black uppercase rounded-md transition ${
                          lang === 'bn' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                          বাংলা
                      </button>
                  </div>
              </div>

              {/* Sound switch row */}
              <div className="flex justify-between items-center py-1">
                  <div className="space-y-0.5">
                      <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">{t('sound_effects')}</span>
                      <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">{t('sound_effects_desc')}</p>
                  </div>
                  <button 
                    onClick={handleSoundToggle}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${
                      soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-200 dark:bg-slate-800 justify-start'
                    }`}
                  >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
                  </button>
              </div>
          </div>

          {/* Academic Info & Terms */}
          <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/20 dark:border-slate-800/40 p-4 rounded-[10px] text-[9px] text-slate-500 dark:text-slate-400 space-y-2">
              <p className="font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest text-center">Cadet Applet Metadata</p>
              <div className="grid grid-cols-2 gap-y-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/40">
                  <span className="font-bold">App Version</span>
                  <span className="text-right font-mono font-bold">1.2.5-prod</span>
                  <span className="font-bold">Database Mode</span>
                  <span className="text-right font-mono font-bold text-green-600 dark:text-green-400">Offline Sync</span>
                  <span className="font-bold">Security Grade</span>
                  <span className="text-right font-mono font-bold text-blue-600 dark:text-blue-400">Cadet Secure</span>
              </div>
          </div>

        </div>
      )}
    </div>
  );
}
