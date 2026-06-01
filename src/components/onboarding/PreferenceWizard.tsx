/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { Button, Card, SearchBar, Avatar } from '../ui';
import { SUPPORTED_SPORTS, MOCK_SCHOOLS, MOCK_ATHLETES } from '../../fixtures';
import { Sport, Level, Gender } from '../../types';
import { Check, ArrowRight, ShieldCheck, PlayCircle, Trophy, Navigation } from 'lucide-react';

const REGIONS = [
  'Hamilton-Wentworth',
  'Toronto (GTA)',
  'York Region',
  'Peel Region',
  'Ottawa-Carleton',
  'Niagara Region',
  'Waterloo Region',
  'London & Middlesex'
];

const LEVELS: Level[] = ['OFSAA', 'OUA', 'Board', 'Regional', 'House League'];
const GENDERS: { id: Gender; label: string }[] = [
  { id: 'boys', label: 'Boys League' },
  { id: 'girls', label: 'Girls League' },
  { id: 'mixed', label: 'Co-ed / Mixed' }
];

export const PreferenceWizard: React.FC = () => {
  const { 
    updatePreferences, 
    setPreferencesWizardStep, 
    preferencesWizardStep, 
    updateProfile,
    navigate 
  } = useApp();

  const [selectedSports, setSelectedSports] = useState<Sport[]>(['basketball', 'soccer']);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(['Hamilton-Wentworth']);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>(['OFSAA', 'Board']);
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>(['boys', 'girls']);
  
  const [schoolSearch, setSchoolSearch] = useState('');
  const [selectedSchools, setSelectedSchools] = useState<string[]>(['sch-westdale']);
  
  const [athleteSearch, setAthleteSearch] = useState('');
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>(['ath-1']);

  const step = preferencesWizardStep || 1;

  const toggleSport = (sportId: Sport) => {
    setSelectedSports(prev => 
      prev.includes(sportId) ? prev.filter(id => id !== sportId) : [...prev, sportId]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const toggleLevel = (lvl: Level) => {
    setSelectedLevels(prev => 
      prev.includes(lvl) ? prev.filter(l => l !== lvl) : [...prev, lvl]
    );
  };

  const toggleGender = (gen: Gender) => {
    setSelectedGenders(prev => 
      prev.includes(gen) ? prev.filter(g => g !== gen) : [...prev, gen]
    );
  };

  const toggleSchool = (schoolId: string) => {
    setSelectedSchools(prev => 
      prev.includes(schoolId) ? prev.filter(id => id !== schoolId) : [...prev, schoolId]
    );
  };

  const toggleAthlete = (athleteId: string) => {
    setSelectedAthletes(prev => 
      prev.includes(athleteId) ? prev.filter(id => id !== athleteId) : [...prev, athleteId]
    );
  };

  const handleNext = () => {
    if (step < 6) {
      setPreferencesWizardStep(step + 1);
    } else {
      // Complete Wizard onboarding
      updatePreferences({
        sports: selectedSports,
        regions: selectedRegions,
        levels: selectedLevels,
        genders: selectedGenders
      });

      // Update following entities
      updateProfile({
        followedSchoolIds: selectedSchools,
        followedAthleteIds: selectedAthletes,
        followedTeamIds: ['team-westdale-mbb', 'team-cathedral-fsc'] // prefilled recommendations
      });

      setPreferencesWizardStep(null);
      navigate({ type: 'tabs', tab: 'dashboard' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setPreferencesWizardStep(step - 1);
    }
  };

  const filteredSchools = MOCK_SCHOOLS.filter(s => 
    s.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    s.city.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  const filteredAthletes = MOCK_ATHLETES.filter(a => 
    a.name.toLowerCase().includes(athleteSearch.toLowerCase()) ||
    a.position?.toLowerCase().includes(athleteSearch.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      {/* CARD CONTEXT */}
      <Card elevated className="overflow-hidden p-6 relative">
        
        {/* PROGRESS INDICATOR HERO BAR */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-[var(--color-surface-secondary)]">
          <div 
            className="h-full bg-brand rounded-r duration-300 transition-all shadow-md shadow-brand/40"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <span className="font-display font-black text-xs text-brand uppercase tracking-widest bg-brand/10 p-1 px-3 rounded-full mb-2 inline-block">
            Setup Step {step} of 6
          </span>
          <h2 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)] leading-tight uppercase tracking-tight">
            {step === 1 && 'Favorite Ontario Sports'}
            {step === 2 && 'Choose Your Regions'}
            {step === 3 && 'Select Athlete Levels'}
            {step === 4 && 'Gender Classifications'}
            {step === 5 && 'Follow High Schools'}
            {step === 6 && 'Follow Notable Athletes'}
          </h2>
          <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5">
            {step === 1 && 'Pick the sports you want to follow in secondary school leagues.'}
            {step === 2 && 'Get scores and notifications covering high school districts close to you.'}
            {step === 3 && 'Filter updates from championship leagues down to house-league levels.'}
            {step === 4 && 'Choose genders or mixed leagues you want populated on your home feed.'}
            {step === 5 && 'Search and subscribe to high schools for game schedule timelines.'}
            {step === 6 && 'Pin verified athletic profiles to see season points averages & recaps.'}
          </p>
        </div>

        {/* STEP CONTROLLERS */}
        <div className="py-4 min-h-[300px]">
          
          {/* STEP 1: SPORTS GRID */}
          {step === 1 && (
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2.5">
              {SUPPORTED_SPORTS.map(sport => {
                const isSelected = selectedSports.includes(sport.id);
                return (
                  <div
                    key={sport.id}
                    onClick={() => toggleSport(sport.id)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer relative select-none flex flex-col items-center justify-center gap-1.5
                      ${isSelected 
                        ? 'bg-[var(--color-surface)] border-brand shadow-md scale-[1.03]' 
                        : 'bg-[var(--color-surface-secondary)] border-[var(--color-separator)] hover:bg-[var(--color-surface)]'}
                    `}
                  >
                    <span className="text-2xl">{sport.icon}</span>
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] truncate max-w-full">
                      {sport.label}
                    </span>
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* STEP 2: REGIONS LIST */}
          {step === 2 && (
            <div className="flex flex-col gap-2">
              {REGIONS.map(region => {
                const isSelected = selectedRegions.includes(region);
                return (
                  <button
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border font-semibold text-sm transition-all text-left cursor-pointer
                      ${isSelected 
                        ? 'bg-brand/5 border-brand text-brand' 
                        : 'bg-[var(--color-surface-secondary)] border-[var(--color-separator)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <Navigation className="w-4 h-4 rotate-45 text-current opacity-80" />
                      {region}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-brand" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 3: LEVELS */}
          {step === 3 && (
            <div className="flex flex-col gap-3">
              {LEVELS.map(lvl => {
                const isSelected = selectedLevels.includes(lvl);
                return (
                  <button
                    key={lvl}
                    onClick={() => toggleLevel(lvl)}
                    className={`flex items-center justify-between p-4 rounded-xl border font-bold text-sm transition-all text-left cursor-pointer
                      ${isSelected 
                        ? 'bg-[var(--color-surface)] border-brand' 
                        : 'bg-[var(--color-surface-secondary)] border-[var(--color-separator)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}
                    `}
                  >
                    <div>
                      <span className="text-xs tracking-wider uppercase bg-brand/5 p-1 px-2.5 rounded-md text-brand font-black inline-block mb-1">
                        {lvl}
                      </span>
                      <p className="text-[11px] text-[var(--color-text-tertiary)] font-medium">
                        {lvl === 'OFSAA' && 'Provincial athletic championship level (highest tier)'}
                        {lvl === 'OUA' && 'Ontario University Athletics recruitment pipelines'}
                        {lvl === 'Board' && 'Weekly city/board school athletic schedules'}
                        {lvl === 'Regional' && 'Regional school board tournaments'}
                        {lvl === 'House League' && 'Inter-mural local high school house league games'}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 ml-2">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 4: GENDER ACCENTS */}
          {step === 4 && (
            <div className="flex flex-col gap-3">
              {GENDERS.map(g => {
                const isSelected = selectedGenders.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGender(g.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border font-bold text-sm transition-all text-left cursor-pointer
                      ${isSelected 
                        ? 'bg-brand/5 border-brand text-brand' 
                        : 'bg-[var(--color-surface-secondary)] border-[var(--color-separator)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]'}
                    `}
                  >
                    <span>{g.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-brand" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 5: HIGH SCHOOLS SEARCH */}
          {step === 5 && (
            <div className="flex flex-col gap-3">
              <SearchBar 
                value={schoolSearch} 
                onChange={(v) => setSchoolSearch(v)} 
                placeholder="Type high school name (Westdale, Cathedral, Mary's...)"
              />
              
              <div className="max-h-[220px] overflow-y-auto border border-[var(--color-separator)] rounded-xl divide-y divide-[var(--color-separator)] bg-[var(--color-surface-secondary)]/35 mt-1">
                {filteredSchools.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[var(--color-text-tertiary)]">
                    No schools match your search query.
                  </div>
                ) : (
                  filteredSchools.map(school => {
                    const isSelected = selectedSchools.includes(school.id);
                    return (
                      <div
                        key={school.id}
                        onClick={() => toggleSchool(school.id)}
                        className={`p-3 flex items-center justify-between cursor-pointer hover:bg-[var(--color-surface)] transition-colors
                          ${isSelected ? 'bg-brand/5' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <img src={school.logoUrl} className="w-8 h-8 rounded-md object-cover border border-[var(--color-separator)]" alt="" />
                          <div>
                            <span className="text-xs font-semibold text-[var(--color-text-primary)] block">
                              {school.name}
                            </span>
                            <span className="text-[10px] text-[var(--color-text-tertiary)] shrink-0 uppercase tracking-tighter">
                              {school.board} · {school.city}, ON
                            </span>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all
                          ${isSelected ? 'bg-brand border-brand text-white' : 'border-[var(--color-text-quaternary)]'}
                        `}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* STEP 6: ATHLETES */}
          {step === 6 && (
            <div className="flex flex-col gap-3">
              <SearchBar 
                value={athleteSearch} 
                onChange={(v) => setAthleteSearch(v)} 
                placeholder="Search athlete names, positions..."
              />

              <div className="max-h-[220px] overflow-y-auto border border-[var(--color-separator)] rounded-xl divide-y divide-[var(--color-separator)] bg-[var(--color-surface-secondary)]/35 mt-1">
                {filteredAthletes.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[var(--color-text-tertiary)]">
                    No matching athletes found.
                  </div>
                ) : (
                  filteredAthletes.map(athlete => {
                    const isSelected = selectedAthletes.includes(athlete.id);
                    return (
                      <div
                        key={athlete.id}
                        onClick={() => toggleAthlete(athlete.id)}
                        className={`p-3 flex items-center justify-between cursor-pointer hover:bg-[var(--color-surface)] transition-colors
                          ${isSelected ? 'bg-brand/5' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar name={athlete.name} url={athlete.avatarUrl} size="sm" verified={athlete.isVerified} />
                          <div>
                            <span className="text-xs font-semibold text-[var(--color-text-primary)] block">
                              {athlete.name}
                            </span>
                            <span className="text-[10px] text-[var(--color-text-tertiary)] font-display uppercase tracking-wider">
                              Class of {athlete.gradYear} · {athlete.position}
                            </span>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all
                          ${isSelected ? 'bg-brand border-brand text-white' : 'border-[var(--color-text-quaternary)]'}
                        `}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="text-center">
                <button 
                  onClick={handleNext}
                  className="text-xs text-brand font-medium hover:underline cursor-pointer"
                >
                  Skip this step and proceed
                </button>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM WIZARD CONTROLS */}
        <div className="flex items-center justify-between border-t border-[var(--color-separator)] pt-4 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBack}
            disabled={step === 1}
            className={`${step === 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            Previous
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            className="font-display uppercase tracking-tight gap-1"
          >
            {step === 6 ? 'Get Started' : 'Next Step'} <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>

      </Card>

      <div className="text-center mt-4">
        <span className="text-[10px] text-[var(--color-text-tertiary)] flex items-center justify-center gap-1 font-semibold uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" /> Secure Ontario High School Sports Verified Environment.
        </span>
      </div>
    </div>
  );
};
