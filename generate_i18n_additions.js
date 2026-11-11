const fs = require('fs');

// Mapping of English text to Bangla translation
const enToBn = {
  // Navigation
  "About Us": "আমরা কে",
  "Governance": "শাসনব্যবস্থা",
  "Resources": "সম্পদ",
  "Join / Apply": "সদস্যপদ আবেদন",
  "Contact Us": "যোগাযোগ করুন",
  
  // Homepage sections
  "A Non-Political, Non-Profit Voluntary Initiative": "একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী উদ্যোগ",
  "Explore Constitution & Charter": "সংবিধান ও গঠনতন্ত্র দেখুন",
  "Apply for Membership (Free)": "সদস্যপদের জন্য আবেদন (বিনামূল্যে)",
  "Our Origin & Philosophy": "আমাদের দর্শন ও প্রেক্ষাপট",
  "Article 6: Operational Priorities": "ধারা ৬: অগ্রাধিকারভিত্তিক কর্মসূচি",
  "Leadership & Elections": "নেতৃত্ব ও নির্বাচন",
  "Chapter 6: Fund Ethics & Auditing": "ধারা ৬: তহবিল নৈতিকতা ও নিরীক্ষা",
  "Activities & Updates": "কর্মকাণ্ড ও আপডেট",
  "Open Membership Application Form": "সদস্যপদ আবেদন ফরম খুলুন",
  "Via Verified Members": "যাচাইকৃত সদস্যের মাধ্যমে",
  "Annual Fiscal Audit": "বার্ষিক আর্থিক নিরীক্ষা",
  "Recent Activities": "নবীনতম কর্মকাণ্ড",
  
  // About page
  "Established on April 10, 2021, Fi Sabilillah is a non-political, non-profit, and voluntary organization dedicated to restoring human dignity.": "১০ এপ্রিল, ২০২১ তারিখে প্রতিষ্ঠিত ফি সাবিলিল্লাহ একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংস্থা, যা মানব-মর্যাদা রক্ষার জন্য নিবেদিত।",
  "Fi Sabilillah was founded by a group of conscious students in Bangladesh on April 10, 2021. The organization was established to dismantle wealth-based social stratification and provide sustainable, discreet support while keeping the recipient's dignity untarnished.": "ফি সাবিলিল্লাহ বাংলাদেশে ১০ এপ্রিল, ২০২১ তারিখে একদল সচেতন শিক্ষার্থী দ্বারা প্রতিষ্ঠিত। সংস্থা সম্পদভিত্তিক সামাজিক মর্যাদার ভিত্তি ভেঙে ফেলা এবং গ্রহীতার মর্যাদা অক্ষুণ্ণ রেখে টেকসই ও গোপনীয় সহায়তা প্রদানের জন্য তৈরি।",
  
  // Constitution page
  "Full Organizational Charter": "পূর্ণাঙ্গ ব্যবস্থাপনা গৃথিত",
  "Print": "প্রিন্ট করুন",
  
  // Contact page
  "Voluntary coordination across educational institutions, communities, and disaster-prone zones nationwide.": "সারাদেশের বিভিন্ন শিক্ষাপ্রতিষ্ঠান, সম্প্রদায় ও আপদ পূর্ণ এলাকায় স্বেচ্ছাসেবী সমন্বয়।",
  "Official Communication": "দাপ্তরিক যোগাযোগ",
  "Send Email": "ইমেইল পাঠান",
  "Copy": "কপি করুন",
  "Bangladesh": "বাংলাদেশ",
  "Submit Official Inquiry": "দাপ্তরিক জিজ্ঞাসা জমা দিন",
  "Why does Fi Sabilillah prioritize sustainable self-reliance over simple handouts?": "ফি সাবিলিল্লাহ টেকসই আত্মনির্ভরশীলতাকে সাময়িক ত্রাণের চেয়ে বেশি গুরুত্ব কেন দেয়?",
  "How does the organization protect beneficiary dignity during assistance?": "সহায়তা প্রদানের সময় সংস্থা কীভাবে গ্রহীতার মর্যাদা রক্ষা করে?",
  "How can non-members contribute to the fund?": "সদস্য নন ব্যক্তিরা তহবিলে কীভাবে অবদান রাখতে পারেন?",
  "What is the membership fee and minimum age?": "সদস্যপদের ফি ও ন্যূনতম বয়স কত?",
  
  // Governance page
  "Organizational Structure": "সাংগঠনিক কাঠামো",
  "Executive Council": "নির্বাহী পরিষদ",
  "Election Process": "নির্বাচন প্রক্রিয়া",
  "Governance Rules": "শাসনবিধি",
  "Democratic Principles (Article 12)": "গণতান্ত্রিক নীতিসমূহ (ধারা ১২)",
  "Election Schedule": "নির্বাচনের সময়সূচী",
  "The Executive Committee of Fi Sabilillah comprises the following nine portfolios (as defined in Article 9 of the Constitution):": "ফি সাবিলিল্লাহর নির্বাহী কমিটি নিম্নলিখিত নয়টি পোর্টফোলিও দ্বারা গঠিত (সংবিধানের ধারা ৯ অনুযায়ী):",
  "The Executive Council is elected annually through a democratic process where every active member is both a candidate and a voter. The council oversees all organizational operations and ensures accountability.": "নির্বাহী পরিষদ বার্ষিক গণতান্ত্রিক প্রক্রিয়ায় নির্বাচিত হয় যেখানে প্রতিটি সক্রিয় সদস্য একইসাথে প্রার্থী ও ভোটার। পরিষদ সকল組織গত কার্যক্রম তদারকি করে ও জবাবদিহিতা নিশ্চিত করে।",
  "Elections are held annually in the first week of April. The outgoing President heads the election commission.": "নির্বাচন বার্ষিক এপ্রিলের প্রথম সপ্তাহে অনুষ্ঠিত হয়।’ancien সভাপতি নির্বাচন কমিশনের প্রধান থাকেন।",
  "President": "সভাপতি",
  "Vice President": "উপ-সভাপতি",
  "General Secretary": "সাধারণ সম্পাদক",
  "Organizing Secretary": "সাংগঠনিক সম্পাদক",
  "Treasurer": "কোষাধ্যক্ষ",
  "Office Secretary": "দপ্তর সম্পাদক",
  "Policy Coordinator": "নীতিমালা সমন্বয়কারী",
  "Publicity Secretary": "প্রচার সম্পাদক",
  "Evaluation & Impact Analyst": "মূল্যায়ন ও প্রভাব বিশ্লেষক",
  
  // Membership page
  "Eligibility Requirements": "যোগ্যতার শর্তাবলী",
  "Member Responsibilities": "সদস্যের দায়িত্ব",
  "Application Process": "আবেদন প্রক্রিয়া",
  "Fill in all required fields accurately.": "সকল প্রয়োজনীয় ক্ষেত্র সঠিকভাবে পূরণ করুন।",
  "Provide the name of your recommending member.": "আপনার সুপারিশকারীর নাম প্রদান করুন।",
  "Your referral will be verified by the council.": "আপনার সুপারিশ পরিষদ দ্বারা যাচাই করা হবে।",
  "You will be notified of the decision.": "আপনাকে সিদ্ধান্ত সম্পর্কে জানানো হবে।",
  "Chapter 3: Member Qualifications": "ধারা ৩: সদস্যপদের যোগ্যতা",
  
  // Programs page
  "Image Placeholder": "চিত্র ন خوردা",
  "Genuine program imagery to be added.": "সত্য কর্মকাণ্ডের চিত্র যোগ করা হবে।",
  "Program image placeholder": "কর্মকাণ্ডের চিত্র নি репреسينটেশন",
  "Provide vocational tools and equipment for income generation.": "আয় সৃষ্টির জন্য পেশাগত সরঞ্জাম ও উপকরণ প্রদান করা।",
  "Offer business mentoring and skills training.": "ব্যবসায় স বরশন ও দক্ষতা প্রশিক্ষণ প্রদান করা।",
  "Break the cycle of dependency on temporary relief.": "সাময়িক ত্রাণের ওপর নির্ভরতার চক্র ভেঙে ফেলা।",
  "Distribution of sewing machines and tailoring kits.": "সেলাই মেশিন ও দর্জি কিট বিতরণ করা।",
  "Micro-trade seed capital for small businesses.": "খুদে বাণিজ্যের জন্য बीज পুঁজি প্রদান করা।",
  "Vocational training and mentorship.": "পেশাগত প্রশিক্ষণ ও স পরামর্শ।",
  "End publicity-driven, prestige-seeking donations.": "প্রচার-চালিত, মর্যাদা-লাভকারী দান বন্ধ করা।",
  "Promote confidential, respectful assistance.": "গোপনীয়, সম্মানজনক সহায়তা প্রচার করা।",
  "Educate donors on dignity-preserving giving.": "দাতাদের মর্যাদা-রক্ষাকারী দান সম্পর্কে শিক্ষিত করা।",
  "Awareness campaigns on ethical giving.": "সঠিক দান পদ্ধতি সম্পর্কে সচেতনতা প্রচার করা।",
  "Donor education on beneficiary dignity.": "দাতাদের গ্রহীতার মর্যাদা সম্পর্কে শিক্ষা দেওয়া।",
  "Community outreach against photo-op charity.": "ছবি-তোলা দানের বিরুদ্ধে সম্প্রদায়émission প্রচার করা।",
  "Deliver immediate relief to disaster-affected communities.": "দুর্বল সম্প্রদায়ের জন্য দ্রুত ত্রাণ বিতরণ করা।",
  "Support victims of catastrophic accidents.": "বিরাল দুর্ঘটনার সতর্ক আহতদের সহায়তা করা।",
  "Maintain confidentiality in all relief operations.": "সকল ত্রাণ কার্যক্রমে গোপনীয়তা বজায় রাখা।",
  "Emergency ration and supply distribution.": "জরুরি রেশন ও সরঞ্জাম বিতরণ।",
  "Rapid response to floods and cyclones.": "বন্যা ও ঘূর্ণিঝড়ে দ্রুত প্রতিক্রিয়া।",
  "Confidential individual accident assistance.": "গোপনীয় ব্যক্তিগত দুর্ঘটনা সহায়তা।",
  
  // Transparency page
  "Funding Sources": "তহবিলের উৎস",
  "Fund Management Policy": "তহবিল ব্যবস্থাপনা নীতি",
  "Chapter 6: Fund Ethics & Auditing": "ধারা ৬: তহবিল নৈতিকতা ও নিরীক্ষা",
  "Funding Sources": "তহবিলের উৎস",
  "Fund Management Policy": "তহবিল ব্যবস্থাপনা নীতি",
  "Via Verified Members": "যাচাইকৃত সদস্যের মাধ্যমে",
  
  // Common navigation
  "Home": "হোম",
};

// Generate additions for EN section (keys with English text)
let enAdditions = '';
let bnAdditions = '';

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

Object.entries(keysData).forEach(([key, val]) => {
  const enText = val.en;
  const bnText = enToBn[enText] || enText; // fallback to English if no Bangla translation
  
  enAdditions += `    ${key}: "${enText}",\n`;
  bnAdditions += `    ${key}: "${bnText}",\n`;
});

console.log('=== ADD TO EN SECTION (before the closing }) ===');
console.log(enAdditions);

console.log('\n=== ADD TO BN SECTION (before the closing }) ===');
console.log(bnAdditions);

// Save to file for reference
fs.writeFileSync('i18n_additions.json', JSON.stringify({ en: enAdditions, bn: bnAdditions }, null, 2));
console.log('\nSaved to i18n_additions.json');
