'use client';
import Link from 'next/link';

export default function Donors() {
  const donorsList = [
    { name: "রাকিব হাসান", group: "A+", location: "মহিপাল, ফেনী", contact: "017XXXXXXXX" },
    { name: "সাকিব আল ইসলাম", group: "O+", location: "ট্রাংক রোড, ফেনী", contact: "018XXXXXXXX" },
    { name: "নুরুল আবসার", group: "B+", location: "সদর হাসপাতাল রোড, ফেনী", contact: "016XXXXXXXX" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-slate-700 transition">
            ← হোমপেজে ফিরুন
          </Link>
          <div className="flex flex-col text-right">
            <span className="text-xl font-black tracking-wider text-red-500">LIVE DONORS</span>
            <span className="text-[10px] text-slate-400 tracking-widest -mt-1 font-bold uppercase">রক্তদাতার তালিকা</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">লাইভ রক্তদাতা ডিরেক্টরি</h1>
          <p className="text-slate-400 text-xs">জরুরি মুহূর্তে ফেনী শহরের রক্তদাতাদের সাথে সরাসরি যোগাযোগ করুন।</p>
        </div>

        <div className="space-y-4">
          {donorsList.map((donor, index) => (
            <div key={index} className="bg-slate-850 border border-slate-800 rounded-2xl p-5 flex justify-between items-center shadow-md">
              <div>
                <h3 className="text-base font-bold text-white">{donor.name}</h3>
                <p className="text-xs text-slate-400 mt-1">📍 {donor.location}</p>
                <p className="text-xs text-emerald-400 mt-1 font-mono font-bold">📞 {donor.contact}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center">
                <span className="text-[10px] text-red-400 font-bold uppercase">Group</span>
                <span className="text-lg font-black text-red-500">{donor.group}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 