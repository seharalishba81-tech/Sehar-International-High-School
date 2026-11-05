import React, { useState, useEffect } from 'react';
import {
  Language,
  UserSession,
  Student,
  Teacher,
  AttendanceRecord,
  FeeRecord,
  ExamResult,
  SchoolSettings
} from './types';
import {
  INITIAL_SCHOOL_SETTINGS,
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_EXAM_RESULTS,
  DEMO_ADMIN,
  DEMO_TEACHER,
  loadStoredData,
  saveStoredData,
  resetAllDemoData
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StudentsView } from './components/StudentsView';
import { TeachersView } from './components/TeachersView';
import { AttendanceView } from './components/AttendanceView';
import { FeesView } from './components/FeesView';
import { ExamsView } from './components/ExamsView';
import { SettingsView } from './components/SettingsView';
import { LoginView } from './components/LoginView';

export default function App() {
  // 1. Language state
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('sms_language') as Language) || 'en';
  });

  // 2. School Settings state (Editable anytime, updates everywhere automatically)
  const [settings, setSettings] = useState<SchoolSettings>(() => {
    return loadStoredData<SchoolSettings>('sms_school_settings', INITIAL_SCHOOL_SETTINGS);
  });

  // 3. User session state
  const [user, setUser] = useState<UserSession>(() => {
    return loadStoredData<UserSession>('sms_active_user', DEMO_ADMIN);
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentTab, setCurrentTab] = useState<ActiveTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick action modal triggers
  const [quickAddStudentModal, setQuickAddStudentModal] = useState(false);
  const [quickCollectFeeModal, setQuickCollectFeeModal] = useState(false);

  // 4. Core Records (100 students and 20 teachers)
  const [students, setStudents] = useState<Student[]>(() => {
    return loadStoredData<Student[]>('sms_students_data', INITIAL_STUDENTS);
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    return loadStoredData<Teacher[]>('sms_teachers_data', INITIAL_TEACHERS);
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    return loadStoredData<AttendanceRecord[]>('sms_attendance_data', INITIAL_ATTENDANCE);
  });

  const [fees, setFees] = useState<FeeRecord[]>(() => {
    return loadStoredData<FeeRecord[]>('sms_fees_data', INITIAL_FEES);
  });

  const [exams, setExams] = useState<ExamResult[]>(() => {
    return loadStoredData<ExamResult[]>('sms_exams_data', INITIAL_EXAM_RESULTS);
  });

  // Sync RTL and document attributes when language changes
  useEffect(() => {
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('sms_language', lang);
  }, [lang]);

  // Persist Settings
  useEffect(() => {
    saveStoredData('sms_school_settings', settings);
  }, [settings]);

  // Persist User
  useEffect(() => {
    saveStoredData('sms_active_user', user);
  }, [user]);

  // Persist Students (100+)
  useEffect(() => {
    saveStoredData('sms_students_data', students);
  }, [students]);

  // Persist Teachers (20)
  useEffect(() => {
    saveStoredData('sms_teachers_data', teachers);
  }, [teachers]);

  // Persist Attendance
  useEffect(() => {
    saveStoredData('sms_attendance_data', attendance);
  }, [attendance]);

  // Persist Fees
  useEffect(() => {
    saveStoredData('sms_fees_data', fees);
  }, [fees]);

  // Persist Exams
  useEffect(() => {
    saveStoredData('sms_exams_data', exams);
  }, [exams]);

  // Language Toggle
  const handleToggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  // Switch Role between Principal and Teacher
  const handleSwitchUser = () => {
    if (user.role === 'admin') {
      setUser(DEMO_TEACHER);
    } else {
      setUser({
        ...DEMO_ADMIN,
        name: settings.principalName,
        nameUrdu: settings.principalNameUrdu
      });
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Login handler
  const handleLogin = (session: UserSession) => {
    if (session.role === 'admin') {
      setUser({
        ...session,
        name: settings.principalName,
        nameUrdu: settings.principalNameUrdu
      });
    } else {
      setUser(session);
    }
    setIsLoggedIn(true);
    setCurrentTab('dashboard');
  };

  // Update Settings handler - updates everywhere automatically
  const handleUpdateSettings = (newSettings: SchoolSettings) => {
    setSettings(newSettings);
    // If admin is active, keep principal name synced
    if (user.role === 'admin') {
      setUser((prev) => ({
        ...prev,
        name: newSettings.principalName,
        nameUrdu: newSettings.principalNameUrdu
      }));
    }
  };

  // Reset Demo Data handler (restores 100 students and 20 teachers)
  const handleResetDemo = () => {
    resetAllDemoData();
    setSettings({ ...INITIAL_SCHOOL_SETTINGS });
    setStudents([...INITIAL_STUDENTS]);
    setTeachers([...INITIAL_TEACHERS]);
    setAttendance([...INITIAL_ATTENDANCE]);
    setFees([...INITIAL_FEES]);
    setExams([...INITIAL_EXAM_RESULTS]);
    setUser({ ...DEMO_ADMIN });
  };

  // Student CRUD (100 students with pagination)
  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
    setQuickAddStudentModal(false);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Teacher CRUD (20 teachers, editable & deletable)
  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachers((prev) => [newTeacher, ...prev]);
  };

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
    );
  };

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== teacherId));
  };

  // Attendance batch save
  const handleSaveAttendanceBatch = (newRecords: AttendanceRecord[]) => {
    setAttendance((prev) => {
      const idsToRemove = new Set(newRecords.map((r) => r.id));
      const remaining = prev.filter((r) => !idsToRemove.has(r.id));
      return [...newRecords, ...remaining];
    });
  };

  // Fee management
  const handleAddNewFee = (newFee: FeeRecord) => {
    setFees((prev) => [newFee, ...prev]);
    setQuickCollectFeeModal(false);
  };

  const handleUpdateFee = (updated: FeeRecord) => {
    setFees((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
  };

  // Exam result
  const handleSaveExamResult = (result: ExamResult) => {
    setExams((prev) => {
      const idx = prev.findIndex((e) => e.id === result.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = result;
        return copy;
      }
      return [result, ...prev];
    });
  };

  // If logged out, render LoginView
  if (!isLoggedIn) {
    return <LoginView lang={lang} onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col ${lang === 'ur' ? 'font-urdu-clean' : ''}`}>
      
      {/* Top Header with Sehar International High School, Faisalabad & Alishaba Sehar */}
      <Header
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
        user={user}
        settings={settings}
        onSwitchUser={handleSwitchUser}
        onLogout={handleLogout}
        onResetDemo={handleResetDemo}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          lang={lang}
          userRole={user.role}
          isOpenMobile={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              students={students}
              teachers={teachers}
              attendance={attendance}
              fees={fees}
              exams={exams}
              lang={lang}
              settings={settings}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenNewStudent={() => {
                setQuickAddStudentModal(true);
                setCurrentTab('students');
              }}
              onOpenFeeCollect={() => {
                setQuickCollectFeeModal(true);
                setCurrentTab('fees');
              }}
            />
          )}

          {currentTab === 'students' && (
            <StudentsView
              students={students}
              lang={lang}
              onAddStudent={handleAddStudent}
              onUpdateStudent={handleUpdateStudent}
              onDeleteStudent={handleDeleteStudent}
              isAddModalOpenInitially={quickAddStudentModal}
            />
          )}

          {currentTab === 'teachers' && (
            <TeachersView
              teachers={teachers}
              lang={lang}
              onAddTeacher={handleAddTeacher}
              onUpdateTeacher={handleUpdateTeacher}
              onDeleteTeacher={handleDeleteTeacher}
            />
          )}

          {currentTab === 'attendance' && (
            <AttendanceView
              students={students}
              attendance={attendance}
              lang={lang}
              onSaveAttendanceBatch={handleSaveAttendanceBatch}
            />
          )}

          {currentTab === 'fees' && (
            <FeesView
              fees={fees}
              students={students}
              lang={lang}
              settings={settings}
              onAddNewFeeRecord={handleAddNewFee}
              onUpdateFeeRecord={handleUpdateFee}
              isCollectModalInitiallyOpen={quickCollectFeeModal}
            />
          )}

          {currentTab === 'exams' && (
            <ExamsView
              exams={exams}
              students={students}
              lang={lang}
              settings={settings}
              onSaveExamResult={handleSaveExamResult}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              lang={lang}
              onToggleLanguage={handleToggleLanguage}
              user={user}
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetAllData={handleResetDemo}
              studentsCount={students.length}
              teachersCount={teachers.length}
              feesCount={fees.length}
              attendanceCount={attendance.length}
              examsCount={exams.length}
            />
          )}
        </main>

      </div>

    </div>
  );
}
