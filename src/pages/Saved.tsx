import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage, T } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { triggerHaptic } from '../utils/haptics';
import { Question } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Search, Trash2, ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';

function renderMCQText(textObj: any): string {
  if (!textObj) return '';
  if (typeof textObj === 'string') return textObj;
  const bn = textObj.bn?.trim() || '';
  const en = textObj.en?.trim() || '';
  if (bn && en) {
    if (bn === en) return bn;
    return `${bn} / ${en}`;
  }
  return bn || en || '';
}

export default function Saved() {
  const { savedQuestions, toggleBookmark } = useData();
  const { t, lang } = useLanguage();
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<'All' | 'Bangla' | 'English' | 'Mathematics' | 'GK'>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggleExpand = (id: number) => {
    triggerHaptic('light');
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleRemove = (e: React.MouseEvent, q: Question) => {
    e.stopPropagation();
    triggerHaptic('medium');
    toggleBookmark(q);
  };

  const getSubjectName = (key: string) => {
    switch (key) {
      case 'GK': return t('gk') || 'સા. জ্ঞান';
      case 'Mathematics': return t('math') || 'গণিত';
      case 'English': return t('english') || 'ইংরেজি';
      case 'Bangla': return t('bangla') || 'বাংলা';
      default: return key;
    }
  };

  const getDifficultyName = (key: string) => {
    switch (key) {
      case 'Easy': return t('easy') || 'সহজ';
      case 'Medium': return t('medium') || 'মধ্যম';
      case 'Hard': return t('hard') || 'কঠিন';
      default: return key;
    }
  };

  const subjects = [
    { id: 'All', label: lang === 'bn' ? 'সব বিষয়' : 'All' },
    { id: 'Bangla', label: t('bangla') },
    { id: 'English', label: t('english') },
    { id: 'Mathematics', label: t('math') },
    { id: 'GK', label: t('gk') }
  ];

  const filteredQuestions = savedQuestions.filter(q => {
    const matchesSubject = selectedSubject === 'All' || q.subject === selectedSubject;
    const qText = renderMCQText(q.question).toLowerCase();
    const expText = renderMCQText(q.explanation).toLowerCase();
    const optText = q.options.map(o => renderMCQText(o.text)).join(' ').toLowerCase();
    const matchesSearch = qText.includes(searchQuery.toLowerCase()) || 
                          expText.includes(searchQuery.toLowerCase()) ||
                          optText.includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-8 transition-colors duration-300 animate-in fade-in duration-300 flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
        <div className="w-8"></div>
        <h1 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
          {lang === 'bn' ? 'সংরক্ষিত প্রশ্নসমূহ' : 'Saved Questions'}
        </h1>
        <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-full">
          {savedQuestions.length}
        </div>
      </header>

      {/* Search Input */}
      <div className="px-4 pb-2 pt-4">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-slate-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'সংরক্ষিত প্রশ্ন খুঁজুন...' : 'Search saved questions...'}
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl py-2.5 pl-9 pr-10 text-[13px] font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-500 transition shadow-xs"
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

      {/* Subject Filter Tabs */}
      <div className="flex px-4 py-2 gap-1.5 overflow-x-auto custom-scrollbar sticky top-[60px] z-10 transition-colors duration-300">
        {subjects.map(sub => (
          <button
            key={sub.id}
            onClick={() => { triggerHaptic('light'); setSelectedSubject(sub.id as any); }}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer active:scale-95 ${
              selectedSubject === sub.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 flex-1">
        <AnimatePresence mode="popLayout">
          {filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-xs overflow-hidden transition-colors duration-300"
              >
                {/* Accordion Trigger Header */}
                <div
                  onClick={() => handleToggleExpand(q.id)}
                  className="p-4 flex justify-between items-start gap-3 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex gap-2 items-center flex-wrap">
                      <span className="text-[9px] font-black bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {getSubjectName(q.subject)}
                      </span>
                      <span className="text-[9px] font-black bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {getDifficultyName(q.difficulty)}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                      {renderMCQText(q.question)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 self-center">
                    <button
                      onClick={(e) => handleRemove(e, q)}
                      className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center transition active:scale-95 cursor-pointer"
                      title={lang === 'bn' ? 'মুছে ফেলুন' : 'Remove Bookmark'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="text-slate-400 dark:text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/30 dark:bg-slate-950/30 space-y-3">
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = q.correctIndex === oIdx;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-lg text-xs font-bold flex justify-between items-center transition ${
                              isCorrect
                                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 border border-slate-150 dark:border-slate-800/80'
                            }`}
                          >
                            <span>{opt.label}. {renderMCQText(opt.text)}</span>
                            {isCorrect && (
                              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/55 text-emerald-700 dark:text-emerald-300 font-extrabold px-1.5 py-0.5 rounded uppercase">
                                {lang === 'bn' ? 'সঠিক' : 'Correct'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="bg-indigo-50/40 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-100/50 dark:border-indigo-900/30 text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
                        <span className="text-indigo-700 dark:text-indigo-400 font-bold block mb-1 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {lang === 'bn' ? 'ব্যাখ্যা' : 'Explanation'}
                        </span>
                        {renderMCQText(q.explanation)}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16 px-6 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md mx-auto shadow-xs">
            <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-indigo-900/30">
              <Bookmark className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
              {lang === 'bn' ? 'কোনো সংরক্ষিত প্রশ্ন নেই' : 'No saved questions'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed font-medium">
              {lang === 'bn'
                ? 'মক টেস্ট বা অনুশীলনের সময় কঠিন প্রশ্নগুলো সেভ করে পরবর্তীতে এখানে রিভিশন দিন।'
                : 'Bookmark difficult MCQ questions during exams to save and review them later.'}
            </p>
            <button
              onClick={() => { triggerHaptic('medium'); navigate('test'); }}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-wider px-5 py-3 rounded-xl shadow-xs hover:shadow-sm cursor-pointer transition active:scale-95"
            >
              {lang === 'bn' ? 'পরীক্ষা সেকশনে যান' : 'Go to Practice Exams'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
