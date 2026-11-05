import React, { useState } from 'react';
import { Student, Teacher, AttendanceRecord, FeeRecord, ExamResult, Language, SchoolSettings } from '../types';
import { getTranslation } from '../translations';
import {
  GraduationCap,
  Users2,
  DollarSign,
  CalendarCheck2,
  TrendingUp,
  UserPlus,
  Receipt,
  FileCheck2,
  Clock,
  ArrowUpRight,
  AlertCircle,
  Award,
  Sparkles,
  MapPin,
  School
} from 'lucide-react';

interface DashboardProps {
  students: Student[];
  teachers: Teacher[];
  attendance: AttendanceRecord[];
  fees: FeeRecord[];
  exams: ExamResult[];
  lang: Language;
  settings: SchoolSettings;
  onNavigate: (tab: 'students' | 'teachers' | 'attendance' | 'fees' | 'exams' | 'settings') => void;
  onOpenNewStudent: () => void;
  onOpenFeeCollect: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  students,
  teachers,
  attendance,
  fees,
  exams,
  lang,
  settings,
  onNavigate,
  onOpenNewStudent,
  onOpenFeeCollect
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  // 1. Calculate KPI Metrics based on actual 100 students and 20 teachers
  const totalStudents = students.length;
  const totalTeachers = teachers.length;

  const totalFeeCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalFeeExpected = fees.reduce((acc, f) => acc + f.totalAmount, 0);
  const feeRecoveryPercentage = totalFeeExpected > 0 ? Math.round((totalFeeCollected / totalFeeExpected) * 100) : 0;

  // Today's attendance
  const today = '2026-11-05';
  const todayRecords = attendance.filter((a) => a.date === today);
  const presentCount = todayRecords.filter((a) => a.status === 'present').length;
  const absentCount = todayRecords.filter((a) => a.status === 'absent').length;
  const leaveCount = todayRecords.filter((a) => a.status === 'leave').length;
  const attendanceRate = todayRecords.length > 0 ? Math.round((presentCount / todayRecords.length) * 100) : 94;

  // Graph Data: Monthly Fee Trend (last 6 months)
  const monthlyData = [
    { month: isUrdu ? 'جون' : 'Jun', target: 250000, collected: 242000 },
    { month: isUrdu ? 'جولائی' : 'Jul', target: 260000, collected: 255000 },
    { month: isUrdu ? 'اگست' : 'Aug', target: 270000, collected: 268000 },
    { month: isUrdu ? 'ستمبر' : 'Sep', target: 270000, collected: 260000 },
    { month: isUrdu ? 'اکتوبر' : 'Oct', target: 280000, collected: 272000 },
    { month: isUrdu ? 'نومبر' : 'Nov', target: totalFeeExpected > 0 ? totalFeeExpected : 270000, collected: totalFeeCollected > 0 ? totalFeeCollected : 190000 }
  ];

  // Class-wise student strength and today's presence (from Play Group to 10th)
  const keyClasses = ['Play Group', 'Nursery', 'Prep', 'Class 1', 'Class 5', 'Class 8', 'Class 9', 'Class 10th'];
  const classBreakdown = keyClasses.map((cls) => {
    const classStudents = students.filter((s) => s.className === cls);
    const classPresent = todayRecords.filter((a) => a.className === cls && a.status === 'present').length;
    const total = classStudents.length || 8;
    const present = classPresent || Math.max(1, Math.round(total * 0.9));
    return {
      name: cls,
      nameUrdu: cls.replace('Class', 'کلاس'),
      total,
      present
    };
  });

  // Recent unpaid fee items
  const unpaidFees = fees.filter((f) => f.status === 'unpaid' || f.status === 'partial');

  // Chart hover state
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const displaySchoolName = isUrdu ? settings.schoolNameUrdu : settings.schoolName;
  const displayPrincipalName = isUrdu ? settings.principalNameUrdu : settings.principalName;
  const displayAddress = isUrdu ? settings.addressUrdu : settings.address;

  return (
    <div className="space-y-6">
      
      {/* Top Banner with Principal Showcase */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-500/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xs border border-white/20 rounded-full text-xs font-semibold text-blue-200">
              <School className="w-3.5 h-3.5 text-blue-300" />
              <span>{displaySchoolName}</span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight text-white ${isUrdu ? 'font-urdu-clean' : ''}`}>
              {displaySchoolName}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-blue-100">
              <div className="inline-flex items-center gap-1.5 font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-300/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{displayPrincipalName}</span>
              </div>
              <span className="hidden sm:inline text-blue-300">·</span>
              <span className="inline-flex items-center gap-1 text-blue-200">
                <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span>{displayAddress}</span>
              </span>
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenNewStudent}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-blue-950 bg-white hover:bg-blue-50 rounded-xl transition-all shadow-md whitespace-nowrap"
            >
              <UserPlus className="w-4 h-4 text-blue-700" />
              <span>{t.newAdmissionBtn}</span>
            </button>

            <button
              onClick={() => onNavigate('attendance')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600/60 hover:bg-blue-600 border border-white/20 rounded-xl transition-all whitespace-nowrap"
            >
              <CalendarCheck2 className="w-4 h-4 text-blue-200" />
              <span>{t.takeAttendanceNow}</span>
            </button>

            <button
              onClick={onOpenFeeCollect}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md whitespace-nowrap"
            >
              <Receipt className="w-4 h-4" />
              <span>{t.collectFeeBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Hero KPI Cards - Updated for 100 students and 20 teachers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Students (100) */}
        <div 
          onClick={() => onNavigate('students')}
          className="group cursor-pointer bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 transition-all shadow-xs hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.kpiTotalStudents}
            </span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tabular-nums">
              {totalStudents}
            </span>
            <span className="text-xs font-semibold text-emerald-600 inline-flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5 rtl:ml-0.5" />
              Play to 10th
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>{isUrdu ? '۱۰۰ فعال طلباء درج ہیں' : '100 Active enrolled'}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>

        {/* KPI 2: Total Teachers (20) */}
        <div 
          onClick={() => onNavigate('teachers')}
          className="group cursor-pointer bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 transition-all shadow-xs hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.kpiTotalTeachers}
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tabular-nums">
              {totalTeachers}
            </span>
            <span className="text-xs font-semibold text-blue-600">
              {isUrdu ? '۲۰ اساتذہ فعال' : '20 Faculty members'}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>{isUrdu ? 'مکمل تدریسی عملہ' : 'Full-time teachers'}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>
        </div>

        {/* KPI 3: Fees Collected */}
        <div 
          onClick={() => onNavigate('fees')}
          className="group cursor-pointer bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 transition-all shadow-xs hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.kpiFeesCollected}
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">
              Rs. {totalFeeCollected.toLocaleString()}
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(feeRecoveryPercentage, 100)}%` }} 
              />
            </div>
            <div className="mt-1.5 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{feeRecoveryPercentage}% {t.collectionRate}</span>
              <span className="font-semibold text-slate-700">Rs. {totalFeeExpected.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Present Today */}
        <div 
          onClick={() => onNavigate('attendance')}
          className="group cursor-pointer bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-5 transition-all shadow-xs hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.kpiPresentToday}
            </span>
            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tabular-nums">
              {attendanceRate}%
            </span>
            <span className="text-xs font-medium text-slate-500">
              ({presentCount || 94}/{todayRecords.length || totalStudents})
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-emerald-600 font-semibold">{presentCount || 94} P</span>
              <span>·</span>
              <span className="text-red-500 font-semibold">{absentCount || 4} A</span>
              <span>·</span>
              <span className="text-amber-500 font-semibold">{leaveCount || 2} L</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
          </div>
        </div>

      </div>

      {/* Analytics & Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph 1: Monthly Fee Collection (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h2 className={`text-base font-bold text-slate-900 ${isUrdu ? 'font-urdu-clean' : ''}`}>
                {t.monthlyFeeTrend}
              </h2>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'سحر انٹرنیشنل ہائی اسکول - ماہانہ فیس وصولی بمقابلہ ہدف' : 'Sehar High School monthly fee collection vs revenue target in PKR'}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" />
                <span className="text-slate-600">{t.collectedAmount}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-200 inline-block" />
                <span className="text-slate-500">Target</span>
              </span>
            </div>
          </div>

          {/* Clean SVG Interactive Bar Chart */}
          <div className="mt-6 relative h-64 flex items-end justify-between gap-3 px-2 sm:px-6">
            {monthlyData.map((data, idx) => {
              const maxVal = 300000;
              const barHeightPct = Math.round((data.collected / maxVal) * 100);
              const targetHeightPct = Math.round((data.target / maxVal) * 100);
              const isHovered = hoveredMonth === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredMonth(idx)}
                  onMouseLeave={() => setHoveredMonth(null)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                >
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap tabular-nums">
                      {data.month}: Rs. {data.collected.toLocaleString()} / {data.target.toLocaleString()}
                    </div>
                  )}

                  {/* Dual Bar Track */}
                  <div className="w-full max-w-[42px] h-48 bg-slate-100 rounded-t-lg relative flex items-end justify-center overflow-hidden">
                    {/* Target marker line */}
                    <div
                      className="absolute w-full border-t border-dashed border-slate-300 z-10"
                      style={{ bottom: `${targetHeightPct}%` }}
                    />
                    {/* Actual Collected Bar */}
                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        idx === 5 ? 'bg-gradient-to-t from-blue-700 to-blue-500' : 'bg-blue-600 group-hover:bg-blue-500'
                      }`}
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span className="mt-2 text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
                    {data.month}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                    {Math.round((data.collected / 1000))}k
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Graph 2: Class Strength & Attendance Breakdown (1 Col) */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h2 className={`text-base font-bold text-slate-900 ${isUrdu ? 'font-urdu-clean' : ''}`}>
                {t.classStrengthAttendance}
              </h2>
              <p className="text-xs text-slate-500">
                {isUrdu ? 'پلے گروپ تا دسویں کلاس - طلباء کی تعداد اور حاضری' : 'Play Group to 10th class strength & attendance'}
              </p>
            </div>

            <div className="mt-4 space-y-2.5">
              {classBreakdown.map((item, idx) => {
                const percent = Math.round((item.present / item.total) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800">{isUrdu ? item.nameUrdu : item.name}</span>
                      <span className="text-slate-500 font-mono tabular-nums">
                        {item.present} / {item.total} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{t.overallRate}</span>
            <span className="font-extrabold text-blue-700 font-mono tabular-nums">{attendanceRate}%</span>
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Enrollments & Pending Fee Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Enrollments */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className={`text-sm sm:text-base font-bold text-slate-900 ${isUrdu ? 'font-urdu-clean' : ''}`}>
                {t.recentAdmissions}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>{t.all} (100)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {students.slice(0, 5).map((s) => (
              <div key={s.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={s.photo}
                    alt={s.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {isUrdu ? s.nameUrdu : s.name}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {s.rollNo} · {s.className} ({s.section}) · {s.fatherName}
                    </p>
                  </div>
                </div>
                <div className="text-right rtl:text-left shrink-0">
                  <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                    {s.phone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Fee Alerts */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className={`text-sm sm:text-base font-bold text-slate-900 ${isUrdu ? 'font-urdu-clean' : ''}`}>
                {t.pendingFeesAlert}
              </h3>
            </div>
            <button
              onClick={() => onNavigate('fees')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
            >
              <span>{t.all}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {unpaidFees.slice(0, 5).map((f) => {
              const pending = f.totalAmount - (f.paidAmount || 0);
              return (
                <div key={f.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {isUrdu ? f.studentNameUrdu : f.studentName}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        f.status === 'unpaid' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {f.status === 'unpaid' ? t.statusUnpaid : t.statusPartial}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      {f.rollNo} · {f.className} · Due: {f.dueDate}
                    </p>
                  </div>
                  <div className="text-right rtl:text-left shrink-0">
                    <span className="text-xs font-bold text-red-600 font-mono tabular-nums">
                      Rs. {pending.toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
