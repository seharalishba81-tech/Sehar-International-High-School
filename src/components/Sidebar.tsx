import React from 'react';
import { Language, UserRole } from '../types';
import { getTranslation } from '../translations';
import {
  LayoutDashboard,
  GraduationCap,
  Users2,
  CalendarCheck2,
  ReceiptText,
  Award,
  Settings,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export type ActiveTab = 'dashboard' | 'students' | 'teachers' | 'attendance' | 'fees' | 'exams' | 'settings';

interface SidebarProps {
  currentTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  lang: Language;
  userRole: UserRole;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  lang,
  userRole,
  isOpenMobile,
  onCloseMobile
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: t.navDashboard,
      icon: LayoutDashboard,
      allowedRoles: ['admin', 'teacher'],
      badge: null
    },
    {
      id: 'students' as ActiveTab,
      label: t.navStudents,
      icon: GraduationCap,
      allowedRoles: ['admin', 'teacher'],
      badge: null
    },
    {
      id: 'teachers' as ActiveTab,
      label: t.navTeachers,
      icon: Users2,
      allowedRoles: ['admin'],
      badge: userRole === 'teacher' ? 'Admin only' : null
    },
    {
      id: 'attendance' as ActiveTab,
      label: t.navAttendance,
      icon: CalendarCheck2,
      allowedRoles: ['admin', 'teacher'],
      badge: 'Daily'
    },
    {
      id: 'fees' as ActiveTab,
      label: t.navFees,
      icon: ReceiptText,
      allowedRoles: ['admin'],
      badge: null
    },
    {
      id: 'exams' as ActiveTab,
      label: t.navExams,
      icon: Award,
      allowedRoles: ['admin', 'teacher'],
      badge: 'DMC'
    },
    {
      id: 'settings' as ActiveTab,
      label: t.navSettings,
      icon: Settings,
      allowedRoles: ['admin', 'teacher'],
      badge: null
    }
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    onSelectTab(tabId);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden no-print"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-10 h-screen lg:h-[calc(100vh-4rem)] w-64 bg-white border-r rtl:border-l rtl:border-r-0 border-slate-200/80 flex flex-col justify-between transition-transform duration-200 ease-in-out no-print ${
          isOpenMobile
            ? 'translate-x-0'
            : 'ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
          {/* Section Label */}
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {isUrdu ? 'اسکول مینو' : 'School Management'}
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const isAccessible = item.allowedRoles.includes(userRole);

            return (
              <button
                key={item.id}
                onClick={() => isAccessible && handleNavClick(item.id)}
                disabled={!isAccessible}
                className={`w-full group flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/20'
                    : isAccessible
                    ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50/70'
                    : 'text-slate-300 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-white' : isAccessible ? 'text-blue-600' : 'text-slate-300'
                    }`}
                  />
                  <span className={`whitespace-nowrap ${isUrdu ? 'font-urdu-clean text-[13px]' : ''}`}>
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-blue-700/80 text-blue-100'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Current Academic Session Info Card */}
        <div className="p-3 m-3 bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-blue-100/40 border border-blue-200/70 rounded-2xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-900">
              {isUrdu ? 'تعلیمی سال ۲۰۲۶-۲۷' : 'Academic Session 2026-27'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {isUrdu
              ? 'تمام سسٹمز فعال ہیں۔ حاضری اور فیس کی تفصیلات خودکار محفوظ ہو رہی ہیں۔'
              : 'All modules verified. Attendance, fees & examination cards synced locally.'}
          </p>
          <div className="mt-2.5 pt-2 border-t border-blue-200/50 flex items-center justify-between text-[11px] text-blue-800 font-medium">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
              {userRole === 'admin' ? (isUrdu ? 'ایڈمن رسائی' : 'Principal Mode') : (isUrdu ? 'استاد رسائی' : 'Teacher Mode')}
            </span>
            <span className="text-slate-400">v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
};
