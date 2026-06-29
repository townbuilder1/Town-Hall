'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Places() {
  const [activeModal, setActiveModal] = useState(null);

  const placesList = [
    {
      id: "muhuri",
      name: "মুহুরী প্রজেক্ট (Muhuri Project)",
      spot: "সোনাগাজী, ফেনী",
      shortDesc: "বাংলাদেশের দ্বিতীয় বৃহত্তম সেচ প্রকল্প এবং দেশের প্রথম বায়ু বিদ্যুৎ কেন্দ্র।",
      icon: "🌊",
      history: "১৯৭০-এর দশকের শেষের দিকে ফেনী, সোনাগাজী এবং চট্টগ্রামের মিরসরাই অঞ্চলের বিস্তীর্ণ এলাকাকে বন্যা থেকে রক্ষা করতে এবং শুষ্ক মৌসুমে সেচ সুবিধা দিতে এই প্রকল্প হাতে নেওয়া হয়। এটি ফেনী নদী, মুহুরী নদী এবং কালির ড্যাশের মোহনায় অবস্থিত। এখানে রয়েছে ৪০টি গেট বিশিষ্ট একটি বিশালাকার রেগুলেটর। পরবর্তীতে এখানে দেশের প্রথম উইন্ডমিল বা বায়ুবিদ্যুৎ কেন্দ্র স্থাপন করা হয়। শীতকালে এখানে দূর-দূরান্ত থেকে হাজারো অতিথি পাখি আসে, যা পর্যটকদের প্রধান আকর্ষণ।",
      travel: "ফেনী শহরের মহিপাল বা লালপোল থেকে সোনাগাজীর বাস অথবা সিএনজি অটোরিকশা যোগে প্রথমে সোনাগাজী উপজেলা সদরে যেতে হবে। সেখান থেকে পুনরায় সিএনজি নিয়ে সরাসরি মুহুরী প্রজেক্টে পৌঁছানো যায়।"
    },
    {
      id: "shamsher",
      name: "শমশের গাজীর কেল্লা, দীঘি ও স্মৃতি উদ্যান",
      spot: "ছাগলনাইয়া (জগন্নাথপুর), ফেনী",
      shortDesc: "বাংলার বীর 'ভাটির বাঘ' শমশের গাজীর স্মৃতিবিজড়িত ঐতিহাসিক রাজত্ব ও প্রাচীন দুর্গ।",
      icon: "🏰",
      history: "অষ্টাদশ শতাব্দীতে ত্রিপুরা রাজ্যের সামন্ত রাজাদের শোষণের বিরুদ্ধে তীব্র গণবিদ্রোহ গড়ে তোলেন সাধারণ কৃষক পরিবারের সন্তান শমশের গাজী। তিনি পরবর্তীতে ফেনী-রোশনাবাদ অঞ্চলের স্বাধীন শাসক হিসেবে আত্মপ্রকাশ করেন এবং ইতিহাসে 'ভাটির বাঘ' নামে পরিচিতি পান। ছাগলনাইয়ার জগন্নাথপুরে তিনি তাঁর রাজধানী স্থাপন করেন এবং একটি দুর্গ বা কেল্লা নির্মাণ করেন। বর্তমানে কেল্লার প্রাচীর ধ্বংসাবশেষে পরিণত হলেও তাঁর খনন করা বিশাল চিলির দীঘি, সুড়ঙ্গ এবং ভারত-বাংলাদেশ সীমান্তের মনোরম পরিবেশ ইতিহাসের সাক্ষী হয়ে দাঁড়িয়ে আছে।",
      travel: "ফেনী শহরের ট্রাংক রোড অথবা মহিপাল থেকে সিএনজি বা লোকাল বাস যোগে ছাগলনাইয়া বাজারে যেতে হবে। ছাগলনাইয়া বাজার থেকে মাত্র কয়েক কিলোমিটার দূরে ভারত সীমান্ত ঘেঁষে অবস্থিত এই ঐতিহাসিক স্পটে যাওয়ার জন্য লোকাল সিএনজি পাওয়া যায়।"
    },
    {
      id: "chandgazi",
      name: "চাঁদগাজী ভূঁঞা মসজিদ",
      spot: "ছাগলনাইয়া, ফেনী",
      shortDesc: "মুঘল স্থাপত্যশৈলীর এক অনন্য ও প্রাচীন নিদর্শন (১৬ শতক)।",
      icon: "🕌",
      history: "১৬৪৬ বা ১৬৭৬ সালের দিকে মুঘল আমলে স্থানীয় জমিদার চাঁদগাজী ভূঁঞা এই ঐতিহ্যবাহী মসজিদটি নির্মাণ করেন। এটি তিনটি গম্বুজ বিশিষ্ট এবং সম্পূর্ণ মুঘল স্থাপত্যশৈলীতে তৈরি। মসজিদের দেয়ালগুলো অত্যন্ত পুরু এবং চুন-সুরকি দিয়ে নির্মিত। এর পাশেই রয়েছে চাঁদগাজী ভূঁঞার বিশাল দীঘি। ফেনী জেলার অন্যতম প্রাচীন মুসলিম ঐতিহ্যের প্রতীক এটি।",
      travel: "ফেনী ট্রাংক রোড বা মহিপাল থেকে প্রথমে ছাগলনাইয়া বাজারে আসতে হবে। সেখান থেকে সিএনজি অটোরিকশা যোগে সরাসরি চাঁদগাজী ভূঁঞা মসজিদে যাওয়া যায়।"
    },
    {
      id: "paglamia",
      name: "পাগলা মিয়া মাজার ও তাকিয়া মসজিদ",
      spot: "তাকিয়া রোড, ফেনী শহর",
      shortDesc: "ফেনী শহরের প্রাণকেন্দ্রে অবস্থিত শত বছরের পুরোনো ধর্মীয় ও আত্মিক কেন্দ্র।",
      icon: "🕌",
      history: "ফেনী অঞ্চলের আধ্যাত্মিক সাধক হযরত সৈয়দ আমীর উদ্দিন (র.), যিনি সাধারণ মানুষের কাছে 'পাগলা মিয়া' নামে পরিচিত ছিলেন, তাঁর নামানুসারেই এই মাজার ও ঐতিহ্যবাহী তাকিয়া মসজিদটি প্রতিষ্ঠিত। আনুমানিক ১৮ শতকের দিকে তিনি এখানে এসে ইসলাম ধর্ম প্রচার ও মানবসেবায় নিজেকে নিয়োজিত করেন। তাঁর অলৌকিক জীবনকাহিনী ও আধ্যাত্মিকতার কারণে এই স্থানটি ফেনীর মুসলমানদের পাশাপাশি সর্বস্তরের মানুষের কাছে অত্যন্ত পবিত্র ও ঐতিহাসিক একটি স্থান হিসেবে সমাদৃত।",
      travel: "এটি ফেনী শহরের মূল কেন্দ্র تাকিয়া রোডে অবস্থিত। শহরের যেকোনো প্রান্ত (মহিপাল, রেল স্টেশন বা ট্রাংক রোড) থেকে রিকশা বা ইজিবাইক (টমটম) নিয়ে সরাসরি মাজারে আসা যায়।"
    },
    {
      id: "bilonia",
      name: "বিলোনিয়া ল্যান্ড পোর্ট ও স্মৃতিস্তম্ভ",
      spot: "পরশুরাম, ফেনী",
      shortDesc: "ভারত-বাংলাদেশ সীমান্তের ঐতিহাসিক স্থলবন্দর এবং শুভপুর ব্রিজের ঐতিহাসিক যুদ্ধক্ষেত্র।",
      icon: "⚓",
      history: "বিলোনিয়া ফেনীর পরশুরাম উপজেলায় অবস্থিত একটি প্রাচীন স্থলবন্দর ও রেলওয়ে স্টেশন (বর্তমানে বন্ধ)। ১৯৭১ সালের মহান মুক্তিযুদ্ধে এই বিলোনিয়া পকেট এবং শুভপুর ব্রিজে পাক হানাদার বাহিনীর সাথে মুক্তিযোদ্ধাদের রক্তক্ষয়ী 'বিলোনিয়া যুদ্ধ' সংঘটিত হয়, যা আন্তর্জাতিক সামরিক ইতিহাসে স্ট্র্যাটেজিক যুদ্ধ হিসেবে পড়ানো হয়। এখানে একটি দৃষ্টিনন্দন মুক্তিযুদ্ধের স্মৃতিস্তম্ভ রয়েছে।",
      travel: "ফেনী মহিপাল বা ট্রাংক রোড থেকে পরশুরাম যাওয়ার বাস বা সিএনজি পাওয়া যায়। পরশুরাম সদর থেকে লোকাল সিএনজি নিয়ে বিলোনিয়া স্থলবন্দর ও বর্ডার গার্ড পোস্টের স্মৃতিস্তম্ভে যাওয়া যায়।"
    },
    {
      id: "bijoysingh",
      name: "বিজয় সিংহ দীঘি",
      spot: "বিজয়সিংহ, ফেনী সদর",
      shortDesc: "সেন বংশের রাজা বিজয় সিংহের স্মৃতিবিজড়িত বিশাল ও প্রাচীন দীঘি।",
      icon: "🌳",
      history: "ফেনী শহরের সার্কিট হাউজের কাছেই অবস্থিত এই ঐতিহ্যবাহী দীঘি। আনুমানিক ১১ শতকে সেন বংশের প্রতিষ্ঠাতা ও বিখ্যাত রাজা বিজয় সিংহ এই বিশাল দীঘিটি খনন করেন। প্রায় ৩৭.৫৭ একর আয়তনের এই দীঘির চারপাশ সবুজে ঘেরা এবং অত্যন্ত মনোরম। লোককথা অনুযায়ী, রাজা তাঁর মায়ের স্নানের সুবিধার জন্য এই দীঘি খনন করেছিলেন। এটি ফেনী শহরের মানুষের প্রধান বিনোদন কেন্দ্র।",
      travel: "ফেনী শহরের মহিপাল বা ট্রাংক রোড থেকে রিকশা, টমটম বা সিএনজি নিয়ে মাত্র ১০-১৫ মিনিটে সার্কিট হাউজের পাশে বিজয় সিংহ দীঘিতে পৌঁছানো যায়।"
    },
    {
      id: "shiluar",
      name: "শিলুয়ার শীলপাথর ও প্রাচীন ধ্বংসাবশেষ",
      spot: "ছাগলনাইয়া, ফেনী",
      shortDesc: "প্রাচীন কালের পাথরের ঐতিহাসিক নিদর্শন ও প্রত্নতাত্ত্বিক স্থান।",
      icon: "🗿",
      history: "ছাগলনাইয়ার শিলুয়া গ্রামে একটি প্রাচীন ঐতিহাসিক শীলপাথর বা প্রাচীন শিলালিপি পাওয়া যায়, যা অনুযায়ী এই গ্রামের নাম হয়েছে শিলুয়া। প্রত্নতাত্ত্বিকদের মতে, এটি প্রাক-মুসলিম যুগের বা তারও আগের কোনো প্রাচীন সভ্যতার ধ্বংসাবশেষ। এই পাথরের গায়ে প্রাচীন ব্রাহ্মী লিপির খোদাই করা নকশা ছিল, যা বর্তমানে জাতীয় জাদুঘরে সংরক্ষিত এবং স্পটে এর ঐতিহাসিক বেদীটি রয়েছে।",
      travel: "ফেনী থেকে ছাগলনাইয়া বাজার হয়ে লোকাল সিএনজি নিয়ে শিলুয়া গ্রামে এই ঐতিহাসিক প্রত্নতাত্ত্বিক স্থানে যাওয়া যায়।"
    }
  ];

  const foodsList = [
    { 
      name: "ছাগলনাইয়ার খন্ডলের মিষ্টি", 
      origin: "খন্ডল বাজার, ছাগলনাইয়া", 
      desc: "ফেনী জেলার সবচেয়ে বিখ্যাত এবং ১ নম্বর ঐতিহ্যবাহী মিষ্টি। ছাগলনাইয়ার খন্ডল বাজারে আজ থেকে কয়েক দশক আগে সম্পূর্ণ দেশীয় উপায়ে খাঁটি দুধের ছানা এবং বিশেষ প্রক্রিয়ায় তৈরি গুড়ের সিরা দিয়ে এই লালচে মিষ্টি বানানো শুরু হয়। এর প্রধান বৈশিষ্ট্য হলো এটি প্রচণ্ড নরম ও স্পঞ্জি হয় এবং কামড় দিলেই ভেতরে থাকা গরম রস মুখে গলে যায়। ফেনীতে কোনো অতিথি এলে খন্ডলের মিষ্টি ছাড়া আপ্যায়ন অসম্পূর্ণ থাকে।" 
    },
    { 
      name: "মহিপালের শর্টগন সুইটস", 
      origin: "মহিপাল, ফেনী সদর", 
      desc: "ফেনীর মহিপাল অঞ্চলের একটি আধুনিক কিন্তু অত্যন্ত জনপ্রিয় রসনাবিলাস। এর অদ্ভুত নাম এবং বন্দুকের নলের মতো ইউনিক লম্বা শেপের কারণে এটি ভোজনরসিকদের মাঝে দ্রুত সাড়া ফেলে। অত্যন্ত ঘন ক্ষীর এবং মালাইয়ের মিশ্রণে তৈরি এই মিষ্টির স্বাদ অনন্য।" 
    },
    { 
      name: "ফেনীর মহিষের দই (খাঁটি টক দই)", 
      origin: "সোনাগাজী ও উপকূলীয় অঞ্চল", 
      desc: "সোনাগাজী ও ফেনী নদীর চরাঞ্চলে চরে বেড়ানো মহিষের খাঁটি দুধ থেকে এই ঐতিহ্যবাহী দই তৈরি হয়। মাটির পাত্রে (চাঁটি) বসানো এই দইয়ের স্বাদ অত্যন্ত ঘন এবং টক-মিষ্টি স্বাদের জন্য ফেনী ও নোয়াখালী অঞ্চলে বিয়ে বা যেকোনো সামাজিক অনুষ্ঠানে এর ব্যাপক চাহিদা রয়েছে।" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-slate-700 transition">
            ← হোমপেজে ফিরুন
          </Link>
          <div className="flex flex-col text-right">
            <span className="text-xl font-black tracking-wider text-purple-400">FENI DIRECTORY</span>
            <span className="text-[10px] text-slate-400 tracking-widest -mt-1 font-bold uppercase">মেগা গাইড ও ঐতিহ্য</span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        
        <section className="bg-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">📜</span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">ফেনীর সম্পূর্ণ ইতিহাস ও নামকরণ</h1>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
            <p>
              <strong className="text-purple-400">নামকরণের ইতিহাস:</strong> ফেনী অঞ্চলের নামকরণ নিয়ে সবচেয়ে গ্রহণযোগ্য মতবাদটি হলো 'ফনী' নদী থেকে এর উৎপত্তি। প্রাচীনকালে এই নদীটি প্রচণ্ড আঁকাবাঁকা গতিতে প্রমত্তা রূপ ধারণ করে বয়ে চলতো, যা দেখতে সাপের ফণার (ফনী) মতো ছিল। পরবর্তীতে মুসলিম কবি ও ঐতিহাসিকদের লেখায় এটি 'ফেনী' নামে রূপান্তর লাভ করে। ১৬৭৬ সালে মোঘল আমলে এই অঞ্চলে একটি গুরুত্বপূর্ণ সীমান্ত ফাঁড়ি ও প্রশাসনিক চৌকি স্থাপন করা হয়।
            </p>
            <p>
              <strong className="text-purple-400">প্রশাসনিক বিবর্তন:</strong> ব্রিটিশ শাসনামলে ১৮৭৫ সালে নোয়াখালী জেলার অধীনে ফেনী মহকুমা গঠিত হয়। এর সদর দপ্তর প্রথমে আমীরগাঁওয়ে থাকলেও ১৮৮১ সালে তা বর্তমান ফেনী শহরে স্থানান্তরিত হয়। পরবর্তীতে ১৯৮৪ সালের ১লা মার্চ ফেনীকে একটি পূর্ণাঙ্গ জেলা হিসেবে ঘোষণা করা হয়।
            </p>
            <p>
              <strong className="text-purple-400">মুক্তিযুদ্ধে অবদান:</strong> ১৯৭১ সালের মহান মুক্তিযুদ্ধে ফেনীর ভৌগোলিক অবস্থান ছিল অত্যন্ত কৌশলগত। দেশের পূর্বাঞ্চলীয় প্রবেশদ্বার এবং বর্ডারের কাছে হওয়ায় এখানে পাক হানাদার বাহিনীর সাথে বীর মুক্তিযোদ্ধাদের একাধিক সম্মুখ যুদ্ধ সংঘটিত হয়। বিলোনিয়া যুদ্ধ এবং শুভপুর ব্রিজের প্রতিরোধ যুদ্ধ মুক্তিযুদ্ধের ইতিহাসে আন্তর্জাতিকভাবে স্মরণীয় অধ্যায়। দীর্ঘ লড়াইয়ের পর６ই ডিসেম্বর ফেনী সম্পূর্ণ শত্রুযুক্ত হয়।
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍱</span>
            <h2 className="text-xl font-black text-white tracking-tight">ফেনীর বিখ্যাত ঐতিহ্যবাহী খাবার ও ইতিহাস</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {foodsList.map((food, index) => (
              <div key={index} className="bg-slate-850 border border-slate-800 rounded-2xl p-5 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-3">
                  <h3 className="text-base font-bold text-amber-400">{food.name}</h3>
                  <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 px-2 py-1 rounded-md font-medium w-fit">📍 উৎপত্তি: {food.origin}</span>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed text-justify">{food.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-xl font-black text-white tracking-tight">ফেনীর সকল দর্শনীয় ও ঐতিহাসিক স্থান (ক্লিক করুন)</h2>
          </div>
          <p className="text-slate-400 text-xs -mt-2">যেকোনো স্থানের ওপর ক্লিক করে তার সম্পূর্ণ গভীর ব্যাকস্টোরি, ইতিহাস ও নিখুঁত যাতায়াত ব্যবস্থা জেনে নিন।</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {placesList.map((place) => (
              <div 
                key={place.id} 
                onClick={() => setActiveModal(place)}
                className="bg-slate-850 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:border-purple-500/40 cursor-pointer hover:bg-slate-800/60 transition group"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl mb-3 group-hover:scale-105 transition-transform">
                    {place.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-200 group-hover:text-purple-400 transition-colors">{place.name}</h3>
                  <span className="text-[10px] text-slate-400 block mt-1">📍 {place.spot}</span>
                  <p className="text-slate-400 text-xs mt-2 line-clamp-2">{place.shortDesc}</p>
                </div>
                <span className="text-[10px] text-purple-400 font-bold mt-4 inline-block tracking-wide uppercase">ইতিহাস ও যাতায়াত দেখুন →</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {activeModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-850 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-xs font-bold bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition"
            >
              ✕ বন্ধ করুন
            </button>

            <div className="flex items-center gap-4 mb-5 border-b border-slate-800 pb-4 pr-16">
              <div className="h-14 w-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-3xl shrink-0">
                {activeModal.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">{activeModal.name}</h3>
                <span className="text-xs text-purple-400 font-medium">📍 {activeModal.spot}</span>
              </div>
            </div>

            <div className="space-y-5 text-xs sm:text-sm leading-relaxed text-slate-300">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">📜 গভীর ইতিহাস ও ব্যাকস্টোরি:</h4>
                <p className="bg-slate-900/50 border border-slate-800/60 p-4 rounded-xl text-justify leading-relaxed">
                  {activeModal.history}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">🚀 কীভাবে যাবেন (যাতায়াত ব্যবস্থা):</h4>
                <p className="bg-slate-900/50 border border-slate-800/60 p-4 rounded-xl leading-relaxed">
                  {activeModal.travel}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}