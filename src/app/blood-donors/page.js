"use client";
import { useState } from "react";

export default function BloodDonors() {
  const [searchQuery, setSearchQuery] = useState("");

  const bloodGroupsOrder = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

  const donors = [
    { id: 1, name: "রাকিব হাসান", group: "A+", phone: "018XXXXXXXX" },
    { id: 2, name: "সাকিব আল ইসলাম", group: "O+", phone: "017XXXXXXXX" },
    { id: 3, name: "আরিফুর রহমান", group: "B+", phone: "019XXXXXXXX" },
    { id: 4, name: "নাহিদ সুলতান", group: "A-", phone: "015XXXXXXXX" },
    { id: 4, name: "নাহিদ সুলতান", group: "A-", phone: "015XXXXXXXX" },
    { id: 5, name: "তানভীর আহমেদ", group: "AB+", phone: "016XXXXXXXX" },
    { id: 6, name: "মেহেদী হাসান", group: "O-", phone: "013XXXXXXXX" },
  ];

  const filteredDonors = donors.filter((donor) =>
    donor.group.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">🩸 ফেনী লাইভ রক্তদাতা ডিরেক্টরি</h1>
          <p className="text-gray-600 text-sm">জরুরি প্রয়োজনে রক্তের গ্রুপ লিখে সার্চ করুন</p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="রক্তের গ্রুপ লিখুন (যেমন: A+, O-, B+)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-lg text-center font-semibold"
          />
        </div>

        <div className="space-y-6">
          {bloodGroupsOrder.map((group) => {
            const groupDonors = filteredDonors.filter((donor) => donor.group === group);
            
            if (groupDonors.length === 0) return null;

            return (
              <div key={group} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-red-50 px-4 py-2.5 border-b border-red-100 flex justify-between items-center">
                  <span className="text-red-700 font-extrabold text-lg">{group} গ্রুপ</span>
                  <span className="text-xs text-red-500 font-medium">মোট ডোনার: {groupDonors.length} জন</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {groupDonors.map((donor) => (
                    <div key={donor.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                      <div>
                        <h3 className="font-bold text-base text-gray-800">{donor.name}</h3>
                        <p className="text-gray-500 text-xs mt-0.5">মোবাইল: {donor.phone}</p>
                      </div>
                      <a
                        href={`tel:${donor.phone}`}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-1.5 rounded-lg text-sm transition shadow-sm"
                      >
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredDonors.length === 0 && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500 border border-gray-100">
              ❌ এই গ্রুপের কোনো রক্তদাতা খুঁজে পাওয়া যায়নি।
            </div>
          )}
        </div>

      </div>
    </div>
  );
}