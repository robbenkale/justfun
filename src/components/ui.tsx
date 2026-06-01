/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Sport, Level } from '../types';
import { SUPPORTED_SPORTS } from '../fixtures';
import { Sparkles, Trophy, CheckCircle, ShieldAlert, X } from 'lucide-react';

// ==========================================
// BUTTON
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  premium?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading,
  premium,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg font-medium',
    md: 'px-4 py-2 text-sm rounded-xl font-semibold',
    lg: 'px-6 py-3 text-base rounded-2xl font-bold'
  };

  const variantClasses = {
    primary: 'bg-brand text-white hover:bg-brand-dark transition-all duration-200 shadow-md shadow-brand/10 hover:shadow-lg hover:shadow-brand/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100',
    secondary: 'bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-tertiary)] border border-[var(--color-separator)] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:active:scale-100 font-bold',
    ghost: 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-secondary)] transition-all duration-200 active:scale-95',
    destructive: 'bg-[var(--color-sport-baseball)] text-white hover:bg-red-700 transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50',
    premium: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-slate-900 border border-yellow-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 hover:from-amber-300 hover:to-amber-500 transition-all duration-200 active:scale-95 font-black uppercase tracking-wider'
  };

  const btnStyle = `${sizeClasses[size]} ${variantClasses[variant]} inline-flex items-center justify-center gap-2 cursor-pointer transition-transform ${className}`;

  return (
    <button disabled={disabled || loading} className={btnStyle} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {!loading && premium && <Sparkles className="w-4 h-4 fill-amber-300" />}
      {children}
    </button>
  );
};

// ==========================================
// CARD
// ==========================================
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  pressable?: boolean;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  pressable,
  elevated,
  className = '',
  ...props
}) => {
  const cardStyle = `
    bg-[var(--color-surface)] 
    border border-[var(--color-separator)]
    rounded-card
    p-4
    text-[var(--color-text-primary)]
    shadow-card
    ${elevated ? 'shadow-card-elevated' : ''}
    ${pressable ? 'hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={cardStyle} {...props}>
      {children}
    </div>
  );
};

// ==========================================
// AVATAR
// ==========================================
interface AvatarProps {
  name: string;
  url?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  verified?: boolean;
  premium?: boolean;
  sportDot?: Sport;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  url,
  size = 'md',
  verified,
  premium,
  sportDot,
  className = '',
  onClick
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg font-semibold',
    xl: 'w-20 h-20 text-2xl font-bold',
    '2xl': 'w-28 h-28 md:w-32 md:h-32 text-4xl font-black'
  };

  // Deterministic background color for default letter avatars
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };
  const bgColors = [
    'bg-brand/20 text-brand-dark dark:text-brand-light',
    'bg-[var(--color-sport-basketball)]/20 text-[var(--color-sport-basketball)]',
    'bg-[var(--color-sport-soccer)]/20 text-[var(--color-sport-soccer)]',
    'bg-[var(--color-sport-track)]/20 text-[var(--color-sport-track)]',
    'bg-sky-500/20 text-sky-600 dark:text-sky-400',
    'bg-rose-500/20 text-rose-600 dark:text-rose-400',
    'bg-[var(--color-sport-wrestling)]/20 text-[var(--color-sport-wrestling)]'
  ];
  const colorIndex = hashCode(name) % bgColors.length;
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  const sportColor = sportDot ? SUPPORTED_SPORTS.find(s => s.id === sportDot)?.color : undefined;

  return (
    <div 
      className={`relative inline-block cursor-pointer flex-shrink-0 select-none ${className}`}
      onClick={onClick}
    >
      <div className={`${sizes[size]} rounded-full overflow-hidden flex items-center justify-center font-display border border-[var(--color-separator)]`}>
        {url ? (
          <img 
            src={url} 
            alt={name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
            onError={(e) => {
              // Hide image and fallback to initials
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const span = document.createElement('span');
                span.className = `flex w-full h-full items-center justify-center ${bgColors[colorIndex]}`;
                span.innerText = initials;
                parent.appendChild(span);
              }
            }}
          />
        ) : (
          <span className={`flex w-full h-full items-center justify-center ${bgColors[colorIndex]}`}>
            {initials}
          </span>
        )}
      </div>

      {/* Verified Badge */}
      {verified && (
        <div className={`absolute bottom-0 right-0 p-0.5 rounded-full border border-[var(--color-surface)] ${premium ? 'bg-amber-400' : 'bg-brand'}`}>
          <CheckCircle className="w-3 h-3 text-white fill-current" />
        </div>
      )}

      {/* Sport Dot Indicator */}
      {sportDot && !verified && sportColor && (
        <div 
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-[var(--color-surface)]" 
          style={{ backgroundColor: sportColor }}
        />
      )}
    </div>
  );
};

// ==========================================
// BADGE
// ==========================================
interface BadgeProps {
  variant?: 'sport' | 'level' | 'live' | 'premium' | 'gender';
  sportId?: Sport;
  text?: string;
  level?: Level;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'level',
  sportId,
  text,
  level,
  className = ''
}) => {
  if (variant === 'sport' && sportId) {
    const sportInfo = SUPPORTED_SPORTS.find(s => s.id === sportId);
    if (sportInfo) {
      return (
        <span 
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm ${className}`}
          style={{ backgroundColor: sportInfo.color }}
        >
          <span>{sportInfo.icon}</span>
          <span>{sportInfo.label}</span>
        </span>
      );
    }
  }

  if (variant === 'live') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-rose-600 uppercase tracking-widest ${className}`}>
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
        <span>LIVE</span>
      </span>
    );
  }

  if (variant === 'premium') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black text-slate-900 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 border border-yellow-300 uppercase tracking-wide shadow-sm shadow-yellow-500/10 ${className}`}>
        <Sparkles className="w-3 h-3 fill-slate-900" />
        <span>PREMIUM</span>
      </span>
    );
  }

  if (variant === 'gender' && text) {
    const isBoys = text.toLowerCase().includes('boys');
    const isGirls = text.toLowerCase().includes('girls');
    const styleBg = isBoys 
      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
      : isGirls 
      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${styleBg} ${className}`}>
        {text}
      </span>
    );
  }

  // default level
  const displayedText = text || level || 'Varsity';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)] border border-[var(--color-separator)] ${className}`}>
      {displayedText}
    </span>
  );
};

// ==========================================
// SEARCH BAR
// ==========================================
interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search high schools, sports, athletes...',
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[var(--color-text-tertiary)]">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2.5 rounded-pill bg-[var(--color-surface)] border border-[var(--color-separator)] text-[var(--color-text-primary)] placeholder-[var(--color-text-quaternary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent shadow-sm transition-all"
        placeholder={placeholder}
      />
      {value && (
        <button 
          onClick={() => onChange('')} 
          className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[var(--color-text-tertiary)] hover:text-brand"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

// ==========================================
// BOTTOM SHEET
// ==========================================
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet Content Panel */}
      <div className="relative w-full max-w-lg bg-[var(--color-surface)] border-t border-[var(--color-separator)] rounded-t-sheet shadow-sheet z-10 flex flex-col max-h-[85vh] animate-slide-up bg-opacity-98">
        
        {/* iOS Drag Handle */}
        <div className="w-full flex justify-center py-2 shrink-0">
          <div className="w-10 h-1 bg-[var(--color-text-quaternary)] opacity-50 rounded-full" />
        </div>

        {/* Sheet Header */}
        <div className="px-4 pb-2 border-b border-[var(--color-separator)] flex items-center justify-between shrink-0">
          <h3 className="text-lg font-display font-bold text-[var(--color-text-primary)] uppercase tracking-tight">
            {title || 'Details'}
          </h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-[var(--color-surface-secondary)] text-[var(--color-text-primary)] hover:text-brand transition-colors border border-[var(--color-separator)] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 text-[var(--color-text-primary)] shrink-1">
          {children}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// TABS segment
// ==========================================
interface TabsProps {
  items: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex bg-[var(--color-surface-secondary)] p-1 rounded-xl border border-[var(--color-separator)] ${className}`}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`
              flex-1 py-1.5 text-xs font-semibold font-display uppercase tracking-tight rounded-lg transition-all duration-200 cursor-pointer
              ${isActive 
                ? 'bg-[var(--color-surface)] text-brand shadow-xs border border-[var(--color-separator)]' 
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'}
            `}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

// ==========================================
// EMPTY STATE
// ==========================================
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-[var(--color-surface)] border border-[var(--color-separator)] rounded-card shadow-card ${className}`}>
      <div className="text-brand opacity-80 mb-3 block shrink-0">
        {icon || <Trophy className="w-12 h-12 stroke-1" />}
      </div>
      <h3 className="text-base font-display font-bold text-[var(--color-text-primary)] mb-1">
        {title}
      </h3>
      <p className="text-xs text-[var(--color-text-tertiary)] max-w-xs mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// ==========================================
// SKELETON SHIMMER
// ==========================================
export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`animate-shimmer rounded-lg bg-[var(--color-surface-secondary)] border border-[var(--color-separator)] ${className}`} />;
};

// ==========================================
// PREMIUM GATE
// ==========================================
interface PremiumGateProps {
  children?: React.ReactNode;
  fallbackTitle?: string;
  fallbackDesc?: string;
}

export const PremiumGate: React.FC<PremiumGateProps> = ({
  children,
  fallbackTitle = 'Subscribers Only Feature',
  fallbackDesc = 'Advanced analytics, verified coaches dashboard, personal stats graphs, ad-free feed, and custom community creation require a Premium subscription.'
}) => {
  const { currentUser, navigate } = useApp();

  if (currentUser.isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative border border-amber-400/30 rounded-card overflow-hidden">
      {/* Blurred background area */}
      <div className="blur-xs opacity-50 pointer-events-none select-none filter">
        {children || (
          <div className="h-40 bg-[var(--color-surface-secondary)] p-4 flex flex-col gap-2">
            <div className="h-4 w-1/3 bg-slate-400 rounded-sm" />
            <div className="h-4 w-5/6 bg-slate-300 rounded-sm" />
            <div className="h-4 w-2/3 bg-slate-300 rounded-sm" />
          </div>
        )}
      </div>

      {/* Upgrade Callout Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/80 to-[var(--color-surface)]/45 flex flex-col items-center justify-center text-center p-4 z-10 border-t border-amber-300">
        <Sparkles className="w-8 h-8 text-amber-500 fill-amber-400 mb-2 animate-bounce animate-duration-1000" />
        <h4 className="text-sm font-display font-black uppercase text-amber-500 tracking-wide mb-1 flex items-center gap-1.5 justify-center">
          <Trophy className="w-4 h-4 fill-amber-300" /> {fallbackTitle}
        </h4>
        <p className="text-[11px] text-[var(--color-text-secondary)] max-w-xs mb-3 font-medium">
          {fallbackDesc}
        </p>
        <Button 
          variant="premium" 
          size="sm"
          onClick={() => navigate({ type: 'premium' })}
        >
          Upgrade to Premium for $2.99
        </Button>
      </div>
    </div>
  );
};
