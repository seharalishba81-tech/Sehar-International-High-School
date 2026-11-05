import React, { useState } from 'react';
import { UserSession, UserRole, Language } from '../types';
import { getTranslation } from '../translations';
import { SCHOOL_EMBLEM, DEMO_ADMIN, DEMO_TEACHER } from '../data/mockData';
import {
  Shield,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  School,
  CheckCircle2
} from 'lucide-react';

interface LoginViewProps {
  lang: Language;
  onLogin: (user: UserSession) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ lang, onLogin }) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('principal@seharhigh.edu.pk');
  const [password, setPassword] = useState('admin123');

  const handleRoleToggle = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('principal@seharhigh.edu.pk');
      setPassword('admin123');
    } else {
      setEmail('tahira.yasmin@seharhigh.edu.pk');
      setPassword('teacher123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      onLogin(DEMO_ADMIN);
    } else {
      onLogin(DEMO_TEACHER);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header Branding */}
        <div className="p-8 text-center bg-gradient-to-b from-blue-50/80 to-white border-b border-slate-100">
          <img
            src={SCHOOL_EMBLEM}
            alt="School Crest"
            className="w-20 h-20 mx-auto rounded-full border-2 border-blue-600 shadow-md object-cover"
          />
          <h1 className={`mt-4 text-xl sm:text-2xl font-black text-blue-950 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
            {isUrdu ? t.schoolName : 'The Scholars Model School'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isUrdu ? 'اسکول پورٹل انتظامی لاگ ان سسٹم' : 'Official Academic & Administrative Management Portal'}
          </p>
        </div>

        <div className="p-8 space-y-6">
          
          {/* Role Switcher Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2 text-center uppercase tracking-wider">
              {isUrdu ? 'پورٹل لاگ ان کردار' : 'Select Portal Access Role'}
            </label>
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => handleRoleToggle('admin')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>{t.adminRole}</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleToggle('teacher')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedRole === 'teacher'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>{t.teacherRole}</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>{isUrdu ? 'پورٹل میں داخل ہوں' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick 1-Click Demo Buttons */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2.5">
              {isUrdu ? 'فوری ڈیمو لاگ ان (۱-کلک)' : 'Fast 1-Click Demo Logins'}
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onLogin(DEMO_ADMIN)}
                className="w-full py-2 px-3 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 rounded-xl transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-left rtl:text-right">
                  <Shield className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{t.demoLoginAdmin}</span>
                </div>
                <span className="text-[10px] text-blue-700 font-mono">Full Access</span>
              </button>

              <button
                type="button"
                onClick={() => onLogin(DEMO_TEACHER)}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-left rtl:text-right">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{t.demoLoginTeacher}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Class Incharge</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
