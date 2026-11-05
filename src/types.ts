export type Language = 'en' | 'ur';

export type UserRole = 'admin' | 'teacher';

export interface UserSession {
  role: UserRole;
  name: string;
  nameUrdu: string;
  email: string;
  avatar: string;
  assignedClass?: string;
}

export interface SchoolSettings {
  schoolName: string;
  schoolNameUrdu: string;
  principalName: string;
  principalNameUrdu: string;
  phone: string;
  email: string;
  address: string;
  addressUrdu: string;
  tuitionFee: number;
  examFee: number;
  labFee: number;
  academicSession: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  nameUrdu: string;
  fatherName: string;
  fatherNameUrdu: string;
  className: string;
  section: string;
  phone: string;
  photo: string;
  gender: 'Male' | 'Female';
  dob: string;
  admissionDate: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface Teacher {
  id: string;
  name: string;
  nameUrdu: string;
  subject: string;
  subjectUrdu: string;
  assignedClass: string;
  salary: number;
  phone: string;
  email: string;
  qualification: string;
  joiningDate: string;
  photo: string;
  status: 'active' | 'on_leave';
}

export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  studentNameUrdu: string;
  rollNo: string;
  className: string;
  status: AttendanceStatus;
  time?: string;
}

export type FeeStatus = 'paid' | 'unpaid' | 'partial';

export interface FeeRecord {
  id: string;
  voucherNo: string;
  studentId: string;
  studentName: string;
  studentNameUrdu: string;
  rollNo: string;
  className: string;
  month: string;
  year: number;
  tuitionFee: number;
  examFee: number;
  labFee: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  status: FeeStatus;
  dueDate: string;
  paidDate?: string;
  paymentMethod?: 'Cash' | 'Bank Transfer' | 'EasyPaisa/JazzCash';
}

export interface SubjectMarks {
  subject: string;
  subjectUrdu: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  remarks: string;
}

export interface ExamResult {
  id: string;
  examName: string;
  examNameUrdu: string;
  term: 'First Term' | 'Mid-Term' | 'Final Term' | 'Monthly Test';
  academicYear: string;
  studentId: string;
  studentName: string;
  studentNameUrdu: string;
  rollNo: string;
  className: string;
  fatherName: string;
  subjects: SubjectMarks[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  position: string;
  status: 'Pass' | 'Fail';
  attendanceRate: number;
  teacherRemarks: string;
  teacherRemarksUrdu: string;
  dateIssued: string;
}
