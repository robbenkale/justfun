/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sport, School, Team, Athlete, Game, Community, Thread, ThreadReply, UserProfile } from './types';

export const SUPPORTED_SPORTS: { id: Sport; label: string; icon: string; color: string }[] = [
  { id: 'basketball', label: 'Basketball', icon: '', color: '#E5E5E5' },
  { id: 'hockey', label: 'Ice Hockey', icon: '', color: '#E5E5E5' },
  { id: 'soccer', label: 'Soccer', icon: '', color: '#E5E5E5' },
  { id: 'football', label: 'Football', icon: '', color: '#E5E5E5' },
  { id: 'volleyball', label: 'Volleyball', icon: '', color: '#E5E5E5' },
  { id: 'track', label: 'Track & Field', icon: '', color: '#E5E5E5' },
  { id: 'baseball', label: 'Baseball', icon: '', color: '#E5E5E5' },
  { id: 'wrestling', label: 'Wrestling', icon: '', color: '#E5E5E5' },
  { id: 'swimming', label: 'Swimming', icon: '', color: '#E5E5E5' },
  { id: 'tennis', label: 'Tennis', icon: '', color: '#E5E5E5' },
  { id: 'lacrosse', label: 'Lacrosse', icon: '', color: '#E5E5E5' },
  { id: 'cross_country', label: 'Cross Country', icon: '', color: '#E5E5E5' }
];

export const MOCK_SCHOOLS: School[] = [
  {
    id: 'sch-westdale',
    name: 'Westdale Secondary School',
    board: 'HWDSB',
    city: 'Hamilton',
    region: 'Hamilton-Wentworth',
    logoUrl: undefined,
    colors: ['#000000', '#F1C40F']
  },
  {
    id: 'sch-cathedral',
    name: 'Cathedral High School',
    board: 'HWCDSB',
    city: 'Hamilton',
    region: 'Hamilton-Wentworth',
    logoUrl: undefined,
    colors: ['#2F3E46', '#E63946']
  },
  {
    id: 'sch-stmarys',
    name: 'St. Mary\'s Catholic Secondary',
    board: 'HWCDSB',
    city: 'Hamilton',
    region: 'Hamilton-Wentworth',
    logoUrl: undefined,
    colors: ['#03045E', '#FFB703']
  },
  {
    id: 'sch-winston',
    name: 'Sir Winston Churchill Secondary',
    board: 'DSBN',
    city: 'St. Catharines',
    region: 'Niagara',
    logoUrl: undefined,
    colors: ['#2A9D8F', '#E76F51']
  },
  {
    id: 'sch-bishopryan',
    name: 'Bishop Ryan Catholic Secondary',
    board: 'HWCDSB',
    city: 'Hannon',
    region: 'Hamilton-Wentworth',
    logoUrl: undefined,
    colors: ['#7B2CBF', '#FFD700']
  },
  {
    id: 'sch-westmount',
    name: 'Westmount Secondary School',
    board: 'HWDSB',
    city: 'Hamilton',
    region: 'Hamilton-Wentworth',
    logoUrl: undefined,
    colors: ['#2A3439', '#5AC8FA']
  },
  {
    id: 'sch-billcrothers',
    name: 'Bill Crothers Secondary School',
    board: 'YRDSB',
    city: 'Unionville',
    region: 'York Region',
    logoUrl: undefined,
    colors: ['#1E3A8A', '#F59E0B']
  },
  {
    id: 'sch-earlhaig',
    name: 'Earl Haig Secondary School',
    board: 'TDSB',
    city: 'North York',
    region: 'Toronto (GTA)',
    logoUrl: undefined,
    colors: ['#10B981', '#111827']
  },
  {
    id: 'sch-waterlooci',
    name: 'Waterloo Collegiate Institute',
    board: 'WRDSB',
    city: 'Waterloo',
    region: 'Waterloo Region',
    logoUrl: undefined,
    colors: ['#7C3AED', '#F59E0B']
  },
  {
    id: 'sch-glebe',
    name: 'Glebe Collegiate Institute',
    board: 'OCDSB',
    city: 'Ottawa',
    region: 'Ottawa-Carleton',
    logoUrl: undefined,
    colors: ['#EF4444', '#1E40AF']
  },
  {
    id: 'sch-lornepark',
    name: 'Lorne Park Secondary School',
    board: 'PDSB',
    city: 'Mississauga',
    region: 'Peel Region',
    logoUrl: undefined,
    colors: ['#1E3A8A', '#FFFFFF']
  },
  {
    id: 'sch-oakvilletrafalgar',
    name: 'Oakville Trafalgar High School',
    board: 'HDSB',
    city: 'Oakville',
    region: 'Halton Region',
    colors: ['#06B6D4', '#0F172A']
  },
  {
    id: 'sch-fatherredmond',
    name: 'Father John Redmond Catholic Secondary',
    board: 'TCDSB',
    city: 'Etobicoke',
    region: 'Toronto (GTA)',
    colors: ['#4F46E5', '#FFFFFF']
  },
  {
    id: 'sch-lucas',
    name: 'A.B. Lucas Secondary School',
    board: 'TVDSB',
    city: 'London',
    region: 'London & Middlesex',
    colors: ['#EF4444', '#000000']
  },
  {
    id: 'sch-stmichaels',
    name: 'St. Michael\'s College School',
    board: 'CIS',
    city: 'Toronto',
    region: 'Toronto (GTA)',
    colors: ['#1E3A8A', '#FFFFFF']
  },
  {
    id: 'sch-saltfleet',
    name: 'Saltfleet District High School',
    board: 'HWDSB',
    city: 'Stoney Creek',
    region: 'Hamilton-Wentworth',
    colors: ['#059669', '#FFFFFF']
  },
  {
    id: 'sch-cardinalnewman',
    name: 'Cardinal Newman Catholic Secondary',
    board: 'HWCDSB',
    city: 'Stoney Creek',
    region: 'Hamilton-Wentworth',
    colors: ['#B91C1C', '#FBBF24']
  },
  { id: 'sch-ancaster', name: 'Ancaster High School', board: 'HWDSB', city: 'Ancaster', region: 'Hamilton-Wentworth', colors: ['#1E3A8A', '#F59E0B'] },
  { id: 'sch-dundas', name: 'Dundas Valley Secondary School', board: 'HWDSB', city: 'Dundas', region: 'Hamilton-Wentworth', colors: ['#2A9D8F', '#000000'] },
  { id: 'sch-waterdown', name: 'Waterdown District High School', board: 'HWDSB', city: 'Waterdown', region: 'Hamilton-Wentworth', colors: ['#000000', '#E63946'] },
  { id: 'sch-stm', name: 'St. Thomas More Catholic Secondary', board: 'HWCDSB', city: 'Hamilton', region: 'Hamilton-Wentworth', colors: ['#000000', '#F1C40F'] },
  { id: 'sch-macnab', name: 'Sir Allan MacNab Secondary', board: 'HWDSB', city: 'Hamilton', region: 'Hamilton-Wentworth', colors: ['#03045E', '#FFFFFF'] },
  { id: 'sch-glendale', name: 'Glendale Secondary School', board: 'HWDSB', city: 'Hamilton', region: 'Hamilton-Wentworth', colors: ['#EF4444', '#1E40AF'] },
  { id: 'sch-nora', name: 'Nora Frances Henderson Secondary', board: 'HWDSB', city: 'Hamilton', region: 'Hamilton-Wentworth', colors: ['#4F46E5', '#000000'] },
  { id: 'sch-sherwood', name: 'Sherwood Secondary School', board: 'HWDSB', city: 'Hamilton', region: 'Hamilton-Wentworth', colors: ['#7C3AED', '#FFFFFF'] },
  { id: 'sch-stjeandebrebeuf', name: 'St. Jean de Brébeuf Catholic', board: 'HWCDSB', city: 'Hamilton', region: 'Hamilton-Wentworth', colors: ['#000000', '#FFB703'] },
  { id: 'sch-bc', name: 'Brampton Centennial', board: 'PDSB', city: 'Brampton', region: 'Peel Region', colors: ['#E63946', '#2A3439'] },
  { id: 'sch-fmss', name: 'Fletcher\'s Meadow Secondary', board: 'PDSB', city: 'Brampton', region: 'Peel Region', colors: ['#1E3A8A', '#FFFFFF'] },
  { id: 'sch-trenton', name: 'Trenton High School', board: 'HPEDSB', city: 'Trenton', region: 'Quinte', colors: ['#2A9D8F', '#F59E0B'] },
  { id: 'sch-kingston', name: 'Kingston Secondary School', board: 'LDSB', city: 'Kingston', region: 'Eastern Ontario', colors: ['#000000', '#E76F51'] },
  { id: 'sch-pet', name: 'Pierre Elliott Trudeau High', board: 'YRDSB', city: 'Markham', region: 'York Region', colors: ['#7B2CBF', '#FFD700'] },
  { id: 'sch-bayview', name: 'Bayview Secondary School', board: 'YRDSB', city: 'Richmond Hill', region: 'York Region', colors: ['#10B981', '#111827'] },
  { id: 'sch-centraltech', name: 'Central Technical School', board: 'TDSB', city: 'Toronto', region: 'Toronto (GTA)', colors: ['#000000', '#FFFFFF'] }
];

export const MOCK_ATHLETES: Athlete[] = [
  {
    id: 'ath-1',
    name: 'Marcus Henderson',
    schoolId: 'sch-westdale',
    sport: ['basketball', 'track'],
    gradYear: 2026,
    position: 'Point Guard / Sprinter',
    bio: 'Varsity point guard starting for Westdale SS. 2025 HWDSB City Champion in 100m. Focuses on athletics and sports management studies in the future.',
    isVerified: true,
    isPremiumProfile: true,
    stats: {
      'Points Per Game': 18.4,
      'Assists Per Game': 6.2,
      'Steals Per Game': 2.3,
      '100m Dash PB': '10.84s',
      '200m Dash PB': '22.10s'
    }
  },
  {
    id: 'ath-2',
    name: 'Sarah Dubrowski',
    schoolId: 'sch-cathedral',
    sport: ['soccer', 'volleyball'],
    gradYear: 2027,
    position: 'Striker / Outside Hitter',
    bio: 'Double-sport varsity athlete at Cathedral High. Golden Boot recipient in 2025. Aspires to play NCAA Division I soccer.',
    isVerified: true,
    isPremiumProfile: false,
    stats: {
      'Goals Scored': 14,
      'Assists': 8,
      'Games Played': 12,
      'Kills Per Set': 3.1,
      'Aces In Season': 22
    }
  },
  {
    id: 'ath-3',
    name: 'Devon Miller',
    schoolId: 'sch-stmarys',
    sport: ['hockey', 'baseball'],
    gradYear: 2026,
    position: 'Center / Shortstop',
    bio: 'Varsity Hockey captain and lead compiler for St. Mary\'s Catholic Secondary. Selected for HWCDSB District MVP roster.',
    isVerified: false,
    isPremiumProfile: true,
    stats: {
      'Goals': 19,
      'Assists': 15,
      'Points (Hockey)': 34,
      'Batting Average': 0.385,
      'Home Runs': 4
    }
  },
  {
    id: 'ath-4',
    name: 'Emily Tsang',
    schoolId: 'sch-westmount',
    sport: ['swimming', 'cross_country'],
    gradYear: 2028,
    position: 'Freestyle Specialist',
    bio: 'Freshman swimming sensation at Westmount. Qualified for OFSAA in 50m & 100m Freestyle as an individual competitor.',
    isVerified: true,
    isPremiumProfile: false,
    stats: {
      '50m Free PB': '25.80s',
      '100m Free PB': '56.24s',
      'OFSAA Standing': '3rd Place',
      'XC 5k PB': '19:42'
    }
  },
  {
    id: 'ath-5',
    name: 'Justin Fitzpatrick',
    schoolId: 'sch-bishopryan',
    sport: ['wrestling', 'football'],
    gradYear: 2026,
    position: 'Linebacker / 83kg Division',
    bio: 'Defensive linchpin and 2025 provincial silver medalist in the high school wrestling championships.',
    isVerified: true,
    isPremiumProfile: true,
    stats: {
      'Tackles Solo': 42,
      'Sacks': 5,
      'Wrestle Wins': 18,
      'Wrestle Pin Falls': 12
    }
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 'team-westdale-mbb',
    schoolId: 'sch-westdale',
    sport: 'basketball',
    gender: 'boys',
    level: 'OFSAA',
    season: '2025-26',
    record: { wins: 14, losses: 2, ties: 0 },
    roster: ['ath-1']
  },
  {
    id: 'team-cathedral-fsc',
    schoolId: 'sch-cathedral',
    sport: 'soccer',
    gender: 'girls',
    level: 'Board',
    season: '2025-26',
    record: { wins: 9, losses: 1, ties: 2 },
    roster: ['ath-2']
  },
  {
    id: 'team-stmarys-mhk',
    schoolId: 'sch-stmarys',
    sport: 'hockey',
    gender: 'boys',
    level: 'OFSAA',
    season: '2025-26',
    record: { wins: 11, losses: 3, ties: 1 },
    roster: ['ath-3']
  },
  {
    id: 'team-westmount-fsw',
    schoolId: 'sch-westmount',
    sport: 'swimming',
    gender: 'girls',
    level: 'Regional',
    season: '2025-26',
    record: { wins: 8, losses: 0, ties: 0 },
    roster: ['ath-4']
  },
  {
    id: 'team-bishopryan-mfb',
    schoolId: 'sch-bishopryan',
    sport: 'football',
    gender: 'boys',
    level: 'OFSAA',
    season: '2025-26',
    record: { wins: 6, losses: 4, ties: 0 },
    roster: ['ath-5']
  },
  // Rival teams
  {
    id: 'team-westdale-fsc',
    schoolId: 'sch-westdale',
    sport: 'soccer',
    gender: 'girls',
    level: 'Board',
    season: '2025-26',
    record: { wins: 8, losses: 3, ties: 1 },
    roster: []
  },
  {
    id: 'team-bishopryan-mbb',
    schoolId: 'sch-bishopryan',
    sport: 'basketball',
    gender: 'boys',
    level: 'OFSAA',
    season: '2025-26',
    record: { wins: 12, losses: 4, ties: 0 },
    roster: []
  },
  {
    id: 'team-winston-mhk',
    schoolId: 'sch-winston',
    sport: 'hockey',
    gender: 'boys',
    level: 'OFSAA',
    season: '2025-26',
    record: { wins: 10, losses: 5, ties: 0 },
    roster: []
  }
];

export const MOCK_GAMES: Game[] = [
  {
    id: 'game-1',
    sport: 'basketball',
    level: 'OFSAA',
    gender: 'boys',
    segment: 'Final',
    ageGroup: 'Senior',
    homeTeamId: 'team-westdale-mbb',
    awayTeamId: 'team-bishopryan-mbb',
    homeScore: 82,
    awayScore: 78,
    status: 'live',
    scheduledAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    venue: 'Westdale Gym A',
    highlights: ['Amazing dunk by Marcus Henderson to start the 3rd quarter', 'Bishop Ryan rallies with 3 consecutive three-pointers'],
    topPerformers: [
      { athleteId: 'ath-1', statLine: '22 PTS, 8 AST, 3 STL' },
      { athleteId: 'ath-5', statLine: '14 PTS, 11 REB, 2 BLK' }
    ]
  },
  {
    id: 'game-1a',
    sport: 'track',
    level: 'OFSAA',
    gender: 'boys',
    segment: 'Finals - 100m Dash',
    ageGroup: 'Senior',
    homeTeamId: 'team-stmarys-mhk', // Treat as hosting school
    awayTeamId: 'team-bishopryan-mfb', // Competing school
    homeScore: 10,
    awayScore: 68,
    status: 'final',
    scheduledAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    venue: 'Mohawk Sports Complex (Track)',
    highlights: ['Andre De Grasse style finish by Marcus at 10.68s!', 'New meet record broken in Senior Boys 100m.'],
    topPerformers: [
      { athleteId: 'ath-1', statLine: '1st - 10.68s (MR)' }
    ]
  },
  {
    id: 'game-1b',
    sport: 'track',
    level: 'Regional',
    gender: 'girls',
    segment: 'Prelims - 400m',
    ageGroup: 'Novice',
    homeTeamId: 'team-cathedral-fsc',
    awayTeamId: 'team-westdale-fsc',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledAt: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
    venue: 'McMaster University Mona Campbell Track',
    highlights: []
  },
  {
    id: 'game-2',
    sport: 'soccer',
    level: 'Board',
    gender: 'girls',
    segment: 'Semi-Final',
    ageGroup: 'Varsity',
    homeTeamId: 'team-cathedral-fsc',
    awayTeamId: 'team-westdale-fsc',
    homeScore: 3,
    awayScore: 1,
    status: 'final',
    scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    venue: 'Cathedral Turf Pit',
    highlights: ['Sarah Dubrowski scores a brace (12\', 64\')', 'Westdale penalty kick narrow deficit in 44\']'],
    topPerformers: [
      { athleteId: 'ath-2', statLine: '2 G, 1 AST, 4 SOG' }
    ]
  },
  {
    id: 'game-3',
    sport: 'hockey',
    level: 'OFSAA',
    gender: 'boys',
    segment: 'Quarter-Final',
    ageGroup: 'Senior',
    homeTeamId: 'team-stmarys-mhk',
    awayTeamId: 'team-winston-mhk',
    homeScore: 4,
    awayScore: 2,
    status: 'final',
    scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    venue: 'Chedoke Twin Arenas',
    highlights: ['St. Mary\'s caps win with an empty-netter by Miller with 24 seconds left', 'Stellar net-minding by Winston goalkeeper'],
    topPerformers: [
      { athleteId: 'ath-3', statLine: '1 G, 2 A, +3 Rating' }
    ]
  },
  {
    id: 'game-4',
    sport: 'football',
    level: 'OFSAA',
    gender: 'boys',
    segment: 'Regular Season',
    ageGroup: 'Junior',
    homeTeamId: 'team-bishopryan-mfb',
    awayTeamId: 'team-stmarys-mhk', // reuse id as opponent team for convenience
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // In 2 days
    venue: 'Bishop Ryan Multi-Sport Field',
    topPerformers: []
  },
  {
    id: 'game-5',
    sport: 'basketball',
    level: 'OFSAA',
    gender: 'boys',
    homeTeamId: 'team-bishopryan-mbb',
    awayTeamId: 'team-westdale-mbb',
    homeScore: 0,
    awayScore: 0,
    status: 'upcoming',
    scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // In 5 days
    venue: 'Bishop Ryan Gym',
    topPerformers: []
  }
];

export const MOCK_COMMUNITIES: Community[] = [
  {
    id: 'com-1',
    name: 'OFSAA Varsity Basketball Hub',
    description: 'Ontario high school varsity basketball discussions, scores predictions, recruitment updates, and matchday chatter.',
    sport: 'basketball',
    level: 'OFSAA',
    region: 'Hamilton-Wentworth',
    memberCount: 342,
    isPrivate: false,
    createdBy: 'user_1',
    createdAt: '2025-09-12T12:00:00Z',
    lastActivityAt: new Date().toISOString(),
    avatarUrl: '🏀'
  },
  {
    id: 'com-2',
    name: 'HWCDSB Soccer Talk',
    description: 'Discussion board specifically for Catholic Hamilton high schools girls and boys league matches and standings.',
    sport: 'soccer',
    level: 'Board',
    region: 'Hamilton-Wentworth',
    memberCount: 189,
    isPrivate: false,
    createdBy: 'user_2',
    createdAt: '2025-10-05T08:30:00Z',
    lastActivityAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    avatarUrl: '⚽'
  },
  {
    id: 'com-3',
    name: 'Hamilton Athletic Directors',
    description: 'Private administrative space for HWDSB and HWCDSB athletic staff, heads of PE departments, and OFSAA convenors.',
    level: 'Board',
    region: 'Hamilton-Wentworth',
    memberCount: 14,
    isPrivate: true,
    createdBy: 'auth-user',
    createdAt: '2025-08-01T09:00:00Z',
    lastActivityAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    avatarUrl: '📋'
  },
  {
    id: 'com-4',
    name: 'Westdale Warriors Backers',
    description: 'The unofficial fan club for Westdale sports teams! Share pictures, parent schedules, carpools and highlights!',
    schoolId: 'sch-westdale',
    memberCount: 220,
    isPrivate: false,
    createdBy: 'ath-1',
    createdAt: '2025-10-15T15:00:00Z',
    lastActivityAt: new Date(Date.now() - 10000).toISOString(),
    avatarUrl: '🛡️'
  }
];

export const MOCK_THREADS: Thread[] = [
  {
    id: 'thr-1',
    communityId: 'com-1',
    authorId: 'ath-1',
    authorName: 'Marcus Henderson',
    authorAvatar: undefined,
    title: 'Match predictions for Bishop Ryan vs Westdale tonight?',
    body: 'Big rivalry game! Bishop Ryan is coming in hot off their win against Westmount, while we are looking to defend our undefeated streak at Gym A. I think it is going to be high scoring, close game. What do you all think?',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    replyCount: 5,
    reactions: { '🔥': 14, '🏀': 8, '👏': 5 }
  },
  {
    id: 'thr-2',
    communityId: 'com-1',
    authorId: 'user-pete',
    authorName: 'Coach Peter',
    authorAvatar: undefined,
    title: 'Recruiting tips for Class of 2026/2027 Ontario Ballers',
    body: 'Lots of kids are asking about scout visits at OFSAA games. Remember: your tape is your resume. Keep it under 3 minutes, show defense/effort plays, not just dunks or long threes. Coaches look for high IQ and teamwork first!',
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    replyCount: 12,
    reactions: { '🎓': 18, '👍': 24, '💯': 15 }
  },
  {
    id: 'thr-3',
    communityId: 'com-2',
    authorId: 'ath-2',
    authorName: 'Sarah Dubrowski',
    authorAvatar: undefined,
    title: 'Shoutout to Cathedral girls soccer squad!',
    body: 'Incredible game yesterday under the pouring rain. Our defense stood tall, and the transition play was outstanding. Let\'s keep this momentum going into the semi-finals next week!',
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    replyCount: 3,
    reactions: { '⚽': 22, '❤️': 14 }
  }
];

export const MOCK_REPLIES: Record<string, ThreadReply[]> = {
  'thr-1': [
    {
      id: 'rep-1',
      threadId: 'thr-1',
      authorId: 'ath-5',
      authorName: 'Justin Fitzpatrick',
      authorAvatar: undefined,
      body: 'Get ready Marcus! We are locking down the paint tonight. Safe to say Westdale isn\'t going to have an easy ride. Predicting BR wins by 4!',
      createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
    },
    {
      id: 'rep-2',
      threadId: 'thr-1',
      authorId: 'fan-joe',
      authorName: 'W-Fanatic Joe',
      body: 'Marcus is going for 30 tonight. Final score prediction Westdale 85 - BR 75. Gym A is a fortress!',
      createdAt: new Date(Date.now() - 2.5 * 3600 * 1000).toISOString()
    }
  ]
};

export const INITIAL_USER: UserProfile = {
  id: 'auth-user',
  email: 'robben.kale@gmail.com',
  displayName: 'Robben Kale',
  username: 'robben_kale',
  bio: 'Sports enthusiast and high school athletic supporter based in Hamilton, Soccer & Basketball dad.',
  isPremium: false,
  preferences: {
    sports: ['basketball', 'soccer', 'hockey'],
    regions: ['Hamilton-Wentworth', 'Niagara'],
    levels: ['OFSAA', 'Board'],
    genders: ['boys', 'girls']
  },
  joinedCommunityIds: ['com-1', 'com-2'],
  followedTeamIds: ['team-westdale-mbb', 'team-cathedral-fsc'],
  followedAthleteIds: ['ath-1', 'ath-2'],
  followedSchoolIds: ['sch-westdale', 'sch-cathedral'],
  createdAt: '2026-01-10T10:00:00Z'
};
