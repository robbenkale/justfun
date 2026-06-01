/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp, AppNotification, ScreenPath } from '../AppContext';
import { Button, Card, Avatar, Badge, SearchBar, BottomSheet, Tabs, EmptyState, PremiumGate } from './ui';
import { 
  SUPPORTED_SPORTS, 
  MOCK_SCHOOLS, 
  MOCK_ATHLETES, 
  MOCK_TEAMS, 
  MOCK_GAMES 
} from '../fixtures';
import { Sport, Level, Gender, Game, Community, Thread, ThreadReply } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Volume2, 
  Search, 
  Plus, 
  MessageSquare, 
  Calendar, 
  Navigation, 
  MapPin, 
  UserPlus, 
  UserMinus, 
  ChevronRight, 
  Megaphone,
  BookOpen,
  Send,
  Zap,
  Check,
  TrendingUp,
  Award,
  X,
  LogOut
} from 'lucide-react';

// ==========================================
// CENTRAL PAGE DISPATCHER & HELPER CARDS
// ==========================================

// Simple compact ScoreCard for Horizontal Feed
export const CompactScoreCard: React.FC<{ game: Game; onClick: () => void }> = ({ game, onClick }) => {
  const homeSchool = MOCK_SCHOOLS.find(s => s.id === (MOCK_TEAMS.find(t => t.id === game.homeTeamId)?.schoolId));
  const awaySchool = MOCK_SCHOOLS.find(s => s.id === (MOCK_TEAMS.find(t => t.id === game.awayTeamId)?.schoolId));
  const sportMeta = SUPPORTED_SPORTS.find(s => s.id === game.sport);

  return (
    <div 
      onClick={onClick}
      className="flex-shrink-0 w-64 bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-xl p-3.5 shadow-xs hover:border-brand/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer select-none"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase font-black tracking-widest text-[var(--color-text-primary)] opacity-90 flex items-center flex-wrap gap-x-1.5 gap-y-1">
          <span className="flex items-center gap-1.5 shrink-0">{sportMeta?.icon} {sportMeta?.label}</span>
          {game.segment && <span className="text-[var(--color-text-primary)] shrink-0 opacity-80">, {game.segment}</span>}
          {game.ageGroup && <span className="text-[var(--color-text-primary)] shrink-0 opacity-80">, {game.ageGroup}</span>}
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase text-white tracking-wider shrink-0 ml-1 ${
            game.gender === 'boys' ? 'bg-blue-600/70' : game.gender === 'girls' ? 'bg-rose-500/70' : 'bg-purple-600/75'
          }`}>
            {game.gender === 'boys' ? 'Boys' : game.gender === 'girls' ? 'Girls' : 'Co-ed'}
          </span>
        </span>
        {game.status === 'live' ? (
          <Badge variant="live" />
        ) : (
          <span className="text-[9px] font-black uppercase text-[var(--color-text-primary)] opacity-90 bg-[var(--color-surface-secondary)] px-1.5 py-0.5 rounded border border-[var(--color-separator)] shrink-0 ml-2">
            {game.status}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--color-text-primary)] truncate max-w-[150px]">
            {homeSchool?.name.split(' ')[0]}
          </span>
          <span className={`text-sm font-black font-display tracking-tight ${game.status === 'live' ? 'text-brand animate-pulse' : ''}`}>
            {game.status !== 'upcoming' ? game.homeScore : '-'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--color-text-primary)] truncate max-w-[150px]">
            {awaySchool?.name.split(' ')[0]}
          </span>
          <span className={`text-sm font-black font-display tracking-tight ${game.status === 'live' ? 'text-brand animate-pulse' : ''}`}>
            {game.status !== 'upcoming' ? game.awayScore : '-'}
          </span>
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-[var(--color-separator)] flex items-center justify-between text-[9px] text-[var(--color-text-tertiary)]">
        <span className="truncate">📍 {game.venue || 'School Field'}</span>
        <span className="font-semibold">
          {game.status === 'upcoming' 
            ? new Date(game.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric' })
            : 'Final'
          }
        </span>
      </div>
    </div>
  );
};

// Larger standard ScoreCard
export const StandardScoreCard: React.FC<{ game: Game; onClick: () => void }> = ({ game, onClick }) => {
  const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
  const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
  const homeSchool = MOCK_SCHOOLS.find(s => s.id === homeTeam?.schoolId);
  const awaySchool = MOCK_SCHOOLS.find(s => s.id === awayTeam?.schoolId);
  const sportMeta = SUPPORTED_SPORTS.find(s => s.id === game.sport);

  return (
    <Card onClick={onClick} pressable className="flex flex-col gap-3.5 p-4">
      {/* Top details with PROMINENT Gender markers */}
      <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[var(--color-text-primary)] opacity-90 bg-[var(--color-surface-secondary)]/60 py-2 px-2.5 rounded-lg border border-[var(--color-separator)]/40 overflow-hidden">
        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-1 truncate pr-2">
          <span className="text-[var(--color-text-primary)] flex items-center gap-1 shrink-0">{sportMeta?.icon} {sportMeta?.label}</span>
          {game.segment && <span className="text-[var(--color-text-primary)] shrink-0 opacity-80">, {game.segment}</span>}
          {game.ageGroup && <span className="text-[var(--color-text-primary)] shrink-0 opacity-80">, {game.ageGroup}</span>}
        </div>
        
        {/* Extreme high visibility Gender Indicator */}
        <div className="flex items-center gap-1.5 shrink-0">
          {game.gender === 'boys' ? (
            <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] opacity-90 border border-[var(--color-separator)] flex items-center gap-1">
              <span className="text-blue-400">♂</span> BOYS
            </span>
          ) : game.gender === 'girls' ? (
            <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] opacity-90 border border-[var(--color-separator)] flex items-center gap-1">
              <span className="text-rose-400">♀</span> GIRLS
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] opacity-90 border border-[var(--color-separator)] flex items-center gap-1">
              <span className="text-purple-400">⚦</span> CO-ED
            </span>
          )}

          {game.status === 'live' ? (
            <Badge variant="live" />
          ) : (
            <span className="px-2 py-0.5 text-[9px] font-black bg-[var(--color-surface)] border border-[var(--color-separator)] rounded text-[var(--color-text-tertiary)] uppercase tracking-wider">
              {game.status}
            </span>
          )}
        </div>
      </div>

      {/* Duel area */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3 py-1 px-1">
        <div className="flex items-center gap-2 md:gap-3 overflow-hidden justify-start">
          <div className="hidden md:flex w-10 h-10 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] items-center justify-center font-display font-black text-[var(--color-text-secondary)] shadow-xs shrink-0 select-none overflow-hidden text-sm uppercase">
            {homeSchool ? homeSchool.name.slice(0, 2) : 'HS'}
          </div>
          <div className="overflow-hidden">
            <span className="text-[13px] md:text-sm font-black text-[var(--color-text-primary)] block truncate">{homeSchool?.name}</span>
            <span className="text-[9px] md:text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">{homeTeam?.record.wins}W - {homeTeam?.record.losses}L</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-3.5 shrink-0">
          <span className={`text-xl md:text-2xl font-display font-black tracking-tight ${game.status === 'live' ? 'text-brand animate-pulse' : 'text-[var(--color-text-primary)]'}`}>
            {game.status !== 'upcoming' ? game.homeScore : '-'}
          </span>
          <span className="text-[10px] md:text-xs font-black uppercase text-[var(--color-text-quaternary)] select-none">vs</span>
          <span className={`text-xl md:text-2xl font-display font-black tracking-tight ${game.status === 'live' ? 'text-brand animate-pulse' : 'text-[var(--color-text-primary)]'}`}>
            {game.status !== 'upcoming' ? game.awayScore : '-'}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-3 overflow-hidden justify-end text-right">
          <div className="overflow-hidden">
            <span className="text-[13px] md:text-sm font-black text-[var(--color-text-primary)] block truncate">{awaySchool?.name}</span>
            <span className="text-[9px] md:text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">{awayTeam?.record.wins}W - {awayTeam?.record.losses}L</span>
          </div>
          <div className="hidden md:flex w-10 h-10 rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] items-center justify-center font-display font-black text-[var(--color-text-secondary)] shadow-xs shrink-0 select-none overflow-hidden text-sm uppercase">
            {awaySchool ? awaySchool.name.slice(0, 2) : 'AS'}
          </div>
        </div>
      </div>

      {/* Date & Location */}
      <div className="flex items-center justify-between text-[11px] text-[var(--color-text-tertiary)] pt-1 border-t border-[var(--color-separator)]/50">
        <span className="flex items-center gap-1 font-semibold uppercase tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-brand" /> {game.venue || 'School Gym'}
        </span>
        <span className="font-bold">
          {new Date(game.scheduledAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </Card>
  );
};


// ==========================================
// 1. DASHBOARD COMPONENT WITH INTEGRATED MATCH FINDER
// ==========================================
export const DashboardPage: React.FC = () => {
  const { gamesList, currentUser, navigate } = useApp();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Consolidated tracking filters from Scores tab
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const sportsScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollSports = () => { if(sportsScrollRef.current) sportsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' }); };
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>('all');
  const [searchString, setSearchString] = useState('');

  // 1. Filter checker logic
  const isMatchFiltered = (game: Game) => {
    const sMatch = selectedSport === 'all' || game.sport === selectedSport;
    const lMatch = selectedLevel === 'all' || game.level === selectedLevel;
    const gMatch = selectedGender === 'all' || game.gender === selectedGender;

    let searchMatch = true;
    if (searchString.trim() !== '') {
      const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
      const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
      const homeSchool = MOCK_SCHOOLS.find(s => s.id === homeTeam?.schoolId);
      const awaySchool = MOCK_SCHOOLS.find(s => s.id === awayTeam?.schoolId);
      
      const combinedNames = `${homeSchool?.name} ${awaySchool?.name} ${game.venue}`.toLowerCase();
      searchMatch = combinedNames.includes(searchString.toLowerCase());
    }

    return sMatch && lMatch && gMatch && searchMatch;
  };

  const liveGames = gamesList.filter(g => g.status === 'live');

  // Priority feed results (Followed Schools matches) on top
  const followedGames = gamesList.filter(game => {
    const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
    const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
    
    const followsHome = homeTeam && currentUser.followedSchoolIds.includes(homeTeam.schoolId);
    const followsAway = awayTeam && currentUser.followedSchoolIds.includes(awayTeam.schoolId);
    
    return (followsHome || followsAway) && isMatchFiltered(game);
  });

  // Less-related matches at the lower part of the dashboard
  const otherGames = gamesList.filter(game => {
    const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
    const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
    
    const followsHome = homeTeam && currentUser.followedSchoolIds.includes(homeTeam.schoolId);
    const followsAway = awayTeam && currentUser.followedSchoolIds.includes(awayTeam.schoolId);
    
    return !(followsHome || followsAway) && isMatchFiltered(game);
  });

  return (
    <div className="flex flex-col gap-6">
      {/* MINIMALIST FILTER BAR */}
      <div className="flex flex-col md:flex-row items-center gap-4 py-2 border-b border-[var(--color-separator)] pb-4">
        <SearchBar value={searchString} onChange={(v) => setSearchString(v)} placeholder="Search matches..." />
        
        <div className="relative flex items-center w-full group">
          <div ref={sportsScrollRef} className="flex gap-4 overflow-x-auto w-full scrollbar-none items-center pr-8">
          <button
            onClick={() => setSelectedSport('all')}
            className={`text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors
              ${selectedSport === 'all' 
                ? 'text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]' 
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}
            `}
          >
            All Matches
          </button>
          {[...SUPPORTED_SPORTS].sort((a,b) => {
             const pref = currentUser.preferences?.sports || [];
             if (pref.includes(a.id) && !pref.includes(b.id)) return -1;
             if (!pref.includes(a.id) && pref.includes(b.id)) return 1;
             return 0;
          }).map(sp => (
            <button
              key={sp.id}
              onClick={() => setSelectedSport(sp.id)}
              className={`text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center gap-1.5
                ${selectedSport === sp.id 
                  ? 'text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}
              `}
            >
              {sp.label}
            </button>
          ))}
          </div>
          <div onClick={scrollSports} className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[var(--color-surface)] via-[var(--color-surface)]/80 to-transparent p-2 pl-6 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      {/* TODAY'S LIVE TICKER FOR RAPID BROADCAST ROW */}
      {liveGames.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider">
              On-Going Live Tournaments
            </h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {liveGames.map(game => (
              <CompactScoreCard 
                key={game.id} 
                game={game} 
                onClick={() => setSelectedGame(game)} 
              />
            ))}
          </div>
        </div>
      )}

      {/* DYNAMIC TWO-TIER FEED TIMELINES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: PRIMARY PREFERENCES & FOLLOWS ON TOP */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* TIER 1: MY SUBSCRIBED TIMELINE (Priority Prefs on top) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-primary)] tracking-wider flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-brand" /> My Subscribed Schools Feed
              </h3>
              <span className="text-[10px] bg-brand/10 text-brand px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                Followed Prefs
              </span>
            </div>

            {followedGames.length === 0 ? (
              <div className="p-6 bg-[var(--color-surface)] border border-dashed border-[var(--color-separator)] rounded-2xl text-center">
                <p className="text-xs text-[var(--color-text-secondary)] font-semibold">
                  No followed schools matches fit your filter preferences.
                </p>
                <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1">
                  Follow high schools in Ontario using the "Discover" tab to prioritize their boards & championships here!
                </p>
                <button 
                  onClick={() => navigate({ type: 'tabs', tab: 'discover' })}
                  className="mt-3.5 px-3 py-1.5 bg-brand text-white text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-brand-dark transition-colors cursor-pointer"
                >
                  Discover Schools
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {followedGames.map(game => (
                  <StandardScoreCard 
                    key={game.id} 
                    game={game} 
                    onClick={() => setSelectedGame(game)} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* TIER 2: ALL ONTARIO TOURNEY RESULTS (Less related matches under!) */}
          <div className="flex flex-col gap-3 pt-3 border-t border-[var(--color-separator)]/60">
            <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider">
              All Other Matches & Scoreboards
            </h3>

            {otherGames.length === 0 ? (
              <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-2xl text-center text-xs text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">
                No subsequent matches fit the select filters.
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {otherGames.map(game => (
                  <StandardScoreCard 
                    key={game.id} 
                    game={game} 
                    onClick={() => setSelectedGame(game)} 
                  />
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: REFINED AUXILIARY STATS (Uncluttered) */}
        <div className="flex flex-col gap-5">
          {/* HIGH SCHOOL LEADERS PORTLET */}
          <div>
            <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-primary)] tracking-wider mb-3">
              Hot Prospects Standings
            </h3>
            
            <Card className="flex flex-col gap-3.5 p-4">
              <div className="relative h-24 rounded-xl overflow-hidden border border-[var(--color-separator)] shadow-inner">
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-2.5">
                  <span className="text-[8px] text-brand uppercase tracking-widest font-black">HWCDSB League Finals</span>
                  <h4 className="text-xs font-black text-white leading-tight mt-0.5 uppercase font-display">
                    Westdale vs Cathedral Varsity Prep Finals
                  </h4>
                </div>
              </div>

              {/* Spaciously styled athletes list with NO ASSIGNED unrequested photos */}
              <div className="flex flex-col gap-3">
                {MOCK_ATHLETES.slice(0, 3).map((ath) => {
                  const school = MOCK_SCHOOLS.find(s => s.id === ath.schoolId);
                  return (
                    <div 
                      key={ath.id} 
                      onClick={() => navigate({ type: 'athlete', id: ath.id })}
                      className="flex items-center justify-between py-1.5 hover:bg-[var(--color-surface-secondary)]/50 rounded-xl duration-100 px-2 cursor-pointer border border-transparent hover:border-[var(--color-separator)]"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <Avatar name={ath.name} url={undefined} size="sm" verified={ath.isVerified} />
                        <div className="overflow-hidden">
                          <span className="text-xs font-black text-[var(--color-text-primary)] block truncate hover:text-brand transition-colors">
                            {ath.name}
                          </span>
                          <span className="text-[9px] text-[var(--color-text-tertiary)] uppercase font-semibold tracking-tight block truncate">
                            {school?.name.split(' ')[0]} · {ath.position}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-quaternary)] shrink-0" />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* REMOVED SIMPLIFIED HIGH SHOOL PROMOTION */}
        </div>

      </div>

      {/* DETAILED SCOREBOARD DRAWER */}
      <DetailGameSheet game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
};


// HELPER SCORE CARD DETAILED VIEW
interface DetailGameSheetProps {
  game: Game | null;
  onClose: () => void;
}

export const DetailGameSheet: React.FC<DetailGameSheetProps> = ({ game, onClose }) => {
  if (!game) return null;

  const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
  const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
  const homeSchool = MOCK_SCHOOLS.find(s => s.id === homeTeam?.schoolId);
  const awaySchool = MOCK_SCHOOLS.find(s => s.id === awayTeam?.schoolId);
  const sportMeta = SUPPORTED_SPORTS.find(s => s.id === game.sport);

  return (
    <BottomSheet isOpen={!!game} onClose={onClose} title={`${sportMeta?.label} match details`}>
      <div className="flex flex-col gap-5 py-2">
        
        {/* DUEL AREA */}
        <div className="flex items-center justify-between text-center pb-4 border-b border-[var(--color-separator)]">
          <div className="flex flex-col items-center w-5/12">
            <img src={homeSchool?.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-[var(--color-separator)] mb-1 shadow-sm" />
            <span className="text-xs font-black text-[var(--color-text-primary)] block line-clamp-1">{homeSchool?.name}</span>
            <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase">{homeTeam?.record.wins}W-{homeTeam?.record.losses}L</span>
          </div>

          <div className="flex flex-col justify-center items-center w-2/12 shrink-0">
            <div className="text-2xl font-black font-display tracking-tight text-brand">
              {game.status !== 'upcoming' ? `${game.homeScore} - ${game.awayScore}` : 'VS'}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 select-none ${game.status === 'live' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/25 animate-pulse' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
              {game.status}
            </span>
          </div>

          <div className="flex flex-col items-center w-5/12">
            <img src={awaySchool?.logoUrl} alt="" className="w-12 h-12 rounded-xl object-cover border border-[var(--color-separator)] mb-1 shadow-sm" />
            <span className="text-xs font-black text-[var(--color-text-primary)] block line-clamp-1">{awaySchool?.name}</span>
            <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase">{awayTeam?.record.wins}W-{awayTeam?.record.losses}L</span>
          </div>
        </div>

        {/* TIME & LOCATION */}
        <div className="bg-[var(--color-surface-secondary)] p-3 rounded-xl flex flex-col gap-2 border border-[var(--color-separator)] text-xs font-medium">
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-tertiary)]">League Classification</span>
            <span className="font-extrabold uppercase tracking-tight text-brand">{game.level} · {game.gender}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-tertiary)]">Match Venue</span>
            <span className="font-bold flex items-center gap-1">📍 {game.venue || 'TBD'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--color-text-tertiary)]">Scheduled Date</span>
            <span className="font-bold">{new Date(game.scheduledAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
          </div>
        </div>

        {/* GAME HIGHLIGHTS (If Finished or Live) */}
        {game.highlights && game.highlights.length > 0 && (
          <div>
            <h4 className="text-[11px] font-black uppercase text-[var(--color-text-tertiary)] tracking-wider mb-2.5 flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 text-brand" /> Live Gameplay Events log
            </h4>
            <div className="flex flex-col gap-2">
              {game.highlights.map((hil, i) => (
                <div key={i} className="p-2.5 bg-[var(--color-surface-secondary)]/40 border border-[var(--color-separator)] rounded-lg text-xs leading-relaxed flex gap-2">
                  <span className="text-brand">⚡</span>
                  <p>{hil}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TOP PERFORMERS IN LEAGUE */}
        {game.topPerformers && game.topPerformers.length > 0 && (
          <div>
            <h4 className="text-[11px] font-black uppercase text-[var(--color-text-tertiary)] tracking-wider mb-2.5 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-brand" /> Top Performers (Verifed Stats)
            </h4>
            <div className="flex flex-col gap-2">
              {game.topPerformers.map((per, idx) => {
                const athDetails = MOCK_ATHLETES.find(a => a.id === per.athleteId);
                return (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-brand/[0.03] border border-brand/10 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Avatar name={athDetails?.name || 'Athlete'} url={athDetails?.avatarUrl} size="sm" verified={athDetails?.isVerified} />
                      <div>
                        <span className="text-xs font-black block">{athDetails?.name || 'Verified Competitor'}</span>
                        <span className="text-[9px] uppercase tracking-wider text-[var(--color-text-tertiary)]">{athDetails?.position}</span>
                      </div>
                    </div>
                    <span className="text-xs font-black font-display text-brand bg-brand/5 px-2.5 py-1 rounded-lg border border-brand/10">{per.statLine}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </BottomSheet>
  );
};


// ==========================================
// 2. SCORES BROWSER COMPONENT
// ==========================================
export const ScoresPage: React.FC = () => {
  const { gamesList } = useApp();
  const [selectedSport, setSelectedSport] = useState<Sport | 'all'>('all');
  const scoresScrollRef = React.useRef<HTMLDivElement>(null);
  const scrollScores = () => { if(scoresScrollRef.current) scoresScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' }); };
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
  const [selectedGender, setSelectedGender] = useState<Gender | 'all'>('all');
  const [searchString, setSearchString] = useState('');
  const [activeGameDetail, setActiveGameDetail] = useState<Game | null>(null);

  // Filter games logic
  const filteredGames = gamesList.filter(game => {
    const sMatch = selectedSport === 'all' || game.sport === selectedSport;
    const lMatch = selectedLevel === 'all' || game.level === selectedLevel;
    const gMatch = selectedGender === 'all' || game.gender === selectedGender;

    let searchMatch = true;
    if (searchString.trim() !== '') {
      const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
      const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
      const homeSchool = MOCK_SCHOOLS.find(s => s.id === homeTeam?.schoolId);
      const awaySchool = MOCK_SCHOOLS.find(s => s.id === awayTeam?.schoolId);
      
      const combinedNames = `${homeSchool?.name} ${awaySchool?.name} ${game.venue}`.toLowerCase();
      searchMatch = combinedNames.includes(searchString.toLowerCase());
    }

    return sMatch && lMatch && gMatch && searchMatch;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* FILTER BAR ROW (STICKY DESKTOP) */}
      <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider">
        Match Finder Settings
      </h3>

      <div className="flex flex-col gap-3 py-3 px-4 bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-xl shadow-xs">
        {/* Search */}
        <SearchBar value={searchString} onChange={(v) => setSearchString(v)} placeholder="Search matches by school, venue..." />

        {/* Horizontal sports scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            onClick={() => setSelectedSport('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wider cursor-pointer border shrink-0 transition-colors
              ${selectedSport === 'all' 
                ? 'bg-brand text-white border-brand shadow-sm shadow-brand/20' 
                : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border-[var(--color-separator)] hover:bg-[var(--color-surface-tertiary)]'}
            `}
          >
            All Sports 🏆
          </button>
          {[...SUPPORTED_SPORTS].sort((a,b) => {
             const pref = currentUser.preferences?.sports || [];
             if (pref.includes(a.id) && !pref.includes(b.id)) return -1;
             if (!pref.includes(a.id) && pref.includes(b.id)) return 1;
             return 0;
          }).map(sp => (
            <button
              key={sp.id}
              onClick={() => setSelectedSport(sp.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-wide cursor-pointer border shrink-0 flex items-center gap-1.5 transition-colors
                ${selectedSport === sp.id 
                  ? 'bg-brand text-white border-brand shadow-sm shadow-brand/20' 
                  : 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] border-[var(--color-separator)] hover:bg-[var(--color-surface-tertiary)]'}
              `}
            >
              <span>{sp.icon}</span>
              <span>{sp.label}</span>
            </button>
          ))}
        </div>

        {/* Level and classification select */}
        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[var(--color-separator)]">
          <div>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">
              Championship Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as Level | 'all')}
              className="w-full text-xs px-2.5 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] rounded-lg text-[var(--color-text-primary)] font-bold focus:outline-none"
            >
              <option value="all">All Levels (OFSAA, Board, OUA)</option>
              <option value="OFSAA">OFSAA Varsity Only</option>
              <option value="Board">High School Board</option>
              <option value="Regional">Regional Association</option>
              <option value="House League">House / Intramural</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-wider text-[var(--color-text-tertiary)] mb-1">
              Gender Class
            </label>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value as Gender | 'all')}
              className="w-full text-xs px-2.5 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] rounded-lg text-[var(--color-text-primary)] font-bold focus:outline-none"
            >
              <option value="all">All Classifications</option>
              <option value="boys">Boys Divisions</option>
              <option value="girls">Girls Divisions</option>
              <option value="mixed">Co-ed Leagues</option>
            </select>
          </div>
        </div>
      </div>

      {/* FILTER RESULTS FEED */}
      <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mt-2">
        Filtered Results Grid ({filteredGames.length})
      </h3>

      {filteredGames.length === 0 ? (
        <EmptyState
          title="No results found"
          description="Try loosening your filters or resetting the search string to target other active sports divisions."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedSport('all');
            setSelectedLevel('all');
            setSelectedGender('all');
            setSearchString('');
          }}
        />
      ) : (
        <div className="flex flex-col gap-3.5">
          {filteredGames.map(game => (
            <StandardScoreCard 
              key={game.id} 
              game={game} 
              onClick={() => setActiveGameDetail(game)} 
            />
          ))}
        </div>
      )}

      {/* detailed bottom drawer */}
      <DetailGameSheet game={activeGameDetail} onClose={() => setActiveGameDetail(null)} />
    </div>
  );
};


// ==========================================
// 3. DISCOVER ATHLETICS COMPONENT
// ==========================================
export const DiscoverPage: React.FC = () => {
  const { navigate } = useApp();
  const [globalSearch, setGlobalSearch] = useState('');

  // Filtering discover logic across Schools & Athletes
  const searchSchools = MOCK_SCHOOLS.filter(s => 
    s.name.toLowerCase().includes(globalSearch.toLowerCase()) || 
    s.city.toLowerCase().includes(globalSearch.toLowerCase())
  );
  
  const searchAthletes = MOCK_ATHLETES.filter(a => 
    a.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    a.position?.toLowerCase().includes(globalSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      
      {/* SEARCH BOX BOX */}
      <div>
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2">
          Global Directory Explorer
        </h3>
        <SearchBar 
          value={globalSearch} 
          onChange={(v) => setGlobalSearch(v)} 
          placeholder="Search target high schools, coaches boards, athletes..." 
        />
      </div>

      {globalSearch ? (
        // RENDER SCREEN OVERLAY WITH DIRECTORY MATCHES
        <div className="flex flex-col gap-5">
          {/* HIGH SCHOOLS */}
          <div>
            <h4 className="text-xs font-display font-black uppercase text-brand tracking-widest mb-3 whitespace-nowrap">
              High School Directory Matches ({searchSchools.length})
            </h4>
            {searchSchools.length === 0 ? (
              <span className="text-xs text-[var(--color-text-tertiary)] py-4 block">No schools matched search phrase.</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchSchools.map((sch) => (
                  <Card 
                    key={sch.id} 
                    pressable 
                    onClick={() => navigate({ type: 'school', id: sch.id })}
                    className="flex items-center gap-3"
                  >
                    <img src={sch.logoUrl} className="w-10 h-10 object-cover rounded-lg border border-[var(--color-separator)]" alt="" />
                    <div>
                      <span className="text-xs font-black block">{sch.name}</span>
                      <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-tight">{sch.board} · {sch.city}, ON</span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[var(--color-separator)] pt-2" />

          {/* ATHLETES */}
          <div>
            <h4 className="text-xs font-display font-black uppercase text-brand tracking-widest mb-3 whitespace-nowrap">
              Student Athlete Matches ({searchAthletes.length})
            </h4>
            {searchAthletes.length === 0 ? (
              <span className="text-xs text-[var(--color-text-tertiary)] py-4 block">No student athletes matched search phrase.</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {searchAthletes.map((ath) => {
                  const school = MOCK_SCHOOLS.find(s => s.id === ath.schoolId);
                  return (
                    <Card 
                      key={ath.id} 
                      pressable 
                      onClick={() => navigate({ type: 'athlete', id: ath.id })}
                      className="flex items-center gap-3"
                    >
                      <Avatar name={ath.name} url={ath.avatarUrl} size="md" verified={ath.isVerified} />
                      <div>
                        <span className="text-xs font-black block">{ath.name}</span>
                        <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-tight">
                          {school?.name.split(' ')[0]} SS · Class of {ath.gradYear}
                        </span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        // DEFAULT DISCOVER TILES
        <>
          {/* BROWSE BY SPORTS CONTAINER */}
          <div>
            <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-3">
              Explore Active Ontario Sports
            </h3>

            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
              {SUPPORTED_SPORTS.slice(0, 8).map(sport => (
                <div
                  key={sport.id}
                  onClick={() => navigate({ type: 'tabs', tab: 'dashboard' })}
                  className="p-4 rounded-xl border border-[var(--color-separator)] bg-[var(--color-surface)] flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all select-none"
                >
                  <span className="text-3xl transition-transform duration-200 group-hover:scale-110 mb-1.5">{sport.icon}</span>
                  <span className="text-xs font-black text-[var(--color-text-primary)] hover:text-brand transition-colors uppercase tracking-tight">
                    {sport.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* EXCELLENT ONTARIO HIGH SCHOOLS GRID */}
          <div>
            <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2.5">
              Top tracked Ontario schools
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_SCHOOLS.map(sch => (
                <Card 
                  key={sch.id} 
                  pressable 
                  onClick={() => navigate({ type: 'school', id: sch.id })}
                  className="flex items-center gap-3"
                >
                  <img src={sch.logoUrl} className="w-12 h-12 object-cover rounded-xl border border-[var(--color-separator)] shadow-xs shrink-0" alt="" />
                  <div className="overflow-hidden">
                    <span className="text-xs font-black block text-[var(--color-text-primary)] hover:text-brand transition-colors truncate">
                      {sch.name}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-tighter">
                      School Board: {sch.board} · Districts: {sch.region}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* FEATURED STUDENT ATHLETES CAROUSEL */}
          <div>
            <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2.5">
              Hot Prospects roster
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MOCK_ATHLETES.map(ath => {
                const school = MOCK_SCHOOLS.find(s => s.id === ath.schoolId);
                return (
                  <Card 
                    key={ath.id} 
                    pressable 
                    onClick={() => navigate({ type: 'athlete', id: ath.id })}
                    className="flex flex-col items-center text-center p-5 justify-center gap-2"
                  >
                    <Avatar name={ath.name} url={ath.avatarUrl} size="lg" verified={ath.isVerified} premium={ath.isPremiumProfile} />
                    <div>
                      <span className="text-xs font-black hover:text-brand transition-colors uppercase tracking-tight font-display text-[var(--color-text-primary)] block">
                        {ath.name}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-tertiary)] font-semibold mt-0.5 block truncate max-w-[150px]">
                        {school?.name.split(' ')[0]} SS · Gr.{12 - (ath.gradYear - 2026)}
                      </span>
                    </div>
                    {/* Position badge */}
                    <div className="text-[10px] font-black uppercase tracking-wide bg-brand/10 text-brand py-0.5 px-2 rounded-full border border-brand/5 mt-1.5 leading-none">
                      {ath.position}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </>
      )}

    </div>
  );
};


// ==========================================
// 4. COMMUNITIES & BOARDS COMPONENT
// ==========================================
export const CommunitiesPage: React.FC = () => {
  const { communities, navigate, currentUser, createCommunity } = useApp();
  const [activeTab, setActiveTab] = useState<'joined' | 'discover'>('discover');
  
  // Create community modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comName, setComName] = useState('');
  const [comDesc, setComDesc] = useState('');
  const [comSport, setComSport] = useState<Sport>('basketball');
  const [comLevel, setComLevel] = useState<Level>('OFSAA');
  const [comRegion, setComRegion] = useState('Hamilton-Wentworth');
  const [comPrivate, setComPrivate] = useState(false);
  const [cError, setCError] = useState('');

  const displayComms = activeTab === 'joined' 
    ? communities.filter(c => currentUser.joinedCommunityIds.includes(c.id))
    : communities; // shows all for discover

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comName || !comDesc) {
      setCError('Provide both community hub title name and short description guidelines.');
      return;
    }

    const res = createCommunity(comName, comDesc, {
      sport: comSport,
      level: comLevel,
      region: comRegion,
      isPrivate: comPrivate
    });

    if (res.success) {
      setIsModalOpen(false);
      setComName('');
      setComDesc('');
      setCError('');
      // redirect immediately to my joined hubs
      setActiveTab('joined');
    } else {
      setCError(res.error || 'Failed to create community hub.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* HEADER CONTROLS */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider">
          Prediction & Prediction Circles
        </h3>
        
        <Button 
          size="sm" 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 shrink-0 px-3 py-1 text-xs"
        >
          <Plus className="w-3.5 h-3.5" /> New Circle Hub
        </Button>
      </div>

      <Tabs 
        items={[
          { id: 'discover', label: 'Ontario Directory Boards' },
          { id: 'joined', label: 'My Subscribed Circles' }
        ]} 
        activeId={activeTab} 
        onChange={(id) => setActiveTab(id as 'joined' | 'discover')} 
      />

      {/* LIST OF BOARDS */}
      <div className="flex flex-col gap-4">
        {displayComms.length === 0 ? (
          <EmptyState
            title={activeTab === 'joined' ? 'You have not joined any hubs' : 'No boards available'}
            description={
              activeTab === 'joined' 
                ? 'Join community boards below to talk varsity basketball tactics, predict matches and post highlights.'
                : 'Create custom boards or follow high school channels.'
            }
            actionLabel={activeTab === 'joined' ? 'Search Circles directory' : undefined}
            onAction={activeTab === 'joined' ? () => setActiveTab('discover') : undefined}
          />
        ) : (
          displayComms.map(comm => (
            <Card 
              key={comm.id} 
              pressable 
              onClick={() => navigate({ type: 'community', id: comm.id })}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/15 text-brand flex items-center justify-center text-xl shrink-0 font-display border border-[var(--color-separator)] select-none">
                    {comm.avatarUrl || '📣'}
                  </div>
                  <div>
                    <span className="text-xs font-extrabold hover:text-brand cursor-pointer text-[var(--color-text-primary)] block font-display uppercase tracking-tight">
                      {comm.name}
                    </span>
                    <p className="text-[11px] text-[var(--color-text-secondary)] mt-1 line-clamp-2 max-w-sm">
                      {comm.description}
                    </p>
                    
                    {/* Meta pill values */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {comm.sport && <Badge variant="gender" text={comm.sport} />}
                      {comm.level && <Badge variant="level" level={comm.level} />}
                      <span className="text-[9px] text-[var(--color-text-tertiary)] uppercase font-semibold">
                        👥 {comm.memberCount} Members
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[var(--color-text-quaternary)] mt-1.5 shrink-0" />
              </div>
            </Card>
          ))
        )}
      </div>

      {/* CREATE COMMUNITY POPUP Modal (with Premium Gate) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-card shadow-card-elevated z-10 p-5 m-4">
            <div className="flex items-center justify-between border-b border-[var(--color-separator)] pb-2.5 mb-4">
              <h3 className="font-display font-extrabold uppercase text-sm text-[var(--color-text-primary)]">
                Create Sports Prediction Circle
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:text-brand border border-[var(--color-separator)] cursor-pointer"
              >
                Close <X className="w-3.5 h-3.5 inline" />
              </button>
            </div>

            {/* PREMIUM GATE SECURITY */}
            <PremiumGate 
              fallbackTitle="Community Boards Creation"
              fallbackDesc="Setting up private channels, school specific prediction boards or parental carpool support boards requires Tracklethics Premium subscription."
            >
              <form onSubmit={handleCreateSubmit} className="flex flex-col gap-3">
                {cError && (
                  <div className="p-2.5 bg-red-500/10 border border-red-500/25 text-rose-500 text-xs rounded-lg">{cError}</div>
                )}
                
                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wide mb-1">
                    Circle Circle Title Name
                  </label>
                  <input
                    type="text"
                    required
                    value={comName}
                    onChange={(e) => setComName(e.target.value)}
                    placeholder="e.g. Cathedral Football Parents Squad"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wide mb-1">
                    Circle Purpose Rules & Description
                  </label>
                  <textarea
                    required
                    value={comDesc}
                    rows={3}
                    onChange={(e) => setComDesc(e.target.value)}
                    placeholder="Provide short guidelines, schedule predict requirements, and eligibility."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wide mb-1">
                      Sport focus
                    </label>
                    <select
                      value={comSport}
                      onChange={(e) => setComSport(e.target.value as Sport)}
                      className="w-full text-xs p-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] rounded-lg text-[var(--color-text-primary)]"
                    >
                      {SUPPORTED_SPORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wide mb-1">
                      Championship Level
                    </label>
                    <select
                      value={comLevel}
                      onChange={(e) => setComLevel(e.target.value as Level)}
                      className="w-full text-xs p-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] rounded-lg text-[var(--color-text-primary)]"
                    >
                      <option value="OFSAA">OFSAA Varsity Only</option>
                      <option value="Board">HS Board Level</option>
                      <option value="Regional">Regional Association</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-1.5">
                  <input
                    type="checkbox"
                    id="isprivate-check"
                    checked={comPrivate}
                    onChange={(e) => setComPrivate(e.target.checked)}
                    className="cursor-pointer"
                  />
                  <label htmlFor="isprivate-check" className="text-xs font-semibold text-[var(--color-text-secondary)] cursor-pointer">
                    Make this circle private (invite codes only)
                  </label>
                </div>

                <Button type="submit" size="sm" className="w-full text-xs font-display uppercase tracking-wide">
                  Publish Prediction Circle Hub
                </Button>
              </form>
            </PremiumGate>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================
// 5. SCREEN ATHLETE PROFILE DETAIL
// ==========================================
export const AthleteProfilePage: React.FC<{ id: string }> = ({ id }) => {
  const { currentUser, toggleFollowAthlete, navigate } = useApp();
  const athlete = MOCK_ATHLETES.find(a => a.id === id);
  const school = MOCK_SCHOOLS.find(s => s.id === athlete?.schoolId);

  if (!athlete) {
    return <div className="text-center py-10">Athlete profile athlete not found.</div>;
  }

  const isFollowed = currentUser.followedAthleteIds.includes(athlete.id);

  return (
    <div className="flex flex-col gap-5">
      {/* PROFILE HERO COMPONENT */}
      <Card elevated className="flex flex-col md:flex-row items-center gap-5 p-6 relative overflow-hidden bg-gradient-to-b from-brand/5 to-transparent border-b-2">
        {athlete.isPremiumProfile && (
          <div className="absolute top-3 right-3 select-none">
            <Badge variant="premium" />
          </div>
        )}

        <Avatar name={athlete.name} url={athlete.avatarUrl} size="xl" verified={athlete.isVerified} premium={athlete.isPremiumProfile} />

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-1.5">
            <h2 className="text-2xl font-display font-black uppercase text-[var(--color-text-primary)] tracking-tight">
              {athlete.name}
            </h2>
            {athlete.isVerified && (
              <span className="text-[10px] font-black uppercase bg-brand text-white px-2 py-0.5 rounded-md inline-block max-w-max mx-auto md:mx-0">
                ⭐ VERIFIED HS ATHLETE
              </span>
            )}
          </div>

          <p className="text-xs text-[var(--color-text-secondary)] font-semibold mt-1">
            🏫 {school?.name} · Class of {athlete.gradYear}
          </p>
          
          <p className="text-xs text-[var(--color-text-tertiary)] italic leading-relaxed max-w-md mt-2.5">
            "{athlete.bio || 'This student athlete has not compiled a biography note yet.'}"
          </p>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3.5">
            {athlete.sport.map(sp => (
              <Badge key={sp} variant="sport" sportId={sp} />
            ))}
          </div>
        </div>

        {/* Action checks */}
        <div className="flex md:flex-col gap-2 w-full md:w-auto mt-4 md:mt-0 justify-center">
          <Button 
            variant={isFollowed ? 'secondary' : 'primary'} 
            size="sm"
            onClick={() => toggleFollowAthlete(athlete.id)}
            className="w-full md:w-auto uppercase font-display text-[11px] gap-1 shrink-0"
          >
            {isFollowed ? (
              <>
                <UserMinus className="w-3.5 h-3.5" /> Stop Tracking
              </>
            ) : (
              <>
                <UserPlus className="w-3.5 h-3.5 animate-pulse" /> Track Athlete
              </>
            )}
          </Button>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate({ type: 'school', id: school?.id || '' })}
            className="w-full md:w-auto text-xs shrink-0 border border-[var(--color-separator)]"
          >
            View High School
          </Button>
        </div>
      </Card>

      {/* DETAILED STATS GRID */}
      <div>
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2.5">
          Season Compilation aggregates
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(athlete.stats).map(([key, val]) => (
            <Card key={key} className="text-center p-4">
              <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-tight block font-semibold mb-1">
                {key}
              </span>
              <span className="text-2xl font-display font-black text-brand">
                {val}
              </span>
            </Card>
          ))}
        </div>
      </div>

      {/* GRAPH CHART PREPARATION (PREMIUM ONLY GRAPHICS GATED) */}
      <div>
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2.5">
          Advanced Stats Timeline
        </h3>

        <PremiumGate 
          fallbackTitle="Custom Performance Progression Tracker"
          fallbackDesc="Interactive charts, scouts tape analysis logs and NCAA Division recruitment dashboards are locked inside Premium Advantage tier."
        >
          {/* Simulated chart bars in SVG */}
          <Card className="p-4 flex flex-col gap-3">
            <span className="text-xs font-bold font-display uppercase tracking-wider text-brand">
              📊 Individual PPG progression 2025-26
            </span>
            
            <div className="h-44 flex items-end gap-3 pt-6 px-4 border-b border-[var(--color-separator)] bg-[var(--color-surface-secondary)]/30 rounded-lg">
              {[8, 14, 18, 12, 22, 19, 25, 20].map((pt, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group">
                  <span className="text-[9px] font-black font-mono text-[var(--color-text-tertiary)] group-hover:text-brand transition-colors">
                    {pt}
                  </span>
                  <div 
                    className="w-full rounded-t-lg bg-brand group-hover:bg-brand-dark transition-all duration-200 shadow-sm" 
                    style={{ height: `${(pt / 30) * 100}%` }}
                  />
                  <span className="text-[8px] uppercase tracking-tighter text-[var(--color-text-tertiary)] mb-1">
                    G{i+1}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center text-[10px] text-[var(--color-text-tertiary)]">
              Hover bars to view verified score recorder logs.
            </div>
          </Card>
        </PremiumGate>
      </div>

    </div>
  );
};


// ==========================================
// 6. SCREEN SCHOOL HUB DETAIL
// ==========================================
export const SchoolProfilePage: React.FC<{ id: string }> = ({ id }) => {
  const { currentUser, toggleFollowSchool, gamesList, navigate } = useApp();
  const school = MOCK_SCHOOLS.find(s => s.id === id);

  if (!school) {
    return <div className="text-center py-10">High school page not found in Board listings.</div>;
  }

  const isFollowed = currentUser.followedSchoolIds.includes(school.id);

  // Filter school active teams
  const schoolTeams = MOCK_TEAMS.filter(t => t.schoolId === school.id);

  // Filter school sports matches
  const schoolGames = gamesList.filter(game => {
    const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
    const awayTeam = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
    return homeTeam?.schoolId === school.id || awayTeam?.schoolId === school.id;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* SCHOOL HEAD BANNER */}
      <Card elevated className="flex flex-col md:flex-row items-center gap-5 p-5 relative overflow-hidden bg-gradient-to-b from-brand/5 to-transparent border-t-2">
        <img src={school.logoUrl} className="w-16 h-16 rounded-2xl object-cover border border-[var(--color-separator)] shadow-md shrink-0" alt="" />
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-display font-extrabold text-[var(--color-text-primary)] uppercase tracking-tight">
            {school.name}
          </h2>
          <p className="text-xs text-[var(--color-text-tertiary)] font-semibold mt-1">
            📍 {school.city} Board: {school.board} · Region: {school.region}
          </p>
          <div className="flex items-center gap-1.5 justify-center md:justify-start mt-2">
            <span className="w-2.5 h-2.5 rounded-full inline-block border shadow-xs" style={{ backgroundColor: school.colors?.[0] || '#000' }} />
            <span className="w-2.5 h-2.5 rounded-full inline-block border shadow-xs" style={{ backgroundColor: school.colors?.[1] || '#999' }} />
            <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wide">Official School Colors</span>
          </div>
        </div>

        <div>
          <Button 
            variant={isFollowed ? 'secondary' : 'primary'} 
            size="sm"
            onClick={() => toggleFollowSchool(school.id)}
            className="w-full md:w-auto uppercase font-display text-[10px]"
          >
            {isFollowed ? 'Unsubscribe School' : 'Subscribe School'}
          </Button>
        </div>
      </Card>

      {/* ACTIVE SPORTS TEAMS TILES */}
      <div>
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2.5">
          Active rostered Varsity teams
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {schoolTeams.length === 0 ? (
            <span className="text-xs text-[var(--color-text-tertiary)]">No active leagues trackings loaded yet.</span>
          ) : (
            schoolTeams.map(team => {
              const sportMeta = SUPPORTED_SPORTS.find(s => s.id === team.sport);
              return (
                <Card 
                  key={team.id} 
                  pressable 
                  onClick={() => navigate({ type: 'team', id: team.id })}
                  className="flex flex-col gap-2 p-3.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black font-display uppercase tracking-tight text-[var(--color-text-primary)]">
                      {sportMeta?.icon} {sportMeta?.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-extrabold text-brand bg-brand/5 py-0.5 px-2 rounded-md">
                      {team.level}
                    </span>
                  </div>

                  <div className="text-lg font-display font-black text-brand uppercase mt-1 leading-none">
                    {team.record.wins}W - {team.record.losses}L
                  </div>
                  
                  <span className="text-[10px] text-[var(--color-text-tertiary)] font-semibold uppercase tracking-tight">
                    Div: {team.gender} · {team.season}
                  </span>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* GAME RESULTS FOR SCHOOL */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider">
            Recent sports outcomes timeline
          </h3>
          <span className="text-[10px] font-black uppercase text-brand tracking-widest bg-brand/5 p-1 px-3 rounded-md">
            Schedule logs
          </span>
        </div>

        {schoolGames.length === 0 ? (
          <span className="text-xs text-[var(--color-text-tertiary)]">No game match records filed for this high school.</span>
        ) : (
          <div className="flex flex-col gap-3.5">
            {schoolGames.map(game => (
              <StandardScoreCard key={game.id} game={game} onClick={() => {}} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};


// ==========================================
// 7. SCREEN TEAM STANDINGS & ROSTER HUB
// ==========================================
export const TeamDetailPage: React.FC<{ id: string }> = ({ id }) => {
  const { navigate, gamesList } = useApp();
  const team = MOCK_TEAMS.find(t => t.id === id);
  const school = MOCK_SCHOOLS.find(s => s.id === team?.schoolId);
  const sportMeta = SUPPORTED_SPORTS.find(s => s.id === team?.sport);
  const [activeTab, setActiveTab] = useState<'roster' | 'schedule'>('roster');

  if (!team || !school) {
    return <div className="text-center py-10 font-bold">Leagues roster team not found.</div>;
  }

  // filter team specific games
  const teamGames = gamesList.filter(g => g.homeTeamId === team.id || g.awayTeamId === team.id);

  return (
    <div className="flex flex-col gap-5">
      {/* HEADER HERO */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-card border-b-2 border-brand shadow-md">
        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-7xl font-black font-display text-white/5 uppercase select-none">
          {team.record.wins}W
        </div>

        <div className="flex items-center gap-4">
          <img src={school.logoUrl} className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-lg shrink-0" alt="" />
          <div>
            <span className="text-[10px] font-black text-brand tracking-widest uppercase block mb-1">
              {sportMeta?.icon} {sportMeta?.label} · Division: {team.gender}
            </span>
            <h2 className="text-xl md:text-2xl font-display font-extrabold uppercase tracking-tight">
              {school.name.split(' ')[0]} {sportMeta?.label} Varsity
            </h2>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              Season Campaign: {team.season} · Current standing record: {team.record.wins}W - {team.record.losses}L - {team.record.ties}T
            </p>
          </div>
        </div>
      </Card>

      <Tabs 
        items={[
          { id: 'roster', label: 'Roster Avatars' },
          { id: 'schedule', label: 'League Schedule' }
        ]}
        activeId={activeTab}
        onChange={(val) => setActiveTab(val as 'roster' | 'schedule')}
      />

      {activeTab === 'roster' ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider">
            Verified Roster Players ({team.roster.length})
          </h3>

          {team.roster.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--color-text-tertiary)] bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-card shadow-sm">
              No athletes compiled on active roster sheet yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {team.roster.map(athId => {
                const athlete = MOCK_ATHLETES.find(a => a.id === athId);
                if (!athlete) return null;
                return (
                  <Card 
                    key={athlete.id} 
                    pressable 
                    onClick={() => navigate({ type: 'athlete', id: athlete.id })}
                    className="flex items-center gap-3.5"
                  >
                    <Avatar name={athlete.name} url={athlete.avatarUrl} size="md" verified={athlete.isVerified} />
                    <div className="overflow-hidden">
                      <span className="text-xs font-black block text-[var(--color-text-primary)] truncate hover:text-brand">{athlete.name}</span>
                      <span className="text-[10px] text-[var(--color-text-tertiary)] font-semibold mt-0.5 uppercase tracking-wider block">
                        Gr.{12 - (athlete.gradYear - 2026)} · Position: {athlete.position}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2">
            Match Timeline schedule
          </h3>

          {teamGames.length === 0 ? (
            <span className="text-xs text-[var(--color-text-tertiary)] block py-4 text-center">No scores or fixtures logged yet.</span>
          ) : (
            <div className="flex flex-col gap-3.5">
              {teamGames.map(game => (
                <StandardScoreCard key={game.id} game={game} onClick={() => {}} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};


// ==========================================
// 8. SCREEN INDIVIDUAL BOARD DISCOVERY CHAT FEED
// ==========================================
export const CommunityDetailPage: React.FC<{ id: string }> = ({ id }) => {
  const { 
    navigate, 
    communities, 
    threads, 
    replies, 
    currentUser, 
    createThread, 
    addReply,
    toggleJoinCommunity 
  } = useApp();

  const community = communities.find(c => c.id === id);
  const commThreads = threads.filter(t => t.communityId === id);

  const [composedTitle, setComposedTitle] = useState('');
  const [composedBody, setComposedBody] = useState('');
  const [activeThreadDetail, setActiveThreadDetail] = useState<Thread | null>(null);
  const [threadReplyBody, setThreadReplyBody] = useState('');
  const [isPostSheetOpen, setIsPostSheetOpen] = useState(false);
  const [errorStr, setErrorStr] = useState('');

  if (!community) {
    return <div className="text-center py-10 font-bold">Community board channel not found.</div>;
  }

  const isJoined = currentUser.joinedCommunityIds.includes(community.id);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composedTitle || !composedBody) {
      setErrorStr('Title and thread text arguments are required.');
      return;
    }

    createThread(community.id, composedTitle, composedBody);
    setComposedTitle('');
    setComposedBody('');
    setErrorStr('');
    setIsPostSheetOpen(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadReplyBody.trim() || !activeThreadDetail) return;

    addReply(activeThreadDetail.id, threadReplyBody);
    setThreadReplyBody('');
    
    // update current sheet representation locally as well to include newly formulated replies instantly!
    const updatedThread = threads.find(t => t.id === activeThreadDetail.id);
    if (updatedThread) {
      setActiveThreadDetail({
        ...updatedThread,
        replyCount: updatedThread.replyCount + 1
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      
      {/* HEADER BANNER */}
      <Card className="flex flex-col bg-[var(--color-surface)] border border-[var(--color-separator)] p-5 rounded-card relative overflow-hidden bg-gradient-to-r from-brand/5 via-transparent to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand/10 text-brand flex items-center justify-center text-2xl font-bold font-display rounded-2xl border border-[var(--color-separator)] shrink-0 select-none">
              {community.avatarUrl || '📣'}
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-display font-black uppercase text-[var(--color-text-primary)] tracking-tight">
                {community.name}
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed max-w-lg font-medium">
                {community.description}
              </p>
              
              <div className="flex items-center gap-2 mt-2.5">
                {community.sport && <Badge variant="gender" text={community.sport} />}
                <span className="text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">
                  👥 {community.memberCount} Members Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 md:self-center">
            <Button 
              size="sm"
              variant={isJoined ? 'secondary' : 'primary'}
              onClick={() => toggleJoinCommunity(community.id)}
              className="text-xs uppercase font-display"
            >
              {isJoined ? 'Leave Circle' : 'Join Circle'}
            </Button>
            
            {isJoined && (
              <Button 
                size="sm"
                onClick={() => setIsPostSheetOpen(true)}
                className="text-xs gap-1 py-1.5 uppercase font-display"
              >
                <Plus className="w-3.5 h-3.5" /> Post Feed
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* FEED TIMELINE */}
      <div>
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-3">
          Discussion Board Threads
        </h3>

        {!isJoined && (
          <div className="bg-amber-400/5 border border-amber-300/35 rounded-xl p-6 text-center text-xs text-[var(--color-text-secondary)] flex flex-col items-center justify-center gap-2">
            <p className="font-extrabold uppercase font-display tracking-tight text-amber-500">Subscription Circle Restricted area</p>
            <p className="max-w-xs font-medium text-[var(--color-text-tertiary)]">
              Join this sports circle board above to predict outcomes, compile matches highlights, and post on the bulletin parent feed.
            </p>
            <Button size="sm" onClick={() => toggleJoinCommunity(community.id)} className="mt-1 text-[11px] uppercase tracking-wide">
              Join Prediction Circle
            </Button>
          </div>
        )}

        {isJoined && commThreads.length === 0 ? (
          <EmptyState
            title="Prediction board is empty"
            description="Be the first one in your district high school community squad to post predictions, carpool setups, or congrats announcements!"
            actionLabel="Start discussion thread"
            onAction={() => setIsPostSheetOpen(true)}
          />
        ) : (
          isJoined && (
            <div className="flex flex-col gap-3.5">
              {commThreads.map(thr => (
                <Card 
                  key={thr.id} 
                  pressable 
                  onClick={() => {
                    // Prepopulate key list to prevent crashes
                    setActiveThreadDetail(thr);
                  }}
                  className="p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={thr.authorName} url={thr.authorAvatar} size="sm" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[var(--color-text-secondary)] uppercase tracking-wide">
                          {thr.authorName}
                        </span>
                        <span className="text-[9px] text-[var(--color-text-tertiary)] font-medium font-mono">
                          {new Date(thr.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <h4 className="text-xs font-black uppercase tracking-tight text-[var(--color-text-primary)] font-display hover:text-brand transition-colors mb-1">
                        {thr.title}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                        {thr.body}
                      </p>

                      <div className="flex items-center gap-1.5 mt-3 pt-2 text-[10px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider border-t border-[var(--color-surface-secondary)] max-w-max">
                        <MessageSquare className="w-3.5 h-3.5 text-brand" /> {thr.replyCount} Comments Thread
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )
        )}
      </div>

      {/* NEW POST SHEET POPUP */}
      <BottomSheet isOpen={isPostSheetOpen} onClose={() => setIsPostSheetOpen(false)} title="Create varsity thread">
        <form onSubmit={handlePostSubmit} className="flex flex-col gap-3.5 py-1">
          {errorStr && (
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg text-xs">{errorStr}</div>
          )}
          
          <div>
            <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1">
              Thread Title Header
            </label>
            <input
              type="text"
              required
              value={composedTitle}
              onChange={(e) => setComposedTitle(e.target.value)}
              placeholder="e.g. Schedule dates for basketball finals prediction"
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface)] text-[var(--color-text-primary)] font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1">
              Body Post Descriptions
            </label>
            <textarea
              required
              value={composedBody}
              rows={5}
              onChange={(e) => setComposedBody(e.target.value)}
              placeholder="Post schedules, rosters prediction results logs, or announcements..."
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
            />
          </div>

          <Button type="submit" size="sm" className="w-full font-display uppercase tracking-wide gap-1 text-xs">
            <Send className="w-3.5 h-3.5" /> Publish to Circle Hub
          </Button>
        </form>
      </BottomSheet>

      {/* INDIVIDUAL THREAD WITH REPLIES DETAIL ROW */}
      <BottomSheet 
        isOpen={!!activeThreadDetail} 
        onClose={() => setActiveThreadDetail(null)} 
        title="Discussion thread detail"
      >
        {activeThreadDetail && (
          <div className="flex flex-col gap-4 py-1">
            {/* Thread Owner Card */}
            <div className="p-3.5 rounded-xl border border-[var(--color-separator)] bg-brand/[0.02]">
              <div className="flex items-center gap-3 mb-2.5">
                <Avatar name={activeThreadDetail.authorName} url={activeThreadDetail.authorAvatar} size="sm" />
                <div>
                  <span className="text-xs font-black block">{activeThreadDetail.authorName}</span>
                  <span className="text-[10px] text-[var(--color-text-tertiary)] font-semibold uppercase tracking-wider block">
                    Posted on {new Date(activeThreadDetail.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <h4 className="text-sm font-black font-display text-[var(--color-text-primary)] uppercase tracking-tight mb-1.5 border-b border-[var(--color-separator)] pb-1.5">
                {activeThreadDetail.title}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-medium">
                {activeThreadDetail.body}
              </p>
            </div>

            {/* Replies Board */}
            <div className="flex flex-col gap-2.5">
              <h5 className="text-[10px] font-black uppercase text-[var(--color-text-tertiary)] tracking-widest pl-1.5">
                Comments feed ({activeThreadDetail.replyCount})
              </h5>

              <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto border border-[var(--color-separator)] bg-[var(--color-surface-secondary)]/30 rounded-xl p-2.5">
                {!(replies[activeThreadDetail.id]) || replies[activeThreadDetail.id].length === 0 ? (
                  <span className="text-xs text-[var(--color-text-tertiary)] text-center py-5 block">
                    No answers or prediction replies drafted yet. Be the first one!
                  </span>
                ) : (
                  replies[activeThreadDetail.id].map(rep => (
                    <div key={rep.id} className="p-2.5 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface)] text-xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Avatar name={rep.authorName} url={rep.authorAvatar} size="xs" />
                        <span className="font-extrabold uppercase text-[10px] text-[var(--color-text-secondary)]">
                          {rep.authorName}
                        </span>
                        <span className="text-[8px] text-[var(--color-text-tertiary)] font-mono ml-auto">
                          {new Date(rep.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-[11px] font-semibold">{rep.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Write Reply Form */}
            <form onSubmit={handleReplySubmit} className="pt-2 border-t border-[var(--color-separator)] flex gap-2">
              <input
                type="text"
                required
                value={threadReplyBody}
                onChange={(e) => setThreadReplyBody(e.target.value)}
                placeholder="Share prediction, tip, or carpool reply..."
                className="flex-1 text-xs px-3 py-2 rounded-xl border border-[var(--color-separator)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] text-[var(--color-text-primary)] focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <Button type="submit" size="sm" className="px-3 shrink-0 uppercase tracking-tight py-1.5 font-display text-xs">
                Reply
              </Button>
            </form>

          </div>
        )}
      </BottomSheet>

    </div>
  );
};


// ==========================================
// 9. PROFILE VIEW COMPONENT
// ==========================================
export const ProfilePage: React.FC = () => {
  const { currentUser, setPreferencesWizardStep, updateProfile, navigate, logoutUser } = useApp();
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [dispName, setDispName] = useState(currentUser.displayName);
  const [bioStr, setBioStr] = useState(currentUser.bio || '');

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName: dispName,
      bio: bioStr
    });
    setProfileEditOpen(false);
  };

  const handleRecycleWizard = () => {
    setPreferencesWizardStep(1);
    navigate({ type: 'register' });
  };

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
      
      {/* HEADER SECTION METRIC HERO */}
      <Card elevated className="flex flex-col md:flex-row items-center md:items-start gap-6 p-8 relative overflow-hidden bg-gradient-to-b from-[var(--color-surface-elevated)] to-[var(--color-surface)] border-t border-[var(--color-separator)] min-h-[220px]">
        {currentUser.isPremium && (
          <div className="absolute top-4 right-4 select-none">
            <Badge variant="premium" />
          </div>
        )}

        <Avatar name={currentUser.displayName} url={currentUser.avatarUrl} size="2xl" premium={currentUser.isPremium} className="border-4 border-[var(--color-surface)] shadow-lg" />

        <div className="flex-1 text-center md:text-left mt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase text-[var(--color-text-primary)] tracking-tight">
              {currentUser.displayName}
            </h2>
            {currentUser.isPremium && (
              <span className="text-[10px] font-black uppercase bg-[var(--color-premium-gold)] text-black px-2.5 py-1 rounded-full inline-block max-w-max mx-auto md:mx-0 shadow-sm">
                Premium
              </span>
            )}
          </div>

          <p className="text-sm text-[var(--color-text-tertiary)] font-bold mt-2 uppercase tracking-wide">
            @{currentUser.username} <span className="opacity-50 mx-1">·</span> {currentUser.email}
          </p>
          
          <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-lg mt-4">
            {currentUser.bio || 'Add a bio to your profile.'}
          </p>
        </div>

        <div className="shrink-0 flex md:flex-col gap-3 w-full md:w-40 pt-4 md:pt-0">
          <Button 
            size="md" 
            onClick={() => setProfileEditOpen(true)}
            className="w-full uppercase font-display text-xs tracking-wider"
          >
            Edit Profile
          </Button>
          
          {!currentUser.isPremium && (
            <Button 
              variant="premium"
              size="md"
              onClick={() => navigate({ type: 'premium' })}
              className="w-full text-xs shrink-0 tracking-wider"
            >
              Upgrade Pro
            </Button>
          )}
        </div>
      </Card>

      {/* ACCOUNT & PREFS */}
      <div className="flex flex-col gap-2">
        <h4 className="text-[10px] font-black uppercase tracking-wider text-[var(--color-text-tertiary)] pl-1">
          Account Settings
        </h4>
        <Card className="divide-y divide-[var(--color-separator)] p-0 border border-[var(--color-separator)]">
          <div className="flex items-center justify-between p-4 text-xs font-semibold cursor-pointer hover:bg-[var(--color-surface-elevated)] transition-colors" onClick={() => setProfileEditOpen(true)}>
            <span className="text-[var(--color-text-primary)]">Public Display Profile</span>
            <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" />
          </div>

          <div className="flex items-center justify-between p-4 text-xs font-semibold cursor-pointer hover:bg-[var(--color-surface-elevated)] transition-colors" onClick={handleRecycleWizard}>
            <span className="text-[var(--color-text-primary)]">Match Preferences Wizard</span>
            <span className="text-[var(--color-text-tertiary)] flex items-center gap-1 font-bold">Configure <ChevronRight className="w-4 h-4 text-[var(--color-text-tertiary)]" /></span>
          </div>

          <div className="flex items-center justify-between p-4 text-xs font-semibold cursor-pointer text-red-500 hover:bg-neutral-900 transition-colors" onClick={logoutUser}>
            <span>Log out account</span>
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
        </Card>
      </div>

      {/* EDIT PROFILE BOTTOM SHEET */}
      <BottomSheet isOpen={profileEditOpen} onClose={() => setProfileEditOpen(false)} title="Update Profile">
        <form onSubmit={handleEditSubmit} className="flex flex-col gap-4 py-2">
          <div>
            <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              required
              value={dispName}
              onChange={(e) => setDispName(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] font-bold shadow-xs focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1.5">
              Biography
            </label>
            <textarea
              rows={4}
              value={bioStr}
              onChange={(e) => setBioStr(e.target.value)}
              placeholder="e.g. Gr. 10 Parent, Supporting Westdale basketball rosters and compilation stats."
              className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--color-separator)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <Button type="submit" size="sm" className="w-full text-xs font-display uppercase tracking-wide py-2.5">
            Save Changes
          </Button>
        </form>
      </BottomSheet>
    </div>
  );
};




// ==========================================
// 11. TRACKLETHICS PREMIUM UPGRADE PAGE
// ==========================================
export const PremiumPage: React.FC = () => {
  const { currentUser, updateProfile, navigate } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleMockUpgrade = () => {
    updateProfile({
      isPremium: true
    });
    alert('Congratulations! Your student athlete profile is now upgraded to Premium Advantage successfully.');
    navigate({ type: 'tabs', tab: 'dashboard' });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto py-1.5 font-sans">
      
      {/* GLORIOUS PREMIER CARD BANNER */}
      <div className="relative rounded-card overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 via-yellow-400 to-amber-600 text-slate-900 p-6 shadow-xl border-2 border-yellow-200">
        <div className="absolute top-1/2 right-12 -translate-y-1/2 text-9xl font-black font-display text-white/10 select-none tracking-tighter">
          PREM
        </div>

        <div className="relative z-10 max-w-md flex flex-col gap-2">
          <span className="text-[10px] font-black uppercase bg-white/20 border border-white/20 px-3 py-1 rounded-full inline-block max-w-max">
            ✨ Tracklethics Premium advantage
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-slate-950 leading-none">
            Unlock complete Ontario athletics potential
          </h2>
          <p className="text-xs text-slate-950 font-semibold leading-relaxed mt-1">
            Unlock verified coach dashboards, custom prediction forums, individual graphics progression charts and zero-ad feeds.
          </p>
        </div>
      </div>

      {/* BILLING TOGGLE */}
      <div className="flex justify-center items-center gap-3">
        <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-brand' : 'text-[var(--color-text-secondary)]'}`}>
          Bill Monthly ($2.99/mo)
        </span>
        
        {/* Toggle switch custom */}
        <div 
          onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
          className="w-12 h-6.5 rounded-full bg-[var(--color-surface-tertiary)] border border-[var(--color-separator)] p-0.5 flex items-center relative cursor-pointer select-none"
        >
          <div 
            className={`w-5.5 h-5.5 rounded-full bg-brand transition-all duration-300 shadow-sm
              ${billingCycle === 'yearly' ? 'translate-x-5' : 'translate-x-[1px]'}
            `} 
          />
        </div>

        <span className={`text-xs font-bold flex items-center gap-1 ${billingCycle === 'yearly' ? 'text-brand' : 'text-[var(--color-text-secondary)]'}`}>
          Bill Yearly ($19.99/yr) <span className="bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-xs">Save 44%</span>
        </span>
      </div>

      {/* UPGRADE BUTTON CARD CONTROLLER */}
      <Card elevated className="p-6 text-center bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-2xl">
        <span className="text-xs text-[var(--color-text-tertiary)] tracking-widest font-black uppercase pl-1 block mb-1">
          Complete upgrade bundle
        </span>
        
        <div className="text-3xl font-display font-black text-brand tracking-tight mb-4">
          {billingCycle === 'monthly' ? '$2.99' : '$19.99'}
          <span className="text-xs font-extrabold text-[var(--color-text-tertiary)] uppercase font-display tracking-normal">
            {billingCycle === 'monthly' ? ' / billed monthly' : ' / billed yearly'}
          </span>
        </div>

        {currentUser.isPremium ? (
          <div className="bg-amber-400/10 text-amber-600 border border-amber-400/25 p-3 rounded-xl font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1">
            ✓ Your Tracklethics Premium advantage is active!
          </div>
        ) : (
          <Button 
            variant="premium" 
            onClick={handleMockUpgrade}
            className="w-full uppercase font-display text-xs py-3 max-w-sm mx-auto shadow-md"
          >
            Activate Tracklethics Premium Advantage
          </Button>
        )}

        <div className="mt-4 flex items-center justify-center gap-1 text-[9px] text-[var(--color-text-tertiary)] uppercase font-semibold">
          🛡️ Cancel anytime in app settings. Secure student transactions.
        </div>
      </Card>

      {/* CORE BENEFITS COMPARATIVE CHART GRAPH */}
      <div>
        <h3 className="text-xs font-display font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-2.5">
          Access Level Comparison
        </h3>

        <Card className="p-0 border border-[var(--color-separator)] overflow-hidden divide-y divide-[var(--color-separator)]">
          <div className="grid grid-cols-3 p-3 text-xs bg-[var(--color-surface-secondary)]/50 font-black uppercase font-display text-[var(--color-text-secondary)]">
            <span>Features advantage</span>
            <span className="text-center">Free tier</span>
            <span className="text-center text-brand">Premium advantage</span>
          </div>

          {[
            { id: 'scores', title: 'Schedule scores & results directory', free: true, prem: true },
            { id: 'follow', title: 'Follow schools & student athletes', free: true, prem: true },
            { id: 'comms', title: 'Join prediction circles discussion board', free: true, prem: true },
            { id: 'visual', title: 'Advanced progression analytics charts', free: false, prem: true },
            { id: 'create', title: 'Admin & Create new community boards', free: false, prem: true },
            { id: 'sync', title: 'Calendar Sync .ICS subscribers timeline', free: false, prem: true },
            { id: 'ads', title: 'Complete ad-free sports feed', free: false, prem: true }
          ].map((item, index) => (
            <div key={index} className="grid grid-cols-3 p-3.5 text-xs font-semibold items-center">
              <span className="text-[var(--color-text-primary)]">{item.title}</span>
              <span className="text-center font-bold text-slate-500">
                {item.free ? <Check className="w-4 h-4 mx-auto text-slate-400" /> : '—'}
              </span>
              <span className="text-center font-bold text-brand">
                {item.prem ? <Check className="w-4.5 h-4.5 mx-auto text-brand stroke-[3px]" /> : '—'}
              </span>
            </div>
          ))}
        </Card>
      </div>

    </div>
  );
};


// ==========================================
// CENTRAL PAGE DISPATCHER HOOK COMPONENT
// ==========================================
export const PagesContainer: React.FC = () => {
  const { screen } = useApp();

  switch (screen.type) {
    case 'tabs':
      switch (screen.tab) {
        case 'dashboard': return <DashboardPage />;
        case 'scores': return <DashboardPage />;
        case 'discover': return <DiscoverPage />;
        case 'communities': return <CommunitiesPage />;
        case 'profile': return <ProfilePage />;
      }
      return <DashboardPage />;
    case 'athlete': return <AthleteProfilePage id={screen.id} />;
    case 'team': return <TeamDetailPage id={screen.id} />;
    case 'school': return <SchoolProfilePage id={screen.id} />;
    case 'community': return <CommunityDetailPage id={screen.id} />;
    case 'premium': return <PremiumPage />;
    default: return <DashboardPage />;
  }
};
