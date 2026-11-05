import React, { useState } from 'react';
import { Language, UserSession, SchoolSettings } from '../types';
import { getTranslation } from '../translations';
import { SCHOOL_EMBLEM } from '../data/mockData';
import {
  Settings,
  RotateCcw,
  Shield,
  School,
  Globe,
  Database,
  CheckCircle2,
  Save,
  MapPin,
  Phone,
  Mail,
  Award,
  DollarSign,
  Calendar
} from 'lucide-react';

interface SettingsViewProps {
  lang: Language;
  onToggleLanguage: () => void;
  user: UserSession;
  settings: SchoolSettings;
  onUpdateSettings: (newSettings: SchoolSettings) => void;
  onResetAllData: () => void;
  studentsCount: number;
  teachersCount: number;
  feesCount: number;
  attendanceCount: number;
  examsCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  onToggleLanguage,
  user,
  settings,
  onUpdateSettings,
  onResetAllData,
  studentsCount,
  teachersCount,
  feesCount,
  attendanceCount,
  examsCount
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  // Local form state for settings
  const [formData, setFormData] = useState<SchoolSettings>({ ...settings });
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3500);
  };

  const handleConfirmReset = () => {
    onResetAllData();
    setResetConfirmOpen(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
          {t.schoolSettingsTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t.schoolSettingsSubtitle}
        </p>
      </div>

      {settingsSavedToast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm rounded-xl p-4 flex items-center gap-3 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">{t.settingsSavedSuccess}</p>
            <p className="text-[11px] text-emerald-700">Updated across Dashboard, Header, Fee Vouchers, and Result Cards.</p>
          </div>
        </div>
      )}

      {successToast && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs sm:text-sm rounded-xl p-3.5 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
          <span className="font-semibold">{t.demoDataResetSuccess}</span>
        </div>
      )}

      {/* Editable School Profile & Parameters Form */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <img
            src={SCHOOL_EMBLEM}
            alt="School Crest"
            className="w-14 h-14 rounded-full border-2 border-blue-300 shadow-2xs"
          />
          <div>
            <h2 className="font-bold text-base sm:text-lg text-slate-900">
              {formData.schoolName}
            </h2>
            <p className="text-xs text-blue-700 font-semibold font-urdu-clean">
              {formData.schoolNameUrdu}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {formData.principalName}
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="mt-6 space-y-5">
          
          {/* Section 1: School Identity */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              1. School Branding & Principal Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* School Name English */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School Name (English) *
                </label>
                <div className="relative">
                  <School className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* School Name Urdu */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  اسکول کا نام (اردو) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolNameUrdu}
                  onChange={(e) => setFormData({ ...formData, schoolNameUrdu: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-right font-urdu-clean font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Principal Name English */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Principal Full Name & Designation *
                </label>
                <div className="relative">
                  <Award className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.principalName}
                    onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Alishaba Sehar - Head of Principal"
                  />
                </div>
              </div>

              {/* Principal Name Urdu */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  پرنسپل کا نام و عہدہ (اردو) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.principalNameUrdu}
                  onChange={(e) => setFormData({ ...formData, principalNameUrdu: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-right font-urdu-clean font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="علیشبہ سحر - ہیڈ آف پرنسپل"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School Official Helpline Phone *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-mono text-slate-900"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Address English */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Campus Address (English) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 ltr:pl-9 rtl:pr-9 font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Address Urdu */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  کیمپس کا پتہ (اردو) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.addressUrdu}
                  onChange={(e) => setFormData({ ...formData, addressUrdu: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-right font-urdu-clean text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Default Fees Structure */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              2. Standard Fee Schedule (PKR)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Default Tuition Fee (ماہانہ ٹیوشن)
                </label>
                <input
                  type="number"
                  required
                  value={formData.tuitionFee}
                  onChange={(e) => setFormData({ ...formData, tuitionFee: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-2 font-mono font-bold text-blue-900"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Default Exam Fee (امتحانی فیس)
                </label>
                <input
                  type="number"
                  required
                  value={formData.examFee}
                  onChange={(e) => setFormData({ ...formData, examFee: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-2 font-mono font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Default Lab Fee (کمپیوٹر/لیب فیس)
                </label>
                <input
                  type="number"
                  required
                  value={formData.labFee}
                  onChange={(e) => setFormData({ ...formData, labFee: Number(e.target.value) })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-2 font-mono font-bold text-slate-900"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Academic Session (تعلیمی سال)
                </label>
                <input
                  type="text"
                  required
                  value={formData.academicSession}
                  onChange={(e) => setFormData({ ...formData, academicSession: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-white border border-slate-300 rounded-lg p-2 font-semibold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveSettingsBtn}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bilingual Language Switcher Panel */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              {isUrdu ? 'نظام کی زبان (اردو / انگریزی)' : 'System Language (Urdu / English)'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isUrdu
              ? 'مکمل اسکول سسٹم کو دائیں سے بائیں (RTL) اردو یا انگریزی میں تبدیل کریں'
              : 'Switch interface, labels, vouchers, and result certificates to Urdu (RTL) or English (LTR).'}
          </p>
        </div>

        <button
          onClick={onToggleLanguage}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shrink-0"
        >
          <Globe className="w-4 h-4 text-blue-600" />
          <span>{isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}</span>
        </button>
      </div>

      {/* Database State and Reset Tool */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              {isUrdu ? 'ڈیمو ڈیٹا بیس ریکارڈز' : 'Live Database Status & Records'}
            </h3>
          </div>

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetDemoData}</span>
          </button>
        </div>

        <p className="text-xs text-slate-500">
          {isUrdu
            ? 'سحر انٹرنیشنل ہائی اسکول فیصل آباد کے ۱۰۰ طلباء اور ۲۰ اساتذہ کے مکمل ریکارڈز آپ کے براؤزر کے لوکل اسٹوریج میں محفوظ ہیں۔'
            : 'Sehar International High School, Faisalabad active database (100 students, 20 faculty members, vouchers & attendance) synced with localStorage.'}
        </p>

        {/* Counts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center text-xs">
          <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-200">
            <span className="text-[10px] text-blue-600 font-bold block uppercase">Enrolled Students</span>
            <span className="font-mono font-black text-blue-950 text-base">{studentsCount}</span>
          </div>
          <div className="p-2.5 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <span className="text-[10px] text-indigo-600 font-bold block uppercase">Faculty Staff</span>
            <span className="font-mono font-black text-indigo-950 text-base">{teachersCount}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Fee Vouchers</span>
            <span className="font-mono font-bold text-slate-800 text-base">{feesCount}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Attendance Log</span>
            <span className="font-mono font-bold text-slate-800 text-base">{attendanceCount}</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-bold block uppercase">Exam DMCs</span>
            <span className="font-mono font-bold text-slate-800 text-base">{examsCount}</span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">{t.resetDemoData}</h4>
            <p className="text-xs text-slate-500 mb-5">
              {isUrdu
                ? 'کیا آپ واقعی تمام ریکارڈز کو ۱۰۰ طلباء اور ۲۰ اساتذہ کے ابتدائی ڈیٹا پر واپس ری سیٹ کرنا چاہتے ہیں؟'
                : 'Restore all student (100 students), faculty (20 teachers), and school parameters to the initial state?'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
              >
                {t.resetDemoData}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
