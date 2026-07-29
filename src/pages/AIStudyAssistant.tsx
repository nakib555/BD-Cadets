import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';

export default function AIStudyAssistant() {
  const { goBack } = useRouter();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Cadet! I am your AI Study Assistant. I am here to help you prepare for the Cadet College Admission Test. You can ask me to explain a math formula, list GK topics, translate sentences, or quiz you on any topic!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Syllabus Details", text: "What is the detailed written syllabus for Cadet College Admission?" },
    { label: "Math Formulas", text: "Can you list the key algebraic formulas for the class 6 level?" },
    { label: "GK Quiz", text: "Ask me 3 GK questions about Bangladesh Affairs with options." },
    { label: "English Rules", text: "Explain the difference between transitive and intransitive verbs with examples." }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await response.json();
      if (response.ok && data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Sorry, I couldn\'t fetch a response. Please verify the server is running.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Could not connect to the server. Please ensure the server is configured and running.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300 animate-in fade-in duration-300 h-full flex flex-col relative">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800/80 shadow-sm shrink-0 transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isLoading ? 'bg-orange-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></div>
            <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">AI Cadet Instructor</h1>
          </div>
          <button className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center"><i className="fa-solid fa-robot text-xs"></i></button>
      </header>

      {/* Suggestion pills if there's only 1 message */}
      {messages.length === 1 && (
        <div className="px-4 pt-3 shrink-0">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">Quick Suggestions</p>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset, idx) => (
              <button 
                key={idx} 
                onClick={() => sendMessage(preset.text)}
                className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-[10px] p-2.5 text-left hover:border-blue-400 dark:hover:border-blue-500 transition cursor-pointer shadow-sm flex flex-col justify-between"
              >
                <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 mb-1">{preset.label}</span>
                <span className="text-[9px] text-slate-600 dark:text-slate-300 line-clamp-1">{preset.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28 custom-scrollbar">
          {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mr-2 mt-1">
                          <i className="fa-solid fa-robot text-[10px]"></i>
                      </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl p-3 text-[11px] font-medium leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 rounded-tl-none markdown-body'
                  }`}>
                      <div className="whitespace-pre-line">{msg.content}</div>
                  </div>
              </div>
          ))}
          {isLoading && (
              <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mr-2 mt-1">
                      <i className="fa-solid fa-robot text-[10px]"></i>
                  </div>
                  <div className="max-w-[85%] rounded-2xl p-3 text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-tl-none shadow-sm flex items-center gap-1.5">
                      <span>Thinking</span>
                      <span className="flex gap-0.5 mt-1">
                        <span className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </span>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 p-3 z-20 shrink-0 transition-colors duration-300">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-full px-3 py-1.5 focus-within:border-blue-400 dark:focus-within:border-blue-500 transition-colors">
              <button className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400 transition"><i className="fa-solid fa-hashtag text-xs"></i></button>
              <input 
                type="text" 
                value={input}
                disabled={isLoading}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={isLoading ? "AI is typing..." : "Ask a question..."} 
                className="flex-1 bg-transparent text-[11px] font-bold text-slate-800 dark:text-white focus:outline-none px-1 disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition ${input.trim() && !isLoading ? 'bg-blue-600 text-white cursor-pointer' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
              >
                  <i className="fa-solid fa-paper-plane text-[10px]"></i>
              </button>
          </div>
      </div>
    </div>
  );
}
