/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp, ScreenPath } from '../AppContext';
import { Avatar, Badge } from './ui';
import { 
  Home, 
  Trophy, 
  Compass, 
  Users, 
  User, 
  Settings, 
  Sparkles, 
  Bell, 
  Sun, 
  Moon, 
  ArrowLeft, 
  LogOut,
  ChevronRight,
  UserCheck,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const { 
    currentUser, 
    theme, 
    toggleTheme, 
    screen, 
    navigate, 
    screenHistory, 
    goBack, 
    notifications, 
    markNotificationsAsRead,
    logoutUser 
  } = useApp();

  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getPageTitle = (): string => {
    switch (screen.type) {
      case 'tabs':
        switch (screen.tab) {
          case 'dashboard': return 'Tracklethics';
          case 'discover': return 'Discover Athletics';
          case 'communities': return 'Community Hubs';
          case 'profile': return 'My Profile';
        }
        return '';
      case 'athlete': return 'Athlete Profile';
      case 'team': return 'Team Standings';
      case 'school': return 'High School Hub';
      case 'community': return 'Hub Feed';
      case 'settings': return 'App Settings';
      case 'premium': return 'Tracklethics Premium';
      default: return 'Tracklethics';
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: { type: 'tabs', tab: 'dashboard' } as ScreenPath },
    { id: 'discover', label: 'Discover', icon: Compass, path: { type: 'tabs', tab: 'discover' } as ScreenPath },
    { id: 'communities', label: 'Communities', icon: Users, path: { type: 'tabs', tab: 'communities' } as ScreenPath }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const isTabActive = (itemPath: ScreenPath) => {
    if (screen.type === 'tabs' && itemPath.type === 'tabs') {
      return screen.tab === itemPath.tab;
    }
    return false;
  };

  const handleNotifClick = () => {
    setNotifOpen(!notifOpen);
    if (!notifOpen) {
      markNotificationsAsRead();
    }
  };

  // Skip rendering standard chrome if user is on auth screens
  const isAuthScreen = screen.type === 'login' || screen.type === 'register';

  if (isAuthScreen) {
    return <div className="min-h-screen bg-[var(--color-surface-secondary)]">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] font-sans antialiased">
      
      {/* ==========================================
          DESKTOP SIDEBAR
          ========================================== */}
      <aside 
        className={`hidden md:flex flex-col bg-[var(--color-surface)] border-r border-[var(--color-separator)] transition-all duration-300 flex-shrink-0 z-20 sticky top-0 h-screen
          ${sidebarCollapsed ? 'w-16' : 'w-60'}
        `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--color-separator)]">
          <div className="flex items-center gap-2 overflow-hidden cursor-pointer" onClick={() => navigate({ type: 'tabs', tab: 'dashboard' })}>
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-brand flex items-center justify-center font-display font-black text-white shrink-0 shadow-md shadow-brand/10">
              <img 
                src="/input_file_0.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {!sidebarCollapsed && (
              <span className="font-display font-black tracking-tight text-lg text-brand">
                Tracklethics
              </span>
            )}
          </div>
          {!sidebarCollapsed && (
            <button 
              onClick={() => setSidebarCollapsed(true)}
              className="text-[var(--color-text-secondary)] hover:text-brand cursor-pointer p-1 rounded-md"
            >
              ❮
            </button>
          )}
        </div>

        {/* PROFILE HEADER SLOT */}
        <div 
          onClick={() => navigate({ type: 'tabs', tab: 'profile' })}
          className={`p-3 border-b border-[var(--color-separator)] m-2 flex items-center cursor-pointer hover:bg-[var(--color-surface-secondary)] rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center mx-auto' : 'gap-3'}`}
        >
          <Avatar name={currentUser.displayName} url={undefined} size="sm" premium={false} />
          {!sidebarCollapsed && (
            <>
              <div className="overflow-hidden flex-1">
                <div className="font-display font-medium text-sm text-[var(--color-text-primary)] truncate">
                  {currentUser.displayName}
                </div>
                <div className="text-[10px] text-[var(--color-text-tertiary)] truncate">@{currentUser.username}</div>
              </div>
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  navigate({ type: 'premium' });
                }}
                className="font-black text-lg cursor-pointer select-none ml-auto pl-2"
                style={{ color: 'var(--color-premium-gold)' }}
                title="Upgrade to Pro"
              >
                P
              </span>
            </>
          )}
        </div>

        {/* SIDEBAR TOGGLE (When Collapsed, under profile) */}
        {sidebarCollapsed && (
          <button 
            onClick={() => setSidebarCollapsed(false)}
            className="mx-auto mt-2 text-[var(--color-text-secondary)] hover:text-brand cursor-pointer p-2 rounded-md bg-[var(--color-surface-secondary)] shadow-sm"
          >
            ❯
          </button>
        )}

        {/* NAVIGATION LIST */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isTabActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer w-full text-left
                  ${active 
                    ? 'bg-brand text-white shadow-md shadow-brand/10' 
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)] hover:text-[var(--color-text-primary)]'}
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-[var(--color-text-tertiary)]'}`} />
                {!sidebarCollapsed && <span className="font-display tracking-wide uppercase text-xs">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ==========================================
          MOBILE HEADER TOP
          ========================================== */}
      <header className="sticky top-0 z-30 w-full md:hidden h-14 bg-[var(--color-surface)] border-b border-[var(--color-separator)] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-extrabold text-base tracking-tight text-[var(--color-text-primary)] flex items-center gap-1.5 uppercase">
            {screenHistory.length === 0 && <span className="w-2 h-2 bg-brand rounded-full animate-pulse mr-0.5" />}
            {getPageTitle()}
          </span>
        </div>

        {/* RIGHT TOP ICONS */}
        <div className="flex items-center gap-3">
          {/* Theme switcher */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 rounded-full text-[var(--color-text-secondary)] hover:text-brand cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Notifications Trigger */}
          <button 
            onClick={handleNotifClick}
            className="relative p-1.5 rounded-full text-[var(--color-text-secondary)] hover:text-brand cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ==========================================
          DESKTOP HEADER TOP
          ========================================== */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="hidden md:flex h-16 bg-[var(--color-surface)] border-b border-[var(--color-separator)] items-center justify-between px-6 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="font-display font-black text-xl text-[var(--color-text-primary)] uppercase tracking-wide">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme picker */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[var(--color-separator)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:text-brand cursor-pointer shadow-xs"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Notifications panel toggle */}
            <button 
              onClick={handleNotifClick}
              className="relative p-2 rounded-full border border-[var(--color-separator)] bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:text-brand cursor-pointer shadow-xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* ==========================================
            CONTENT PANEL AREA
            ========================================== */}
        <main className="flex-1 pb-20 md:pb-6 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full transition-all">
          {children}
        </main>
      </div>

      {/* ==========================================
          MOBILE BOTTOM TAB BAR
          ========================================== */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-[var(--color-surface)] border-t border-[var(--color-separator)] flex items-center justify-around md:hidden px-2 z-30 select-none pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isTabActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer"
            >
              <div className={`p-1.5 rounded-full transition-all ${active ? 'bg-brand/10 text-brand' : 'text-[var(--color-text-tertiary)]'}`}>
                <Icon className="w-5 h-5 stroke-2" />
              </div>
              <span className={`text-[10px] font-display font-bold uppercase tracking-wide mt-0.5 ${active ? 'text-brand' : 'text-[var(--color-text-tertiary)]'}`}>
                {item.id}
              </span>
            </button>
          );
        })}
      </nav>

      {/* ==========================================
          NOTIFICATIONS PANEL SLIDE DRAWER
          ========================================== */}
      {notifOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop screen */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setNotifOpen(false)}
          />

          <div className="relative w-full max-w-sm h-full bg-[var(--color-surface)] border-l border-[var(--color-separator)] shadow-2xl flex flex-col z-10 animate-slide-left p-4">
            <div className="flex items-center justify-between border-b border-[var(--color-separator)] pb-3 mb-3">
              <h3 className="font-display font-extrabold uppercase tracking-tight text-sm text-[var(--color-text-primary)] flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-brand animate-swing" /> Notifications
              </h3>
              <button 
                onClick={() => setNotifOpen(false)}
                className="p-1 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:text-brand border border-[var(--color-separator)] cursor-pointer"
              >
                Close <X className="w-3.5 h-3.5 inline" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
              {notifications.length === 0 ? (
                <div className="py-12 text-center text-xs text-[var(--color-text-tertiary)]">
                  You have no notifications yet.
                </div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-3 rounded-lg border text-xs relative overflow-hidden transition-colors ${
                      n.isRead 
                        ? 'bg-[var(--color-surface-secondary)] border-[var(--color-separator)] opacity-70' 
                        : 'bg-brand/5 border-brand/20 shadow-sm'
                    }`}
                  >
                    {!n.isRead && (
                      <span className="absolute top-2 right-2 w-2 h-2 bg-brand rounded-full animate-pulse" />
                    )}
                    <h4 className="font-display font-bold text-[var(--color-text-primary)] mb-1 uppercase tracking-tight text-[11px] leading-tight">
                      {n.title}
                    </h4>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">{n.body}</p>
                    <div className="text-[10px] text-[var(--color-text-tertiary)] mt-2 text-right">
                      {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => {
                markNotificationsAsRead();
                setNotifOpen(false);
              }}
              className="mt-3 w-full py-2 bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] rounded-xl text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-tertiary)] transition-colors cursor-pointer"
            >
              Dismiss All
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};
