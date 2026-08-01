import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'motion/react';

type Language = 'bn' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  bn: {
    home: 'হোম',
    study: 'পড়াশোনা',
    test: 'পরীক্ষা',
    mock_test: 'মক টেস্ট',
    progress: 'অগ্রগতি',
    profile: 'প্রোফাইল',
    saved: 'সংরক্ষিত',
    daily_goal: 'দৈনিক লক্ষ্য',
    settings: 'সেটিংস',
    dark_mode: 'ডার্ক মোড',
    light_mode: 'লাইট মোড',
    language: 'ভাষা',
    cadet_prep: 'ক্যাডেট প্রস্তুতি',
    topics_completed: 'টপিক সম্পন্ন',
    study_streak: 'অধ্যয়ন ধারাবাহিকতা',
    tests_taken: 'মোট টেস্ট দেওয়া',
    avg_score: 'গড় নাম্বার',
    best_score: 'সেরা নাম্বার',
    days: 'দিন',
    notes: 'নোটসমূহ',
    past_papers: 'বিগত প্রশ্ন',
    bookmarks: 'বুকমার্ক',
    math: 'গণিত',
    english: 'ইংরেজি',
    bangla: 'বাংলা',
    general_knowledge: 'সা. জ্ঞান',
    start_study: 'পড়াশোনা শুরু করুন',
    take_test: 'মক টেস্ট দিন',
    view_details: 'বিস্তারিত',
    greeting_morning: 'শুভ সকাল, ক্যাডেট!',
    motto: 'আজকের শৃঙ্খলা, আগামীকালের নেতৃত্ব।',
    app_title: 'বিডি ক্যাডেট',
    hero_subtitle: 'প্রস্তুতি • অনুশীলন • সাফল্য',
    hero_desc: 'ক্যাডেট কলেজ ভর্তি প্রস্তুতির জন্য আপনার সম্পূর্ণ নির্ভরযোগ্য প্ল্যাটফর্ম',
    study_plan: 'স্টাডি প্ল্যান',
    quick_access: 'কুইক অ্যাক্সেস',
    subjects: 'বিষয়সমূহ',
    view_all: 'সব দেখুন',
    visual_smart_study: 'ভিজ্যুয়াল স্মার্ট স্টাডি',
    interactive_infographics: 'ইন্টারেক্টিভ ইনফোগ্রাফিক্স',
    special_lessons: '৩টি বিশেষ লেসন',
    photosynthesis_title: 'সালোকসংশ্লেষণ বিজ্ঞান',
    smart_visual: 'স্মার্ট ভিজিউয়াল',
    photosynthesis_desc: 'ধাপে ধাপে পাতার খাদ্য তৈরির প্রক্রিয়া অন্বেষণ করুন',
    bd_map_title: 'বাংলাদেশ মানচিত্র',
    interactive: 'ইন্টারেক্টিভ',
    bd_map_desc: 'বিভাগ, জেলা এবং দর্শনীয় স্থান অন্বেষণ করুন',
    padma_bridge_title: 'পদ্মা সেতু ইঞ্জিনিয়ারিং',
    simulator_quiz: 'সিমুলেটর ও কুইজ',
    padma_bridge_desc: 'নকশা পরীক্ষা, স্ট্রেস টেস্ট ও লাইভ কুইজ',
    daily_goal_tracker: 'দৈনিক লক্ষ্য ট্র্যাকার',
    daily_goal_tracker_desc: 'প্রতিদিনের পরিকল্পিত পড়াশোনার অগ্রগতি',
    topics: 'টপিক',
    goal_reached_msg: 'অভিনন্দন! আজকের দৈনিক লক্ষ্য সফলভাবে অর্জিত হয়েছে।',
    goal_remaining_msg_1: 'আজকের লক্ষ্য পূরণ করতে আর ',
    goal_remaining_msg_2: 'টি টপিক বা মক টেস্ট প্রয়োজন।',
    set_daily_goal: 'দৈনিক লক্ষ্যমাত্রা নির্ধারণ',
    topics_per_day: 'টপিক/দিন',
    activity_breakdown: 'আজকের পাঠদান ও টেস্ট হিসাব',
    read_notes: 'পঠিত নোটস',
    taken_tests: 'অংশগ্রহণকৃত টেস্ট',
    completed_count: 'টি সম্পন্ন',
    achieved: 'অর্জিত!',
    todays_cadet_prep: 'আজকের ক্যাডেট প্রস্তুতি',
    topic_completed: 'টপিক সম্পন্ন',
    notes_count: 'নোট',
    tests_count: 'টেস্ট',
    study_materials: 'পড়াশোনার উপাদান',
    search_notes: 'নোটসমূহ খুঁজুন...',
    search_past_papers: 'বিগত প্রশ্ন খুঁজুন...',
    search_bookmarks: 'বুকমার্ক খুঁজুন...',
    interactive_lessons: 'ইন্টারেক্টিভ পাঠসমূহ',
    new_feature: 'নতুন ফিচার',
    biology: 'জীববিজ্ঞান',
    photosynthesis: 'সালোকসংশ্লেষণ',
    interactive_infographic: 'ইন্টারেক্টিভ ইনফোগ্রাফিক',
    geography: 'ভূগোল',
    bd_map: 'বাংলাদেশ মানচিত্র',
    divisions_and_spots: 'বিভাগ এবং দর্শনীয় স্থান',
    gk: 'সাধারণ জ্ঞান',
    padma_bridge_infographic: 'পদ্মা সেতু ইনফোগ্রাফিক',
    interactive_double_deck: 'ইন্টারেক্টিভ দ্বিতল লেআউট ও কুইজ',
    read_completed: 'পড়া সম্পন্ন',
    mark_as_read: 'পড়া সম্পন্ন চিহ্নিত করুন',
    read: 'পড়েছি',
    completed: 'সম্পন্ন',
    result: 'মক টেস্টের ফলাফল',
    congrats: 'অভিনন্দন, ক্যাডেট!',
    keep_practicing: 'অনুশীলন চালিয়ে যাও, ক্যাডেট!',
    passed_msg: 'আপনি এই ডায়াগনস্টিক মক পরীক্ষায় উত্তীর্ণ হয়েছেন।',
    failed_msg: 'পরিশ্রমই সৌভাগ্যের প্রসূতি।',
    score_obtained: 'প্রাপ্ত নম্বর',
    accuracy: 'সঠিকতা',
    status: 'অবস্থা',
    passed: 'উত্তীর্ণ',
    failed: 'অনুত্তীর্ণ',
    retake_test: 'আবার পরীক্ষা দিন',
    dashboard: 'ড্যাশবোর্ড',
    review_answers: 'উত্তর ও ব্যাখ্যা পর্যালোচনা',
    question: 'প্রশ্ন',
    correct: 'সঠিক',
    wrong: 'ভুল',
    explanation_title: 'ব্যাখ্যা',
    ongoing_test: 'চলমান মক টেস্ট',
    end_test: 'পরীক্ষা শেষ করুন',
    subject_label: 'বিষয়: ',
    prev: 'পূর্ববর্তী',
    next: 'পরবর্তী',
    mark: 'চিহ্নিত করুন',
    marked: 'চিহ্নিত',
    submit_test: 'পরীক্ষা জমা দিন',
    all_subjects: 'সব বিষয়',
    search_topics: 'টপিক বা বিষয় খুঁজুন...',
    iq_ability: 'বুদ্ধিমত্তা',
    science: 'বিজ্ঞান',
    bd_affairs: 'বাংলাদেশ বিষয়াবলি',
    current_info: 'সাম্প্রতিক তথ্য',
    updates: 'আপডেট',
    tests_and_past_papers: 'মক টেস্ট এবং বিগত প্রশ্ন',
    all_tests: 'সব পরীক্ষা',
    full_mock_test: 'পূর্ণাঙ্গ মক টেস্ট',
    subject_test: 'বিষয়ভিত্তিক পরীক্ষা',
    marks: 'নম্বর',
    questions_count: 'টি প্রশ্ন',
    minutes: 'মিনিট',
    participants: 'অংশগ্রহণকারী',
    start: 'শুরু করুন',
    cadet_profile: 'ক্যাডেট প্রোফাইল',
    badges_and_stats: 'ব্যাজ এবং পরিসংখ্যান',
    rank_1: 'র‍্যাঙ্ক ১',
    save: 'সেভ করুন',
    cancel: 'বাতিল করুন',
    class_viii: 'অষ্টম শ্রেণি',
    gold_cadet: 'গোল্ড ক্যাডেট',
    keep_going_cadet: 'এগিয়ে যাও, ক্যাডেট!',
    top_10_percent: 'আপনি শীর্ষ ১০% শিক্ষার্থীদের মধ্যে আছেন।',
    total_cadet_points: 'মোট ক্যাডেট পয়েন্ট',
    pts: 'পয়েন্ট',
    badges: 'ব্যাজ',
    milestones: 'মাইলস্টোন',
    certificates: 'সনদপত্র',
    appearance_theme: 'থিম ও রূপ',
    global_dark_mode: 'গ্লোবাল ডার্ক মোড',
    enable_dark_mode_desc: 'মিডনাইট ক্যাডেট থিম লেআউট চালু করুন',
    midnight_theme_active: '🌙 মিডনাইট ক্যাডেট থিম চালু আছে',
    classic_theme_active: '☀️ ক্লাসিক ক্রিস্প লাইট থিম চালু আছে',
    language_and_sound: 'ভাষা ও শব্দ',
    study_language: 'অধ্যয়নের ভাষা',
    study_language_desc: 'গাইডের জন্য ভাষা নির্বাচন করুন',
    my_progress: 'আমার অগ্রগতি',
    summary_tab: 'সারসংক্ষেপ',
    subjects_tab: 'বিষয়সমূহ',
    tests_tab: 'পরীক্ষাসমূহ',
    analytics_tab: 'অ্যানালিটিক্স',
    overall_progress: 'সামগ্রিক অগ্রগতি',
    excellent_job: 'অসাধারণ কাজ!',
    mon: 'সোম',
    tue: 'মঙ্গল',
    wed: 'বুধ',
    thu: 'বৃহ',
    fri: 'শুক্র',
    sat: 'শনি',
    sun: 'রবি',
    total_tests: 'মোট পরীক্ষা',
    consistency: 'ধারাবাহিকতা',
    subject_performance: 'বিষয়ভিত্তিক পারফরম্যান্স',
    iq_and_mental_ability: 'আইকিউ ও মানসিক দক্ষতা',
    my_study_plan: 'আমার পড়ার পরিকল্পনা',
    mon_short: 'সোম',
    tue_short: 'মঙ্গল',
    wed_short: 'বুধ',
    thu_short: 'বৃহ',
    fri_short: 'শুক্র',
    sat_short: 'শনি',
    sun_short: 'রবি',
    morning: 'সকাল',
    evening: 'সন্ধ্যা',
    algebraic_expressions: 'বীজগাণিতিক রাশিমালা',
    vocab_grammar: 'শব্দভাণ্ডার ও ব্যাকরণ',
    bangladesh_affairs: 'বাংলাদেশ বিষয়াবলী',
    completed_task: 'সম্পন্ন',
    ongoing_task: 'চলমান',
    upcoming_task: 'আসন্ন',
    topics_lower: 'টপিক',
    easy: 'সহজ',
    medium: 'মধ্যম',
    hard: 'কঠিন',
    bangla_icon_char: 'অ',
  },
  en: {
    home: 'Home',
    study: 'Study',
    test: 'Exam',
    mock_test: 'Mock Test',
    progress: 'Progress',
    profile: 'Profile',
    saved: 'Saved',
    daily_goal: 'Daily Goal',
    settings: 'Settings',
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    language: 'Language',
    cadet_prep: 'Cadet Prep',
    topics_completed: 'Topics Completed',
    study_streak: 'Study Streak',
    tests_taken: 'Tests Taken',
    avg_score: 'Avg Score',
    best_score: 'Best Score',
    days: 'Days',
    notes: 'Notes',
    past_papers: 'Past Papers',
    bookmarks: 'Bookmarks',
    math: 'Math',
    english: 'English',
    bangla: 'Bangla',
    general_knowledge: 'Gen. Knowledge',
    start_study: 'Start Studying',
    take_test: 'Take Test',
    view_details: 'Details',
    greeting_morning: 'Good Morning, Cadet!',
    motto: 'Today\'s Discipline, Tomorrow\'s Leadership.',
    app_title: 'BD Cadet',
    hero_subtitle: 'PREP • PRACTICE • SUCCESS',
    hero_desc: 'Your complete reliable platform for Cadet College admission prep',
    study_plan: 'Study Plan',
    quick_access: 'Quick Access',
    subjects: 'Subjects',
    view_all: 'View All',
    visual_smart_study: 'Visual Smart Study',
    interactive_infographics: 'Interactive Infographics',
    special_lessons: '3 Special Lessons',
    photosynthesis_title: 'Photosynthesis Science',
    smart_visual: 'Smart Visual',
    photosynthesis_desc: 'Explore the step-by-step leaf food making process',
    bd_map_title: 'Bangladesh Map',
    interactive: 'Interactive',
    bd_map_desc: 'Explore divisions, districts and tourist spots',
    padma_bridge_title: 'Padma Bridge Engineering',
    simulator_quiz: 'Simulator & Quiz',
    padma_bridge_desc: 'Design test, stress test and live quiz',
    daily_goal_tracker: 'Daily Goal Tracker',
    daily_goal_tracker_desc: 'Daily planned study progress',
    topics: 'Topics',
    goal_reached_msg: 'Congratulations! Today\'s daily goal has been successfully achieved.',
    goal_remaining_msg_1: 'You need ',
    goal_remaining_msg_2: ' more topics or mock tests to reach today\'s goal.',
    set_daily_goal: 'Set Daily Target',
    topics_per_day: 'Topics/Day',
    activity_breakdown: 'Today\'s Study & Test Breakdown',
    read_notes: 'Read Notes',
    taken_tests: 'Taken Tests',
    completed_count: ' Completed',
    achieved: 'Achieved!',
    todays_cadet_prep: 'Today\'s Cadet Prep',
    topic_completed: 'Topic Completed',
    notes_count: 'Notes',
    tests_count: 'Tests',
    study_materials: 'Study Materials',
    search_notes: 'Search notes...',
    search_past_papers: 'Search past papers...',
    search_bookmarks: 'Search bookmarks...',
    interactive_lessons: 'Interactive Lessons',
    new_feature: 'New Feature',
    biology: 'Biology',
    photosynthesis: 'Photosynthesis',
    interactive_infographic: 'Interactive Infographic',
    geography: 'Geography',
    bd_map: 'Bangladesh Map',
    divisions_and_spots: 'Divisions and Tourist Spots',
    gk: 'Gen. Knowledge',
    padma_bridge_infographic: 'Padma Bridge Infographic',
    interactive_double_deck: 'Interactive double-deck layout & quiz',
    read_completed: 'Read',
    mark_as_read: 'Mark as read',
    read: 'Read',
    completed: 'Done',
    result: 'Mock Test Result',
    congrats: 'Congratulations, Cadet!',
    keep_practicing: 'Keep practicing, Cadet!',
    passed_msg: 'You have passed this diagnostic mock test.',
    failed_msg: 'Industry is the key to success.',
    score_obtained: 'Score Obtained',
    accuracy: 'Accuracy',
    status: 'Status',
    passed: 'Passed',
    failed: 'Failed',
    retake_test: 'Retake Test',
    dashboard: 'Dashboard',
    review_answers: 'Review Answers & Explanations',
    question: 'Question',
    correct: 'Correct',
    wrong: 'Wrong',
    explanation_title: 'Explanation',
    ongoing_test: 'Ongoing Mock Test',
    end_test: 'End Test',
    subject_label: 'Subject: ',
    prev: 'Previous',
    next: 'Next',
    mark: 'Mark',
    marked: 'Marked',
    submit_test: 'Submit Test',
    all_subjects: 'All Subjects',
    search_topics: 'Search topics, subjects...',
    iq_ability: 'IQ Ability',
    science: 'Science',
    bd_affairs: 'BD Affairs',
    current_info: 'Current Info',
    updates: 'Updates',
    tests_and_past_papers: 'Mock Tests & Past Papers',
    all_tests: 'All Tests',
    full_mock_test: 'Full Mock Test',
    subject_test: 'Subject Test',
    marks: 'Marks',
    questions_count: 'Questions',
    minutes: 'Minutes',
    participants: 'Participants',
    start: 'Start',
    cadet_profile: 'Cadet Profile',
    badges_and_stats: 'Badges & Stats',
    rank_1: 'Rank 1',
    save: 'Save',
    cancel: 'Cancel',
    class_viii: 'Class VIII',
    gold_cadet: 'Gold Cadet',
    keep_going_cadet: 'Keep Going, Cadet!',
    top_10_percent: 'You\'re in the top 10% of all learners.',
    total_cadet_points: 'Total Cadet Points',
    pts: 'PTS',
    badges: 'Badges',
    milestones: 'Milestones',
    certificates: 'Certificates',
    appearance_theme: 'Appearance & Theme',
    global_dark_mode: 'Global Dark Mode',
    enable_dark_mode_desc: 'Enable midnight cadet theme layout',
    midnight_theme_active: '🌙 Midnight Cadet Theme is Active',
    classic_theme_active: '☀️ Classic Crisp Light Theme is Active',
    language_and_sound: 'Language & Sound',
    study_language: 'Study Language',
    study_language_desc: 'Choose language for guides',
    my_progress: 'My Progress',
    summary_tab: 'Summary',
    subjects_tab: 'Subjects',
    tests_tab: 'Tests',
    analytics_tab: 'Analytics',
    overall_progress: 'Overall Progress',
    excellent_job: 'Excellent Job!',
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    total_tests: 'Total Tests',
    consistency: 'Consistency',
    subject_performance: 'Subject Performance',
    iq_and_mental_ability: 'IQ & Mental Ability',
    my_study_plan: 'My Study Plan',
    mon_short: 'Mon',
    tue_short: 'Tue',
    wed_short: 'Wed',
    thu_short: 'Thu',
    fri_short: 'Fri',
    sat_short: 'Sat',
    sun_short: 'Sun',
    morning: 'Morning',
    evening: 'Evening',
    algebraic_expressions: 'Algebraic Expressions',
    vocab_grammar: 'Vocabulary & Grammar',
    bangladesh_affairs: 'Bangladesh Affairs',
    completed_task: 'Completed',
    ongoing_task: 'Ongoing',
    upcoming_task: 'Upcoming',
    topics_lower: 'topics',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    bangla_icon_char: 'A',
  },
};

export type AnimationPhase = 'idle' | 'out' | 'in';

interface LanguageContextType {
  lang: Language;
  phase: AnimationPhase;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bn',
  phase: 'idle',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('bn');
  const [phase, setPhase] = useState<AnimationPhase>('idle');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_lang') as Language;
    if (savedLang && (savedLang === 'bn' || savedLang === 'en')) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    if (newLang === lang || phase !== 'idle') return;

    setPhase('out');

    setTimeout(() => {
      setLangState(newLang);
      localStorage.setItem('app_lang', newLang);
      document.documentElement.lang = newLang;
      setPhase('in');

      setTimeout(() => {
        setPhase('idle');
      }, 250);
    }, 180);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, phase, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function T({ 
  id, 
  children, 
  className,
  ...props 
}: { 
  id?: string; 
  children?: React.ReactNode; 
  className?: string;
  [key: string]: any;
}) {
  const { lang, phase } = useLanguage();
  
  let content: React.ReactNode = '';
  if (id) {
    content = translations[lang]?.[id] || id;
  } else if (typeof children === 'string') {
    content = translations[lang]?.[children] || children;
  } else {
    content = children;
  }

  const variants = {
    idle: {
      opacity: 1,
      scale: 1,
      z: 0,
      y: 0,
      filter: 'blur(0px)',
    },
    out: {
      opacity: 0,
      scale: 0.88,
      z: -20,
      y: 3,
      filter: 'blur(2px)',
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 1, 1], // easeIn
      },
    },
    in: {
      opacity: 1,
      scale: 1,
      z: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.22,
        ease: [0, 0, 0.2, 1], // easeOut
      },
    },
  };

  return (
    <motion.span
      className={className}
      animate={phase}
      variants={variants}
      initial="idle"
      style={{ display: 'inline-block', perspective: 1000 }}
      {...props}
    >
      {content}
    </motion.span>
  );
}
