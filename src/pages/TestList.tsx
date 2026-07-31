import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage, T } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';

export default function TestList() {
  const { goBack, navigate } = useRouter();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('all_tests');
  const tabs = ['all_tests', 'math', 'english', 'bangla', 'gk'];
  const [savedTests, setSavedTests] = useState<any[]>([]);

  useEffect(() => {
    try {
      // Load saved tests from the new key
      const saved = localStorage.getItem('cadet_saved_tests_v1');
      if (saved) {
        const testsObj = JSON.parse(saved);
        const testsArray = Object.values(testsObj).sort((a: any, b: any) => b.lastUpdated - a.lastUpdated);
        setSavedTests(testsArray);
      }
    } catch (e) {}
  }, []);

  const handleResumeTest = (sessionId: string) => {
    triggerHaptic('medium');
    navigate('test-active', { isNewTest: false, sessionId });
  };

  const tests = [
    { id: 'mock_2023', title: lang === 'bn' ? 'ক্যাডেট কলেজ ভর্তি মক টেস্ট ২০২৩' : 'Cadet College Admission Mock 2023', type: t('full_mock_test'), qns: 100, time: `120 ${t('minutes')}`, taken: '12.5k', icon: 'fa-solid fa-trophy', bg: 'bg-orange-50 dark:bg-orange-950/30', color: 'text-orange-500 dark:text-orange-400', subject: 'All' },
    { id: 'math_2022', title: lang === 'bn' ? 'বিগত বছরের গণিত পরীক্ষা ২০২২' : 'Past Math Test 2022', type: t('subject_test'), qns: 50, time: `60 ${t('minutes')}`, taken: '8.7k', icon: 'fa-solid fa-star', bg: 'bg-purple-50 dark:bg-purple-950/30', color: 'text-purple-500 dark:text-purple-400', subject: 'Mathematics' },
    { id: 'gk_full', title: lang === 'bn' ? 'সাধারণ জ্ঞান পূর্ণাঙ্গ মক টেস্ট' : 'GK Full Mock Test', type: t('full_mock_test'), qns: 100, time: `120 ${t('minutes')}`, taken: '6.3k', icon: 'fa-solid fa-crown', bg: 'bg-blue-50 dark:bg-blue-950/30', color: 'text-blue-500 dark:text-blue-400', subject: 'GK' },
  ];

  const handleStartSetup = (test: any) => {
    navigate('test-config', { test });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300 relative">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider"><T id="tests_and_past_papers" /></h1>
          <button className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-trophy text-xs"></i>
          </button>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-950 flex px-4 pt-3 pb-3 gap-2 overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800/60 sticky top-[60px] z-10 transition-colors duration-300">
          {tabs.map(tab => (
              <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === tab 
                       ? 'bg-blue-600 text-white shadow-sm' 
                       : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                  }`}
              >
                  <T id={tab} />
              </button>
          ))}
      </div>

      {savedTests.length > 0 && (
        <div className="px-4 mt-4 space-y-3">
          <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider"><T>{lang === 'bn' ? 'অসমাপ্ত পরীক্ষাগুলো' : 'Resume Unfinished Tests'}</T></h3>
          {savedTests.map((savedTest) => (
            <div key={savedTest.sessionId} className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-4 rounded-xl flex justify-between items-center shadow-sm">
              <div>
                <p className="text-[11px] font-black text-amber-900 dark:text-amber-400 mt-1"><T>{savedTest.testTitle || (lang === 'bn' ? 'চলমান পরীক্ষা' : 'Ongoing Test')}</T></p>
                <p className="text-[10px] font-bold text-amber-700 dark:text-amber-500 mt-1"><T>{(savedTest.currentIdx || 0) + 1}/{savedTest.questions?.length || 0} {lang === 'bn' ? 'প্রশ্ন সম্পন্ন' : 'Completed'}</T></p>
              </div>
              <button onClick={() => handleResumeTest(savedTest.sessionId)} className="bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] uppercase px-4 py-2 rounded-lg cursor-pointer transition">
                <T>{lang === 'bn' ? 'চালিয়ে যান' : 'Resume'}</T>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Test List */}
      <div className="p-4 space-y-4">
          {tests.map((test, i) => (
              <div 
                  key={i}
                  id={`test-card-${i}`}
                  className="bg-white dark:bg-slate-950 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-blue-200 dark:hover:border-blue-500/50 transition duration-300 cursor-pointer" 
                  onClick={() => handleStartSetup(test)}
              >
                  <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                          <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-[10px] uppercase tracking-wider"><T>{test.type}</T></span>
                          <h2 className="text-[14px] font-black text-slate-900 dark:text-white mt-2 mb-1 leading-snug tracking-wide"><T>{test.title}</T></h2>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">{test.qns} <T id="marks" /> • {test.qns} <T id="questions_count" /></p>
                      </div>
                      <div className={`w-12 h-12 ${test.bg} border border-slate-200 dark:border-slate-800 rounded-[10px] flex items-center justify-center shrink-0`}>
                          <i className={`${test.icon} ${test.color} text-[20px]`}></i>
                      </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60 flex justify-between items-center">
                      <div className="flex gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1"><i className="fa-regular fa-clock text-[14px]"></i> {test.time}</span>
                          <span className="flex items-center gap-1"><i className="fa-solid fa-users text-[14px]"></i> {test.taken} <T id="participants" /></span>
                      </div>
                      <button 
                          onClick={(e) => { e.stopPropagation(); handleStartSetup(test); }} 
                          className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-[10px] cursor-pointer transition-colors duration-300"
                      >
                          <T id="start" />
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
