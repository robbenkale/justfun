/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Button, Card } from './ui';
import { Sparkles, Trophy, ShieldAlert, KeyRound, ArrowRight, Chrome } from 'lucide-react';
import { PreferenceWizard } from './onboarding/PreferenceWizard';

export const AuthScreens: React.FC = () => {
  const { screen, navigate, updateProfile, setPreferencesWizardStep, preferencesWizardStep } = useApp();
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const isWizardOpen = preferencesWizardStep !== null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pword) {
      setError('Please provide your high school email and password credentials.');
      return;
    }
    
    // Simulate login
    setError('');
    updateProfile({
      email,
      displayName: displayName || email.split('@')[0],
      username: username || email.split('@')[0].toLowerCase() + '_7'
    });
    setPreferencesWizardStep(null); // completed
    localStorage.setItem('tracklethics_wizard_completed', 'true');
    navigate({ type: 'tabs', tab: 'dashboard' });
  };

  const handleSignUpInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pword || !displayName || !username) {
      setError('Fill out all fields to create your Tracklethics account.');
      return;
    }

    // Set user, bypass wizard entirely, and redirect instantly
    setError('');
    updateProfile({
      email,
      displayName,
      username: username.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase(),
      avatarUrl: undefined, // No photo assigned! Initials are used instead.
      preferences: {
        sports: ['basketball', 'soccer'],
        regions: ['Hamilton-Wentworth'],
        levels: ['OFSAA'],
        genders: ['boys', 'girls']
      },
      joinedCommunityIds: [],
      followedTeamIds: [],
      followedAthleteIds: [],
      followedSchoolIds: [] // Strictly follow schools, not athletes by default
    });
    setPreferencesWizardStep(null); // Bypass wizard!
    localStorage.setItem('tracklethics_wizard_completed', 'true');
    navigate({ type: 'tabs', tab: 'dashboard' });
  };

  const handleOAuth = () => {
    setError('');
    updateProfile({
      email: 'robben.kale@gmail.com',
      displayName: 'Robben Kale',
      username: 'robben_kale'
    });
    setPreferencesWizardStep(null); // skip wizard since they already have account set
    localStorage.setItem('tracklethics_wizard_completed', 'true');
    navigate({ type: 'tabs', tab: 'dashboard' });
  };

  // If user signed up or is in preference wizard flow, render steps!
  if (isWizardOpen) {
    return (
      <div className="min-h-screen grow flex flex-col justify-center py-10 px-4 bg-[var(--color-surface-secondary)]">
        <div className="absolute top-4 left-4 flex items-center gap-1.5 select-none" onClick={() => { localStorage.removeItem('tracklethics_wizard_completed'); navbarRedirect(); }}>
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center font-display font-black text-white cursor-pointer select-none">T</div>
          <span className="font-display font-black tracking-tight text-sm text-brand cursor-pointer">Tracklethics</span>
        </div>
        <PreferenceWizard />
      </div>
    );
  }

  const navbarRedirect = () => {
    navigate({ type: 'register' });
  };

  return (
    <div className="min-h-screen grow flex flex-col justify-center items-center py-12 px-4 bg-[var(--color-surface-secondary)] font-sans">
      
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6 text-center select-none" onClick={() => navigate({ type: 'login' })}>
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-brand flex items-center justify-center font-display font-black text-white text-2xl shadow-xl shadow-brand/20 select-none cursor-pointer border border-[var(--color-separator)]">
          <img 
            src="/input_file_0.png" 
            alt="Tracklethics Logo" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // fallback to text representation
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <h1 className="text-3xl font-display font-black uppercase text-brand tracking-tight mt-2 flex items-center gap-1 leading-none select-none">
          Tracklethics
        </h1>
        <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-widest font-semibold mt-1 select-none">
          Ontario High School Sports Tracker
        </p>
      </div>

      <Card elevated className="w-full max-w-sm p-6">
        <div className="text-center mb-5">
          <h2 className="text-xl font-display font-extrabold uppercase tracking-tight text-[var(--color-text-primary)]">
            {screen.type === 'login' ? 'Welcome Back Athlete' : 'Create Student Account'}
          </h2>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1 font-medium">
            {screen.type === 'login' 
              ? 'Access results, view live rosters, and predictions'
              : 'Sign up to follow schools, sports leagues and compile stats info.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-rose-600 rounded-xl text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* INPUT FORMS */}
        {screen.type === 'login' ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-[11px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1.5">
                School Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@schoolboard.ca"
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-separator)] text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] focus:outline-none focus:ring-1 focus:ring-brand shadow-xs"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={pword}
                onChange={(e) => setPword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-separator)] text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] focus:outline-none focus:ring-1 focus:ring-brand shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 bg-brand text-white text-xs font-bold rounded-xl hover:bg-brand-dark transition-colors cursor-pointer inline-flex items-center justify-center gap-1 shadow-md shadow-brand/10 hover:shadow-brand/20 active:scale-97 uppercase tracking-wider"
            >
              Sign In <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUpInit} className="flex flex-col gap-3">
            <div>
              <label className="block text-[11px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Kevin Durant"
                className="w-full px-3 py-2 rounded-xl border border-[var(--color-separator)] text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] focus:outline-none focus:ring-1 focus:ring-brand shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1">
                Unique Student Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. kevin_durant35"
                className="w-full px-3 py-2 rounded-xl border border-[var(--color-separator)] text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] focus:outline-none focus:ring-1 focus:ring-brand shadow-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1">
                E-mail address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hwdsb.ca"
                className="w-full px-3 py-2 rounded-xl border border-[var(--color-separator)] text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] focus:outline-none focus:ring-1 focus:ring-brand shadow-xs"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-black uppercase text-[var(--color-text-secondary)] tracking-wider mb-1">
                Secure Password
              </label>
              <input
                type="password"
                required
                value={pword}
                onChange={(e) => setPword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full px-3 py-2 rounded-xl border border-[var(--color-separator)] text-xs text-[var(--color-text-primary)] bg-[var(--color-surface)] placeholder-[var(--color-text-quaternary)] focus:outline-none focus:ring-1 focus:ring-brand shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-2.5 bg-brand text-white text-xs font-bold rounded-xl hover:bg-brand-dark transition-colors cursor-pointer inline-flex items-center justify-center gap-1 shadow-md shadow-brand/10 hover:shadow-brand/20 active:scale-97 uppercase tracking-wider"
            >
              Create Account <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          </form>
        )}

        {/* GOOGLE INTEGRATION */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-[var(--color-separator)]" />
          <span className="relative px-3 bg-[var(--color-surface)] text-[10px] font-black uppercase text-[var(--color-text-tertiary)] tracking-wider">
            OR
          </span>
        </div>

        <button
          onClick={handleOAuth}
          className="w-full py-2.5 rounded-xl border border-[var(--color-separator)] bg-[var(--color-surface-secondary)] text-xs text-[var(--color-text-primary)] font-bold hover:bg-[var(--color-surface-tertiary)] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <Chrome className="w-4 h-4 text-brand" /> Continue with Google Student Auth
        </button>

        {/* TOGGLE OPTIONS */}
        <div className="mt-5 text-center text-xs">
          {screen.type === 'login' ? (
            <span className="text-[var(--color-text-tertiary)]">
              Don't have a Student Profile?{' '}
              <button 
                onClick={() => navigate({ type: 'register' })} 
                className="text-brand font-bold hover:underline cursor-pointer"
              >
                Sign Up Now
              </button>
            </span>
          ) : (
            <span className="text-[var(--color-text-tertiary)]">
              Already have an Profile?{' '}
              <button 
                onClick={() => navigate({ type: 'login' })} 
                className="text-brand font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </Card>
      
      <div className="mt-6 flex flex-col items-center select-none text-[10px] text-[var(--color-text-tertiary)] gap-1">
        <span className="flex items-center gap-1 uppercase tracking-wide font-semibold">
          <Trophy className="w-3.5 h-3.5" /> High School Sports Association Certified
        </span>
        <span>Version 2.7.4-TS · Secured via TLS SSL Protocol</span>
      </div>
    </div>
  );
};
