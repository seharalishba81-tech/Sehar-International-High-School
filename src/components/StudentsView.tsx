import React, { useState, useMemo } from 'react';
import { Student, Language } from '../types';
import { getTranslation } from '../translations';
import { STUDENT_BOY_IMG, STUDENT_GIRL_IMG, SCHOOL_EMBLEM, ALL_CLASSES } from '../data/mockData';
import {
  UserPlus,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  X,
  Phone,
  School,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  lang: Language;
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  isAddModalOpenInitially?: boolean;
}

const ITEMS_PER_PAGE = 10;

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  lang,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  isAddModalOpenInitially = false
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(isAddModalOpenInitially);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Student>>({
    name: '',
    nameUrdu: '',
    fatherName: '',
    fatherNameUrdu: '',
    className: 'Class 9',
    section: 'A',
    rollNo: `SIHS-${Math.floor(100 + Math.random() * 900)}`,
    phone: '0300-1234567',
    gender: 'Male',
    dob: '2010-01-01',
    admissionDate: '2026-11-05',
    address: 'Canal Road, Faisalabad',
    photo: STUDENT_BOY_IMG,
    status: 'active'
  });

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.nameUrdu.includes(q) ||
        s.fatherName.toLowerCase().includes(q) ||
        s.fatherNameUrdu.includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.phone.includes(q);

      const matchesClass = selectedClass === 'all' || s.className === selectedClass;

      return matchesSearch && matchesClass;
    });
  }, [students, searchQuery, selectedClass]);

  // Reset page to 1 if search/filter changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Open add modal
  const handleOpenAdd = () => {
    const nextRoll = `SIHS-${100 + students.length + 1}`;
    setFormData({
      name: '',
      nameUrdu: '',
      fatherName: '',
      fatherNameUrdu: '',
      className: 'Class 9',
      section: 'A',
      rollNo: nextRoll,
      phone: '0300-',
      gender: 'Male',
      dob: '2012-05-15',
      admissionDate: new Date().toISOString().split('T')[0],
      address: 'Madina Town, Faisalabad',
      photo: STUDENT_BOY_IMG,
      status: 'active'
    });
    setEditingStudent(null);
    setIsAddModalOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({ ...student });
  };

  // Submit Add / Edit
  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo) return;

    if (editingStudent) {
      onUpdateStudent({
        ...editingStudent,
        ...formData
      } as Student);
      setEditingStudent(null);
    } else {
      const newStudent: Student = {
        id: `std-${Date.now()}`,
        name: formData.name || 'New Student',
        nameUrdu: formData.nameUrdu || formData.name || 'نیا طالب علم',
        fatherName: formData.fatherName || 'Father Name',
        fatherNameUrdu: formData.fatherNameUrdu || formData.fatherName || 'والد کا نام',
        className: formData.className || 'Class 9',
        section: formData.section || 'A',
        rollNo: formData.rollNo || `SIHS-${Date.now().toString().slice(-3)}`,
        phone: formData.phone || '0300-0000000',
        photo: formData.photo || (formData.gender === 'Female' ? STUDENT_GIRL_IMG : STUDENT_BOY_IMG),
        gender: (formData.gender as 'Male' | 'Female') || 'Male',
        dob: formData.dob || '2010-01-01',
        admissionDate: formData.admissionDate || '2026-11-05',
        address: formData.address || 'Faisalabad, Pakistan',
        status: 'active'
      };
      onAddStudent(newStudent);
      setIsAddModalOpen(false);
    }
  };

  const confirmDelete = () => {
    if (deletingStudentId) {
      onDeleteStudent(deletingStudentId);
      setDeletingStudentId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
            {t.studentsDirectory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.studentsSubtitle} ({students.length} {isUrdu ? 'طلباء درج ہیں' : 'students enrolled across Play Group to 10th'})
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.addNewStudent}</span>
        </button>
      </div>

      {/* Search & Class Filter Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t.searchStudentsPlaceholder}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 ltr:pl-9 rtl:pr-9 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Class Filter Tabs / Select */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="all">{t.filterByClass}</option>
            {ALL_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {isUrdu ? cls.replace('Class', 'کلاس') : cls}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-500 font-mono tabular-nums shrink-0 px-2">
            {filteredStudents.length} {isUrdu ? 'طلباء' : 'results'}
          </span>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">{t.studentName}</th>
                <th className="py-3.5 px-4">{t.rollNo}</th>
                <th className="py-3.5 px-4">{t.fatherName}</th>
                <th className="py-3.5 px-4">{t.class}</th>
                <th className="py-3.5 px-4">{t.phone}</th>
                <th className="py-3.5 px-4 text-center">{t.gender}</th>
                <th className="py-3.5 px-4 text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    {t.noStudentsFound}
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-blue-50/40 transition-colors group">
                    {/* Student Profile Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className={`font-bold text-slate-900 ${isUrdu ? 'font-urdu-clean text-sm' : ''}`}>
                            {isUrdu ? student.nameUrdu : student.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {isUrdu ? student.name : student.nameUrdu}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Roll No */}
                    <td className="py-3 px-4 font-mono font-bold text-blue-700 tabular-nums">
                      {student.rollNo}
                    </td>

                    {/* Father Name */}
                    <td className="py-3 px-4 text-slate-700">
                      <p className="font-semibold">{isUrdu ? student.fatherNameUrdu : student.fatherName}</p>
                      <p className="text-[11px] text-slate-400">{isUrdu ? student.fatherName : student.fatherNameUrdu}</p>
                    </td>

                    {/* Class & Section */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">
                        {isUrdu ? student.className.replace('Class', 'کلاس') : student.className}
                      </span>
                      <span className="text-slate-500 text-xs"> - {student.section}</span>
                    </td>

                    {/* Phone */}
                    <td className="py-3 px-4 font-mono text-slate-600 tabular-nums">
                      {student.phone}
                    </td>

                    {/* Gender */}
                    <td className="py-3 px-4 text-center">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                        student.gender === 'Male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                      }`}>
                        {student.gender === 'Male' ? (isUrdu ? 'طالب علم' : 'Boy') : (isUrdu ? 'طالبہ' : 'Girl')}
                      </span>
                    </td>

                    {/* Action Buttons: View, Edit, Delete */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => setViewingStudent(student)}
                          title={t.viewProfile}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(student)}
                          title={t.editStudent}
                          className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingStudentId(student.id)}
                          title={t.deleteStudent}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION BAR (10 students per page) */}
        {filteredStudents.length > 0 && (
          <div className="px-5 py-3.5 bg-slate-50/90 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <span>
                {isUrdu
                  ? `${t.showingPage} ${startIndex + 1} تا ${Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} ${t.of} ${filteredStudents.length} ${t.studentsText}`
                  : `Showing ${startIndex + 1} to ${Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} of ${filteredStudents.length} students`}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1 font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{t.previousPage}</span>
              </button>

              {/* Page Number Chips */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show current page, first, last, and immediate neighbors
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - currentPage) <= 1
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={pageNum} className="text-slate-400 px-0.5">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>{t.nextPage}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Add or Edit Student */}
      {(isAddModalOpen || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-xl overflow-hidden my-8">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <School className="w-5 h-5 text-blue-200" />
                <h3 className="font-bold text-base sm:text-lg">
                  {editingStudent ? t.editStudent : t.addNewStudent}
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingStudent(null);
                }}
                className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* English Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Muhammad Bilal"
                  />
                </div>

                {/* Urdu Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    طالب علم کا نام (اردو)
                  </label>
                  <input
                    type="text"
                    value={formData.nameUrdu || ''}
                    onChange={(e) => setFormData({ ...formData, nameUrdu: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-right font-urdu-clean"
                    placeholder="مثلاً محمد بلال"
                  />
                </div>

                {/* Father English Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName || ''}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Tariq Mehmood"
                  />
                </div>

                {/* Father Urdu Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    والد کا نام (اردو)
                  </label>
                  <input
                    type="text"
                    value={formData.fatherNameUrdu || ''}
                    onChange={(e) => setFormData({ ...formData, fatherNameUrdu: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-right font-urdu-clean"
                    placeholder="مثلاً طارق محمود"
                  />
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.class} *
                  </label>
                  <select
                    value={formData.className || 'Class 9'}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                  >
                    {ALL_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Section & Roll No */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.section}
                    </label>
                    <select
                      value={formData.section || 'A'}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.rollNo} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.rollNo || ''}
                      onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono"
                    />
                  </div>
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
                    placeholder="0300-1234567"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.gender} *
                  </label>
                  <select
                    value={formData.gender || 'Male'}
                    onChange={(e) => {
                      const g = e.target.value as 'Male' | 'Female';
                      setFormData({
                        ...formData,
                        gender: g,
                        photo: g === 'Female' ? STUDENT_GIRL_IMG : STUDENT_BOY_IMG
                      });
                    }}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
                  >
                    <option value="Male">{isUrdu ? 'طالب علم (مرد)' : 'Male (Boy)'}</option>
                    <option value="Female">{isUrdu ? 'طالبہ (خاتون)' : 'Female (Girl)'}</option>
                  </select>
                </div>

                {/* Date of birth */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.dob}
                  </label>
                  <input
                    type="date"
                    value={formData.dob || '2012-01-01'}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>

                {/* Admission Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.admissionDate}
                  </label>
                  <input
                    type="date"
                    value={formData.admissionDate || '2026-11-05'}
                    onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                    className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              {/* Photo Preset Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Student Avatar Photo
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-slate-200 rounded-xl hover:border-blue-400">
                    <input
                      type="radio"
                      name="avatarChoice"
                      checked={formData.photo === STUDENT_BOY_IMG}
                      onChange={() => setFormData({ ...formData, photo: STUDENT_BOY_IMG })}
                      className="text-blue-600"
                    />
                    <img src={STUDENT_BOY_IMG} alt="Boy" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-xs font-medium text-slate-700">Boy Avatar</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-slate-200 rounded-xl hover:border-blue-400">
                    <input
                      type="radio"
                      name="avatarChoice"
                      checked={formData.photo === STUDENT_GIRL_IMG}
                      onChange={() => setFormData({ ...formData, photo: STUDENT_GIRL_IMG })}
                      className="text-blue-600"
                    />
                    <img src={STUDENT_GIRL_IMG} alt="Girl" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-xs font-medium text-slate-700">Girl Avatar</span>
                  </label>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.address}
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  placeholder="e.g. Madina Town, Faisalabad"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingStudent(null);
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

      {/* MODAL 2: View Dossier / Student ID Card */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            {/* Header with school styling */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-5 text-white text-center relative">
              <button
                onClick={() => setViewingStudent(null)}
                className="absolute top-4 ltr:right-4 rtl:left-4 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={SCHOOL_EMBLEM}
                alt="Emblem"
                className="w-12 h-12 mx-auto rounded-full border-2 border-amber-400 mb-2 shadow-sm"
              />
              <h4 className="font-bold text-sm tracking-wide uppercase">Sehar International High School, Faisalabad</h4>
              <p className="text-[11px] text-blue-200 font-urdu-clean">سحر انٹرنیشنل ہائی اسکول - اسٹوڈنٹ ریکارڈ</p>
            </div>

            {/* Student Photo and Core Details */}
            <div className="p-6 text-center -mt-8">
              <img
                src={viewingStudent.photo}
                alt={viewingStudent.name}
                className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-md"
              />

              <h3 className="mt-3 text-lg font-bold text-slate-900">
                {isUrdu ? viewingStudent.nameUrdu : viewingStudent.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isUrdu ? viewingStudent.name : viewingStudent.nameUrdu}
              </p>

              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-mono font-bold rounded-lg border border-blue-200">
                <span>Roll: {viewingStudent.rollNo}</span>
                <span>·</span>
                <span>{viewingStudent.className} ({viewingStudent.section})</span>
              </div>

              {/* Dossier Information Grid */}
              <div className="mt-6 text-left rtl:text-right space-y-2.5 text-xs border-t border-slate-100 pt-4">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{t.fatherName}:</span>
                  <span className="font-semibold text-slate-800">{isUrdu ? viewingStudent.fatherNameUrdu : viewingStudent.fatherName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{t.phone}:</span>
                  <span className="font-mono font-semibold text-slate-800">{viewingStudent.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{t.gender}:</span>
                  <span className="font-semibold text-slate-800">{viewingStudent.gender}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{t.dob}:</span>
                  <span className="font-mono text-slate-700">{viewingStudent.dob}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">{t.admissionDate}:</span>
                  <span className="font-mono text-slate-700">{viewingStudent.admissionDate}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">{t.address}:</span>
                  <span className="font-medium text-slate-800 truncate max-w-[200px]">{viewingStudent.address}</span>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  onClick={() => setViewingStudent(null)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Delete Confirmation */}
      {deletingStudentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">{t.deleteStudent}</h4>
            <p className="text-xs text-slate-500 mb-5">{t.confirmDeleteStudent}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingStudentId(null)}
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
