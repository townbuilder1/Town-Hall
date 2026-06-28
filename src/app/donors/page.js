"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      
      <div className="max-w-md mx-auto px-4 py-6">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-500 tracking-wide">TOWN HALL</h1>
            <p className="text-xs text-gray-400">ফেনী লোকাল হাব</p>
          </div>
          <span className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700">
            By Town Builder
          </span>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-2xl p-6 border border-gray-700/60 mb-6 text-center shadow-xl">
          <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/20">
            Sponsored
          </span>
          <h2 className="text-xl font-bold mt-3 text-white">আপনার ব্যবসা বা প্রতিষ্ঠানের বিজ্ঞাপন দিন এখানে!</h2>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            ফেনী শহরের হাজারো মানুষের কাছে পৌঁছাতে আজই আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>

        <div className="space-y-4">
          
          <Link href="/emergency" className="block">
            <div className="bg-gray-800/60 hover:bg-gray-800 p-5 rounded-2xl border border-gray-700/50 transition active:scale-[0.99] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl">
                🚨
              </div>
              <div>
                <h3 className="font-bold text-white text-base">জরুরি হেল্পলাইন</h3>
                <p className="text-xs text-gray-400 mt-0.5">হাসপাতাল, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস</p>
              </div>
            </div>
          </Link>

          <Link href="/blood-donors" className="block">
            <div className="bg-gray-800/60 hover:bg-gray-800 p-5 rounded-2xl border border-gray-700/50 transition active:scale-[0.99] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">
                🩸
              </div>
              <div>
                <h3 className="font-bold text-white text-base">লাইভ রক্তদাতা</h3>
                <p className="text-xs text-gray-400 mt-0.5">জরুরি রক্তের গ্রুপ ও ডোনার কন্টাক্ট লিস্ট</p>
              </div>
            </div>
          </Link>

          <Link href="/shops" className="block">
            <div className="bg-gray-800/60 hover:bg-gray-800 p-5 rounded-2xl border border-gray-700/50 transition active:scale-[0.99] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl">
                🛍️
              </div>
              <div>
                <h3 className="font-bold text-white text-base">ফেনী শপ ডিরেক্টরি</h3>
                <p className="text-xs text-gray-400 mt-0.5">শহরের সেরা দোকান, রেস্টুরেন্ট ও ব্র্যান্ড</p>
              </div>
            </div>
          </Link>

          <Link href="/history" className="block">
            <div className="bg-gray-800/60 hover:bg-gray-800 p-5 rounded-2xl border border-gray-700/50 transition active:scale-[0.99] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
                🏛️
              </div>
              <div>
                <h3 className="font-bold text-white text-base">ইতিহাস ও দর্শনীয় স্থান</h3>
                <p className="text-xs text-gray-400 mt-0.5">ফেনীর গৌরবময় ইতিহাস, বিখ্যাত খাবার ও প্লেস</p>
              </div>
            </div>
          </Link>

        </div>

        <div className="text-center mt-8">
          <p className="text-[11px] text-gray-500 tracking-wide">
            লোকাল সেবা, যোগাযোগ এবং তথ্য এখন এক ক্লিকে।
          </p>
        </div>

      </div>
    </div>
  );
}