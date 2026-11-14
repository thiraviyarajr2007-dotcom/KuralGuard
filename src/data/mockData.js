export const CATEGORIES = [
  {
    id: 'Road Safety',
    name: 'Road Safety',
    iconName: 'AlertTriangle',
    color: 'amber',
    description: 'Potholes, missing signage, dangerous crossings, signal failures, traffic hazards',
    defaultUrgency: 'Medium',
  },
  {
    id: 'Public Lighting',
    name: 'Public Lighting',
    iconName: 'LightbulbOff',
    color: 'amber',
    description: 'Extinguished streetlights, dark commuter pathways, damaged lamp posts, exposed fixtures',
    defaultUrgency: 'Medium',
  },
  {
    id: 'Flooding',
    name: 'Flooding',
    iconName: 'Waves',
    color: 'amber',
    description: 'Stagnant monsoon water, overflowing culverts, clogged stormwater drains, basement inundation',
    defaultUrgency: 'Medium',
  },
  {
    id: 'Women’s Safety',
    name: 'Women’s Safety',
    iconName: 'ShieldAlert',
    color: 'red',
    description: 'Isolated transit shelters, unmonitored alleys, harassment hotspots, missing emergency points',
    defaultUrgency: 'High',
  },
  {
    id: 'Health Concern',
    name: 'Health Concern',
    iconName: 'HeartPulse',
    color: 'amber',
    description: 'Contaminated tap pipelines, toxic chemical dumping, open biological waste, mosquito breeding zones',
    defaultUrgency: 'Medium',
  },
  {
    id: 'Waste and Sanitation',
    name: 'Waste and Sanitation',
    iconName: 'Trash2',
    color: 'teal',
    description: 'Illegal debris dump, open overflowing bins, uncovered sewer manholes, hazardous litter',
    defaultUrgency: 'Low',
  },
  {
    id: 'Other',
    name: 'Other',
    iconName: 'MoreHorizontal',
    color: 'slate',
    description: 'Any other community safety concern that does not fit the listed categories',
    defaultUrgency: 'Medium',
  },
];

export const DEMO_REPORT = {
  id: 'KG-DEMO-2026-01',
  referenceId: 'KG-2026-8841',
  title: 'Exposed High-Voltage Cable & Waterlogged Pit near Campus South Bus Stand',
  category: 'Road Safety',
  location: 'South Access Road, Near Bus Shelter 4 & Girls Hostel Link',
  urgency: 'High',
  riskLevel: 'High',
  language: 'en',
  isAnonymous: true,
  createdAt: '2026-11-14T10:15:00Z',
  status: 'Submitted', // 'Draft' | 'Submitted' | 'Verified' | 'Resolved'
  description: 'A 4-foot deep excavated ditch has flooded with evening rainwater, partially submerging an uninsulated industrial power cable. Two streetlights above it are flickering violently. Commuters and evening students walking towards the bus stop must squeeze past with less than 2 feet clearance.',
  summary: 'Active electrocution and structural collapse hazard. High pedestrian volume corridor combined with standing water and exposed live wiring requires urgent physical cordoning and municipal electrical isolation.',
  immediateSafetyAdvice: [
    'Maintain a minimum 15-meter buffer from the pooled water and cable area.',
    'Do not use metal umbrellas or walk through water puddles within the 20-meter zone.',
    'Divert foot traffic via the paved North Boulevard walkway; warn approaching students.',
    'In case of visible arcing or smoke, immediately contact Campus Security Desk at 112 / +91-422-261-4111.'
  ],
  recommendedAction: 'Immediate deployment of Municipal Electricity Board (EB) line inspector for feeder isolation, followed by Highway Maintenance installation of barricades and drainage suction pump.',
  upvotes: 42,
  imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
  history: [
    { step: 'Draft', timestamp: '2026-11-14 10:12 AM', note: 'Report initiated on mobile client' },
    { step: 'Submitted', timestamp: '2026-11-14 10:15 AM', note: 'AI risk assessment completed and docket generated' },
    { step: 'Verified', timestamp: 'Pending verification', note: 'Awaiting ward engineer on-site inspection' },
    { step: 'Resolved', timestamp: 'Pending', note: 'Awaiting repair certification' },
  ]
};

export const INITIAL_COMMUNITY_REPORTS = [
  {
    id: 'KG-2026-101', referenceId: 'KG-2026-101', title: 'Dangerous school-road crossing', category: 'Road Safety', location: 'School road crossing near campus', urgency: 'High', riskLevel: 'High', confidence: 0.93, language: 'ta', isAnonymous: true, createdAt: '2026-11-14T08:10:00Z', status: 'Submitted', description: 'பள்ளி நேரத்தில் இந்த சாலையை கடக்க மிகவும் ஆபத்தாக உள்ளது. வாகனங்கள் வேகமாக செல்கின்றன; zebra crossing மற்றும் street light இல்லை.', summary: 'High-risk school-road crossing with fast vehicles, no zebra crossing, and poor lighting.', evidenceFactors: ['School-zone location', 'Fast-moving vehicles', 'No visible zebra crossing', 'Poor lighting'], affectedCommunity: 'Students and pedestrians', communityImprovements: ['Add a zebra crossing', 'Improve street lighting', 'Add speed-calming measures', 'Provide school-hour crossing support'], recommendedIntervention: 'Add a zebra crossing; improve street lighting; add speed-calming measures; provide school-hour crossing support', immediateSafetyAdvice: ['Avoid crossing alone during school hours', 'Use a supervised crossing point', 'Contact a trusted adult when necessary'], recommendedAction: 'Route to Municipal Road / Traffic Department for school-zone crossing intervention.', recommendedRecipientCategory: 'Municipal Road / Traffic Department', isDemoAnalysis: true, demoStatus: 'Demo data', upvotes: 18, imageUrl: null, history: [{ step: 'Submitted', timestamp: '2026-11-14 08:10', note: 'Demo AI-assisted analysis' }],
  },
  {
    id: 'KG-2026-102', referenceId: 'KG-2026-102', title: 'Broken streetlight near a school', category: 'Public Lighting', location: 'School pathway', urgency: 'Medium', riskLevel: 'Medium', confidence: 0.78, language: 'en', isAnonymous: true, createdAt: '2026-11-13T17:40:00Z', status: 'Verified', description: 'The streetlight near the school is broken and the path is very dark after sunset.', summary: 'Medium-risk lighting gap on a student route.', evidenceFactors: ['Broken streetlight', 'Dark pathway after sunset', 'Student route'], affectedCommunity: 'Students, commuters and pedestrians', communityImprovements: ['Replace faulty light', 'Trim obstructing branches', 'Add backup lighting'], recommendedIntervention: 'Replace the streetlight and inspect nearby poles.', immediateSafetyAdvice: ['Use the main lit road', 'Travel with a group after dark'], recommendedAction: 'Route to Electricity Board / Municipal Lighting Department.', recommendedRecipientCategory: 'Electricity Board / Municipal Lighting Department', isDemoAnalysis: true, demoStatus: 'Demo data', upvotes: 9, imageUrl: null, history: [{ step: 'Verified', timestamp: '2026-11-13 18:00', note: 'Demo verified' }],
  },
  {
    id: 'KG-2026-103', referenceId: 'KG-2026-103', title: 'Flooded pedestrian path', category: 'Flooding', location: 'Pedestrian path near market', urgency: 'Medium', riskLevel: 'Medium', confidence: 0.8, language: 'en', isAnonymous: true, createdAt: '2026-11-12T19:05:00Z', status: 'Resolved', description: 'Rainwater has flooded the pedestrian path and pedestrians must walk near traffic.', summary: 'Medium-risk flooding on a pedestrian route.', evidenceFactors: ['Standing water', 'Blocked drainage', 'Pedestrian path exposure'], affectedCommunity: 'Residents, commuters and pedestrians', communityImprovements: ['Clear blocked drains', 'Install drain covers', 'Add flood warning signs'], recommendedIntervention: 'Clear drainage and install covers before the next rain.', immediateSafetyAdvice: ['Avoid walking through standing water', 'Use higher ground and lit paths'], recommendedAction: 'Route to Stormwater Drainage / Public Works Department.', recommendedRecipientCategory: 'Stormwater Drainage / Public Works Department', isDemoAnalysis: true, demoStatus: 'Demo data', upvotes: 14, imageUrl: null, history: [{ step: 'Resolved', timestamp: '2026-11-13 10:00', note: 'Demo resolved' }],
  },
  {
    id: 'KG-2026-104', referenceId: 'KG-2026-104', title: "Women's safety concern near a bus stop", category: 'Women’s Safety', location: 'Bus stop after dark', urgency: 'High', riskLevel: 'High', confidence: 0.88, language: 'en', isAnonymous: true, createdAt: '2026-11-11T21:30:00Z', status: 'Verified', description: 'A woman reported feeling unsafe and followed by two men near the bus stop after dark.', summary: 'High-risk personal safety concern requiring sensitive handling.', evidenceFactors: ['Isolated bus stop', 'After-dark timing', 'Reported following/harassment'], affectedCommunity: 'Women, girls and vulnerable commuters', communityImprovements: ['Improve lighting at bus stop', 'Add monitored waiting point', 'Share verified helpline information'], recommendedIntervention: 'Improve bus-stop lighting and provide a monitored waiting area.', immediateSafetyAdvice: ['Move to a lit public area', 'Contact local emergency services if in immediate danger', 'Share live location with a trusted person'], recommendedAction: 'Route to Women Safety Cell / Community Safety Desk (verify locally).', recommendedRecipientCategory: 'Women Safety Cell / Community Safety Desk (verify locally)', isDemoAnalysis: true, demoStatus: 'Demo data', upvotes: 27, imageUrl: null, history: [{ step: 'Verified', timestamp: '2026-11-12 08:00', note: 'Demo verified' }],
  },
  {
    id: 'KG-2026-105', referenceId: 'KG-2026-105', title: 'Public waste issue near a community area', category: 'Waste and Sanitation', location: 'Community area lane', urgency: 'Low', riskLevel: 'Low', confidence: 0.7, language: 'en', isAnonymous: false, reporterName: 'Student reporter', createdAt: '2026-11-10T16:20:00Z', status: 'Submitted', description: 'Garbage is piling near the community area and the drain is blocked.', summary: 'Low-risk sanitation issue affecting walkway and drainage.', evidenceFactors: ['Overflowing waste', 'Blocked drain', 'Community walkway'], affectedCommunity: 'Local residents and students', communityImprovements: ['Clear the dump safely', 'Add covered bins', 'Increase collection frequency'], recommendedIntervention: 'Schedule sanitation clearance and add covered bins.', immediateSafetyAdvice: ['Avoid touching waste', 'Use gloves if clearing is necessary'], recommendedAction: 'Route to Sanitation / Solid Waste Department.', recommendedRecipientCategory: 'Sanitation / Solid Waste Department', isDemoAnalysis: true, demoStatus: 'Demo data', upvotes: 4, imageUrl: null, history: [{ step: 'Submitted', timestamp: '2026-11-10 16:25', note: 'Demo report' }],
  },
];

export const DEMO_METRICS = {
  totalReports: 418,
  highRisk: 47,
  resolved: 326,
  avgResponseHours: '14.2 hrs',
  resolutionRate: '78.0%',
  activeCommunities: '6 Campuses & 14 Wards',
  sampleNotice: 'Sample demonstration data based on District 7 student safety pilot metrics.'
};

export const SAFETY_RESOURCES = [
  {
    category: 'Emergency Help',
    icon: 'PhoneCall',
    badge: 'Immediate Response',
    color: 'red',
    contacts: [
      {
        title: 'National Emergency Response (Police, Fire, Ambulance)',
        number: '112',
        availability: '24/7 Toll-Free',
        note: 'Unified single-number emergency helpline across all states.',
        demo: false,
      },
      {
        title: 'Police Control Room & Rapid Action',
        number: '100',
        availability: '24/7 Hotline',
        note: 'Immediate patrol dispatch for active threats, accidents, or violence.',
        demo: false,
      },
      {
        title: 'Fire & Disaster Rescue Services',
        number: '101',
        availability: '24/7 Hotline',
        note: 'Building fires, chemical spills, gas leaks, structural cave-ins.',
        demo: false,
      },
      {
        title: 'National Disaster Response Force (NDRF)',
        number: '1078',
        availability: '24/7 Monitored',
        note: 'Urban flooding, cyclones, landslides, severe weather emergencies.',
        demo: false,
      }
    ]
  },
  {
    category: 'Women’s Safety',
    icon: 'Shield',
    badge: 'Confidential & Immediate',
    color: 'teal',
    contacts: [
      {
        title: 'National Women Helpline (NCW)',
        number: '1091',
        availability: '24/7 Dedicated',
        note: 'Confidential reporting, immediate police intervention, legal guidance.',
        demo: false,
      },
      {
        title: 'Student Internal Complaints Committee (ICC)',
        number: '+91 422 261 4055',
        availability: '8:00 AM - 8:00 PM',
        note: 'Demonstration campus helpline for sexual harassment and campus safety concerns.',
        demo: true,
      },
      {
        title: 'Campus Night Escort & Safe Transit Marshall',
        number: '+91 422 261 4999',
        availability: '6:00 PM - 6:00 AM',
        note: 'Demonstration security escort service for students traversing dark campus zones.',
        demo: true,
      },
      {
        title: 'Cyber Crime Reporting Portal Helpline',
        number: '1930',
        availability: '24/7 Hotline',
        note: 'Online harassment, stalking, unauthorized photo dissemination.',
        demo: false,
      }
    ]
  },
  {
    category: 'Medical Assistance',
    icon: 'HeartPulse',
    badge: 'Urgent Care',
    color: 'amber',
    contacts: [
      {
        title: 'National Ambulance Emergency Service',
        number: '108',
        availability: '24/7 Toll-Free',
        note: 'Paramedic triage and high-speed transit to nearest emergency room.',
        demo: false,
      },
      {
        title: 'District Trauma & Emergency Hospital',
        number: '+91 422 257 0100',
        availability: '24/7 Casualty Desk',
        note: 'Demonstration regional emergency trauma care facility contact.',
        demo: true,
      },
      {
        title: 'National Mental Health Helpline (Tele-MANAS)',
        number: '14416',
        availability: '24/7 Toll-Free',
        note: 'Free, confidential psychological first aid and crisis counseling.',
        demo: false,
      },
      {
        title: 'Campus First Aid & Infirmary Dispatch',
        number: '+91 422 261 4108',
        availability: '24/7 Resident Nurse',
        note: 'Demonstration on-campus primary stabilization center.',
        demo: true,
      }
    ]
  },
  {
    category: 'Trusted adult or community support',
    icon: 'Users',
    badge: 'Community Support',
    color: 'teal',
    contacts: [
      {
        title: 'City Corporation Public Grievance Desk',
        number: '1913',
        availability: 'Mon - Sat, 8 AM - 7 PM',
        note: 'Municipal reporting for broken roads, failed drainage, dead streetlights.',
        demo: false,
      },
      {
        title: 'Electricity Board (TNEB/State EB) Hazard Line',
        number: '94987 94987',
        availability: '24/7 Wire Hazard Desk',
        note: 'Downed live lines, transformer explosions, spark hazards.',
        demo: false,
      },
      {
        title: 'Ward Councillor Emergency Liaison Desk',
        number: '+91 422 261 4880',
        availability: '9:00 AM - 5:00 PM',
        note: 'Demonstration contact for civic ward representative escalation.',
        demo: true,
      },
      {
        title: 'Campus Estate & Maintenance Control Desk',
        number: '+91 422 261 4001',
        availability: '7:00 AM - 10:00 PM',
        note: 'Demonstration contact for institutional repairs and road barriers.',
        demo: true,
      }
    ]
  }
];
