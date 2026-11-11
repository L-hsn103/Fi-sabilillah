const fs = require('fs');

const keysData = JSON.parse(fs.readFileSync('new_i18n_keys.json', 'utf8'));

const enToBn = {
  "Home": "হোম",
  "About Us": "আমরা কে",
  "Governance": "শাসনব্যবস্থা",
  "Resources": "সম্পদ",
  "Join / Apply": "সদস্যপদ আবেদন",
  "Contact Us": "যোগাযোগ করুন",
  "A Non-Political, Non-Profit Voluntary Initiative": "একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী উদ্যোগ",
  "Explore Constitution & Charter": "সংবিধান ও গঠনতন্ত্র দেখুন",
  "Apply for Membership (Free)": "সদস্যপদের জন্য আবেদন (বিনামূল্যে)",
  "Our Origin & Philosophy": "আমাদের দর্শন ও প্রেক্ষাপট",
  "Recent Activities": "নবীনতম কর্মকাণ্ড",
  "Read More": "আরো পড়ুন",
  "Learn More": "আরো জানুন",
  "View structure": "কাঠামো দেখুন",
  "Meet the council": "পরিষদ hepatocellular دیکھুন",
  "Learn about elections": "নির্বাচন সম্পর্কে জানুন",
  "View all activities": "সব কর্মকাণ্ড দেখুন",
  "Established on April 10, 2021, Fi Sabilillah is a non-political, non-profit, and voluntary organization dedicated to restoring human dignity.": "১০ এপ্রিল, ২০২১ তারিখে প্রতিষ্ঠিত ফি সাবিলিল্লাহ একটি অরাজনৈতিক, অলাভজনক ও স্বেচ্ছাসেবী সংস্থা, যা মানব-মর্যাদা রক্ষার জন্য নিবেদিত।",
  "Fi Sabilillah was founded by a group of conscious students in Bangladesh on April 10, 2021. The organization was established to dismantle wealth-based social stratification and provide sustainable, discreet support while keeping the recipient's dignity untarnished.": "ফি সাবিলিল্লাহ বাংলাদেশে ১০ এপ্রিল, ২০২১ তারিখে একদল সচেতন শিক্ষার্থী দ্বারা প্রতিষ্ঠিত। সংস্থা সম্পদভিত্তিক সামাজিক মর্যাদার ভিত্তি ভেঙে ফেলা এবং গ্রহীতার মর্যাদা অক্ষুণ্ণ রেখে টেকসই ও গোপনীয় সহায়তা প্রদানের জন্য তৈরি।",
  "Full Organizational Charter": "পূর্ণাঙ্গ ব্যবস্থাপনা গৃহীত",
  "Print": "প্রিন্ট করুন",
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
  "Organizational Structure": "সাংগঠনিক কাঠামো",
  "Executive Council": "নির্বাহী পরিষদ",
  "Election Process": "নির্বাচন প্রক্রিয়া",
  "Governance Rules": "শাসনবিধি",
  "Democratic Principles (Article 12)": "গণতান্ত্রিক নীতিসমূহ (ধারা ১২)",
  "Election Schedule": "নির্বাচনের সময়সূচী",
  "The Executive Committee of Fi Sabilillah comprises the following nine portfolios (as defined in Article 9 of the Constitution):": "ফি সাবিলিল্লাহর নির্বাহী কমিটি নিম্নলিখিত নয়টি পোর্টফোলিও দ্বারা গঠিত (সংবিধানের ধারা ৯ অনুযায়ী):",
  "President": "সভাপতি",
  "Vice President": "উপ-সভাপতি",
  "General Secretary": "সাধারণ সম্পাদক",
  "Organizing Secretary": "সাংগঠনিক সম্পাদক",
  "Treasurer": "কোষাধ্যক্ষ",
  "Office Secretary": "দপ্তর সম্পাদক",
  "Policy Coordinator": "নীতিমালা সমন্বয়কারী",
  "Publicity Secretary": "প্রচার সম্পাদক",
  "Evaluation & Impact Analyst": "মূল্যায়ন ও প্রভাব বিশ্লেষক",
  "Eligibility Requirements": "যোগ্যতার শর্তাবলী",
  "Member Responsibilities": "সদস্যের দায়িত্ব",
  "Application Process": "আবেদন প্রক্রিয়া",
  "Fill in all required fields accurately.": "সকল প্রয়োজনীয় ক্ষেত্র সঠিকভাবে পূরণ করুন।",
  "Provide the name of your recommending member.": "আপনার সুপারিশকারীর নাম প্রদান করুন।",
  "Your referral will be verified by the council.": "আপনার সুপারিশ পরিষদ দ্বারা যাচাই করা হবে।",
  "You will be notified of the decision.": "আপনাকে সিদ্ধান্ত সম্পর্কে জানানো হবে।",
  "Chapter 3: Member Qualifications": "ধারা ৩: সদস্যপদের যোগ্যতা",
  "Image Placeholder": "চিত্রের জায়গা রাখা হয়েছে",
  "Genuine program imagery to be added.": "সত্য কর্মকাণ্ডের চিত্র পরে যোগ করা হবে।",
  "Program image placeholder": "কর্মকাণ্ডের চিত্রের জায়গা রাখা হয়েছে",
  "Provide vocational tools and equipment for income generation.": "আয় সৃষ্টির জন্য পেশাগত সরঞ্জাম ও উপকরণ প্রদান করা।",
  "Offer business mentoring and skills training.": "ব্যবসায় পরামর্শ ও দক্ষতা প্রশিক্ষণ প্রদান করা।",
  "Break the cycle of dependency on temporary relief.": "সাময়িক ত্রাণের ওপর নির্ভরতার চক্র ভেঙে ফেলা।",
  "Distribution of sewing machines and tailoring kits.": "সেলাই মেশিন ও দর্জি কিট বিতরণ করা।",
  "Micro-trade seed capital for small businesses.": "খুদে বাণিজ্যের জন্য বীজ পুঁজি প্রদান করা।",
  "Vocational training and mentorship.": "পেশাগত প্রশিক্ষণ ও পরামর্শ।",
  "End publicity-driven, prestige-seeking donations.": "প্রচার-চালিত, মর্যাদা-লাভকারী দান বন্ধ করা।",
  "Promote confidential, respectful assistance.": "গোপনীয়, সম্মানজনক সহায়তা প্রচার করা।",
  "Educate donors on dignity-preserving giving.": "দাতাদের মর্যাদা-রক্ষাকারী দান সম্পর্কে শিক্ষিত করা।",
  "Awareness campaigns on ethical giving.": "সঠিক দান পদ্ধতি সম্পর্কে সচেতনতা প্রচার করা।",
  "Donor education on beneficiary dignity.": "দাতাদের গ্রহীতার মর্যাদা সম্পর্কে শিক্ষা দেওয়া।",
  "Community outreach against photo-op charity.": "ছবি-তোলা দানের বিরুদ্ধে সম্প্রদায়ে প্রচার করা।",
  "Deliver immediate relief to disaster-affected communities.": "দুর্বল সম্প্রদায়ের জন্য দ্রুত ত্রাণ বিতরণ করা।",
  "Support victims of catastrophic accidents.": "বিরাল দুর্ঘটনার আহতদের সহায়তা করা।",
  "Maintain confidentiality in all relief operations.": "সকল ত্রাণ কার্যক্রমে গোপনীয়তা বজায় রাখা।",
  "Emergency ration and supply distribution.": "জরুরি রেশন ও সরঞ্জাম বিতরণ।",
  "Rapid response to floods and cyclones.": "বন্যা ও ঘূর্ণিঝরে দ্রুত প্রতিক্রিয়া।",
  "Confidential individual accident assistance.": "গোপনীয় ব্যক্তিগত দুর্ঘটনা সহায়তা।",
  "Funding Sources": "তহবিলের উৎস",
  "Fund Management Policy": "তহবিল ব্যবস্থাপনা নীতি",
  "Chapter 6: Fund Ethics & Auditing": "ধারা ৬: তহবিল নৈতিকতা ও নিরীক্ষা",
  "Via Verified Members": "যাচাইকৃত সদস্যের মাধ্যমে",
  "Article 6: Operational Priorities": "ধারা ৬: অগ্রাধিকারভিত্তিক কর্মসূচি",
  "Activities & Updates": "কর্মকাণ্ড ও আপডেট",
  "Open Membership Application Form": "সদস্যপদ আবেদন ফরম খুলুন",
  "Annual Fiscal Audit": "বার্ষিক আর্থিক নিরীক্ষা",
};

const content = fs.readFileSync('src/js/translations.js', 'utf8');
let lines = content.split('\n');

let enInsertLine = -1;
let bnInsertLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('prog_priority_badge: "Priority"') && enInsertLine === -1) {
    enInsertLine = i;
  }
  if (lines[i].includes('prog_priority_badge: "অগ্রাধিকার"') && bnInsertLine === -1) {
    bnInsertLine = i;
  }
}

console.log('EN insert after line:', enInsertLine + 1);
console.log('BN insert after line:', bnInsertLine + 1);

let enAdditions = '';
let bnAdditions = '';

Object.entries(keysData).forEach(([key, val]) => {
  const enText = val.en;
  const bnText = enToBn[enText] || enText;
  const quotedKey = /^\d/.test(key) ? `"${key}"` : key;
  const enEscaped = enText.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const bnEscaped = bnText.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  enAdditions += `    ${quotedKey}: "${enEscaped}",\n`;
  bnAdditions += `    ${quotedKey}: "${bnEscaped}",\n`;
});

lines.splice(enInsertLine + 1, 0, enAdditions);
bnInsertLine += enAdditions.split('\n').length - 1;
lines.splice(bnInsertLine + 1, 0, bnAdditions);

fs.writeFileSync('src/js/translations.js', lines.join('\n'));
console.log('Successfully added', Object.keys(keysData).length, 'keys');
