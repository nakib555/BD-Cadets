import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';

export default function TestList() {
  const { goBack, navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('All Tests');
  const tabs = ['All Tests', 'Mathematics', 'English', 'Bangla', 'General Knowledge (GK)'];

  const tests = [
    { title: 'Cadet College Admission Test 2023', type: 'Full Mock Test', qns: 100, time: '120 min', taken: '12.5K', icon: 'fa-solid fa-trophy', bg: 'bg-orange-50', color: 'text-orange-500' },
    { title: 'Previous Year Math Test 2022', type: 'Subject Test', qns: 50, time: '60 min', taken: '8.7K', icon: 'fa-solid fa-star', bg: 'bg-purple-50', color: 'text-purple-500' },
    { title: 'General Knowledge Full Mock Test', type: 'Mock Test', qns: 100, time: '120 min', taken: '6.3K', icon: 'fa-solid fa-crown', bg: 'bg-blue-50', color: 'text-blue-500' },
  ];

  return (
    <div className="bg-slate-50 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
          <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-bold text-slate-900">Mock Tests & Past Papers</h1>
          <button className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center"><i className="fa-solid fa-trophy text-xs"></i></button>
      </header>

      {/* Tabs */}
      <div className="bg-white flex px-4 pt-3 pb-3 gap-2 overflow-x-auto custom-scrollbar border-b border-slate-100 sticky top-[60px] z-10">
          {tabs.map(tab => (
              <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-bold transition-colors ${
                      activeTab === tab 
                       ? 'bg-slate-900 text-white' 
                       : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}
              >
                  {tab}
              </button>
          ))}
      </div>

      {/* Test List */}
      <div className="p-4 space-y-4">
          {tests.map((test, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors cursor-pointer" onClick={() => navigate('test-active')}>
                  <div className="flex justify-between items-start">
                      <div className="flex-1 pr-4">
                          <span className="text-[8px] font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-wider">{test.type}</span>
                          <h2 className="text-[12px] font-bold text-slate-900 mt-2 mb-1 leading-snug">{test.title}</h2>
                          <p className="text-[9px] text-slate-500">{test.qns} Marks • {test.qns} Questions</p>
                      </div>
                      <div className={`w-12 h-12 ${test.bg} rounded-xl flex items-center justify-center shrink-0`}>
                          <i className={`${test.icon} ${test.color} text-xl`}></i>
                      </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                      <div className="flex gap-4 text-[9px] text-slate-500 font-bold">
                          <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> {test.time}</span>
                          <span className="flex items-center gap-1"><i className="fa-solid fa-users"></i> {test.taken} Taken</span>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); navigate('test-active'); }} className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg transition-colors">
                          Start Test
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
