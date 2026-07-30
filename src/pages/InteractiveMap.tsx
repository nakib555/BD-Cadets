import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CadetCollege {
  name: string;
  location: string;
  type: 'Boys' | 'Girls';
  est: number;
  coords: [number, number];
}

interface DivisionData {
  id: string;
  name: string;
  bnName: string;
  color: string;
  coords: [number, number];
  districts: number;
  area: string;
  majorRivers: string[];
  colleges: CadetCollege[];
  gkQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const DIVISIONS: DivisionData[] = [
  {
    id: 'dhaka',
    name: 'Dhaka Division',
    bnName: 'ঢাকা বিভাগ',
    color: 'bg-red-500',
    coords: [23.8103, 90.4125],
    districts: 13,
    area: '২০,৫০৮ বর্গ কিমি',
    majorRivers: ['পদ্মা', 'মেঘনা', 'যমুনা', 'বুড়িগঙ্গা'],
    colleges: [
      { name: 'মির্জাপুর ক্যাডেট কলেজ', location: 'টাঙ্গাইল', type: 'Boys', est: 1965, coords: [24.3732, 90.1557] },
      { name: 'ময়মনসিংহ গার্লস ক্যাডেট কলেজ', location: 'ময়মনসিংহ', type: 'Girls', est: 1984, coords: [24.7471, 90.4203] }
    ],
    gkQuiz: {
      question: "কোন নদীটি ঢাকা শহরের পাশ দিয়ে প্রবাহিত হয়েছে?",
      options: ["পদ্মা", "মেঘনা", "বুড়িগঙ্গা", "যমুনা"],
      correctIndex: 2,
      explanation: "বুড়িগঙ্গা নদী বাংলাদেশের রাজধানী ঢাকা শহরের দক্ষিণ পাশ দিয়ে প্রবাহিত হয়েছে।"
    }
  },
  {
    id: 'chattogram',
    name: 'Chattogram Division',
    bnName: 'চট্টগ্রাম বিভাগ',
    color: 'bg-emerald-500',
    coords: [22.3569, 91.7832],
    districts: 11,
    area: '৩৩,৯০৮ বর্গ কিমি',
    majorRivers: ['কর্ণফুলী', 'হালদা', 'সাঙ্গু', 'ফেনী'],
    colleges: [
      { name: 'ফৌজদারহাট ক্যাডেট কলেজ', location: 'চট্টগ্রাম', type: 'Boys', est: 1958, coords: [22.4042, 91.7163] },
      { name: 'কুমিল্লা ক্যাডেট কলেজ', location: 'কুমিল্লা', type: 'Boys', est: 1983, coords: [23.4350, 91.1378] },
      { name: 'ফেনী গার্লস ক্যাডেট কলেজ', location: 'ফেনী', type: 'Girls', est: 2006, coords: [23.0016, 91.4050] }
    ],
    gkQuiz: {
      question: "বাংলাদেশে প্রতিষ্ঠিত সর্বপ্রথম ক্যাডেট কলেজ কোনটি ছিল?",
      options: ["ঝিনাইদহ ক্যাডেট কলেজ", "ফৌজদারহাট ক্যাডেট কলেজ", "মির্জাপুর ক্যাডেট কলেজ", "রাজশাহী ক্যাডেট কলেজ"],
      correctIndex: 1,
      explanation: "ফৌজদারহাট ক্যাডেট কলেজ ১৯৫৮ সালে চট্টগ্রামে প্রতিষ্ঠিত হয়, যা দেশের সর্বপ্রথম ক্যাডেট কলেজ।"
    }
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi Division',
    bnName: 'রাজশাহী বিভাগ',
    color: 'bg-orange-500',
    coords: [24.3745, 88.6042],
    districts: 8,
    area: '১৮,১৭৪ বর্গ কিমি',
    majorRivers: ['পদ্মা', 'যমুনা', 'আত্রাই', 'মহানন্দা'],
    colleges: [
      { name: 'রাজশাহী ক্যাডেট কলেজ', location: 'সারদাহ', type: 'Boys', est: 1966, coords: [24.2882, 88.7118] },
      { name: 'জয়পুরহাট গার্লস ক্যাডেট কলেজ', location: 'জয়পুরহাট', type: 'Girls', est: 2006, coords: [25.0972, 89.0269] }
    ],
    gkQuiz: {
      question: "বরেন্দ্র গবেষণা জাদুঘর কোথায় অবস্থিত?",
      options: ["ঢাকা", "সিলেট", "রাজশাহী", "বগুড়া"],
      correctIndex: 2,
      explanation: "বরেন্দ্র গবেষণা জাদুঘরটি রাজশাহী শহরের প্রাণকেন্দ্রে অবস্থিত এবং এটি বাংলাদেশের প্রাচীনতম জাদুঘর।"
    }
  },
  {
    id: 'khulna',
    name: 'Khulna Division',
    bnName: 'খুলনা বিভাগ',
    color: 'bg-blue-500',
    coords: [22.8456, 89.5403],
    districts: 10,
    area: '২২,২৮৪ বর্গ কিমি',
    majorRivers: ['রূপসা', 'ভৈরব', 'কপোতাক্ষ', 'পশুর'],
    colleges: [
      { name: 'ঝিনাইদহ ক্যাডেট কলেজ', location: 'ঝিনাইদহ', type: 'Boys', est: 1963, coords: [23.5186, 89.1764] }
    ],
    gkQuiz: {
      question: "ইউনেস্কো ওয়ার্ল্ড হেরিটেজ घोषित কোন বনটি খুলনা বিভাগে অবস্থিত?",
      options: ["সাজেক ভ্যালি", "সুন্দরবন", "রাতারগুল সোয়াম্প ফরেস্ট", "বিছনাকান্দি"],
      correctIndex: 1,
      explanation: "সুন্দরবন হলো বিশ্বের বৃহত্তম ম্যানগ্রোভ বন এবং ইউনেস্কো হেরিটেজ সাইট, যা খুলনা বিভাগে অবস্থিত।"
    }
  },
  {
    id: 'barishal',
    name: 'Barishal Division',
    bnName: 'বরিশাল বিভাগ',
    color: 'bg-purple-500',
    coords: [22.7010, 90.3535],
    districts: 6,
    area: '১৩,২২৫ বর্গ কিমি',
    majorRivers: ['কীর্তনখোলা', 'মেঘনা', 'পায়রা', 'তেঁতুলিয়া'],
    colleges: [
      { name: 'বরিশাল ক্যাডেট কলেজ', location: 'বাবুগঞ্জ', type: 'Boys', est: 1981, coords: [22.8122, 90.3128] }
    ],
    gkQuiz: {
      question: "ঐতিহাসিকভাবে কোন শহরটিকে 'বাংলার শস্যভাণ্ডার' বলা হয়?",
      options: ["সিলেট", "চট্টগ্রাম", "বরিশাল", "রংপুর"],
      correctIndex: 2,
      explanation: "অত্যধিক ধান উৎপাদনের কারণে বরিশালকে ঐতিহাসিকভাবে 'বাংলার শস্যভাণ্ডার' বলা হয়ে থাকে।"
    }
  },
  {
    id: 'sylhet',
    name: 'Sylhet Division',
    bnName: 'সিলেট বিভাগ',
    color: 'bg-pink-500',
    coords: [24.8949, 91.8687],
    districts: 4,
    area: '১২,২৯৮ বর্গ কিমি',
    majorRivers: ['সুরমা', 'কুশিয়ারা', 'মনু', 'খোয়াই'],
    colleges: [
      { name: 'সিলেট ক্যাডেট কলেজ', location: 'সিলেট', type: 'Boys', est: 1978, coords: [24.9392, 91.8744] }
    ],
    gkQuiz: {
      question: "সিলেটের বৃহত্তম প্রাকৃতিক মিষ্টি পানির জলাবন কোনটি?",
      options: ["সুন্দরবন", "রাতারগুল", "ভাওয়াল", "মধুপুর"],
      correctIndex: 1,
      explanation: "রাতারগুল সোয়াম্প ফরেস্ট হলো বাংলাদেশের একমাত্র সুপেয় পানির জলাবন, যা সিলেটে অবস্থিত।"
    }
  },
  {
    id: 'rangpur',
    name: 'Rangpur Division',
    bnName: 'রংপুর বিভাগ',
    color: 'bg-teal-500',
    coords: [25.7558, 89.2444],
    districts: 8,
    area: '১৬,১৮৪ বর্গ কিমি',
    majorRivers: ['তিস্তা', 'ধরলা', 'যমুনা', 'করতোয়া'],
    colleges: [
      { name: 'রংপুর ক্যাডেট কলেজ', location: 'রংপুর', type: 'Boys', est: 1979, coords: [25.7335, 89.2238] }
    ],
    gkQuiz: {
      question: "রংপুর শহরে কোন ঐতিহাসিক রাজপ্রাসাদটি অবস্থিত?",
      options: ["আহসান মঞ্জিল", "তাজহাট রাজবাড়ী", "উত্তরা গণভবন", "লালবাগ কেল্লা"],
      correctIndex: 1,
      explanation: "তাজহাট রাজবাড়ী রংপুর শহরের তাজহাটে অবস্থিত একটি ঐতিহাসিক রাজপ্রাসাদ, যা মহারাজা কুমার গোপাল লাল রায় নির্মাণ করেছিলেন।"
    }
  }
];

interface LandmarkData {
  name: string;
  bnName: string;
  coords: [number, number];
  description: string;
  bnDescription: string;
  icon: string;
}

const LANDMARKS: LandmarkData[] = [
  {
    name: 'Padma Bridge',
    bnName: 'পদ্মা সেতু',
    coords: [23.4471, 90.2642],
    description: 'The longest bridge in Bangladesh, connecting Mawa and Janjira across the Padma River.',
    bnDescription: 'পদ্মা নদীর ওপর মাওয়া ও জাজিরাকে সংযোগকারী বাংলাদেশের দীর্ঘতম বহুমুখী সেতু। এটি বাংলাদেশের আত্মমর্যাদা ও সামর্থ্যের প্রতীক।',
    icon: 'fa-solid fa-bridge'
  },
  {
    name: 'Sundarbans',
    bnName: 'সুন্দরবন',
    coords: [21.9497, 89.1833],
    description: 'The largest mangrove forest in the world and home to the Royal Bengal Tiger.',
    bnDescription: 'বিশ্বের বৃহত্তম ম্যানগ্রোভ বন এবং রয়্যাল বেঙ্গল টাইগারের আবাসস্থল, যা ইউনেস্কো কর্তৃক হেরিটেজ ঘোষিত।',
    icon: 'fa-solid fa-tree'
  },
  {
    name: 'Cox\'s Bazar Beach',
    bnName: 'কক্সবাজার সমুদ্র সৈকত',
    coords: [21.4272, 91.9705],
    description: 'The longest unbroken natural sandy sea beach in the world.',
    bnDescription: 'বিশ্বের দীর্ঘতম অখণ্ডিত প্রাকৃতিক বালুকাময় সমুদ্র সৈকত, যার দৈর্ঘ্য প্রায় ১২০ কিলোমিটার।',
    icon: 'fa-solid fa-umbrella-beach'
  },
  {
    name: 'National Shaheed Minar',
    bnName: 'জাতীয় শহীদ মিনার',
    coords: [23.7275, 90.3980],
    description: 'Monument in Dhaka commemorating those killed during the Bengali Language Movement of 1952.',
    bnDescription: '১৯৫২ সালের মহান ভাষা আন্দোলনের অমর শহীদদের স্মরণে নির্মিত জাতীয় স্মৃতিসৌধ।',
    icon: 'fa-solid fa-monument'
  },
  {
    name: 'National Martyrs\' Memorial',
    bnName: 'জাতীয় স্মৃতিসৌধ',
    coords: [23.9113, 90.2526],
    description: 'National monument of Bangladesh is the symbol in the memory of the valour and the sacrifice of all those who gave their lives in the Bangladesh Liberation War of 1971.',
    bnDescription: '১৯৭১ সালের মহান মুক্তিযুদ্ধে প্রাণউৎসর্গকারী বীর শহীদদের স্মরণে সাভারে নির্মিত জাতীয় স্মৃতিসৌধ।',
    icon: 'fa-solid fa-monument'
  }
];

export default function InteractiveMap() {
  const { goBack } = useRouter();
  const { userData, setUserData } = useData();
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'divisions' | 'districts' | 'landmarks'>('divisions');
  const [selectedDiv, setSelectedDiv] = useState<DivisionData>(DIVISIONS[0]);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [earnedPoints, setEarnedPoints] = useState<boolean>(false);

  // Leaflet references
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Detect theme state reactively
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Helper function to create beautifully styled custom divIcon markers using Tailwind
  const createCustomMarker = (color: string, iconClass: string) => {
    return L.divIcon({
      className: 'bg-transparent border-0',
      html: `
        <div class="relative flex items-center justify-center" style="width: 28px; height: 28px;">
          <div class="absolute w-7 h-7 rounded-full ${color} opacity-25 animate-ping"></div>
          <div class="w-6 h-6 rounded-full ${color} flex items-center justify-center text-white border border-white shadow-md transition-all duration-300 hover:scale-110">
            <i class="${iconClass} text-[9px]"></i>
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  };

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [23.6850, 90.3563],
      zoom: 7,
      zoomControl: true,
      minZoom: 6,
      maxZoom: 14,
    });

    mapRef.current = map;

    // Periodically invalidate map size during the first 2 seconds to accommodate transitions/loading
    const interval = setInterval(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 150);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Sync tile layer with dark/light mode
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    // Use standard CartoDB templates without the potential {r} placeholder issue
    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

    const attribution = isDarkMode
      ? '&copy; OpenStreetMap &copy; CARTO'
      : '&copy; OpenStreetMap &copy; CARTO';

    const tileLayer = L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 15,
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Invalidate size immediately on theme change
    map.invalidateSize();
  }, [isDarkMode]);

  // Invalidate map size whenever activeTab changes to handle container sizing/transitions
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // Sync markers and zoom layers based on activeTab and selectedDiv
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Create markers layer if not exists
    if (!markersLayerRef.current) {
      markersLayerRef.current = L.layerGroup().addTo(map);
    } else {
      markersLayerRef.current.clearLayers();
    }

    const layerGroup = markersLayerRef.current;

    if (activeTab === 'divisions') {
      DIVISIONS.forEach((div) => {
        const isSelected = selectedDiv.id === div.id;
        const markerColor = isSelected ? 'bg-blue-600' : 'bg-slate-500';
        const icon = createCustomMarker(markerColor, 'fa-solid fa-location-dot');

        const marker = L.marker(div.coords, { icon })
          .bindPopup(`
            <div class="p-1 font-sans text-xs">
              <strong class="text-slate-900 dark:text-white block font-bold text-[13px]">${div.bnName}</strong>
              <span class="text-slate-400 dark:text-slate-500 block text-[9px] font-medium mb-1">${div.name}</span>
              <div class="text-slate-600 dark:text-slate-300 space-y-0.5 text-[11px]">
                <p>জেলাসমূহ: <strong>${div.districts} টি</strong></p>
                <p>আয়তন: <strong>${div.area}</strong></p>
                <p class="truncate">নদী: ${div.majorRivers.join(', ')}</p>
              </div>
            </div>
          `)
          .addTo(layerGroup);

        marker.on('click', () => {
          handleSelectDivision(div);
          map.flyTo(div.coords, 8.5, { animate: true, duration: 1.2 });
        });

        if (isSelected) {
          map.flyTo(div.coords, 8.5, { animate: true, duration: 1.2 });
          // Open popup slightly later to ensure smooth transition
          setTimeout(() => {
            marker.openPopup();
          }, 200);
        }
      });
    } else if (activeTab === 'districts') {
      // Cadet Colleges tab
      DIVISIONS.forEach((div) => {
        div.colleges.forEach((clg) => {
          const markerColor = clg.type === 'Boys' ? 'bg-blue-600' : 'bg-pink-500';
          const icon = createCustomMarker(markerColor, 'fa-solid fa-graduation-cap');

          const marker = L.marker(clg.coords, { icon })
            .bindPopup(`
              <div class="p-1 font-sans text-xs">
                <strong class="text-slate-900 dark:text-white block font-bold text-[13px]">${clg.name}</strong>
                <span class="text-slate-400 dark:text-slate-500 block text-[9px] font-medium mb-1">${clg.location}</span>
                <div class="text-slate-600 dark:text-slate-300 space-y-0.5 text-[11px]">
                  <p>ধরণ: <strong>${clg.type === 'Boys' ? 'ছাত্র ক্যাডেট কলেজ' : 'ছাত্রী ক্যাডেট কলেজ'}</strong></p>
                  <p>প্রতিষ্ঠা সাল: <strong>${clg.est}</strong></p>
                  <p>বিভাগ: <strong>${div.bnName}</strong></p>
                </div>
              </div>
            `)
            .addTo(layerGroup);

          marker.on('click', () => {
            map.flyTo(clg.coords, 11, { animate: true, duration: 1.2 });
          });
        });
      });
      // Set view to overview of Bangladesh when opening colleges
      map.setView([23.6850, 90.3563], 7, { animate: true });
    } else if (activeTab === 'landmarks') {
      LANDMARKS.forEach((lm) => {
        const icon = createCustomMarker('bg-amber-500', lm.icon);

        const marker = L.marker(lm.coords, { icon })
          .bindPopup(`
            <div class="p-1.5 font-sans text-xs max-w-[200px]">
              <strong class="text-slate-900 dark:text-white block font-bold text-[13px] mb-0.5">${lm.bnName}</strong>
              <span class="text-slate-400 dark:text-slate-500 block text-[9px] font-medium mb-1.5">${lm.name}</span>
              <p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">${lm.bnDescription}</p>
            </div>
          `)
          .addTo(layerGroup);

        marker.on('click', () => {
          map.flyTo(lm.coords, 11, { animate: true, duration: 1.2 });
        });
      });
      map.setView([23.6850, 90.3563], 7, { animate: true });
    }
  }, [activeTab, selectedDiv]);

  const handleSelectDivision = (division: DivisionData) => {
    setSelectedDiv(division);
    setQuizAnswer(null);
    setQuizSubmitted(false);
    setEarnedPoints(false);
  };

  const handleQuizOption = (index: number) => {
    if (quizSubmitted) return;
    setQuizAnswer(index);
  };

  const handleQuizSubmit = () => {
    if (quizAnswer === null || quizSubmitted) return;
    setQuizSubmitted(true);
    if (quizAnswer === selectedDiv.gkQuiz.correctIndex) {
      setEarnedPoints(true);
      setUserData(prev => ({
        ...prev,
        bestScore: Math.min(100, prev.bestScore + 1)
      }));
    }
  };

  return (
    <div className="bg-slate-50/50 dark:bg-slate-900 animate-in fade-in duration-300 min-h-full pb-6 transition-colors duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
        <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
          {lang === 'bn' ? 'ইন্টারেক্টিভ বাংলাদেশ মানচিত্র' : 'Interactive BD Map'}
        </h1>
        <div className="w-8"></div>
      </header>

      <div className="bg-white dark:bg-slate-950 flex justify-center gap-2 p-3 border-b border-slate-200 dark:border-slate-800/80 sticky top-[53px] z-10 shadow-sm transition-colors duration-300">
        <button 
          onClick={() => setActiveTab('divisions')}
          className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors cursor-pointer ${activeTab === 'divisions' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          {lang === 'bn' ? 'বিভাগসমূহ' : 'Divisions'}
        </button>
        <button 
          onClick={() => setActiveTab('districts')}
          className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors cursor-pointer ${activeTab === 'districts' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          {lang === 'bn' ? 'ক্যাডেট কলেজসমূহ' : 'Cadet Colleges'}
        </button>
        <button 
          onClick={() => setActiveTab('landmarks')}
          className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-colors cursor-pointer ${activeTab === 'landmarks' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
        >
          {lang === 'bn' ? 'দর্শনীয় স্থানসমূহ' : 'Key Landmarks'}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Main map section */}
        <div className="bg-white dark:bg-slate-950 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col md:flex-row gap-4 transition-colors duration-300">
          
          {/* Map Canvas */}
          <div className="flex-1 min-h-[350px] bg-slate-50 dark:bg-slate-900 rounded-[10px] relative border border-blue-50/50 dark:border-slate-800 shadow-inner overflow-hidden">
            <div className="absolute top-2 left-2 text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-white/90 dark:bg-slate-950/90 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 z-[1000]">
              {activeTab === 'divisions' && (lang === 'bn' ? 'বিভাগ মানচিত্র' : 'Divisions Map')}
              {activeTab === 'districts' && (lang === 'bn' ? 'ক্যাডেট কলেজ ম্যাপ' : 'Cadet Colleges')}
              {activeTab === 'landmarks' && (lang === 'bn' ? 'দর্শনীয় স্থান ম্যাপ' : 'Key Landmarks')}
            </div>
            
            {/* Real Leaflet Map Node */}
            <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />
          </div>

          {/* Selector Sidebar */}
          {activeTab === 'divisions' && (
            <div className="w-full md:w-[180px] flex flex-wrap md:flex-col gap-2 shrink-0 max-h-[350px] overflow-y-auto custom-scrollbar">
              {DIVISIONS.map((div) => {
                const isSelected = selectedDiv.id === div.id;
                return (
                  <button 
                    key={div.id}
                    onClick={() => handleSelectDivision(div)}
                    className={`flex-1 md:flex-initial flex items-center justify-between p-2.5 rounded-[10px] text-left border cursor-pointer transition duration-250 ${
                      isSelected 
                        ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600 shadow-sm font-bold' 
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${div.color}`}></span>
                      <span className="text-[11px] font-black">{div.bnName}</span>
                    </div>
                    <i className={`fa-solid fa-chevron-right text-[8px] ${isSelected ? 'text-white' : 'text-slate-400'}`}></i>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'districts' && (
            <div className="w-full md:w-[180px] flex flex-col gap-2 shrink-0 max-h-[350px] overflow-y-auto custom-scrollbar">
              <div className="p-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900">
                {lang === 'bn' ? 'ক্যাডেট কলেজ ডিরেক্টরি' : 'College Directory'}
              </div>
              {DIVISIONS.flatMap(d => d.colleges).map((clg) => (
                <button
                  key={clg.name}
                  onClick={() => {
                    const parentDiv = DIVISIONS.find(d => d.colleges.some(c => c.name === clg.name));
                    if (parentDiv) {
                      handleSelectDivision(parentDiv);
                      if (mapRef.current) {
                        mapRef.current.flyTo(clg.coords, 11, { animate: true, duration: 1.2 });
                        setTimeout(() => {
                          if (mapRef.current) {
                            L.popup()
                              .setLatLng(clg.coords)
                              .setContent(`
                                <div class="p-1 font-sans text-xs">
                                  <strong class="text-slate-900 dark:text-white block font-bold text-[13px]">${clg.name}</strong>
                                  <span class="text-slate-400 dark:text-slate-500 block text-[9px] font-medium mb-1">${clg.location}</span>
                                  <div class="text-slate-600 dark:text-slate-300 space-y-0.5 text-[11px]">
                                    <p>ধরণ: <strong>${clg.type === 'Boys' ? 'ছাত্র ক্যাডেট কলেজ' : 'ছাত্রী ক্যাডেট কলেজ'}</strong></p>
                                    <p>প্রতিষ্ঠা সাল: <strong>${clg.est}</strong></p>
                                    <p>বিভাগ: <strong>${parentDiv.bnName}</strong></p>
                                  </div>
                                </div>
                              `)
                              .openOn(mapRef.current);
                          }
                        }, 250);
                      }
                    }
                  }}
                  className="flex flex-col p-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                >
                  <span className="text-[10px] font-black text-slate-800 dark:text-slate-100 leading-snug">{clg.name}</span>
                  <span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">{clg.location} • {clg.type === 'Boys' ? 'ছাত্র' : 'ছাত্রী'}</span>
                </button>
              ))}
            </div>
          )}

          {activeTab === 'landmarks' && (
            <div className="w-full md:w-[180px] flex flex-col gap-2 shrink-0 max-h-[350px] overflow-y-auto custom-scrollbar">
              <div className="p-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-900">
                {lang === 'bn' ? 'দর্শনীয় স্থানসমূহ' : 'Landmarks'}
              </div>
              {LANDMARKS.map((lm) => (
                <button
                  key={lm.name}
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.flyTo(lm.coords, 11.5, { animate: true, duration: 1.2 });
                      setTimeout(() => {
                        if (mapRef.current) {
                          L.popup()
                            .setLatLng(lm.coords)
                            .setContent(`
                              <div class="p-1.5 font-sans text-xs max-w-[200px]">
                                <strong class="text-slate-900 dark:text-white block font-bold text-[13px] mb-0.5">${lm.bnName}</strong>
                                <span class="text-slate-400 dark:text-slate-500 block text-[9px] font-medium mb-1.5">${lm.name}</span>
                                <p class="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">${lm.bnDescription}</p>
                              </div>
                            `)
                            .openOn(mapRef.current);
                        }
                      }, 250);
                    }
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <i className={`${lm.icon} text-[10px]`}></i>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-black text-slate-800 dark:text-slate-100 truncate">{lm.bnName}</p>
                    <p className="text-[8px] text-slate-400 dark:text-slate-500 font-bold truncate">{lm.name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="bg-white dark:bg-slate-950 p-4 rounded-[10px] border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-4 transition-colors duration-300">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/80 pb-2">
            <div>
              <h2 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-sm">📍</span> {selectedDiv.bnName}
              </h2>
              <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">বিভাগীয় পরিসংখ্যান ও ক্যাডেট ডিরেক্টরি</p>
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">{selectedDiv.districts} টি জেলা</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800/50">
              <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">মোট আয়তন</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedDiv.area}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-[10px] border border-slate-200 dark:border-slate-800/50">
              <p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">প্রধান নদীসমূহ</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{selectedDiv.majorRivers.join(', ')}</p>
            </div>
          </div>

          {/* Cadet Colleges in Division */}
          <div>
            <h3 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <i className="fa-solid fa-graduation-cap"></i> ক্যাডেট কলেজসমূহ ({selectedDiv.colleges.length})
            </h3>
            {selectedDiv.colleges.length > 0 ? (
              <div className="space-y-2">
                {selectedDiv.colleges.map((clg, i) => (
                  <div key={i} className="flex justify-between items-center bg-blue-50/40 dark:bg-blue-950/10 p-2.5 rounded-[10px] border border-blue-50/50 dark:border-blue-900/20">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-black ${clg.type === 'Boys' ? 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400' : 'bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400'}`}>
                        {clg.type === 'Boys' ? '👦' : '👧'}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{clg.name}</p>
                        <p className="text-[8px] text-slate-500 dark:text-slate-400">অবস্থান: {clg.location} • ধরণ: {clg.type === 'Boys' ? 'ছাত্র' : 'ছাত্রী'}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md">প্রতিষ্ঠিত: {clg.est}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">এই বিভাগের বর্তমান প্রশাসনিক সীমানায় কোনো সরাসরি ক্যাডেট কলেজ নেই।</p>
            )}
          </div>

          {/* Geographic Mini Quiz */}
          <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-4 rounded-[10px] border border-indigo-100/50 dark:border-indigo-900/30 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-[12px] font-black text-indigo-900 dark:text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
                <i className="fa-regular fa-lightbulb"></i> বিভাগীয় সা. জ্ঞান কুইজ
              </h4>
              <span className="text-[8px] font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded-full uppercase">১০ পয়েন্ট</span>
            </div>
            <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-snug">{selectedDiv.gkQuiz.question}</p>
            
            <div className="flex flex-col gap-2">
              {selectedDiv.gkQuiz.options.map((opt, i) => {
                const isSelected = quizAnswer === i;
                const showCorrect = quizSubmitted && i === selectedDiv.gkQuiz.correctIndex;
                const showIncorrect = quizSubmitted && isSelected && i !== selectedDiv.gkQuiz.correctIndex;

                return (
                  <button 
                    key={i}
                    disabled={quizSubmitted}
                    onClick={() => handleQuizOption(i)}
                    className={`w-full p-2.5 rounded-[10px] border text-[10px] font-bold text-left transition flex items-center justify-between cursor-pointer ${
                      showCorrect 
                        ? 'bg-green-100 dark:bg-green-950/30 border-green-300 dark:border-green-900 text-green-800 dark:text-green-300 font-bold' 
                        : showIncorrect 
                          ? 'bg-red-100 dark:bg-red-950/30 border-red-300 dark:border-red-900 text-red-800 dark:text-red-300 font-bold'
                          : isSelected 
                            ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{opt}</span>
                    {showCorrect && <i className="fa-solid fa-check text-green-600 dark:text-green-400 text-[10px]"></i>}
                    {showIncorrect && <i className="fa-solid fa-xmark text-red-600 dark:text-red-400 text-[10px]"></i>}
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button 
                onClick={handleQuizSubmit}
                disabled={quizAnswer === null}
                className={`w-full py-2 rounded-[10px] text-[10px] font-bold transition ${
                  quizAnswer !== null ? 'bg-indigo-600 text-white shadow-sm cursor-pointer' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                উত্তর জমা দিন
              </button>
            ) : (
              <div className="bg-white dark:bg-slate-900 p-3 rounded-[10px] border border-indigo-50 dark:border-indigo-900/30 space-y-1 animate-in slide-in-from-bottom-2 fade-in duration-300">
                <p className="text-[10px] font-black flex items-center gap-1.5">
                  {earnedPoints ? (
                    <span className="text-green-600 dark:text-green-400 flex items-center gap-1"><i className="fa-solid fa-circle-check"></i> সঠিক উত্তর! +১০ পয়েন্ট</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation"></i> ভুল উত্তর</span>
                  )}
                </p>
                <p className="text-[9px] text-slate-600 dark:text-slate-400 leading-relaxed">{selectedDiv.gkQuiz.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

