import React, { useState, useMemo } from 'react';
import { Teacher, Language } from '../types';
import { getTranslation } from '../translations';
import { TEACHER_LEAD_IMG, ALL_CLASSES } from '../data/mockData';
import {
  Users2,
  UserPlus,
  Search,
  Trash2,
  Edit,
  X,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Briefcase
} from 'lucide-react';

interface TeachersViewProps {
  teachers: Teacher[];
  lang: Language;
  onAddTeacher: (teacher: Teacher) => void;
  onUpdateTeacher: (teacher: Teacher) => void;
  onDeleteTeacher: (teacherId: string) => void;
}

export const TeachersView: React.FC<TeachersViewProps> = ({
  teachers,
  lang,
  onAddTeacher,
  onUpdateTeacher,
  onDeleteTeacher
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deletingTeacherId, setDeletingTeacherId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Teacher>>({
    name: '',
    nameUrdu: '',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    assignedClass: 'Class 9',
    salary: 80000,
    phone: '0300-1122334',
    email: '',
    qualification: 'M.Sc, B.Ed (PU)',
    joiningDate: '2024-01-15',
    photo: TEACHER_LEAD_IMG,
    status: 'active'
  });

  const subjectsList = [
    { en: 'Mathematics', ur: 'ریاضی' },
    { en: 'Physics & General Science', ur: 'طبیعیات و سائنس' },
    { en: 'Chemistry', ur: 'کیمسٹری' },
    { en: 'Biology & Life Sciences', ur: 'بیالوجی و حیاتیات' },
    { en: 'English Language & Literature', ur: 'انگریزی ادب' },
    { en: 'Urdu & Pak Studies', ur: 'اردو و مطالعہ پاکستان' },
    { en: 'Islamiat & Tarjuma-tul-Quran', ur: 'اسلامیات و ترجمۃ القرآن' },
    { en: 'Computer Science & AI', ur: 'کمپیوٹر سائنس' },
    { en: 'Social Studies & History', ur: 'معاشرتی علوم و تاریخ' },
    { en: 'Head of Pre-School / Montessori', ur: 'ہیڈ آف پری اسکول و مونٹیسوری' },
    { en: 'Nursery Lead Teacher', ur: 'نرسری کلاس ٹیچر' },
    { en: 'Play Group Activity Incharge', ur: 'پلے گروپ انچارج' },
    { en: 'Physical Education & Sports', ur: 'جسمانی تربیت و کھیل' },
    { en: 'Art, Calligraphy & Craft', ur: 'آرٹ و خطاطی' },
    { en: 'Robotics & STEAM Lab', ur: 'روبوٹکس و اسٹیم لیب' },
    { en: 'Senior Academic Coordinator', ur: 'سینئر اکیڈمک کوآرڈینیٹر' }
  ];

  const filteredTeachers = useMemo(() => {
    return teachers.filter((tch) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        tch.name.toLowerCase().includes(q) ||
        tch.nameUrdu.includes(q) ||
        tch.subject.toLowerCase().includes(q) ||
        tch.subjectUrdu.includes(q) ||
        tch.assignedClass.toLowerCase().includes(q) ||
        tch.phone.includes(q)
      );
    });
  }, [teachers, searchQuery]);

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      nameUrdu: '',
      subject: 'Mathematics',
      subjectUrdu: 'ریاضی',
      assignedClass: 'Class 9',
      salary: 75000,
      phone: '0300-1122334',
      email: 'teacher@seharhigh.edu.pk',
      qualification: 'M.Sc, B.Ed',
      joiningDate: new Date().toISOString().split('T')[0],
      photo: TEACHER_LEAD_IMG,
      status: 'active'
    });
    setEditingTeacher(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (tch: Teacher) => {
    setEditingTeacher(tch);
    setFormData({ ...tch });
  };

  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingTeacher) {
      onUpdateTeacher({
        ...editingTeacher,
        ...formData
      } as Teacher);
      setEditingTeacher(null);
    } else {
      const selectedSub = subjectsList.find((s) => s.en === formData.subject);
      const newTeacher: Teacher = {
        id: `tch-${Date.now()}`,
        name: formData.name || 'New Faculty',
        nameUrdu: formData.nameUrdu || formData.name || 'نیا استاد',
        subject: formData.subject || 'Mathematics',
        subjectUrdu: selectedSub ? selectedSub.ur : 'مضمون',
        assignedClass: formData.assignedClass || 'Class 9',
        salary: Number(formData.salary) || 75000,
        phone: formData.phone || '0300-0000000',
        email: formData.email || `faculty${Date.now()}@seharhigh.edu.pk`,
        qualification: formData.qualification || 'Master Degree, B.Ed',
        joiningDate: formData.joiningDate || '2026-11-05',
        photo: formData.photo || TEACHER_LEAD_IMG,
        status: (formData.status as 'active' | 'on_leave') || 'active'
      };
      onAddTeacher(newTeacher);
      setIsAddModalOpen(false);
    }
  };

  const confirmDelete = () => {
    if (deletingTeacherId) {
      onDeleteTeacher(deletingTeacherId);
      setDeletingTeacherId(null);
    }
  };

  // Total payroll computation
  const totalPayroll = teachers.reduce((acc, t) => acc + (t.salary || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
            {t.teachersDirectory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.teachersSubtitle} · {isUrdu ? 'ماہانہ فیکلٹی تنخواہ:' : 'Total Monthly Payroll:'}{' '}
            <span className="font-bold text-slate-800 font-mono tabular-nums">
              Rs. {totalPayroll.toLocaleString()}
            </span>
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.addNewTeacher}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchTeachersPlaceholder}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 ltr:pl-9 rtl:pr-9 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <div className="text-xs text-slate-500 font-mono tabular-nums shrink-0">
          {filteredTeachers.length} {isUrdu ? 'اساتذہ' : 'faculty members'}
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map((tch) => (
          <div
            key={tch.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Top row: Avatar & Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={tch.photo}
                    alt={tch.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className={`font-bold text-sm sm:text-base text-slate-900 ${isUrdu ? 'font-urdu-clean' : ''}`}>
                      {isUrdu ? tch.nameUrdu : tch.name}
                    </h3>
                    <p className="text-xs text-blue-700 font-semibold">
                      {isUrdu ? tch.subjectUrdu : tch.subject}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tch.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {tch.status === 'active' ? t.statusActive : t.statusLeave}
                </span>
              </div>

              {/* Details List */}
              <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{t.assignedClass}:</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {isUrdu ? tch.assignedClass.replace('Class', 'کلاس') : tch.assignedClass}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{t.qualification}:</span>
                  </span>
                  <span className="font-medium text-slate-700 truncate max-w-[160px]">
                    {tch.qualification}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.phone}:</span>
                  </span>
                  <span className="font-mono text-slate-700 tabular-nums">{tch.phone}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.joiningDate}:</span>
                  </span>
                  <span className="font-mono text-slate-700">{tch.joiningDate}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Salary & Actions */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {isUrdu ? 'ماہانہ تنخواہ' : 'Salary'}
                </span>
                <p className="text-sm font-extrabold text-slate-900 font-mono tabular-nums">
                  Rs. {tch.salary.toLocaleString()}
                </p>
              </div>

              {/* Working Edit and Delete buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(tch)}
                  className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title={t.editTeacher}
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeletingTeacherId(tch.id)}
                  className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title={t.deleteTeacher}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: Add / Edit Teacher */}
      {(isAddModalOpen || editingTeacher) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users2 className="w-5 h-5 text-blue-200" />
                <h3 className="font-bold text-base">
                  {editingTeacher ? t.editTeacher : t.addNewTeacher}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingTeacher(null);
                }}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* English Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teacher Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    placeholder="e.g. Sir Asim Khan"
                  />
                </div>

                {/* Urdu Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    استاد کا نام (اردو)
                  </label>
                  <input
                    type="text"
                    value={formData.nameUrdu || ''}
                    onChange={(e) => setFormData({ ...formData, nameUrdu: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-right font-urdu-clean"
                    placeholder="مثلاً سر عاصم خان"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.subject} *
                  </label>
                  <select
                    value={formData.subject || 'Mathematics'}
                    onChange={(e) => {
                      const sub = subjectsList.find((s) => s.en === e.target.value);
                      setFormData({
                        ...formData,
                        subject: e.target.value,
                        subjectUrdu: sub ? sub.ur : 'مضمون'
                      });
                    }}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                  >
                    {subjectsList.map((s) => (
                      <option key={s.en} value={s.en}>
                        {isUrdu ? s.ur : s.en}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Incharge Class */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.assignedClass} *
                  </label>
                  <select
                    value={formData.assignedClass || 'Class 9'}
                    onChange={(e) => setFormData({ ...formData, assignedClass: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                  >
                    {ALL_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {isUrdu ? cls.replace('Class', 'کلاس') : cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monthly Salary */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.salary} *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.salary || ''}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                    placeholder="80000"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.phone} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                    placeholder="0300-1122334"
                  />
                </div>

                {/* Qualification */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.qualification}
                  </label>
                  <input
                    type="text"
                    value={formData.qualification || ''}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    placeholder="e.g. M.Sc Mathematics, B.Ed (PU)"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.status}
                  </label>
                  <select
                    value={formData.status || 'active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'on_leave' })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  >
                    <option value="active">{t.statusActive}</option>
                    <option value="on_leave">{t.statusLeave}</option>
                  </select>
                </div>

                {/* Joining date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.joiningDate}
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate || '2024-01-01'}
                    onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingTeacher(null);
                  }}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingTeacherId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">{t.deleteTeacher}</h4>
            <p className="text-xs text-slate-500 mb-5">{t.confirmDeleteTeacher}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingTeacherId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                {t.cancel}
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl"
              >
                {t.delete}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
