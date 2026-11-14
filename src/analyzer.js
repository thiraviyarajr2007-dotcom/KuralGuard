import { t } from './i18n.js';

export const CATEGORIES = ['general', 'road', 'streetlight', 'flood', 'women', 'health', 'sanitation'];

const CATEGORY_KEYWORDS = {
  road: [
    'road', 'street', 'pothole', 'potholes', 'traffic', 'accident', 'vehicle', 'car', 'bike', 'speeding', 'speed',
    'school zone', 'pavement', 'sidewalk', 'crack', 'fallen', 'tree', 'debris', 'oil spill', 'construction',
    'சாலை', 'பாதை', 'வாகனம்', 'விபத்து', 'பள்ளம்', 'வேகம்',
    'सड़क', 'पथ', 'ट्रैफिक', 'दुर्घटना', 'गड्ढा', 'रास्ता',
    'റോഡ്', 'വഴി', 'വാഹനം'
  ],
  streetlight: [
    'streetlight', 'street light', 'street-light', 'light', 'lamp', 'dark', 'night', 'blackout', 'power cut',
    'broken light', 'no light', 'dim light', 'headlight', 'visibility',
    'தெரு விளக்கு', 'விளக்கு', 'இருள்', 'இரவு', 'மின்தடை',
    'स्ट्रीटलाइट', 'लाइट', 'रोशनी', 'अंधेरा', 'बिजली', 'रात',
    'സ്ട്രീറ്റ്ലൈറ്റ്', 'ലൈറ്റ്', 'വെളിച്ചം', 'ഇരുട്ട്', 'രാത്രി'
  ],
  flood: [
    'flood', 'flooding', 'waterlogging', 'water-logged', 'drain', 'drainage', 'overflow', 'rain', 'monsoon',
    'sewage overflow', 'nallah', 'stream', 'ponding', 'standing water', 'bridge', 'underpass',
    'வெள்ளம்', 'வடிகால்', 'மழை', 'நீர்', 'பொங்கும்',
    'बाढ़', 'जल निकासी', 'नाला', 'वर्षा', 'पानी', 'बहाव',
    'വെള്ളം', 'മഴ', 'ഡ്രെയിനേജ്', 'bridge'
  ],
  women: [
    'woman', 'women', 'girl', 'female', 'ladies', 'follow', 'following', 'stalking', 'stalk', 'harass', 'harassment',
    'unsafe', 'groping', 'catcall', 'eve teasing', 'eve-teasing', 'scream', 'alone at night', 'dark street', 'threat',
    'பெண்', 'பெண்கள்', 'பின்தொடர', 'துன்புறுத்தல்', 'இரவு', 'பாதுகாப்பு',
    'महिला', 'औरत', 'पीछा', 'उत्पीड़न', 'छेड़खानी', 'रात', 'सुरक्षा',
    'സുരക്ഷ', 'രാത്രി', 'വഴി'
  ],
  health: [
    'health', 'fever', 'dengue', 'mosquito', 'malaria', 'snake', 'disease', 'hospital', 'doctor', 'contagious',
    'cough', 'cold', 'waterborne', 'cholera', 'typhoid', 'mental health', 'waste water', 'contaminated',
    'உடல்நலம்', 'காய்ச்சல்', 'டெங்கு', 'கொசு', 'பாம்பு', 'நோய்', 'மருத்துவமனை',
    'स्वास्थ्य', 'बुखार', 'डेंगू', 'मच्छर', 'सांप', 'बीमारी', 'अस्पताल',
    'ആരോഗ്യം', 'രോഗം'
  ],
  sanitation: [
    'garbage', 'waste', 'trash', 'rubbish', 'sewage', 'dump', 'dirty', 'filth', 'smell', 'blocked drain',
    'toilet', 'litter', 'plastic', 'chemical', 'hazardous waste', 'open dump', 'overflowing bin',
    'குப்பை', 'கழிவு', 'குப்பைக்குவளை', 'துர்நாற்றம்', 'சுகாதாரம்', 'கழிவுநீர்',
    'कचरा', 'गंदगी', 'कूड़ा', 'गंदा', 'गंध', 'टॉयलेट', 'स्वच्छता',
    'ശുചിത്വം'
  ],
  general: ['problem', 'issue', 'hazard', 'danger', 'unsafe', 'emergency', 'help', 'broken', 'damage', 'risk']
};

const SIGNAL_KEYWORDS = {
  trafficSpeed: ['speeding', 'speed', 'fast', 'vehicle', 'traffic', 'accident', 'bike', 'car', 'bus', 'lorry', 'overtake', 'night traffic'],
  visibility: ['dark', 'night', 'no light', 'broken light', 'streetlight', 'blackout', 'dim', 'fog', 'headlight', 'visibility', 'lamp'],
  vulnerablePeople: ['child', 'children', 'student', 'school', 'girl', 'women', 'woman', 'elderly', 'alone', 'kid', 'college', 'university'],
  healthHazard: ['fever', 'dengue', 'mosquito', 'malaria', 'snake', 'disease', 'hospital', 'doctor', 'contagious', 'infection', 'contaminated', 'cholera', 'typhoid'],
  harassmentRisk: ['follow', 'following', 'stalk', 'stalking', 'harass', 'harassment', 'threat', 'groping', 'catcall', 'eve teasing', 'eve-teasing', 'unsafe', 'scared', 'afraid'],
  wasteHazard: ['garbage', 'waste', 'trash', 'rubbish', 'sewage', 'dump', 'dirty', 'filth', 'smell', 'toilet', 'litter', 'plastic', 'chemical', 'hazardous'],
  infrastructureDamage: ['pothole', 'broken', 'crack', 'fallen', 'tree', 'pole', 'structure', 'bridge', 'wall', 'damage', 'collapsed', 'sinkhole'],
  weatherWater: ['flood', 'flooding', 'rain', 'monsoon', 'waterlogging', 'overflow', 'drain', 'drainage', 'standing water', 'nallah', 'ponding', 'stream']
};

const CATEGORY_BASE = {
  general: 38,
  road: 52,
  streetlight: 56,
  flood: 62,
  women: 76,
  health: 58,
  sanitation: 50
};

const CATEGORY_IMPLIED_SIGNALS = {
  road: ['trafficSpeed', 'infrastructureDamage'],
  streetlight: ['visibility', 'infrastructureDamage'],
  flood: ['weatherWater', 'infrastructureDamage'],
  women: ['vulnerablePeople', 'harassmentRisk'],
  health: ['healthHazard', 'wasteHazard'],
  sanitation: ['wasteHazard', 'healthHazard'],
  general: []
};

const URGENCY_KEYWORDS = ['accident', 'hit', 'injured', 'injury', 'death', 'dead', 'bleeding', 'blood', 'fire', 'gas leak', 'chemical', 'electrical', 'snake bite', 'epidemic', 'outbreak', 'assault', 'rape', 'attack', 'kidnap', 'kidnapped', 'immediate danger', 'emergency', 'urgent', 'critical'];
const LOW_KEYWORDS = ['minor', 'small', 'soon', 'low priority', 'not urgent', 'little issue'];
const SIGNAL_ORDER = ['harassmentRisk', 'weatherWater', 'vulnerablePeople', 'trafficSpeed', 'healthHazard', 'infrastructureDamage', 'visibility', 'wasteHazard'];
const SIGNAL_WEIGHT = {
  harassmentRisk: 14,
  weatherWater: 12,
  vulnerablePeople: 10,
  trafficSpeed: 9,
  infrastructureDamage: 9,
  healthHazard: 8,
  visibility: 7,
  wasteHazard: 6
};

function normalize(text) {
  return ` ${String(text || '').toLowerCase().replace(/[.!?;,:()[\]{}"']/g, ' ')} `;
}

function includesAny(normalized, keywords) {
  return keywords.filter((keyword) => {
    const term = keyword.toLowerCase();
    if (/^[a-z0-9]+$/.test(term)) {
      return new RegExp(`(^|[^a-z0-9])${term}([^a-z0-9]|$)`).test(normalized);
    }
    return normalized.includes(term);
  });
}

export function detectCategory(description, selectedCategory = 'general') {
  const normalized = normalize(description);
  let best = null;
  let bestScore = 0;
  for (const category of CATEGORIES) {
    const matches = includesAny(normalized, CATEGORY_KEYWORDS[category] || []);
    const score = matches.length * (category === 'general' ? 0.4 : 1);
    if (score > bestScore) {
      best = category;
      bestScore = score;
    }
  }
  if (best && bestScore > 0 && best !== 'general') return { category: best, matched: includesAny(normalized, CATEGORY_KEYWORDS[best]) };
  if (CATEGORIES.includes(selectedCategory) && selectedCategory !== 'general') return { category: selectedCategory, matched: [] };
  return { category: 'general', matched: [] };
}

export function detectSignals(description, category) {
  const normalized = normalize(description);
  const found = new Set();
  for (const signal of Object.keys(SIGNAL_KEYWORDS)) {
    const matches = includesAny(normalized, SIGNAL_KEYWORDS[signal]);
    if (matches.length > 0) found.add(signal);
  }
  for (const signal of CATEGORY_IMPLIED_SIGNALS[category] || []) found.add(signal);
  return SIGNAL_ORDER.filter((signal) => found.has(signal));
}

function riskLevel(score) {
  if (score <= 34) return 'low';
  if (score <= 64) return 'moderate';
  if (score <= 84) return 'high';
  return 'critical';
}

export function analyzeIssue({ description, location = '', category = 'general', language = 'en' }) {
  const normalized = normalize(description);
  const detected = detectCategory(description, category);
  const categoryKey = detected.category;
  const signals = detectSignals(description, categoryKey);
  const keywordMatches = Object.values(CATEGORY_KEYWORDS).flatMap((keywords) => includesAny(normalized, keywords));
  const urgencyMatches = includesAny(normalized, URGENCY_KEYWORDS);
  const lowMatches = includesAny(normalized, LOW_KEYWORDS);

  let score = CATEGORY_BASE[categoryKey] || CATEGORY_BASE.general;
  for (const signal of signals) score += SIGNAL_WEIGHT[signal] || 0;
  score += Math.min(24, urgencyMatches.length * 8);
  score -= Math.min(12, lowMatches.length * 6);
  score = Math.max(5, Math.min(98, Math.round(score)));

  const level = riskLevel(score);
  const confidence = Math.max(52, Math.min(96, 58 + Math.min(30, keywordMatches.length * 4 + signals.length * 3 + (detected.matched.length ? 5 : 0))));
  const reasonParts = signals.slice(0, 3).map((signal) => t(language, `signal.${signal}.reason`));
  if (reasonParts.length === 0) {
    reasonParts.push(t(language, 'reason.none'));
  }
  reasonParts.push(t(language, 'reason.outcome', { risk: t(language, `risk.${level}`) }));

  const guidance = [...(t(language, `guidance.${categoryKey}`) || []), ...signals.slice(0, 2).map((signal) => t(language, `signal.${signal}.tip`))];

  return {
    category: categoryKey,
    riskLevel: level,
    riskScore: score,
    confidence,
    signals,
    reason: reasonParts,
    guidance: guidance.slice(0, 5),
    keywordMatches: [...new Set(keywordMatches)].slice(0, 8),
    urgencyMatches,
    location: location.trim(),
    description: description.trim(),
    language
  };
}
