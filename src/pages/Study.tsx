import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage, T } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';

export default function Study() {
  const { goBack, navigate } = useRouter();
  const { userData, markNoteCompleted } = useData();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const tabs = ['notes', 'past_papers', 'bookmarks'];

  const readNoteIds = userData.readNoteIdsToday || [];

  const handleTabChange = (tab: string) => {
    triggerHaptic('selection');
    setActiveTab(tab);
  };

  const handleNoteRead = (id: string) => {
    triggerHaptic('success');
    markNoteCompleted(id);
  };

  const notes = [
    { id: 'note-alg', title: lang === 'bn' ? 'বীজগাণিতিক রাশি - গুরুত্বপূর্ণ সূত্র' : 'Algebraic Expressions - Key Formulas', subject: t('math'), type: lang === 'bn' ? 'পিডিএফ নোট' : 'PDF Note', icon: 'fa-regular fa-file-pdf', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30', cardBorder: 'border-slate-200 dark:border-slate-800/80', iconBorder: 'border-red-200 dark:border-red-900/40' },
    { id: 'note-vocab', title: lang === 'bn' ? 'শব্দভাণ্ডার নির্মাতা পার্ট ১' : 'Vocabulary Builder Part 1', subject: t('english'), type: lang === 'bn' ? 'ফ্ল্যাرشفার্ড' : 'Flashcards', icon: 'fa-regular fa-copy', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', cardBorder: 'border-slate-200 dark:border-slate-800/80', iconBorder: 'border-blue-200 dark:border-blue-900/40' },
    { id: 'note-history', title: lang === 'bn' ? 'বাংলাদেশের ইতিহাস - সময়রেখা' : 'History of Bangladesh - Timeline', subject: t('gk'), type: lang === 'bn' ? 'সারসংক্ষেপ' : 'Summary', icon: 'fa-solid fa-list', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30', cardBorder: 'border-slate-200 dark:border-slate-800/80', iconBorder: 'border-emerald-200 dark:border-emerald-900/40' },
  ];

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-8 transition-colors duration-300 animate-in fade-in duration-300 flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button 
            onClick={() => { triggerHaptic('light'); goBack(); }} 
            className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
          >
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider"><T id="study_materials" /></h1>
          <button className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95">
              <i className="fa-solid fa-filter text-xs"></i>
          </button>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-950 flex px-4 pt-3 pb-3 gap-2 overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800/60 sticky top-[60px] z-10 transition-colors duration-300">
          {tabs.map(tab => (
              <button 
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer active:scale-95 ${
                      activeTab === tab 
                       ? 'bg-blue-600 text-white shadow-sm' 
                       : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                  }`}
              >
                  <T id={tab} />
              </button>
          ))}
      </div>
      
      <div className="px-4 pb-2 pt-3">
          <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 dark:text-slate-500 text-xs"></i>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'notes' ? t('search_notes') : activeTab === 'past_papers' ? t('search_past_papers') : t('search_bookmarks')} 
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-[10px] py-2.5 pl-8 pr-10 text-[13px] font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition shadow-xs" 
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              )}
          </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
          {activeTab === 'notes' && (
              <div className="space-y-3">
                  <div className="flex justify-between items-center">
                      <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider"><T id="interactive_lessons" /></h3>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold"><T id="new_feature" /></span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      {/* Photosynthesis science guide card */}
                      <div 
                          onClick={() => { triggerHaptic('light'); navigate('photosynthesis'); }}
                          className="bg-gradient-to-br from-emerald-50/60 to-emerald-50/10 dark:from-emerald-950/30 dark:to-emerald-950/5 hover:from-emerald-50 dark:hover:from-emerald-950 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-2xl shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between min-h-[120px] active:scale-[0.98] group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-leaf text-sm"></i>
                              </div>
                              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-950 border border-emerald-100 dark:border-emerald-900/30 px-2 py-0.5 rounded-full"><T id="biology" /></span>
                          </div>
                          <div>
                              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight"><T id="photosynthesis" /></h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1"><T id="interactive_infographic" /></p>
                          </div>
                      </div>

                      {/* Interactive map card */}
                      <div 
                          onClick={() => { triggerHaptic('light'); navigate('interactive-map'); }}
                          className="bg-gradient-to-br from-blue-50/60 to-blue-50/10 dark:from-blue-950/30 dark:to-blue-950/5 hover:from-blue-50 dark:hover:from-blue-950 border border-blue-200 dark:border-blue-900/40 p-4 rounded-2xl shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between min-h-[120px] active:scale-[0.98] group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-map-location-dot text-sm"></i>
                              </div>
                              <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 border border-blue-100 dark:border-blue-900/30 px-2 py-0.5 rounded-full"><T id="geography" /></span>
                          </div>
                          <div>
                              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight"><T id="bd_map" /></h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1"><T id="divisions_and_spots" /></p>
                          </div>
                      </div>

                      {/* Padma Bridge card */}
                      <div 
                          onClick={() => { triggerHaptic('light'); navigate('padma-bridge'); }}
                          className="col-span-2 bg-gradient-to-br from-indigo-50/60 to-blue-50/10 dark:from-indigo-950/30 dark:to-blue-950/5 hover:from-indigo-50 dark:hover:from-indigo-950 border border-indigo-200 dark:border-indigo-900/40 p-4 rounded-2xl shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between min-h-[120px] active:scale-[0.98] group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                   <span className="text-sm">🌉</span>
                              </div>
                              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-950 border border-indigo-100 dark:border-indigo-900/30 px-2 py-0.5 rounded-full"><T id="gk" /></span>
                          </div>
                          <div>
                              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight"><T id="padma_bridge_infographic" /></h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1"><T id="interactive_double_deck" /></p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          <div className="space-y-3">
            {filteredNotes.map((note) => {
                const isRead = readNoteIds.includes(note.id);
                return (
                  <div key={note.id} className={`bg-white dark:bg-slate-950 p-4 rounded-2xl border ${note.cardBorder} dark:border-slate-800 shadow-sm flex items-center justify-between group transition duration-300`}>
                      <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 ${note.bg} border ${note.iconBorder} rounded-xl flex items-center justify-center shrink-0`}>
                              <i className={`${note.icon} ${note.color} text-lg`}></i>
                          </div>
                          <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight"><T>{note.title}</T></h3>
                                {isRead && (
                                  <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-md shrink-0">
                                    <T id="read_completed" />
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">
                                  <span><T>{note.subject}</T></span>
                                  <span>•</span>
                                  <span><T>{note.type}</T></span>
                              </div>
                          </div>
                      </div>
                      <button 
                        onClick={() => handleNoteRead(note.id)}
                        title={isRead ? t('read_completed') : t('mark_as_read')}
                        className={`h-8 px-3 rounded-lg text-[11px] font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 ${
                          isRead
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/50'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:hover:bg-blue-900/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        }`}
                      >
                        <i className={`fa-solid ${isRead ? 'fa-circle-check text-emerald-600 dark:text-emerald-400' : 'fa-check'}`}></i>
                        <span>{isRead ? <T id="completed" /> : <T id="read" />}</span>
                      </button>
                  </div>
                );
            })}
            {filteredNotes.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
                  <i className="fa-solid fa-folder-open text-xl"></i>
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No matching study materials</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search terms</p>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
