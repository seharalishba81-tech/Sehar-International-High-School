import React from 'react';
import { Language, UserSession, SchoolSettings } from '../types';
import { getTranslation } from '../translations';
import { SCHOOL_EMBLEM } from '../data/mockData';
import { Globe, Shield, User, LogOut, Menu, X, RotateCcw, Award } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLanguage: () => void;
  user: UserSession;
  settings: SchoolSettings;
  onSwitchUser: () => void;
  onLogout: () => void;
  onResetDemo: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLanguage,
  user,
  settings,
  onSwitchUser,
  onLogout,
  onResetDemo,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  // Display school name from reactive settings
  const displaySchoolName = isUrdu ? settings.schoolNameUrdu : settings.schoolName;
  const displayPrincipalName = isUrdu ? settings.principalNameUrdu : settings.principalName;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <img
                src={SCHOOL_EMBLEM}
                alt="Sehar High Emblem"
                className="w-10 h-10 rounded-full border border-blue-600/30 object-cover shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className={`text-base sm:text-lg font-black text-blue-900 tracking-tight whitespace-nowrap ${isUrdu ? 'font-urdu-clean' : ''}`}>
                  {displaySchoolName}
                </span>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="text-blue-700 font-semibold inline-flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-blue-600" />
                    {displayPrincipalName}
                  </span>
                  <span>·</span>
                  <span className="truncate max-w-xs">{settings.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reset Demo Data Button */}
            <button
              onClick={onResetDemo}
              title={t.resetDemoData}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetDemoData}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-blue-800 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>{isUrdu ? 'English' : 'اردو'}</span>
            </button>

            {/* User Session Profile & Role */}
            <div className="flex items-center gap-2 pl-2 border-slate-200 border-l rtl:border-r rtl:border-l-0">
              <div className="hidden md:flex flex-col text-right rtl:text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {user.role === 'admin' ? displayPrincipalName : isUrdu ? user.nameUrdu : user.name}
                </span>
                <span className="text-[11px] text-blue-700 font-semibold inline-flex items-center gap-1 justify-end rtl:justify-start">
                  <Shield className="w-3 h-3 text-blue-600" />
                  {user.role === 'admin' ? (isUrdu ? 'ہیڈ آف پرنسپل' : 'Head of Principal') : t.teacherRole}
                </span>
              </div>

              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full border border-blue-300 object-cover shadow-2xs"
                referrerPolicy="no-referrer"
              />

              {/* Role Switcher Menu */}
              <button
                onClick={onSwitchUser}
                title={t.quickDemoUser}
                className="p-1.5 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
              </button>

              <button
                onClick={onLogout}
                title={t.logout}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
