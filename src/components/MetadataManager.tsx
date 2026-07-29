import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import cadetsSplash from '../assets/images/cadets_splash_1785297743949.jpg';

interface PageMetadata {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  ogType?: string;
}

const METADATA_MAP: Record<string, PageMetadata> = {
  home: {
    title: 'BD Cadets - Cadet College Prep Master',
    description: "Bangladesh's premium Cadet College admission preparation application. Prepare, Practice, and Achieve your dreams!",
    ogTitle: 'BD Cadets Preparation Platform',
    ogDescription: 'Master English, Mathematics, Science & General Knowledge with interactive syllabus modules and daily MCQ practice.',
  },
  study: {
    title: 'Study Hub - Master Cadet Syllabus',
    description: 'Master Cadet College admission syllabus with structured subject topics, worksheets, and explanatory science visuals.',
    ogTitle: 'Cadet College Prep Study Hub',
    ogDescription: 'Learn comprehensively with expert-compiled materials tailored specifically to match previous cadet admission patterns.',
  },
  test: {
    title: 'Model Tests - Solve Admission Questions',
    description: 'Practice time-bound MCQ tests, solve complete question patterns, and analyze your performance dynamically.',
    ogTitle: 'Model Exams & Practice Tests',
    ogDescription: 'Challenge your readiness with time-bound sample tests, previous years question papers, and live leaderboard metrics.',
  },
  'test-active': {
    title: 'Active Cadet Admission Mock Exam',
    description: 'Live test environment. Keep track of the timer, double-check your answers, and review explanatory comments on finish.',
    ogTitle: 'Live Mock Examination Page',
    ogDescription: 'Solve subject-specific questions with a running countdown and track live scoring.',
  },
  progress: {
    title: 'Performance & Progress Dashboard',
    description: 'Track subject accuracy rates, study streaks, syllabus percentage milestones, and GK topic status.',
    ogTitle: 'BD Cadets Performance Analytics',
    ogDescription: 'Identify learning gaps, trace continuous improvements, and boost preparation strategies.',
  },
  profile: {
    title: 'Achievements & Badge Cabinet',
    description: 'View custom badges, rank promotions, admission eligibility reports, and certificates earned on the platform.',
    ogTitle: 'Student Preparation Accomplishments',
    ogDescription: 'Earn visual medals and cadet rank badges as you master chapters and pass custom mock exams.',
  },
  achievements: {
    title: 'Achievements & Honors | BD Cadets',
    description: 'Celebrate your academic journey with unlocked rewards, scorecards, and custom-designed rank progress reports.',
    ogTitle: 'Unlocking Academic Milestones',
    ogDescription: 'Collect master cadet honors, pass topic benchmarks, and claim certificates.',
  },
  'study-plan': {
    title: 'Personalized Study Planner & Routine',
    description: 'Get a calculated daily routing schedule optimized to balance preparation across four key admission subjects.',
    ogTitle: 'Dynamic Cadet Admission Study Plan',
    ogDescription: 'Follow custom study schedules created automatically to manage and guide your prep goals.',
  },
  'all-subjects': {
    title: 'Syllabus Subjects Explorer',
    description: 'Dive deep into core chapters of English, Bangla, Mathematics, and General Knowledge tailored for cadet tests.',
    ogTitle: 'Subject Wise Chapter Explorer',
    ogDescription: 'Explore comprehensive theory classes, study notes, formula lists, and practice drills for all admission subjects.',
  },
  'interactive-map': {
    title: 'Bangladesh Cadet Colleges Interactive Map',
    description: 'Explore the geolocation, histories, and features of all 12 prestigious Cadet Colleges across Bangladesh.',
    ogTitle: 'Cadet Colleges Map & Location Guide',
    ogDescription: 'Discover geographic profiles, campus profiles, and complete contact details of the 12 cadet academies.',
  },
  photosynthesis: {
    title: 'Photosynthesis Lab - Interactive Science Module',
    description: 'Explore light absorption, carbon dioxide cycles, and chemical formulas with the interactive photosynthesis simulator.',
    ogTitle: 'Interactive Science Simulation',
    ogDescription: 'Understand chlorophyll reactions, light energy processes, and test your knowledge with a built-in quiz.',
  },
  'padma-bridge': {
    title: 'Padma Bridge - Mobile Infographic & GK',
    description: 'View structural specs, double-decker roadway features, and test your GK with the interactive trivia quiz.',
    ogTitle: 'Padma Bridge Double-Decker Technical Specs',
    ogDescription: "A comprehensive, beautifully fluid mobile infographic dedicated to Bangladesh's national dream multipurpose structure.",
  }
};

export default function MetadataManager() {
  const { currentRoute } = useRouter();
  const path = currentRoute.path || 'home';
  const meta = METADATA_MAP[path] || METADATA_MAP.home;

  const title = meta.title;
  const description = meta.description;
  const ogTitle = meta.ogTitle;
  const ogDescription = meta.ogDescription;
  const ogImage = meta.ogImage || cadetsSplash;
  const ogType = meta.ogType || 'website';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    // Dynamic imperical injection to absolute head to guarantee tags exist & stay in sync
    document.title = title;

    const updateMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);

    // Open Graph
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', ogTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', ogDescription);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);

    // Twitter
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', ogTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', ogDescription);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

  }, [title, description, ogTitle, ogDescription, ogImage, ogType, currentUrl]);

  // Using React 19's native hoisting mechanism alongside our useEffect guarantees 100% SEO indexing compatibility
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
