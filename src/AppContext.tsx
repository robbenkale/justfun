/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserPreferences, Community, Thread, ThreadReply, Game, Sport, Level, Gender } from './types';
import { INITIAL_USER, MOCK_COMMUNITIES, MOCK_THREADS, MOCK_REPLIES, MOCK_GAMES } from './fixtures';

export type ScreenPath =
  | { type: 'tabs'; tab: 'dashboard' | 'scores' | 'discover' | 'communities' | 'profile' }
  | { type: 'athlete'; id: string }
  | { type: 'team'; id: string }
  | { type: 'school'; id: string }
  | { type: 'community'; id: string }
  | { type: 'settings' }
  | { type: 'premium' }
  | { type: 'login' }
  | { type: 'register' };

export interface AppNotification {
  id: string;
  type: 'game_result' | 'game_starting' | 'community_post' | 'follow' | 'system';
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  target?: { type: 'game' | 'athlete' | 'community'; id: string };
}

interface AppContextProps {
  currentUser: UserProfile;
  theme: 'light' | 'dark';
  screen: ScreenPath;
  screenHistory: ScreenPath[];
  notifications: AppNotification[];
  communities: Community[];
  threads: Thread[];
  replies: Record<string, ThreadReply[]>;
  gamesList: Game[];
  preferencesWizardStep: number | null; // null if completed
  setPreferencesWizardStep: (step: number | null) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  navigate: (path: ScreenPath) => void;
  goBack: () => void;
  updateProfile: (profileUpdates: Partial<UserProfile>) => void;
  toggleFollowTeam: (teamId: string) => void;
  toggleFollowAthlete: (athleteId: string) => void;
  toggleFollowSchool: (schoolId: string) => void;
  toggleJoinCommunity: (communityId: string) => void;
  updatePreferences: (prefUpdates: Partial<UserPreferences>) => void;
  createCommunity: (name: string, description: string, options: { sport?: Sport; level?: Level; region?: string; isPrivate: boolean }) => { success: boolean; error?: string };
  createThread: (communityId: string, title: string, body: string) => void;
  addReply: (threadId: string, body: string) => void;
  markNotificationsAsRead: () => void;
  triggerLiveScoreUpdate: () => void;
  logoutUser: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or defaults
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tracklethics_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return INITIAL_USER;
  });

  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('tracklethics_theme') as 'light' | 'dark';
    if (saved === 'light' || saved === 'dark') return saved;
    // Premium dark iOS aesthetic defaulted
    return 'dark';
  });

  const [screen, setScreen] = useState<ScreenPath>(() => {
    const isCompletedWizard = localStorage.getItem('tracklethics_wizard_completed') === 'true';
    if (!isCompletedWizard) {
      return { type: 'register' };
    }
    return { type: 'tabs', tab: 'dashboard' };
  });
  
  const [screenHistory, setScreenHistory] = useState<ScreenPath[]>([]);
  const [preferencesWizardStep, setWizardStepState] = useState<number | null>(null);

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('tracklethics_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    return [
      {
        id: 'notif-1',
        type: 'game_result',
        title: 'Final Score: Westdale SS Wins!',
        body: 'Marcus Henderson score 22 pts to secure an 82-78 victory over Bishop Ryan Catholic High.',
        isRead: false,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        target: { type: 'game', id: 'game-1' }
      },
      {
        id: 'notif-2',
        type: 'community_post',
        title: 'New Post in OFSAA Basketball Hub',
        body: 'Marcus Henderson posted "Match predictions for Bishop Ryan vs Westdale tonight?"',
        isRead: false,
        createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        target: { type: 'community', id: 'com-1' }
      },
      {
        id: 'notif-3',
        type: 'system',
        title: 'Welcome to Tracklethics!',
        body: 'Start tracking high school teams and athletes across Ontario. Set your preferences to get real-time score notifications.',
        isRead: true,
        createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString()
      }
    ];
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('tracklethics_communities');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    return MOCK_COMMUNITIES;
  });

  const [threads, setThreads] = useState<Thread[]>(() => {
    const saved = localStorage.getItem('tracklethics_threads');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    return MOCK_THREADS;
  });

  const [replies, setReplies] = useState<Record<string, ThreadReply[]>>(() => {
    const saved = localStorage.getItem('tracklethics_replies');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    return MOCK_REPLIES;
  });

  const [gamesList, setGamesList] = useState<Game[]>(() => {
    const saved = localStorage.getItem('tracklethics_games');
    if (saved) {
      try { return JSON.parse(saved); } catch (_) {}
    }
    return MOCK_GAMES;
  });

  // Persists states in localStorage on changes
  useEffect(() => {
    localStorage.setItem('tracklethics_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('tracklethics_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('tracklethics_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('tracklethics_replies', JSON.stringify(replies));
  }, [replies]);

  useEffect(() => {
    localStorage.setItem('tracklethics_games', JSON.stringify(gamesList));
  }, [gamesList]);

  useEffect(() => {
    localStorage.setItem('tracklethics_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('tracklethics_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Navigate actions
  const navigate = (path: ScreenPath) => {
    if (path.type === 'tabs' && screen.type === 'tabs' && screen.tab === path.tab) {
      return; // already here
    }
    setScreenHistory(prev => [...prev, screen]);
    setScreen(path);
  };

  const goBack = () => {
    if (screenHistory.length === 0) {
      setScreen({ type: 'tabs', tab: 'dashboard' });
      return;
    }
    const prev = screenHistory[screenHistory.length - 1];
    setScreenHistory(prevHistory => prevHistory.slice(0, -1));
    setScreen(prev);
  };

  const setPreferencesWizardStep = (step: number | null) => {
    setWizardStepState(step);
    if (step === null) {
      localStorage.setItem('tracklethics_wizard_completed', 'true');
    } else {
      localStorage.removeItem('tracklethics_wizard_completed');
    }
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...profileUpdates
    }));
  };

  const toggleFollowTeam = (teamId: string) => {
    setCurrentUser(prev => {
      const exists = prev.followedTeamIds.includes(teamId);
      const list = exists
        ? prev.followedTeamIds.filter(id => id !== teamId)
        : [...prev.followedTeamIds, teamId];
      
      // push a notification feedback
      if (!exists) {
        setNotifications(existing => [
          {
            id: `notif-auto-${Date.now()}`,
            type: 'follow',
            title: 'Following New Team!',
            body: `You are now following updates for team ID: ${teamId}.`,
            isRead: false,
            createdAt: new Date().toISOString()
          },
          ...existing
        ]);
      }

      return {
        ...prev,
        followedTeamIds: list
      };
    });
  };

  const toggleFollowAthlete = (athleteId: string) => {
    setCurrentUser(prev => {
      const exists = prev.followedAthleteIds.includes(athleteId);
      const list = exists
        ? prev.followedAthleteIds.filter(id => id !== athleteId)
        : [...prev.followedAthleteIds, athleteId];
      
      if (!exists) {
        setNotifications(existing => [
          {
            id: `notif-auto-${Date.now()}`,
            type: 'follow',
            title: 'Following New Athlete!',
            body: `You are now tracking game performance for athlete ID: ${athleteId}.`,
            isRead: false,
            createdAt: new Date().toISOString()
          },
          ...existing
        ]);
      }

      return {
        ...prev,
        followedAthleteIds: list
      };
    });
  };

  const toggleFollowSchool = (schoolId: string) => {
    setCurrentUser(prev => {
      const exists = prev.followedSchoolIds.includes(schoolId);
      const list = exists
        ? prev.followedSchoolIds.filter(id => id !== schoolId)
        : [...prev.followedSchoolIds, schoolId];
      return {
        ...prev,
        followedSchoolIds: list
      };
    });
  };

  const toggleJoinCommunity = (communityId: string) => {
    setCurrentUser(prev => {
      const exists = prev.joinedCommunityIds.includes(communityId);
      const list = exists
        ? prev.joinedCommunityIds.filter(id => id !== communityId)
        : [...prev.joinedCommunityIds, communityId];
      return {
        ...prev,
        joinedCommunityIds: list
      };
    });

    setCommunities(prevComms =>
      prevComms.map(c => {
        if (c.id === communityId) {
          const isJoined = currentUser.joinedCommunityIds.includes(communityId);
          return {
            ...c,
            memberCount: isJoined ? c.memberCount - 1 : c.memberCount + 1
          };
        }
        return c;
      })
    );
  };

  const updatePreferences = (prefUpdates: Partial<UserPreferences>) => {
    setCurrentUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...prefUpdates
      }
    }));
  };

  const createCommunity = (
    name: string,
    description: string,
    options: { sport?: Sport; level?: Level; region?: string; isPrivate: boolean }
  ) => {
    if (!currentUser.isPremium) {
      return { success: false, error: 'Only Premium subscribers can create new community hubs.' };
    }

    const newComm: Community = {
      id: `com-${Date.now()}`,
      name,
      description,
      sport: options.sport,
      level: options.level,
      region: options.region,
      memberCount: 1,
      isPrivate: options.isPrivate,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      avatarUrl: options.sport === 'soccer' ? '⚽' : options.sport === 'hockey' ? '🏒' : '📣'
    };

    setCommunities(prev => [newComm, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      joinedCommunityIds: [...prev.joinedCommunityIds, newComm.id]
    }));

    return { success: true };
  };

  const createThread = (communityId: string, title: string, body: string) => {
    const newThread: Thread = {
      id: `thr-${Date.now()}`,
      communityId,
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarUrl,
      title,
      body,
      createdAt: new Date().toISOString(),
      replyCount: 0,
      reactions: {}
    };

    setThreads(prev => [newThread, ...prev]);
    setCommunities(prev =>
      prev.map(c => (c.id === communityId ? { ...c, lastActivityAt: new Date().toISOString() } : c))
    );
  };

  const addReply = (threadId: string, body: string) => {
    const newReply: ThreadReply = {
      id: `rep-${Date.now()}`,
      threadId,
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatarUrl,
      body,
      createdAt: new Date().toISOString()
    };

    setReplies(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newReply]
    }));

    setThreads(prev =>
      prev.map(t => (t.id === threadId ? { ...t, replyCount: t.replyCount + 1 } : t))
    );
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Simulates live score ticking updates
  const triggerLiveScoreUpdate = () => {
    setGamesList(prevGames =>
      prevGames.map(game => {
        if (game.id === 'game-1' && game.status === 'live') {
          // Increment or modify basketball game scores reflecting current action
          const homeInc = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
          const awayInc = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0;
          
          if (homeInc > 0 || awayInc > 0) {
            const nextHome = game.homeScore + homeInc;
            const nextAway = game.awayScore + awayInc;
            
            // Generate temporary alert notification some times (capped)
            if (nextHome >= 98 || nextAway >= 95) {
              // Finalize
              return {
                ...game,
                homeScore: nextHome,
                awayScore: nextAway,
                status: 'final' as const
              };
            }

            return {
              ...game,
              homeScore: nextHome,
              awayScore: nextAway
            };
          }
        }
        return game;
      })
    );
  };

  // set interval for score checker in background simulating WebSocket / Supabase Realtime ticker
  useEffect(() => {
    const timer = setInterval(() => {
      triggerLiveScoreUpdate();
    }, 60000); // check and increment every 1 minute
    return () => clearInterval(timer);
  }, []);

  const logoutUser = () => {
    setCurrentUser({
      id: `guest-${Date.now()}`,
      email: '',
      displayName: 'Guest Profile',
      username: 'guest_user',
      isPremium: false,
      preferences: {
        sports: ['basketball', 'soccer', 'hockey'],
        regions: ['Hamilton-Wentworth'],
        levels: ['OFSAA', 'Board'],
        genders: ['boys', 'girls']
      },
      joinedCommunityIds: [],
      followedTeamIds: [],
      followedAthleteIds: [],
      followedSchoolIds: []
    });
    setWizardStepState(null);
    setScreenHistory([]);
    setScreen({ type: 'register' });
    localStorage.removeItem('tracklethics_wizard_completed');
    localStorage.removeItem('tracklethics_user');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        theme,
        screen,
        screenHistory,
        notifications,
        communities,
        threads,
        replies,
        gamesList,
        preferencesWizardStep,
        setPreferencesWizardStep,
        setTheme: (newTheme) => setThemeState(newTheme),
        toggleTheme,
        navigate,
        goBack,
        updateProfile,
        toggleFollowTeam,
        toggleFollowAthlete,
        toggleFollowSchool,
        toggleJoinCommunity,
        updatePreferences,
        createCommunity,
        createThread,
        addReply,
        markNotificationsAsRead,
        triggerLiveScoreUpdate,
        logoutUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
