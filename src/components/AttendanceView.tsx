import React, { useState, useMemo } from 'react';
import { Student, AttendanceRecord, AttendanceStatus, Language } from '../types';
import { getTranslation } from '../translations';
import { ALL_CLASSES } from '../data/mockData';
import {
  CalendarCheck2,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Filter,
  CheckCheck,
  AlertTriangle
} from 'lucide-react';

interface AttendanceViewProps {
  students: Student[];
  attendance: AttendanceRecord[];
  lang: Language;
  onSaveAttendanceBatch: (records: AttendanceRecord[]) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  attendance,
  lang,
  onSaveAttendanceBatch
}) => {
  const t = getTranslation(lang);
  const isUrdu = lang === 'ur';

  const [selectedDate, setSelectedDate] = useState('2026-11-05');
  const [selectedClass, setSelectedClass] = useState('Class 9');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  // Available classes: Play Group to 10th
  const availableClasses = ALL_CLASSES;

  // Students belonging to selected class
  const classStudents = useMemo(() => {
    return students.filter((s) => s.className === selectedClass);
  }, [students, selectedClass]);

  // Local state of today's attendance map for currently chosen class
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    attendance
      .filter((a) => a.date === selectedDate && a.className === selectedClass)
      .forEach((a) => {
        map[a.studentId] = a.status;
      });
    return map;
  });

  // Whenever class or date changes, initialize map from saved attendance or default to present
  const handleDateOrClassChange = (newDate: string, newClass: string) => {
    setSelectedDate(newDate);
    setSelectedClass(newClass);
    const existing = attendance.filter((a) => a.date === newDate && a.className === newClass);
    const map: Record<string, AttendanceStatus> = {};
    
    // Check if records already exist
    if (existing.length > 0) {
      existing.forEach((a) => {
        map[a.studentId] = a.status;
      });
    } else {
      // Default all to present for convenience
      students
        .filter((s) => s.className === newClass)
        .forEach((s) => {
          map[s.id] = 'present';
        });
    }
    setAttendanceMap(map);
  };

  // Toggle status for one student
  const handleSetStatus = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [studentId]: status
    }));
  };

  // Batch actions
  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    classStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  // Save changes
  const handleSave = () => {
    const newRecords: AttendanceRecord[] = classStudents.map((s) => ({
      id: `att-${selectedDate}-${s.id}`,
      date: selectedDate,
      studentId: s.id,
      studentName: s.name,
      studentNameUrdu: s.nameUrdu,
      rollNo: s.rollNo,
      className: s.className,
      status: attendanceMap[s.id] || 'present',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    onSaveAttendanceBatch(newRecords);
    setSaveSuccessMessage(true);
    setTimeout(() => {
      setSaveSuccessMessage(false);
    }, 3000);
  };

  // Metric counts
  const totalCount = classStudents.length;
  const presentCount = classStudents.filter((s) => (attendanceMap[s.id] || 'present') === 'present').length;
  const absentCount = classStudents.filter((s) => attendanceMap[s.id] === 'absent').length;
  const leaveCount = classStudents.filter((s) => attendanceMap[s.id] === 'leave').length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight ${isUrdu ? 'font-urdu-clean' : ''}`}>
            {t.attendanceManager}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.attendanceSubtitle}
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{t.saveAttendance}</span>
        </button>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{t.attendanceSavedSuccess}</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700">
            {selectedDate} · {selectedClass}
          </span>
        </div>
      )}

      {/* Date & Class Controls Strip + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Selector Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-wrap items-center gap-4">
          {/* Date Picker */}
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.selectDate}
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-400 ltr:left-3 rtl:right-3 pointer-events-none" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateOrClassChange(e.target.value, selectedClass)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 ltr:pl-9 rtl:pr-9 text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Class Picker */}
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {t.selectClass}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => handleDateOrClassChange(selectedDate, e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-slate-800 font-semibold"
            >
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {isUrdu ? cls.replace('Class', 'کلاس') : cls}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Buttons */}
          <div className="w-full flex items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 mr-1 rtl:ml-1">
              {isUrdu ? 'فوری کارروائی:' : 'Quick Actions:'}
            </span>
            <button
              onClick={() => handleMarkAll('present')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              {t.markAllPresent}
            </button>
            <button
              onClick={() => handleMarkAll('absent')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition-colors"
            >
              {t.markAllAbsent}
            </button>
            <button
              onClick={() => handleMarkAll('leave')}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              {t.markAllLeave}
            </button>
          </div>
        </div>

        {/* Metrics Box */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500">{t.totalClassStrength}</span>
            <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">{totalCount}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">{t.present}</span>
              <p className="text-base font-extrabold text-emerald-800 font-mono tabular-nums">{presentCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-red-50/70 border border-red-100">
              <span className="text-[10px] font-bold text-red-700 uppercase">{t.absent}</span>
              <p className="text-base font-extrabold text-red-800 font-mono tabular-nums">{absentCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100">
              <span className="text-[10px] font-bold text-amber-700 uppercase">{t.leave}</span>
              <p className="text-base font-extrabold text-amber-800 font-mono tabular-nums">{leaveCount}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{t.attendanceRate}</span>
            <span className="font-extrabold text-blue-700 font-mono tabular-nums">{attendanceRate}%</span>
          </div>
        </div>

      </div>

      {/* Attendance Sheet Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">{t.rollNo}</th>
                <th className="py-3 px-4">{t.studentName}</th>
                <th className="py-3 px-4">{t.fatherName}</th>
                <th className="py-3 px-4 text-center">{t.status}</th>
                <th className="py-3 px-4 text-center">
                  {isUrdu ? 'حاضری کا انتخاب' : 'Mark Status'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    {isUrdu ? 'اس کلاس میں کوئی طالب علم موجود نہیں۔' : 'No students found enrolled in this class.'}
                  </td>
                </tr>
              ) : (
                classStudents.map((student) => {
                  const currentStatus = attendanceMap[student.id] || 'present';

                  return (
                    <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Roll No */}
                      <td className="py-3 px-4 font-mono font-bold text-blue-700 tabular-nums">
                        {student.rollNo}
                      </td>

                      {/* Name & Photo */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {isUrdu ? student.nameUrdu : student.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {isUrdu ? student.name : student.nameUrdu}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Father Name */}
                      <td className="py-3 px-4 text-slate-600">
                        {isUrdu ? student.fatherNameUrdu : student.fatherName}
                      </td>

                      {/* Current Status Pill */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            currentStatus === 'present'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : currentStatus === 'absent'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {currentStatus === 'present' && <CheckCircle2 className="w-3 h-3" />}
                          {currentStatus === 'absent' && <XCircle className="w-3 h-3" />}
                          {currentStatus === 'leave' && <Clock className="w-3 h-3" />}
                          <span>
                            {currentStatus === 'present'
                              ? t.present
                              : currentStatus === 'absent'
                              ? t.absent
                              : t.leave}
                          </span>
                        </span>
                      </td>

                      {/* Interactive P / A / L Buttons */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                          <button
                            type="button"
                            onClick={() => handleSetStatus(student.id, 'present')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              currentStatus === 'present'
                                ? 'bg-emerald-600 text-white shadow-xs scale-105'
                                : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                            }`}
                          >
                            P
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSetStatus(student.id, 'absent')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              currentStatus === 'absent'
                                ? 'bg-red-600 text-white shadow-xs scale-105'
                                : 'text-slate-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                          >
                            A
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSetStatus(student.id, 'leave')}
                            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                              currentStatus === 'leave'
                                ? 'bg-amber-600 text-white shadow-xs scale-105'
                                : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
                            }`}
                          >
                            L
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
