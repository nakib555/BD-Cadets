import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';

import { useLanguage } from '../context/LanguageContext';

export default function Study() {
  const { goBack, navigate } = useRouter();
  const { userData, markNoteCompleted } = useData();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('notes');
  const tabs = ['notes', 'past_papers', 'bookmarks'];

  const readNoteIds = userData.readNoteIdsToday || [];

  const notes = [
    { id: 'note-alg', title: lang === 'bn' ? 'বীজগাণিতিক রাশি - গুরুত্বপূর্ণ সূত্র' : 'Algebraic Expressions - Key Formulas', subject: t('math'), type: lang === 'bn' ? 'পিডিএফ নোট' : 'PDF Note', icon: 'fa-regular fa-file-pdf', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', cardBorder: 'border-slate-200 dark:border-slate-800/80', iconBorder: 'border-red-200 dark:border-red-900/40' },
    { id: 'note-vocab', title: lang === 'bn' ? 'শব্দভাণ্ডার নির্মাতা পার্ট ১' : 'Vocabulary Builder Part 1', subject: t('english'), type: lang === 'bn' ? 'ফ্ল্যাرشفার্ড' : 'Flashcards', icon: 'fa-regular fa-copy', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', cardBorder: 'border-slate-200 dark:border-slate-800/80', iconBorder: 'border-blue-200 dark:border-blue-900/40' },
    { id: 'note-history', title: lang === 'bn' ? 'বাংলাদেশের ইতিহাস - সময়রেখা' : 'History of Bangladesh - Timeline', subject: t('gk'), type: lang === 'bn' ? 'সারসংক্ষেপ' : 'Summary', icon: 'fa-solid fa-list', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30', cardBorder: 'border-slate-200 dark:border-slate-800/80', iconBorder: 'border-emerald-200 dark:border-emerald-900/40' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300 animate-in fade-in duration-300 flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('study_materials')}</h1>
          <button className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-filter text-xs"></i>
          </button>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-950 flex px-4 pt-3 pb-3 gap-2 border-b border-slate-200 dark:border-slate-800/60 sticky top-[60px] z-10 transition-colors duration-300">
          {tabs.map(tab => (
              <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === tab 
                       ? 'bg-blue-600 text-white shadow-sm' 
                       : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                   }`}
              >
                  {t(tab)}
              </button>
          ))}
      </div>
      
      <div className="px-4 pt-4">
          <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 dark:text-slate-500 text-xs"></i>
              <input 
                type="text" 
                placeholder={activeTab === 'notes' ? t('search_notes') : activeTab === 'past_papers' ? t('search_past_papers') : t('search_bookmarks')} 
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-[10px] py-2.5 pl-8 pr-10 text-[13px] font-medium text-slate-700 dark:text-slate-300 bg-transparent focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition" 
              />
          </div>
      </div>

      <div className="p-4 space-y-3 flex-1">
          {activeTab === 'notes' && (
              <div className="pb-3 space-y-2.5">
                  <div className="flex justify-between items-center">
                      <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('interactive_lessons')}</h3>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">{t('new_feature')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      {/* Photosynthesis science guide card */}
                      <div 
                          onClick={() => navigate('photosynthesis')}
                          className="bg-gradient-to-br from-emerald-50/50 to-emerald-50/10 dark:from-emerald-950/20 dark:to-emerald-950/5 hover:from-emerald-50 dark:hover:from-emerald-950 border border-[#bbdecd] dark:border-emerald-900/30 p-3 rounded-[10px] shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-emerald-500 rounded-[10px] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-leaf text-xs"></i>
                              </div>
                              <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-950 border border-emerald-100 dark:border-emerald-900/30 px-1.5 py-0.5 rounded-[10px]">{t('biology')}</span>
                          </div>
                          <div>
                              <h4 className="text-[13px] font-black text-slate-900 dark:text-white leading-tight">{t('photosynthesis')}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{t('interactive_infographic')}</p>
                          </div>
                      </div>

                      {/* Interactive map card */}
                      <div 
                          onClick={() => navigate('interactive-map')}
                          className="bg-gradient-to-br from-blue-50/50 to-blue-50/10 dark:from-blue-950/20 dark:to-blue-950/5 hover:from-blue-50 dark:hover:from-blue-950 border border-[#c9d2e0] dark:border-blue-900/30 p-3 rounded-[10px] shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-blue-500 rounded-[10px] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-map-location-dot text-xs"></i>
                              </div>
                              <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 border border-blue-100 dark:border-blue-900/30 px-1.5 py-0.5 rounded-[10px]">{t('geography')}</span>
                          </div>
                          <div>
                              <h4 className="text-[13px] font-black text-slate-900 dark:text-white leading-tight">{t('bd_map')}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{t('divisions_and_spots')}</p>
                          </div>
                      </div>

                      {/* Padma Bridge card */}
                      <div 
                          onClick={() => navigate('padma-bridge')}
                          className="col-span-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 dark:from-blue-950/20 dark:to-indigo-950/5 hover:from-blue-50 dark:hover:from-blue-950 border border-[#ccd6e3] dark:border-blue-900/30 p-3 rounded-[10px] shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-blue-600 rounded-[10px] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <span className="text-xs">🌉</span>
                              </div>
                              <span className="text-[9px] font-black uppercase text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 border border-blue-100 dark:border-blue-900/30 px-1.5 py-0.5 rounded-[10px]">{t('gk')}</span>
                          </div>
                          <div>
                              <h4 className="text-[13px] font-black text-slate-900 dark:text-white leading-tight">{t('padma_bridge_infographic')}</h4>
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">{t('interactive_double_deck')}</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {notes.map((note) => {
              const isRead = readNoteIds.includes(note.id);
              return (
                <div key={note.id} className={`bg-white dark:bg-slate-950 p-3.5 rounded-xl border ${note.cardBorder} dark:border-slate-800/80 shadow-sm flex items-center justify-between group transition duration-300`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${note.bg} border ${note.iconBorder} rounded-xl flex items-center justify-center`}>
                            <i className={`${note.icon} ${note.color} text-lg`}></i>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-[13px] font-black text-slate-900 dark:text-white leading-tight mb-0.5">{note.title}</h3>
                              {isRead && (
                                <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded-md">
                                  {t('read_completed')}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                                <span>{note.subject}</span>
                                <span>•</span>
                                <span>{note.type}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                      onClick={() => markNoteCompleted(note.id)}
                      title={isRead ? t('read_completed') : t('mark_as_read')}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                        isRead
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/50'
                          : 'bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      }`}
                    >
                      <i className={`fa-solid ${isRead ? 'fa-circle-check text-emerald-600 dark:text-emerald-400' : 'fa-check'}`}></i>
                      <span>{isRead ? t('completed') : t('read')}</span>
                    </button>
                </div>
              );
          })}
      </div>
    </div>
  );
}
