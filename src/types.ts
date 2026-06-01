/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Sport =
  | 'basketball'
  | 'hockey'
  | 'soccer'
  | 'football'
  | 'volleyball'
  | 'track'
  | 'baseball'
  | 'wrestling'
  | 'swimming'
  | 'tennis'
  | 'lacrosse'
  | 'cross_country';

export type Level = 'OFSAA' | 'OUA' | 'Board' | 'Regional' | 'House League';
export type Gender = 'boys' | 'girls' | 'mixed';
export type GameStatus = 'upcoming' | 'live' | 'final';

export interface School {
  id: string;
  name: string;
  board: string;       // e.g. "HWCDSB", "HWDSB", "TDSB", "YRDSB"
  city: string;
  region: string;
  logoUrl?: string;
  colors?: string[];
}

export interface Team {
  id: string;
  schoolId: string;
  sport: Sport;
  gender: Gender;
  level: Level;
  season: string;      // e.g. "2025-26"
  record: { wins: number; losses: number; ties: number };
  roster: string[];   // array of Athlete IDs
}

export interface Athlete {
  id: string;
  name: string;
  schoolId: string;
  sport: Sport[];
  gradYear: number;
  position?: string;
  stats: Record<string, number | string>;
  bio?: string;
  avatarUrl?: string;
  isVerified: boolean;
  isPremiumProfile: boolean;
}

export interface GamePerformer {
  athleteId: string;
  statLine: string;
}

export interface Game {
  id: string;
  sport: Sport;
  level: Level;
  gender: Gender;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
  scheduledAt: string; // ISO datetime
  venue?: string;
  segment?: string;
  ageGroup?: string;
  highlights?: string[];
  topPerformers?: GamePerformer[];
}

export interface Community {
  id: string;
  name: string;
  description: string;
  sport?: Sport;
  level?: Level;
  region?: string;
  schoolId?: string;
  memberCount: number;
  isPrivate: boolean;
  createdBy: string;
  createdAt: string;
  lastActivityAt: string;
  avatarUrl?: string;
}

export interface UserPreferences {
  sports: Sport[];
  regions: string[];
  levels: Level[];
  genders: Gender[];
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  isPremium: boolean;
  preferences: UserPreferences;
  joinedCommunityIds: string[];
  followedTeamIds: string[];
  followedAthleteIds: string[];
  followedSchoolIds: string[];
  createdAt: string;
}

export interface Thread {
  id: string;
  communityId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  title: string;
  body: string;
  createdAt: string;
  replyCount: number;
  reactions: Record<string, number>;
}

export interface ThreadReply {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  body: string;
  createdAt: string;
}
