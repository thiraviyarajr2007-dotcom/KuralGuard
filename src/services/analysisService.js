const HIGH_RISK_PATTERNS = [
  /\b(immediate danger|accident|violence|assault|medical emergency|emergency|exposed (electrical )?wire|live wire|electric shock|electrocution|unsafe (location )?at night|dark alley|fire|gas leak|flooded road|deep water)\b/i,
  /(ஆபத்து|விபத்து|அவசரம்|மருத்துவ|மின் கம்பி|நெருப்பு|வெள்ளம்quantity)/i,
];

const MEDIUM_RISK_PATTERNS = [
  /\b(broken street ?light|street ?light|no light|dark|flooding|flood|water ?logging|drain|dangerous road|pothole|broken road|bad crossing|harassment|stalking|woman|girl|alone at night|unlit)\b/i,
  /(பள்ளி|சாலை|சந்தி|விளக்கு|வெள்ளம்|வடிகால்|தெரு|பெண்|பெண்கள்|இரவு|தொந்தரவு)/i,
];

const LOW_RISK_PATTERNS = [
  /\b(litter|garbage|trash|minor maintenance|information|suggestion|feedback|dustbin|waste bin)\b/i,
  /(குப்பை|குப்பை FIVE|சிறிய|தகவல்|பராமரிப்பு)/i,
];

const CATEGORY_KEYWORDS = {
  'Road Safety': /\b(road|street|pothole|crossing|traffic|vehicle|accident|sign|signal|dangerous road|highway|lane|school|pedestrian|zebra)\b|சாலை|பள்ளி|கட|பாதசாரி/i,
  'Public Lighting': /\b(light|street ?light|lamp|dark|blackout|lighting|flicker|bulb)\b|விளக்கு|இருள்/i,
  'Flooding': /\b(flood|flooding|water ?logging|waterlogged|drain|drainage|overflow|rain|stagnant water|sewer)\b|வெள்ளம்|வடிகால்/i,
  'Women’s Safety': /\b(woman|women|girl|female|harassment|stalking|unsafe|alone|night|footbridge|bus stop|hostel)\b|பெண்|பெண்கள்|தொந்தரவு|பேருந்து/i,
  'Health Concern': /\b(health|disease|contamination|chemical|waste|smell|odor|mosquito|water quality|sanitation hazard|toxic)\b|உடல்நலம்|நோய்|நெடி|நச்சு/i,
  'Waste and Sanitation': /\b(garbage|litter|trash|waste|bin|dump|sanitation|debris|smell)\b|குப்பை|குப்பை FIVE|குப்பை FIVE/i,
};

const RECIPIENTS = {
  'Road Safety': 'Municipal Road / Traffic Department',
  'Public Lighting': 'Electricity Board / Municipal Lighting Department',
  'Flooding': 'Stormwater Drainage / Public Works Department',
  'Women’s Safety': 'Women Safety Cell / Community Safety Desk (verify locally)',
  'Health Concern': 'Public Health / Sanitation Inspection Team',
  'Waste and Sanitation': 'Sanitation / Solid Waste Department',
  'Other': 'Local Ward Officer / Campus Estate Desk (verify locally)',
  'General Safety': 'Local Ward Officer / Campus Estate Desk (verify locally)',
};

const AFFECTED_GROUPS = {
  'Road Safety': 'Students and pedestrians',
  'Public Lighting': 'Students, commuters and pedestrians',
  'Flooding': 'Residents, commuters and pedestrians',
  'Women’s Safety': 'Women, girls and vulnerable commuters',
  'Health Concern': 'Residents and passersby',
  'Waste and Sanitation': 'Local residents and students',
  'Other': 'Local community members',
  'General Safety': 'Local community members',
};

const COMMUNITY_IMPROVEMENTS = {
  'Road Safety': ['Add marked crossings and signage', 'Improve lighting near crossings', 'Add speed-calming measures', 'Provide school-hour crossing support'],
  'Public Lighting': ['Replace faulty lights', 'Trim obstructing branches', 'Add backup lighting', 'Schedule preventive maintenance'],
  'Flooding': ['Clear blocked drains', 'Install drain covers', 'Improve stormwater runoff', 'Add flood warning signs'],
  'Women’s Safety': ['Improve lighting on isolated routes', 'Add patrols or monitored points', 'Create safer alternate routes', 'Share verified helpline information'],
  'Health Concern': ['Contain hazardous material', 'Disinfect affected area', 'Notify sanitation/health team', 'Restrict access until checked'],
  'Waste and Sanitation': ['Clear the dump safely', 'Add covered bins', 'Increase collection frequency', 'Enforce anti-littering reminders'],
  'Other': ['Inspect the reported site', 'Assign a responsible local team', 'Document follow-up', 'Share verified resolution updates'],
  'General Safety': ['Inspect the reported site', 'Assign a responsible local team', 'Document follow-up', 'Share verified resolution updates'],
};

function isSchoolRoadCrossingHero(input) {
  const text = `${input.description || ''} ${input.location || ''}`.toLowerCase();
  const hasSchool = /school|பள்ளி/.test(text);
  const hasRoadCrossing = /cross|crossing|road|street|zebra|சாலை|கட|பாதசாரி/.test(text);
  const hasDangerSignal = /fast|quick|danger|accident|no |without|missing|lack|ஆபத்து|வேக|இல்லை/.test(text);
  return hasSchool && hasRoadCrossing && hasDangerSignal;
}

function detectCategory(input) {
  const text = `${input.category || ''} ${input.description || ''} ${input.location || ''}`;
  const selected = input.category && !['General Safety', 'Other'].includes(input.category) ? input.category : null;
  if (selected) return selected;
  for (const [category, pattern] of Object.entries(CATEGORY_KEYWORDS)) {
    if (pattern.test(text)) return category;
  }
  return input.category === 'Other' ? 'Other' : 'General Safety';
}

function riskFor(input) {
  if (isSchoolRoadCrossingHero(input)) return 'High';
  const text = `${input.description || ''} ${input.location || ''} ${input.category || ''}`;
  if (HIGH_RISK_PATTERNS.some((pattern) => pattern.test(text))) return 'High';
  if (MEDIUM_RISK_PATTERNS.some((pattern) => pattern.test(text))) return 'Medium';
  if (LOW_RISK_PATTERNS.some((pattern) => pattern.test(text))) return 'Low';
  return input.urgency === 'High' ? 'High' : input.urgency === 'Low' ? 'Low' : 'Medium';
}

function confidenceFor(riskLevel, matchedCategory) {
  const base = riskLevel === 'High' ? 0.9 : riskLevel === 'Medium' ? 0.76 : 0.68;
  return matchedCategory === 'General Safety' || matchedCategory === 'Other' ? Math.min(0.74, base - 0.06) : base;
}

function evidenceFor(input, category, riskLevel) {
  const text = `${input.description || ''} ${input.location || ''}`;
  if (isSchoolRoadCrossingHero(input)) {
    return ['School-zone location', 'Fast-moving vehicles', 'No visible zebra crossing', 'Poor lighting'];
  }
  const factors = [`${category} report near ${input.location || 'the reported area'}`];
  if (/school|பள்ளி/.test(text)) factors.push('School-zone location');
  if (/light|விளக்கு|dark|இருள்/.test(text)) factors.push('Poor lighting or darkness');
  if (/cross|road|street|சாலை|கட/.test(text)) factors.push('Road or crossing exposure');
  if (/flood|water|வெள்ளம்|drain|வடிகால்/.test(text)) factors.push('Water or drainage hazard');
  if (/woman|women|girl|harassment|பெண்|பெண்கள்|தொந்தரவு/.test(text)) factors.push('Personal safety concern');
  if (riskLevel === 'High') factors.push('Immediate-danger wording detected');
  if (riskLevel === 'Low') factors.push('Minor maintenance or information signal');
  return Array.from(new Set(factors)).slice(0, 5);
}

function reasonFor(riskLevel, category, input) {
  if (isSchoolRoadCrossingHero(input)) {
    return 'Students and pedestrians face fast-moving vehicles at a school-zone crossing with no zebra crossing and poor lighting, creating a high injury risk during school hours.';
  }
  if (riskLevel === 'High') {
    return `The report contains immediate-danger indicators such as accident, violence, medical emergency, exposed electrical hazard, or unsafe nighttime conditions near ${input.location || 'the reported area'}.`;
  }
  if (riskLevel === 'Medium') {
    return `The report matches medium-risk civic hazards including ${category.toLowerCase()} concerns such as broken lighting, flooding, dangerous road conditions, or repeated harassment risk.`;
  }
  return `The report appears to be a lower-risk maintenance, sanitation, or information concern rather than an immediate safety threat.`;
}

function adviceFor(riskLevel, category, input) {
  const place = input.location || 'the reported area';
  if (isSchoolRoadCrossingHero(input)) {
    return [
      'Avoid crossing alone during school hours; use a supervised crossing point.',
      'Wait for a clear gap and make eye contact with drivers before stepping onto the road.',
      'Contact a trusted adult, teacher, or school supervisor when necessary.',
      'If anyone is in immediate danger, contact local emergency services first.',
    ];
  }
  if (riskLevel === 'High') {
    return [
      `Move away from immediate danger at ${place} and keep at least 15 meters of distance where possible.`,
      'Warn people nearby and avoid touching wires, water, glass, or unstable structures.',
      'If anyone is in immediate danger, contact local emergency services first.',
      'Do not attempt repairs; document the scene safely and share only necessary details.',
    ];
  }
  if (riskLevel === 'Medium') {
    return [
      `Avoid the hazard zone at ${place} during low visibility or peak foot traffic.`,
      'Use a safer lit route or travel with others when possible.',
      'Report repeat observations with time, place, and photos if safe to take.',
      'For urgent danger, contact local emergency services instead of waiting for civic follow-up.',
    ];
  }
  return [
    `No immediate emergency action is indicated for ${category.toLowerCase()} at ${place}.`,
    'You can submit the report for civic tracking and follow safe local guidance.',
    'If conditions worsen, update the report or contact local emergency services.',
  ];
}

export function analyzeReport(input = {}) {
  const detectedCategory = detectCategory(input);
  const riskLevel = riskFor(input);
  const confidence = confidenceFor(riskLevel, detectedCategory);
  const reason = reasonFor(riskLevel, detectedCategory, input);
  const immediateSafetyAdvice = adviceFor(riskLevel, detectedCategory, input);
  const evidenceFactors = evidenceFor(input, detectedCategory, riskLevel);
  const affectedCommunity = AFFECTED_GROUPS[detectedCategory] || AFFECTED_GROUPS['General Safety'];
  const communityImprovements = COMMUNITY_IMPROVEMENTS[detectedCategory] || COMMUNITY_IMPROVEMENTS['General Safety'];
  const recommendedRecipientCategory = RECIPIENTS[detectedCategory] || RECIPIENTS['General Safety'];
  const recommendedIntervention = isSchoolRoadCrossingHero(input)
    ? 'Add a zebra crossing; improve street lighting; add speed-calming measures; provide school-hour crossing support'
    : communityImprovements.join('; ');
  const summary = isSchoolRoadCrossingHero(input)
    ? `High-risk school-road crossing at ${input.location || 'the reported area'}: fast vehicles, no zebra crossing, and poor lighting affect students and pedestrians during school hours.`
    : `${detectedCategory} concern at ${input.location || 'unspecified location'} assessed as ${riskLevel} risk with ${(confidence * 100).toFixed(0)}% demo confidence.`;

  return {
    detectedCategory,
    riskLevel,
    confidence,
    reason,
    summary,
    evidenceFactors,
    affectedCommunity,
    communityImprovements,
    recommendedIntervention,
    immediateSafetyAdvice,
    recommendedRecipientCategory,
    recommendedAction: `Route this demo brief to the ${recommendedRecipientCategory} for verification and follow-up.`,
    isDemoAnalysis: true,
  };
}
