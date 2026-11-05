import React, { useState, useMemo } from 'react';
import { ExamResult, Student, SubjectMarks, Language, SchoolSettings } from '../types';
import { getTranslation } from '../translations';
import { SCHOOL_EMBLEM, ALL_CLASSES } from '../data/mockData';
import {
  Award,
  FileSpreadsheet,
  Printer,
  Edit,
  Eye,
  CheckCircle2,
  XCircle,
  Plus,
  X,
  Sparkles,
  School,
  TrendingUp,
  Percent
} from 'lucide-react';

interface ExamsViewProps {
  exams: ExamResult[];
  students: Student[];
  lang: Language;
  settings: SchoolSettings;
  onSaveExamResult: (result: ExamResult) => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({
  exams,
  students,
  lang,
  settings,
  onSaveExamResult
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  const [selectedTerm, setSelectedTerm] = useState<'Mid-Term' | 'Final Term' | 'Monthly Test'>('Mid-Term');
  const [selectedClass, setSelectedClass] = useState('Class 9');

  // Modals
  const [editingExamStudent, setEditingExamStudent] = useState<Student | null>(null);
  const [viewingDmc, setViewingDmc] = useState<ExamResult | null>(null);

  // Subject default template
  const defaultSubjects: SubjectMarks[] = [
    { subject: 'English', subjectUrdu: 'انگریزی', totalMarks: 100, obtainedMarks: 85, grade: 'A', remarks: 'Good language skills' },
    { subject: 'Urdu', subjectUrdu: 'اردو', totalMarks: 100, obtainedMarks: 82, grade: 'A', remarks: 'Good calligraphy' },
    { subject: 'Mathematics', subjectUrdu: 'ریاضی', totalMarks: 100, obtainedMarks: 90, grade: 'A+', remarks: 'Strong concepts' },
    { subject: 'General Science', subjectUrdu: 'جنرل سائنس', totalMarks: 100, obtainedMarks: 88, grade: 'A', remarks: 'Good scientific reasoning' },
    { subject: 'Islamiat', subjectUrdu: 'اسلامیات', totalMarks: 50, obtainedMarks: 46, grade: 'A+', remarks: 'Excellent recitation' },
    { subject: 'Pakistan Studies', subjectUrdu: 'مطالعہ پاکستان', totalMarks: 50, obtainedMarks: 44, grade: 'A+', remarks: 'Good understanding' },
    { subject: 'Computer Science', subjectUrdu: 'کمپیوٹر سائنس', totalMarks: 100, obtainedMarks: 89, grade: 'A', remarks: 'Active lab participation' }
  ];

  const [currentMarksList, setCurrentMarksList] = useState<SubjectMarks[]>(defaultSubjects);
  const [teacherRemarksEn, setTeacherRemarksEn] = useState('Disciplined, attentive, and hardworking student.');
  const [teacherRemarksUr, setTeacherRemarksUr] = useState('نہایت ہونہار، بااخلاق اور محنتی طالب علم۔');
  const [examPosition, setExamPosition] = useState('1st in Class');

  // Filter students by selected class
  const classStudents = useMemo(() => {
    return students.filter((s) => s.className === selectedClass);
  }, [students, selectedClass]);

  // Open Marks Entry for a student
  const handleOpenMarksEntry = (student: Student) => {
    setEditingExamStudent(student);
    const existing = exams.find((e) => e.studentId === student.id && e.term === selectedTerm);

    if (existing) {
      setCurrentMarksList([...existing.subjects]);
      setTeacherRemarksEn(existing.teacherRemarks);
      setTeacherRemarksUr(existing.teacherRemarksUrdu);
      setExamPosition(existing.position);
    } else {
      setCurrentMarksList(defaultSubjects.map((s) => ({ ...s, obtainedMarks: 80 })));
      setTeacherRemarksEn('Consistent performance and attentive in class.');
      setTeacherRemarksUr('پڑھائی میں دلچسپی اور اچھا تعلیمی ریکارڈ۔');
      setExamPosition('Merit');
    }
  };

  // Update a single subject marks
  const handleSubjectMarkChange = (index: number, newObtained: number) => {
    const updated = [...currentMarksList];
    const item = { ...updated[index] };
    item.obtainedMarks = Math.min(Math.max(0, newObtained), item.totalMarks);

    const pct = (item.obtainedMarks / item.totalMarks) * 100;
    if (pct >= 90) item.grade = 'A+';
    else if (pct >= 80) item.grade = 'A';
    else if (pct >= 70) item.grade = 'B';
    else if (pct >= 60) item.grade = 'C';
    else if (pct >= 50) item.grade = 'D';
    else item.grade = 'F';

    updated[index] = item;
    setCurrentMarksList(updated);
  };

  // Save Marks and Calculate Results
  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExamStudent) return;

    const totalMax = currentMarksList.reduce((acc, s) => acc + s.totalMarks, 0);
    const totalObtained = currentMarksList.reduce((acc, s) => acc + s.obtainedMarks, 0);
    const percentage = Number(((totalObtained / totalMax) * 100).toFixed(2));

    let overallGrade = 'A+';
    if (percentage >= 90) overallGrade = 'A+';
    else if (percentage >= 80) overallGrade = 'A';
    else if (percentage >= 70) overallGrade = 'B';
    else if (percentage >= 60) overallGrade = 'C';
    else if (percentage >= 50) overallGrade = 'D';
    else overallGrade = 'F';

    const status = percentage >= 40 ? 'Pass' : 'Fail';

    const resultRecord: ExamResult = {
      id: `res-${selectedTerm}-${editingExamStudent.id}`,
      examName: `${selectedTerm} Examination 2026`,
      examNameUrdu: selectedTerm === 'Mid-Term' ? 'وسط مدتی امتحانات ۲۰۲۶' : selectedTerm === 'Final Term' ? 'سالانہ امتحانات ۲۰۲۶' : 'ماہانہ امتحانی جائزہ',
      term: selectedTerm,
      academicYear: '2026-2027',
      studentId: editingExamStudent.id,
      studentName: editingExamStudent.name,
      studentNameUrdu: editingExamStudent.nameUrdu,
      rollNo: editingExamStudent.rollNo,
      className: editingExamStudent.className,
      fatherName: editingExamStudent.fatherName,
      subjects: currentMarksList,
      totalMarks: totalMax,
      obtainedMarks: totalObtained,
      percentage,
      grade: overallGrade,
      position: examPosition,
      status,
      attendanceRate: 95,
      teacherRemarks: teacherRemarksEn,
      teacherRemarksUrdu: teacherRemarksUr,
      dateIssued: '2026-11-05'
    };

    onSaveExamResult(resultRecord);
    setEditingExamStudent(null);
  };

  // Open DMC Modal
  const handleViewDMC = (student: Student) => {
    let result = exams.find((e) => e.studentId === student.id && e.term === selectedTerm);

    if (!result) {
      // Create on the fly from defaults
      const totalMax = defaultSubjects.reduce((acc, s) => acc + s.totalMarks, 0);
      const totalObtained = defaultSubjects.reduce((acc, s) => acc + s.obtainedMarks, 0);
      const percentage = Number(((totalObtained / totalMax) * 100).toFixed(2));

      result = {
        id: `res-${selectedTerm}-${student.id}`,
        examName: `${selectedTerm} Examination 2026`,
        examNameUrdu: selectedTerm === 'Mid-Term' ? 'وسط مدتی امتحانات ۲۰۲۶' : 'سالانہ امتحانات ۲۰۲۶',
        term: selectedTerm,
        academicYear: '2026-2027',
        studentId: student.id,
        studentName: student.name,
        studentNameUrdu: student.nameUrdu,
        rollNo: student.rollNo,
        className: student.className,
        fatherName: student.fatherName,
        subjects: defaultSubjects,
        totalMarks: totalMax,
        obtainedMarks: totalObtained,
        percentage,
        grade: 'A+',
        position: 'Honors',
        status: 'Pass',
        attendanceRate: 96,
        teacherRemarks: 'Excellent academic progress with commendable manners.',
        teacherRemarksUrdu: 'شاندار تعلیمی کارکردگی اور بہترین اخلاق۔',
        dateIssued: '2026-11-05'
      };
    }

    setViewingDmc(result);
  };

  const handlePrintDMC = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
            {t.examsManager}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.examsSubtitle}
          </p>
        </div>

        {/* Term Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
          {(['Mid-Term', 'Final Term', 'Monthly Test'] as const).map((term) => (
            <button
              key={term}
              onClick={() => setSelectedTerm(term)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedTerm === term
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Class Selection & Stats Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
            {t.selectClass}:
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-900 font-semibold"
          >
            {ALL_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {isUrdu ? cls.replace('Class', 'کلاس') : cls}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
          <span>
            {classStudents.length} {isUrdu ? 'امیدواران' : 'candidates enrolled'}
          </span>
          <span>·</span>
          <span className="text-blue-700 font-bold">
            Session: 2026-2027
          </span>
        </div>
      </div>

      {/* Students Exam Roster Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">{t.rollNo}</th>
                <th className="py-3.5 px-4">{t.studentName}</th>
                <th className="py-3.5 px-4">{t.fatherName}</th>
                <th className="py-3.5 px-4 text-center">{t.obtainedMarks}</th>
                <th className="py-3.5 px-4 text-center">{t.percentage}</th>
                <th className="py-3.5 px-4 text-center">{t.grade}</th>
                <th className="py-3.5 px-4 text-center">{t.resultStatus}</th>
                <th className="py-3.5 px-4 text-center">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {classStudents.map((student) => {
                const result = exams.find((e) => e.studentId === student.id && e.term === selectedTerm);

                return (
                  <tr key={student.id} className="hover:bg-blue-50/40 transition-colors">
                    {/* Roll No */}
                    <td className="py-3 px-4 font-mono font-bold text-blue-700 tabular-nums">
                      {student.rollNo}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-slate-900">
                          {isUrdu ? student.nameUrdu : student.name}
                        </span>
                      </div>
                    </td>

                    {/* Father Name */}
                    <td className="py-3 px-4 text-slate-600">
                      {isUrdu ? student.fatherNameUrdu : student.fatherName}
                    </td>

                    {/* Obtained / Total Marks */}
                    <td className="py-3 px-4 text-center font-mono tabular-nums font-semibold text-slate-800">
                      {result ? `${result.obtainedMarks} / ${result.totalMarks}` : '—'}
                    </td>

                    {/* Percentage */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-blue-800 tabular-nums">
                      {result ? `${result.percentage}%` : '—'}
                    </td>

                    {/* Grade */}
                    <td className="py-3 px-4 text-center">
                      {result ? (
                        <span className="font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-mono">
                          {result.grade}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      {result ? (
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            result.status === 'Pass'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {result.status === 'Pass' ? t.pass : t.fail}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Not Entered</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenMarksEntry(student)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>{t.marksEntryBtn}</span>
                        </button>
                        <button
                          onClick={() => handleViewDMC(student)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          <span>{t.generateDMC}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Enter Subject Marks */}
      {editingExamStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto no-print">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden my-6">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base sm:text-lg">
                  {t.enterMarksFor} {isUrdu ? editingExamStudent.nameUrdu : editingExamStudent.name}
                </h3>
                <p className="text-xs text-blue-200">
                  {editingExamStudent.rollNo} · {editingExamStudent.className} · {selectedTerm}
                </p>
              </div>
              <button
                onClick={() => setEditingExamStudent(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMarks} className="p-6 space-y-4">
              <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-2 px-3 text-left">Subject</th>
                      <th className="py-2 px-3 text-center">Max Marks</th>
                      <th className="py-2 px-3 text-center">Marks Obtained *</th>
                      <th className="py-2 px-3 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentMarksList.map((sub, idx) => (
                      <tr key={sub.subject} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-slate-800">
                          {sub.subject} <span className="text-[11px] text-slate-400 font-urdu-clean">({sub.subjectUrdu})</span>
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-slate-500 tabular-nums">
                          {sub.totalMarks}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <input
                            type="number"
                            min="0"
                            max={sub.totalMarks}
                            value={sub.obtainedMarks}
                            onChange={(e) => handleSubjectMarkChange(idx, Number(e.target.value))}
                            className="w-20 text-center font-mono font-bold text-xs bg-slate-50 border border-slate-300 rounded-lg py-1 px-2 focus:ring-2 focus:ring-blue-500"
                          />
                        </td>
                        <td className="py-2 px-3 text-center font-mono font-bold text-blue-700">
                          {sub.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Position and Remarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Class Position / Merit Rank
                  </label>
                  <input
                    type="text"
                    value={examPosition}
                    onChange={(e) => setExamPosition(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-semibold"
                    placeholder="e.g. 1st in Class, 2nd in Class"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teacher Remarks (English)
                  </label>
                  <input
                    type="text"
                    value={teacherRemarksEn}
                    onChange={(e) => setTeacherRemarksEn(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ریمارکس برائے استاد (اردو)
                  </label>
                  <input
                    type="text"
                    value={teacherRemarksUr}
                    onChange={(e) => setTeacherRemarksUr(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-right font-urdu-clean"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingExamStudent(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                >
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2 & PRINTABLE DMC: Detailed Marks Certificate */}
      {viewingDmc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-300 shadow-2xl overflow-hidden my-4">
            
            {/* Action Bar (Hidden when printing) */}
            <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">
                  Official Detailed Marks Certificate (DMC)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintDMC}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printDmcCard}</span>
                </button>
                <button
                  onClick={() => setViewingDmc(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* OFFICIAL RESULT CARD / DMC SHEET */}
            <div className="p-8 bg-white text-slate-900 print-sheet border-4 border-double border-blue-900 m-2 rounded-xl relative">
              
              {/* Official Seal / Watermark Background Accent */}
              <div className="text-center pb-4 border-b-2 border-blue-900 relative">
                <div className="flex items-center justify-between">
                  <img
                    src={SCHOOL_EMBLEM}
                    alt="School Emblem"
                    className="w-20 h-20 rounded-full border-2 border-amber-500 shadow-xs"
                  />
                  <div className="flex-1 px-4">
                    <h1 className="text-xl sm:text-2xl font-black uppercase text-blue-950 tracking-wider">
                      {settings.schoolName}
                    </h1>
                    <h2 className="text-base font-bold text-blue-800 font-urdu-clean">
                      {settings.schoolNameUrdu}
                    </h2>
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {settings.address} | BISE Affiliated Institution
                    </p>
                    <div className="inline-block mt-2 px-4 py-1 bg-blue-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                      {t.officialDmcHeader}
                    </div>
                  </div>
                  {/* Student Photo */}
                  <div className="w-20 h-24 border-2 border-slate-400 p-0.5 rounded bg-slate-50 flex items-center justify-center">
                    <img
                      src={students.find(s => s.id === viewingDmc.studentId)?.photo || SCHOOL_EMBLEM}
                      alt="Student"
                      className="w-full h-full object-cover rounded-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Student Bio Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3 bg-slate-50 border border-slate-300 rounded text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Candidate Name</span>
                  <span className="font-bold text-slate-900 text-sm">{viewingDmc.studentName} ({viewingDmc.studentNameUrdu})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Father's Name</span>
                  <span className="font-semibold text-slate-900">{viewingDmc.fatherName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Roll Number</span>
                  <span className="font-mono font-bold text-blue-900 text-sm">{viewingDmc.rollNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Class & Session</span>
                  <span className="font-bold text-slate-900">{viewingDmc.className} · 2026-27</span>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <table className="w-full text-xs border border-slate-300 mb-4">
                <thead>
                  <tr className="bg-blue-950 text-white text-[11px] font-bold">
                    <th className="py-2 px-3 text-left">Subject / مضمون</th>
                    <th className="py-2 px-3 text-center">Maximum Marks</th>
                    <th className="py-2 px-3 text-center">Marks Obtained</th>
                    <th className="py-2 px-3 text-center">Percentage</th>
                    <th className="py-2 px-3 text-center">Grade</th>
                    <th className="py-2 px-3 text-left">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {viewingDmc.subjects.map((sub) => {
                    const pct = ((sub.obtainedMarks / sub.totalMarks) * 100).toFixed(0);
                    return (
                      <tr key={sub.subject} className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-semibold text-slate-800">
                          {sub.subject} <span className="text-[10px] text-slate-500 font-urdu-clean">({sub.subjectUrdu})</span>
                        </td>
                        <td className="py-1.5 px-3 text-center font-mono">{sub.totalMarks}</td>
                        <td className="py-1.5 px-3 text-center font-mono font-bold text-slate-900">{sub.obtainedMarks}</td>
                        <td className="py-1.5 px-3 text-center font-mono text-slate-600">{pct}%</td>
                        <td className="py-1.5 px-3 text-center font-mono font-bold text-blue-800">{sub.grade}</td>
                        <td className="py-1.5 px-3 text-slate-600 text-[11px]">{sub.remarks}</td>
                      </tr>
                    );
                  })}
                  {/* Grand Total Row */}
                  <tr className="bg-blue-50 font-bold border-t-2 border-slate-400 text-xs text-slate-950">
                    <td className="py-2 px-3 uppercase">Grand Total (مجموعی نتیجہ)</td>
                    <td className="py-2 px-3 text-center font-mono">{viewingDmc.totalMarks}</td>
                    <td className="py-2 px-3 text-center font-mono text-blue-900 text-sm font-extrabold">{viewingDmc.obtainedMarks}</td>
                    <td className="py-2 px-3 text-center font-mono font-extrabold text-blue-900">{viewingDmc.percentage}%</td>
                    <td className="py-2 px-3 text-center font-mono font-black text-amber-600 text-sm">{viewingDmc.grade}</td>
                    <td className="py-2 px-3 text-emerald-800 font-bold">{viewingDmc.status === 'Pass' ? 'PASSED' : 'NEEDS IMPROVEMENT'}</td>
                  </tr>
                </tbody>
              </table>

              {/* Assessment Summary Strip */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-300 rounded text-xs mb-4">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">{t.position}</span>
                  <span className="font-extrabold text-amber-700 text-sm">{viewingDmc.position}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Attendance Record</span>
                  <span className="font-bold text-slate-800 font-mono">{viewingDmc.attendanceRate}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">{t.promotedTo}</span>
                  <span className="font-bold text-blue-900">Next Grade Recommended</span>
                </div>
              </div>

              {/* Remarks Box */}
              <div className="p-3 bg-amber-50/50 border border-amber-200 rounded text-xs mb-8">
                <span className="font-bold text-amber-900 block text-[11px] mb-1">
                  Class Teacher & Headmaster Remarks / تاثرات:
                </span>
                <p className="text-slate-800 italic">"{viewingDmc.teacherRemarks}"</p>
                <p className="text-slate-800 font-urdu-clean text-right mt-1">"{viewingDmc.teacherRemarksUrdu}"</p>
              </div>

              {/* Official Signatures Row */}
              <div className="pt-8 flex items-end justify-between text-xs text-slate-700">
                <div className="border-t border-slate-500 w-40 text-center pt-1 font-semibold">
                  Class Teacher
                </div>

                <div className="border-t border-slate-500 w-40 text-center pt-1 font-semibold">
                  {t.controllerExams}
                </div>

                <div className="border-t-2 border-blue-900 w-48 text-center pt-1">
                  <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-blue-900/40 mb-1 flex items-center justify-center text-[9px] text-blue-900 font-bold uppercase rotate-12">
                    Official Seal
                  </div>
                  <span className="font-bold text-blue-950 block">{settings.principalName}</span>
                  <span className="text-[10px] text-slate-500 block">{t.principalSign}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
