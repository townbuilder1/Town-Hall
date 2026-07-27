'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const ButtonLoader = () => (
  <svg className="animate-spin h-3.5 w-3.5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const trainData = [
  { name: "সুবর্ণ এক্সপ্রেস (৭০১)", route: "চট্টগ্রাম ➔ ঢাকা", time: "০৭:৫৮ AM", time24: "07:58", destination: "dhaka", offDay: "সোমবার", type: "আন্তঃনগর" },
  { name: "সোনার বাংলা এক্সপ্রেস (৭৮৭)", route: "চট্টগ্রাম ➔ ঢাকা", time: "০৫:৫০ PM", time24: "17:50", destination: "dhaka", offDay: "মঙ্গলবার", type: "আন্তঃনগর" },
  { name: "মহানগর গোধূলী (৭০৩)", route: "চট্টগ্রাম ➔ ঢাকা", time: "০৪:১০ PM", time24: "16:10", destination: "dhaka", offDay: "নাই", type: "আন্তঃনগর" },
  { name: "তূর্ণা এক্সপ্রেস (৭৪১)", route: "চট্টগ্রাম ➔ ঢাকা", time: "১২:৫৫ AM", time24: "00:55", destination: "dhaka", offDay: "নাই", type: "আন্তঃনগর" },
  { name: "মহানগর প্রভাতী (৭০৪)", route: "ঢাকা ➔ চট্টগ্রাম", time: "১১:২৫ AM", time24: "11:25", destination: "chittagong", offDay: "নাই", type: "আন্তঃনগর" },
  { name: "পাহাড়িকা এক্সপ্রেস (৭১৯)", route: "সিলেট ➔ চট্টগ্রাম", time: "০৬:৪৫ PM", time24: "18:45", destination: "chittagong", offDay: "বুধবার", type: "আন্তঃনগর" },
  { name: "চট্টগ্রাম মেইল (০২)", route: "ঢাকা ➔ চট্টগ্রাম", time: "০৪:৩০ AM", time24: "04:30", destination: "chittagong", offDay: "নাই", type: "মেল/লোকাল" },
  { name: "উদয়ন এক্সপ্রেস (৭২৪)", route: "চট্টগ্রাম ➔ সিলেট", time: "১১:১৫ PM", time24: "23:15", destination: "other", offDay: "রবিবার", type: "আন্তঃনগর" },
  { name: "বিজয় এক্সপ্রেস (৭৮৫)", route: "চট্টগ্রাম ➔ ময়মনসিংহ", time: "১০:১০ AM", time24: "10:10", destination: "other", offDay: "মঙ্গলবার", type: "আন্তঃনগর" },
  { name: "সাগরিকা এক্সপ্রেস (২৪)", route: "চাঁদপুর ➔ চট্টগ্রাম", time: "০২:২০ PM", time24: "14:20", destination: "other", offDay: "নাই", type: "মেল" },
];

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTrainModalOpen, setIsTrainModalOpen] = useState(false);
  
  const [weatherTab, setWeatherTab] = useState('today');
  const [weatherData, setWeatherData] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  
  const [trainFilter, setTrainFilter] = useState('all');
  const [trainSearch, setTrainSearch] = useState('');
  const [nextTrain, setNextTrain] = useState(null);
  const [countdownText, setCountdownText] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  // Dark Mode System Settings Sync
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Weather Data Fetching with Error Handling
  useEffect(() => {
    async function fetchWeather() {
      if (!WEATHER_API_KEY) {
        console.warn("Weather API Key is missing!");
        setWeatherLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Feni,Bangladesh&days=2&aqi=no`
        );
        if (res.ok) {
          const data = await res.json();
          setWeatherData(data);
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yyyyMmDd = yesterday.toISOString().split('T')[0];

        const resYest = await fetch(
          `https://api.weatherapi.com/v1/history.json?key=${WEATHER_API_KEY}&q=Feni,Bangladesh&dt=${yyyyMmDd}`
        );
        if (resYest.ok) {
          const yestData = await resYest.json();
          setYesterdayData(yestData);
        }
      } catch (err) {
        console.error("Weather fetch failed:", err);
      } finally {
        setWeatherLoading(false);
      }
    }
    fetchWeather();
  }, [WEATHER_API_KEY]);

  // Train Countdown Timer Calculation
  const calculateCountdown = useCallback(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let upcoming = trainData
      .map(train => {
        const [h, m] = train.time24.split(':').map(Number);
        const trainMinutes = h * 60 + m;
        return { ...train, minutesDiff: trainMinutes - currentMinutes };
      })
      .filter(train => train.minutesDiff > 0)
      .sort((a, b) => a.minutesDiff - b.minutesDiff);

    if (upcoming.length === 0) {
      const firstTrainTomorrow = [...trainData].sort((a, b) => {
        const [h1, m1] = a.time24.split(':').map(Number);
        const [h2, m2] = b.time24.split(':').map(Number);
        return (h1 * 60 + m1) - (h2 * 60 + m2);
      })[0];

      const [h, m] = firstTrainTomorrow.time24.split(':').map(Number);
      const minutesDiff = (24 * 60 - currentMinutes) + (h * 60 + m);
      
      setNextTrain(firstTrainTomorrow);
      formatTimeLeft(minutesDiff);
    } else {
      setNextTrain(upcoming[0]);
      formatTimeLeft(upcoming[0].minutesDiff);
    }
  }, []);

  const formatTimeLeft = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    setCountdownText(hours > 0 ? `${hours} ঘণ্টা ${mins} মিনিট বাকি` : `${mins} মিনিট বাকি`);
  };

  useEffect(() => {
    calculateCountdown();
    const interval = setInterval(calculateCountdown, 30000);
    return () => clearInterval(interval);
  }, [calculateCountdown]);

  const categories = [
    { name: "জরুরি হেল্পলাইন", keywords: "emergency helpline hospital police fire", info: "হাসপাতাল, অ্যাম্বুলেন্স, পুলিশ, ফায়ার সার্ভিস", isLink: true, href: "/emergency" },
    { name: "রক্তদাতা", keywords: "blood donors donor roktopol", info: "জরুরি রক্তের গ্রুপ ও ডোনারদের তথ্য", isLink: true, href: "/donors" },
    { name: "শপ ডিরেক্টরি", keywords: "shop directory restaurant store market", info: "রেস্টুরেন্ট ও শপ ডিরেক্টরি", isLink: true, href: "/shops" },
    { name: "ট্রেন শিডিউল", keywords: "train schedule railway station feni", info: "ফেনী স্টেশনের ট্রেনের সময়সূচী", isLink: false, action: () => setIsTrainModalOpen(true) },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 800);
  };

  const filteredCategories = categories.filter(cat => {
    const q = searchQuery.toLowerCase();
    return cat.name.toLowerCase().includes(q) || cat.keywords.includes(q);
  });

  const filteredTrains = trainData.filter(train => {
    const matchesFilter = trainFilter === 'all' || train.destination === trainFilter;
    const q = trainSearch.toLowerCase();
    const matchesSearch = train.name.toLowerCase().includes(q) || train.route.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  if (!mounted) return null;

  const getActiveWeatherData = () => {
    if (weatherTab === 'yesterday') {
      const day = yesterdayData?.forecast?.forecastday?.[0]?.day;
      return {
        temp: Math.round(day?.avgtemp_c || 0),
        condition: day?.condition?.text || "তথ্য পাওয়া যায়নি",
        icon: day?.condition?.icon,
        humidity: day?.avghumidity || 0,
        feelslike: Math.round(day?.avgtemp_c || 0),
        title: "গতকালকের আবহাওয়া"
      };
    } else if (weatherTab === 'tomorrow') {
      const day = weatherData?.forecast?.forecastday?.[1]?.day;
      return {
        temp: Math.round(day?.avgtemp_c || 0),
        condition: day?.condition?.text || "--",
        icon: day?.condition?.icon,
        humidity: day?.avghumidity || 0,
        feelslike: Math.round(day?.maxtemp_c || 0),
        title: "আগামীকালের পূর্বাভাস"
      };
    } else {
      const cur = weatherData?.current;
      return {
        temp: Math.round(cur?.temp_c || 0),
        condition: cur?.condition?.text || "--",
        icon: cur?.condition?.icon,
        humidity: cur?.humidity || 0,
        feelslike: Math.round(cur?.feelslike_c || 0),
        title: "আজকের আবহাওয়া"
      };
    }
  };

  const activeWeather = getActiveWeatherData();

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 relative overflow-hidden ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 blur-3xl pointer-events-none -z-10 animate-pulse" />

      <header className={`border-b sticky top-0 z-40 backdrop-blur-xl transition-colors ${
        isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition duration-300">
                TH
              </div>
              <div>
                <span className="text-lg font-black tracking-wider block leading-none bg-gradient-to-r from-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                  TownHallBD
                </span>
                <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">Feni Hub</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide">
              <Link href="/" className="text-emerald-500 border-b-2 border-emerald-500 pb-1">Home</Link>
              <Link href="/emergency" className={`${isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} transition`}>Emergency Directory</Link>
              <Link href="/shops" className={`${isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} transition`}>Shop Directory</Link>
              <Link href="/places" className={`${isDark ? 'text-slate-300 hover:text-emerald-400' : 'text-slate-600 hover:text-emerald-600'} transition`}>Places</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition active:scale-95 shadow-sm ${
                isDark ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition duration-300 shadow-md shadow-emerald-600/20 active:scale-95">
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className={`p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 backdrop-blur-md shadow-sm ${
              isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-gradient-to-br from-emerald-50/80 to-teal-50/30 border-emerald-100'
            }`}>
              <div className="max-w-lg relative z-10">
                <h1 className={`text-2xl sm:text-3xl font-black leading-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ফেনী শহরের ডিজিটাল ডিরেক্টরি
                </h1>
                <p className={`text-xs sm:text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  জরুরি সেবা, রক্তদাতা, ট্রেন শিডিউল এবং শহরের প্রয়োজনীয় তথ্যাবলী।
                </p>

                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white dark:bg-slate-950 rounded-2xl p-2 shadow-lg border border-slate-200 dark:border-slate-800 focus-within:border-emerald-500 transition">
                  <span className="pl-2 text-slate-400 text-sm">🔍</span>
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search anything... (যেমন: Hospital, Donors, দোকান)" 
                    className="w-full text-xs text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none px-2"
                  />
                  <button 
                    type="submit"
                    disabled={isSearching}
                    className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-60 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition duration-200 shrink-0 shadow-md shadow-emerald-600/20"
                  >
                    {isSearching ? <ButtonLoader /> : "Search"}
                  </button>
                </form>
              </div>
            </div>

            <div className={`p-5 rounded-3xl border transition ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Sponsored Ads / বিজ্ঞাপন
                </span>
                <span className="text-[10px] text-slate-400">আপনার বিজ্ঞাপনের জন্য যোগাযোগ করুন</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-32 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-md">
                  <div className="z-10">
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Top Deal</span>
                    <h3 className="font-bold text-base mt-1">ফেনী ডিজিটাল শপিং মল</h3>
                    <p className="text-[11px] text-emerald-100">সব পণ্যে ২০% পর্যন্ত বিশেষ ছাড়!</p>
                  </div>
                  <button className="z-10 text-[11px] font-bold bg-white text-emerald-800 px-3 py-1 rounded-lg w-fit group-hover:bg-emerald-50 transition">
                    অফার দেখুন ➔
                  </button>
                </div>

                <div className="h-32 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-5 text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer shadow-md">
                  <div className="z-10">
                    <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Hospital</span>
                    <h3 className="font-bold text-base mt-1">জরুরি ডায়াগনস্টিক সেন্টার</h3>
                    <p className="text-[11px] text-blue-100">২৪ ঘণ্টা ল্যাব সেবা ও বিশেষজ্ঞ ডাক্তার</p>
                  </div>
                  <button className="z-10 text-[11px] font-bold bg-white text-blue-900 px-3 py-1 rounded-lg w-fit group-hover:bg-blue-50 transition">
                    সিরিয়াল বুক করুন ➔
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredCategories.map((cat, idx) => {
                const Card = (
                  <div className={`p-4 rounded-2xl border flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-1 ${
                    isDark ? 'bg-slate-900/80 border-slate-800 hover:border-emerald-500/50' : 'bg-white border-slate-200 hover:shadow-lg'
                  }`}>
                    <div>
                      <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{cat.name}</h3>
                      <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cat.info}</p>
                    </div>
                    <span className="text-emerald-500 text-[11px] font-bold flex items-center gap-1">Browse →</span>
                  </div>
                );
                return cat.isLink ? (
                  <Link key={idx} href={cat.href}>{Card}</Link>
                ) : (
                  <div key={idx} onClick={cat.action} className="cursor-pointer">{Card}</div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className={`p-5 rounded-3xl border transition ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Weather Forecast</h4>
                    <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>ফেনী, বাংলাদেশ</h3>
                  </div>

                  <div className="flex gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                    {[
                      { id: 'yesterday', label: 'গতকাল' },
                      { id: 'today', label: 'আজ' },
                      { id: 'tomorrow', label: 'আগামীকাল' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setWeatherTab(tab.id)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg transition ${
                          weatherTab === tab.id 
                            ? 'bg-emerald-600 text-white shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {weatherLoading ? (
                  <div className="py-8 text-center text-xs text-slate-400 flex justify-center items-center gap-2">
                    <ButtonLoader /> আবহাওয়া আপডেট লোড হচ্ছে...
                  </div>
                ) : activeWeather ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        {activeWeather.icon && (
                          <img src={`https:${activeWeather.icon}`} alt="Weather Icon" className="w-12 h-12" />
                        )}
                        <div>
                          <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {activeWeather.temp}°C
                          </div>
                          <div className="text-[11px] text-emerald-500 font-bold">{activeWeather.title}</div>
                        </div>
                      </div>
                      <div className="text-right text-[11px] space-y-0.5 text-slate-500 dark:text-slate-400">
                        <div>অবস্থা: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeWeather.condition}</span></div>
                        <div>আর্দ্রতা: <span className="font-semibold text-slate-700 dark:text-slate-200">{activeWeather.humidity}%</span></div>
                      </div>
                    </div>

                    {weatherTab === 'today' && weatherData?.forecast?.forecastday?.[0]?.hour && (
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-2">আজকের ঘণ্টার পূর্বাভাস</div>
                        <div className="flex justify-between items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                          {weatherData.forecast.forecastday[0].hour.filter((_, idx) => idx % 4 === 0).map((hour) => (
                            <div 
                              key={hour.time} 
                              className={`flex flex-col items-center p-1.5 rounded-xl border min-w-[58px] shrink-0 ${
                                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'
                              }`}
                            >
                              <span className="text-[9px] text-slate-400">{hour.time.split(' ')[1]}</span>
                              <img src={`https:${hour.condition.icon}`} alt="icon" className="w-6 h-6 my-0.5" />
                              <span className={`text-[11px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                {Math.round(hour.temp_c)}°C
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-red-400 py-4">তথ্য পাওয়া যায়নি।</div>
                )}
              </div>

              <div className={`p-4 rounded-3xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Feni Map</h4>
                <div className="w-full h-full min-h-[160px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <iframe 
                    src="https://maps.google.com/maps?q=Feni&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                    className="w-full h-full border-0" 
                    loading="lazy"
                    title="Feni Map"
                  ></iframe>
                </div>
              </div>

            </div>

          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`p-5 rounded-3xl border transition ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>দর্শনীয় স্থান</h3>
                <Link href="/places" className="text-xs text-emerald-500 font-semibold hover:underline">See All</Link>
              </div>
              <div className={`p-3 rounded-2xl border flex items-center gap-3 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-500 font-bold rounded-xl shrink-0 flex items-center justify-center text-xs">MP</div>
                <div>
                  <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>মুহুরী প্রজেক্ট</h4>
                  <p className="text-[10px] text-slate-400">ছাগলনাইয়া, ফেনী</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className={`border-t py-6 mt-12 transition ${isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 TownHallBD. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>

      {isTrainModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className={`border rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative max-h-[90vh] flex flex-col ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ফেনী স্টেশন ট্রেনের সময়সূচী
                </h3>
                <p className="text-xs text-slate-400">সকল রুটের ট্রেনের সময় এবং অফ-ডে</p>
              </div>
              <button 
                onClick={() => setIsTrainModalOpen(false)} 
                aria-label="Close Modal"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {nextTrain && (
              <div className="my-4 p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl flex items-center justify-between shadow-lg">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">Next Train</div>
                  <div className="text-sm font-black">{nextTrain.name}</div>
                  <div className="text-[11px] text-emerald-100">{nextTrain.route} (সময়: {nextTrain.time})</div>
                </div>
                <div className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-right">
                  <div className="text-[10px] text-emerald-100 font-medium">Countdown</div>
                  <div className="text-xs font-black text-white">{countdownText}</div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 my-2">
              <input 
                type="text" 
                placeholder="Search Train Name..." 
                value={trainSearch}
                onChange={(e) => setTrainSearch(e.target.value)}
                className={`flex-1 border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
              <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { label: "All Routes", value: "all" },
                  { label: "Dhaka", value: "dhaka" },
                  { label: "Chittagong", value: "chittagong" },
                  { label: "Others", value: "other" }
                ].map((btn) => (
                  <button
                    key={btn.value}
                    onClick={() => setTrainFilter(btn.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      trainFilter === btn.value
                        ? 'bg-emerald-600 text-white'
                        : isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-y-auto flex-1 space-y-2 pr-1 my-2">
              {filteredTrains.length > 0 ? (
                filteredTrains.map((train, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row justify-between sm:items-center gap-2 ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{train.name}</h4>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold">
                          {train.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{train.route}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-800">
                      <div className="text-left sm:text-right">
                        <div className="text-xs font-black text-emerald-500">{train.time}</div>
                        <div className="text-[10px] text-slate-400">ফেনী ছাড়ার সময়</div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        train.offDay === 'নাই' 
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-500' 
                          : 'bg-amber-500/10 text-amber-500'
                      }`}>
                        {train.offDay === 'নাই' ? 'প্রতিদিন' : `${train.offDay} বন্ধ`}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">কোনো ট্রেন পাওয়া যায়নি।</div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px]">
              <span className="text-slate-400">E-Ticket Portal:</span>
              <a href="https://eticket.railway.gov.bd" target="_blank" rel="noreferrer" className="text-emerald-500 font-bold hover:underline">
                eticket.railway.gov.bd ↗
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}