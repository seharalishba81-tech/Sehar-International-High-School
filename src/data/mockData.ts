import { Student, Teacher, AttendanceRecord, FeeRecord, ExamResult, UserSession, SchoolSettings } from '../types';

export const SCHOOL_EMBLEM = '/src/assets/images/school_emblem_logo_1793886335664.jpg';
export const STUDENT_BOY_IMG = '/src/assets/images/student_avatar_boy_1793886336271.jpg';
export const STUDENT_GIRL_IMG = '/src/assets/images/student_avatar_girl_1793886335972.jpg';
export const TEACHER_LEAD_IMG = '/src/assets/images/teacher_avatar_lead_1793886336800.jpg';

export const INITIAL_SCHOOL_SETTINGS: SchoolSettings = {
  schoolName: 'Sehar International High School, Faisalabad',
  schoolNameUrdu: 'سحر انٹرنیشنل ہائی اسکول، فیصل آباد',
  principalName: 'Alishaba Sehar - Head of Principal',
  principalNameUrdu: 'علیشبہ سحر - ہیڈ آف پرنسپل',
  phone: '+92 41 8765432',
  email: 'info@seharhigh.edu.pk',
  address: 'Main Canal Road, near Jaranwala Road, Faisalabad, Pakistan',
  addressUrdu: 'کینال روڈ، بالمقابل جڑانوالہ روڈ، فیصل آباد، پاکستان',
  tuitionFee: 6500,
  examFee: 1500,
  labFee: 1000,
  academicSession: '2026-2027'
};

export const DEMO_ADMIN: UserSession = {
  role: 'admin',
  name: 'Alishaba Sehar - Head of Principal',
  nameUrdu: 'علیشبہ سحر - ہیڈ آف پرنسپل',
  email: 'principal@seharhigh.edu.pk',
  avatar: TEACHER_LEAD_IMG
};

export const DEMO_TEACHER: UserSession = {
  role: 'teacher',
  name: 'Mrs. Tahira Yasmin',
  nameUrdu: 'محترمہ طاہرہ یاسمین',
  email: 'tahira.yasmin@seharhigh.edu.pk',
  avatar: TEACHER_LEAD_IMG,
  assignedClass: 'Class 9'
};

// 13 Classes from Play Group to 10th
export const ALL_CLASSES = [
  'Play Group',
  'Nursery',
  'Prep',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10th'
];

// Helper to create 100 realistic Pakistani students
const BOY_NAMES = [
  { en: 'Muhammad Ali', ur: 'محمد علی' },
  { en: 'Hamza Khan', ur: 'حمزہ خان' },
  { en: 'Zain Ahmed', ur: 'زین احمد' },
  { en: 'Bilal Tariq', ur: 'بلال طارق' },
  { en: 'Usman Ghani', ur: 'عثمان غنی' },
  { en: 'Abdullah Shah', ur: 'عبداللہ شاہ' },
  { en: 'Saad Rafique', ur: 'سعد رفیق' },
  { en: 'Haris Rauf', ur: 'حارث رؤف' },
  { en: 'Danial Zafar', ur: 'دانیال ظفر' },
  { en: 'Hassan Ali', ur: 'حسن علی' },
  { en: 'Hussain Raza', ur: 'حسین رضا' },
  { en: 'Mustafa Kamal', ur: 'مصطفیٰ کمال' },
  { en: 'Umar Farooq', ur: 'عمر فاروق' },
  { en: 'Talha Anjum', ur: 'طلحہ انجم' },
  { en: 'Arham Javed', ur: 'ارہم جاوید' },
  { en: 'Rayan Asif', ur: 'ریان آصف' },
  { en: 'Rohaan Malik', ur: 'روہان ملک' },
  { en: 'Subhan Ali', ur: 'سبحان علی' },
  { en: 'Shahzain Khan', ur: 'شاہ زین خان' },
  { en: 'Zohan Raza', ur: 'زوہان رضا' },
  { en: 'Shayan Ahmed', ur: 'شایان احمد' },
  { en: 'Ahsan Qureshi', ur: 'احسن قریشی' },
  { en: 'Faizan Sheikh', ur: 'فیضان شیخ' },
  { en: 'Haider Sultan', ur: 'حیدر سلطان' },
  { en: 'Ibrahim Khalil', ur: 'ابراہیم خلیل' },
  { en: 'Waleed Akram', ur: 'ولید اکرم' },
  { en: 'Ayan Zubair', ur: 'ایان زبیر' },
  { en: 'Musa Kazim', ur: 'موسیٰ کاظم' },
  { en: 'Yahya Khan', ur: 'یحیٰی خان' },
  { en: 'Azan Mehmood', ur: 'اذان محمود' }
];

const GIRL_NAMES = [
  { en: 'Fatima Zahra', ur: 'فاطمہ زہرا' },
  { en: 'Ayesha Noor', ur: 'عائشہ نور' },
  { en: 'Mariam Bibi', ur: 'مریم بی بی' },
  { en: 'Zoya Rehan', ur: 'زویا ریحان' },
  { en: 'Khadija Tul Kubra', ur: 'خدیجہ الکبریٰ' },
  { en: 'Hania Amir', ur: 'ہانیہ عامر' },
  { en: 'Maham Tariq', ur: 'ماہم طارق' },
  { en: 'Anaya Imran', ur: 'عنایہ عمران' },
  { en: 'Dua Zahra', ur: 'دعا زہرا' },
  { en: 'Laiba Khan', ur: 'لائبہ خان' },
  { en: 'Zunaira Tariq', ur: 'زنیرہ طارق' },
  { en: 'Kinza Hashmi', ur: 'کنزہ ہاشمی' },
  { en: 'Minahil Aslam', ur: 'مناہل اسلم' },
  { en: 'Alishba Naveed', ur: 'علیشبہ نوید' },
  { en: 'Bareera Noor', ur: 'بریرہ نور' },
  { en: 'Hoorain Fatima', ur: 'حورین فاطمہ' },
  { en: 'Eshal Imran', ur: 'ایشال عمران' },
  { en: 'Ayat Fatima', ur: 'آیت فاطمہ' },
  { en: 'Syeda Meerab', ur: 'سیدہ میرب' },
  { en: 'Areeba Munir', ur: 'اریبہ منیر' },
  { en: 'Nimra Farooq', ur: 'نمرہ فاروق' },
  { en: 'Sajal Ali', ur: 'سجل علی' },
  { en: 'Haleema Sadia', ur: 'حلیمہ سعدیہ' },
  { en: 'Rida Zehra', ur: 'ردا زہرا' },
  { en: 'Manahil Fatima', ur: 'مناہل فاطمہ' },
  { en: 'Wajiha Noor', ur: 'وجیہہ نور' },
  { en: 'Jannat Shahbaz', ur: 'جنت شہباز' },
  { en: 'Momina Bilal', ur: 'مومنہ بلال' },
  { en: 'Inaya Rehman', ur: 'عنایہ رحمان' },
  { en: 'Amna Batool', ur: 'آمنہ بتول' }
];

const FATHER_NAMES = [
  { en: 'Tariq Mehmood', ur: 'طارق محمود' },
  { en: 'Syed Imran Shah', ur: 'سید عمران شاہ' },
  { en: 'Naveed Akhtar Khan', ur: 'نوید اختر خان' },
  { en: 'Dr. Abdul Qadir', ur: 'ڈاکٹر عبد القادر' },
  { en: 'Ahmed Bilal', ur: 'احمد بلال' },
  { en: 'Rashid Minhas', ur: 'راشد منہاس' },
  { en: 'Tariq Jamil', ur: 'طارق جمیل' },
  { en: 'Rehan Afzal', ur: 'ریحان افضل' },
  { en: 'Muhammad Aslam', ur: 'محمد اسلم' },
  { en: 'Chaudhry Arshad', ur: 'چوہدری ارشد' },
  { en: 'Mian Khalid Munir', ur: 'میاں خالد منیر' },
  { en: 'Shahbaz Sharif', ur: 'شہباز شریف' },
  { en: 'Javed Iqbal', ur: 'جاوید اقبال' },
  { en: 'Nadeem Sarwar', ur: 'ندیم سرور' },
  { en: 'Zulfiqar Ali', ur: 'ذوالفقار علی' },
  { en: 'Malik Farooq', ur: 'ملک فاروق' },
  { en: 'Rana Tahir', ur: 'رانا طاہر' },
  { en: 'Sajid Mehmood', ur: 'ساجد محمود' },
  { en: 'Dr. Faisal Hayat', ur: 'ڈاکٹر فیصل حیات' },
  { en: 'Babar Azam', ur: 'بابر اعظم' }
];

const FAISALABAD_AREAS = [
  'Madina Town, Faisalabad',
  'Peoples Colony No. 1, Faisalabad',
  'Peoples Colony No. 2, Faisalabad',
  'Canal Road, Eden Valley, Faisalabad',
  'Susan Road, Madina Town, Faisalabad',
  'Kohinoor City, Jaranwala Road, Faisalabad',
  'D Ground, Faisalabad',
  'Gulberg Colony, Faisalabad',
  'Samanabad, Faisalabad',
  'Ghulam Muhammad Abad, Faisalabad',
  'Batala Colony, Faisalabad',
  'Officer Colony, East Canal Road, Faisalabad'
];

function generate100Students(): Student[] {
  const students: Student[] = [];

  for (let i = 1; i <= 100; i++) {
    const isGirl = i % 2 === 0;
    const nameObj = isGirl ? GIRL_NAMES[(i / 2) % GIRL_NAMES.length] : BOY_NAMES[Math.floor(i / 2) % BOY_NAMES.length];
    const fatherObj = FATHER_NAMES[i % FATHER_NAMES.length];
    const classIdx = (i - 1) % ALL_CLASSES.length;
    const className = ALL_CLASSES[classIdx];
    const section = i % 3 === 0 ? 'C' : i % 2 === 0 ? 'B' : 'A';
    const rollNo = `SIHS-${100 + i}`;
    const phonePrefixes = ['0300', '0321', '0333', '0345', '0312', '0308', '0302'];
    const prefix = phonePrefixes[i % phonePrefixes.length];
    const phoneNum = `${prefix}-${String(1000000 + (i * 73931) % 8999999).slice(0, 7)}`;
    const address = FAISALABAD_AREAS[i % FAISALABAD_AREAS.length];
    
    // Age based on class
    const birthYear = 2026 - (3 + classIdx);
    const dob = `${birthYear}-0${(i % 9) + 1}-15`;

    students.push({
      id: `std-${100 + i}`,
      rollNo,
      name: nameObj.en,
      nameUrdu: nameObj.ur,
      fatherName: fatherObj.en,
      fatherNameUrdu: fatherObj.ur,
      className,
      section,
      phone: phoneNum,
      photo: isGirl ? STUDENT_GIRL_IMG : STUDENT_BOY_IMG,
      gender: isGirl ? 'Female' : 'Male',
      dob,
      admissionDate: '2024-03-15',
      address,
      status: 'active'
    });
  }

  return students;
}

export const INITIAL_STUDENTS: Student[] = generate100Students();

// 20 Realistic Teachers for Sehar International High School, Faisalabad
export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'tch-01',
    name: 'Mrs. Tahira Yasmin',
    nameUrdu: 'محترمہ طاہرہ یاسمین',
    subject: 'Mathematics',
    subjectUrdu: 'ریاضی',
    assignedClass: 'Class 9',
    salary: 85000,
    phone: '0300-1122334',
    email: 'tahira.yasmin@seharhigh.edu.pk',
    qualification: 'M.Sc Mathematics, B.Ed (PU)',
    joiningDate: '2018-08-15',
    photo: TEACHER_LEAD_IMG,
    status: 'active'
  },
  {
    id: 'tch-02',
    name: 'Sir Farhan Abbasi',
    nameUrdu: 'سر فرحان عباسی',
    subject: 'Physics & General Science',
    subjectUrdu: 'طبیعیات و سائنس',
    assignedClass: 'Class 10th',
    salary: 92000,
    phone: '0315-9988776',
    email: 'farhan.abbasi@seharhigh.edu.pk',
    qualification: 'M.Phil Physics (GCUF Faisalabad)',
    joiningDate: '2019-01-10',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    status: 'active'
  },
  {
    id: 'tch-03',
    name: 'Qari Muhammad Zubair',
    nameUrdu: 'قاری محمد زبیر',
    subject: 'Islamiat & Tarjuma-tul-Quran',
    subjectUrdu: 'اسلامیات و ترجمۃ القرآن',
    assignedClass: 'Class 8',
    salary: 68000,
    phone: '0334-5566778',
    email: 'zubair.islamic@seharhigh.edu.pk',
    qualification: 'M.A Islamic Studies, Wifaq-ul-Madaris',
    joiningDate: '2020-03-01',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'active'
  },
  {
    id: 'tch-04',
    name: 'Ms. Sadia Munir',
    nameUrdu: 'مس سعدیہ منیر',
    subject: 'English Language & Literature',
    subjectUrdu: 'انگریزی ادب',
    assignedClass: 'Class 7',
    salary: 75000,
    phone: '0322-4455667',
    email: 'sadia.munir@seharhigh.edu.pk',
    qualification: 'M.A English Literature (GCUF)',
    joiningDate: '2021-09-01',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    status: 'active'
  },
  {
    id: 'tch-05',
    name: 'Engr. Kamran Raza',
    nameUrdu: 'انجینئر کامران رضا',
    subject: 'Computer Science & AI',
    subjectUrdu: 'کمپیوٹر سائنس',
    assignedClass: 'Class 9',
    salary: 88000,
    phone: '0302-3344556',
    email: 'kamran.cs@seharhigh.edu.pk',
    qualification: 'BS Computer Science (FAST-NUCES)',
    joiningDate: '2022-02-15',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'active'
  },
  {
    id: 'tch-06',
    name: 'Madam Nighat Parveen',
    nameUrdu: 'میڈم نگہت پروین',
    subject: 'Urdu & Pak Studies',
    subjectUrdu: 'اردو و مطالعہ پاکستان',
    assignedClass: 'Class 6',
    salary: 72000,
    phone: '0344-7788991',
    email: 'nighat.urdu@seharhigh.edu.pk',
    qualification: 'M.A Urdu, B.Ed',
    joiningDate: '2017-04-10',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    status: 'active'
  },
  {
    id: 'tch-07',
    name: 'Dr. Tariq Jamil Butt',
    nameUrdu: 'ڈاکٹر طارق جمیل بٹ',
    subject: 'Chemistry',
    subjectUrdu: 'کیمسٹری',
    assignedClass: 'Class 10th',
    salary: 95000,
    phone: '0301-7766554',
    email: 'tariq.chem@seharhigh.edu.pk',
    qualification: 'Ph.D Chemistry (UAF Faisalabad)',
    joiningDate: '2019-06-01',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'active'
  },
  {
    id: 'tch-08',
    name: 'Ms. Ayesha Siddiqa',
    nameUrdu: 'مس عائشہ صدیقہ',
    subject: 'Biology & Life Sciences',
    subjectUrdu: 'بیالوجی و حیاتیات',
    assignedClass: 'Class 9',
    salary: 80000,
    phone: '0321-8899001',
    email: 'ayesha.bio@seharhigh.edu.pk',
    qualification: 'M.Phil Botany (UAF)',
    joiningDate: '2020-10-15',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    status: 'active'
  },
  {
    id: 'tch-09',
    name: 'Sir Naveed Aslam',
    nameUrdu: 'سر نوید اسلم',
    subject: 'Social Studies & History',
    subjectUrdu: 'معاشرتی علوم و تاریخ',
    assignedClass: 'Class 5',
    salary: 65000,
    phone: '0333-6655443',
    email: 'naveed.sst@seharhigh.edu.pk',
    qualification: 'M.A History, B.Ed',
    joiningDate: '2021-03-01',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
    status: 'active'
  },
  {
    id: 'tch-10',
    name: 'Madam Bushra Shaheen',
    nameUrdu: 'میڈم بشریٰ شاہین',
    subject: 'Head of Pre-School / Montessori',
    subjectUrdu: 'ہیڈ آف پری اسکول و مونٹیسوری',
    assignedClass: 'Prep',
    salary: 82000,
    phone: '0345-4433221',
    email: 'bushra.prep@seharhigh.edu.pk',
    qualification: 'International Montessori Diploma (AMI)',
    joiningDate: '2018-02-10',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150',
    status: 'active'
  },
  {
    id: 'tch-11',
    name: 'Ms. Hira Tabassum',
    nameUrdu: 'مس حرا تبسم',
    subject: 'Nursery Lead Teacher',
    subjectUrdu: 'نرسری کلاس ٹیچر',
    assignedClass: 'Nursery',
    salary: 62000,
    phone: '0308-9988771',
    email: 'hira.nursery@seharhigh.edu.pk',
    qualification: 'BS Early Childhood Education',
    joiningDate: '2022-04-01',
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=150',
    status: 'active'
  },
  {
    id: 'tch-12',
    name: 'Ms. Samina Kausar',
    nameUrdu: 'مس ثمینہ کوثر',
    subject: 'Play Group Activity Incharge',
    subjectUrdu: 'پلے گروپ انچارج',
    assignedClass: 'Play Group',
    salary: 60000,
    phone: '0312-5544332',
    email: 'samina.play@seharhigh.edu.pk',
    qualification: 'B.A, Child Psychology Diploma',
    joiningDate: '2023-01-15',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150',
    status: 'active'
  },
  {
    id: 'tch-13',
    name: 'Sir Bilal Arshad',
    nameUrdu: 'سر بلال ارشد',
    subject: 'Physical Education & Sports',
    subjectUrdu: 'جسمانی تربیت و کھیل',
    assignedClass: 'Class 8',
    salary: 64000,
    phone: '0304-1122998',
    email: 'bilal.sports@seharhigh.edu.pk',
    qualification: 'BS Sports Sciences (PU)',
    joiningDate: '2021-08-01',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    status: 'active'
  },
  {
    id: 'tch-14',
    name: 'Ms. Rabia Zafar',
    nameUrdu: 'مس رابعہ ظفر',
    subject: 'Art, Calligraphy & Craft',
    subjectUrdu: 'آرٹ و خطاطی',
    assignedClass: 'Class 4',
    salary: 60000,
    phone: '0332-8877665',
    email: 'rabia.art@seharhigh.edu.pk',
    qualification: 'BFA Fine Arts (NCA)',
    joiningDate: '2022-09-01',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    status: 'active'
  },
  {
    id: 'tch-15',
    name: 'Sir Asif Mehmood',
    nameUrdu: 'سر آصف محمود',
    subject: 'Primary Mathematics',
    subjectUrdu: 'پرائمری ریاضی',
    assignedClass: 'Class 3',
    salary: 65000,
    phone: '0307-5544112',
    email: 'asif.math@seharhigh.edu.pk',
    qualification: 'M.Sc Mathematics, B.Ed',
    joiningDate: '2020-02-15',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    status: 'active'
  },
  {
    id: 'tch-16',
    name: 'Ms. Fariha Naz',
    nameUrdu: 'مس فریحہ ناز',
    subject: 'General Science & Environment',
    subjectUrdu: 'جنرل سائنس',
    assignedClass: 'Class 2',
    salary: 62000,
    phone: '0314-2233445',
    email: 'fariha.sci@seharhigh.edu.pk',
    qualification: 'BS Environmental Sciences',
    joiningDate: '2022-03-10',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    status: 'active'
  },
  {
    id: 'tch-17',
    name: 'Sir Zeeshan Haider',
    nameUrdu: 'سر ذیشان حیدر',
    subject: 'English Grammar & Spoken',
    subjectUrdu: 'انگریزی گرامر و بول چال',
    assignedClass: 'Class 1',
    salary: 66000,
    phone: '0323-9988112',
    email: 'zeeshan.eng@seharhigh.edu.pk',
    qualification: 'M.A English, IELTS Certified',
    joiningDate: '2021-11-01',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'active'
  },
  {
    id: 'tch-18',
    name: 'Qaria Fatima Batool',
    nameUrdu: 'قاریہ فاطمہ بتول',
    subject: 'Nazra Quran & Tajweed',
    subjectUrdu: 'ناظرہ قرآن و تجوید',
    assignedClass: 'Class 4',
    salary: 58000,
    phone: '0341-7788992',
    email: 'fatima.tajweed@seharhigh.edu.pk',
    qualification: 'Shahadat-ul-Almiya, Qaria Certified',
    joiningDate: '2023-04-12',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    status: 'active'
  },
  {
    id: 'tch-19',
    name: 'Sir Usman Khalid',
    nameUrdu: 'سر عثمان خالد',
    subject: 'Robotics & STEAM Lab',
    subjectUrdu: 'روبوٹکس و اسٹیم لیب',
    assignedClass: 'Class 7',
    salary: 85000,
    phone: '0300-9911223',
    email: 'usman.steam@seharhigh.edu.pk',
    qualification: 'B.Sc Electrical Engineering (UET)',
    joiningDate: '2023-08-01',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'active'
  },
  {
    id: 'tch-20',
    name: 'Madam Shabana Riaz',
    nameUrdu: 'میڈم شبانہ ریاض',
    subject: 'Senior Academic Coordinator',
    subjectUrdu: 'سینئر اکیڈمک کوآرڈینیٹر',
    assignedClass: 'Class 10th',
    salary: 90000,
    phone: '0311-4455667',
    email: 'shabana.coord@seharhigh.edu.pk',
    qualification: 'M.Ed, M.Phil Education Planning',
    joiningDate: '2016-09-01',
    photo: TEACHER_LEAD_IMG,
    status: 'active'
  }
];

// Attendance seeded for today
export const INITIAL_ATTENDANCE: AttendanceRecord[] = INITIAL_STUDENTS.slice(0, 50).map((s, idx) => ({
  id: `att-2026-11-05-${s.id}`,
  date: '2026-11-05',
  studentId: s.id,
  studentName: s.name,
  studentNameUrdu: s.nameUrdu,
  rollNo: s.rollNo,
  className: s.className,
  status: idx % 11 === 0 ? 'absent' : idx % 17 === 0 ? 'leave' : 'present',
  time: '07:55 AM'
}));

// Fee records seeded for November 2026
export const INITIAL_FEES: FeeRecord[] = INITIAL_STUDENTS.slice(0, 30).map((s, idx) => {
  const isPaid = idx % 3 === 0;
  const isPartial = idx % 5 === 0 && !isPaid;
  const total = 9000;
  const paid = isPaid ? total : isPartial ? 5000 : 0;
  const status = isPaid ? 'paid' : isPartial ? 'partial' : 'unpaid';

  return {
    id: `fee-${s.id}`,
    voucherNo: `VCH-2026-${1000 + idx}`,
    studentId: s.id,
    studentName: s.name,
    studentNameUrdu: s.nameUrdu,
    rollNo: s.rollNo,
    className: s.className,
    month: 'November',
    year: 2026,
    tuitionFee: 6500,
    examFee: 1500,
    labFee: 1000,
    discount: idx % 7 === 0 ? 500 : 0,
    totalAmount: idx % 7 === 0 ? 8500 : total,
    paidAmount: paid,
    status: status as any,
    dueDate: '2026-11-10',
    paidDate: isPaid || isPartial ? '2026-11-03' : undefined,
    paymentMethod: isPaid ? 'Bank Transfer' : isPartial ? 'Cash' : undefined
  };
});

// Initial Exam Results
export const INITIAL_EXAM_RESULTS: ExamResult[] = INITIAL_STUDENTS.slice(0, 10).map((s, idx) => {
  const baseMarks = 95 - (idx * 2);
  const totalMax = 600;
  const totalObtained = Math.min(570, Math.max(390, baseMarks * 6 - idx * 7));
  const percentage = Number(((totalObtained / totalMax) * 100).toFixed(2));
  const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : 'C';

  return {
    id: `res-mid-${s.id}`,
    examName: 'Mid-Term Examination 2026',
    examNameUrdu: 'وسط مدتی امتحانات ۲۰۲۶',
    term: 'Mid-Term',
    academicYear: '2026-2027',
    studentId: s.id,
    studentName: s.name,
    studentNameUrdu: s.nameUrdu,
    rollNo: s.rollNo,
    className: s.className,
    fatherName: s.fatherName,
    subjects: [
      { subject: 'English', subjectUrdu: 'انگریزی', totalMarks: 100, obtainedMarks: Math.round(percentage * 0.95), grade, remarks: 'Very Good' },
      { subject: 'Urdu', subjectUrdu: 'اردو', totalMarks: 100, obtainedMarks: Math.round(percentage * 0.92), grade, remarks: 'Good Hand Writing' },
      { subject: 'Mathematics', subjectUrdu: 'ریاضی', totalMarks: 100, obtainedMarks: Math.round(percentage * 0.98), grade, remarks: 'Excellent Analytical Skills' },
      { subject: 'General Science', subjectUrdu: 'جنرل سائنس', totalMarks: 100, obtainedMarks: Math.round(percentage * 0.94), grade, remarks: 'Good' },
      { subject: 'Islamiat', subjectUrdu: 'اسلامیات', totalMarks: 50, obtainedMarks: Math.round(percentage * 0.48), grade, remarks: 'Excellent' },
      { subject: 'Pakistan Studies', subjectUrdu: 'مطالعہ پاکستان', totalMarks: 50, obtainedMarks: Math.round(percentage * 0.46), grade, remarks: 'Good' },
      { subject: 'Computer Science', subjectUrdu: 'کمپیوٹر سائنس', totalMarks: 100, obtainedMarks: Math.round(percentage * 0.93), grade, remarks: 'Practical Lab Excellent' }
    ],
    totalMarks: totalMax,
    obtainedMarks: totalObtained,
    percentage,
    grade,
    position: idx === 0 ? '1st in Class' : idx === 1 ? '2nd in Class' : idx === 2 ? '3rd in Class' : `${idx + 1}th Position`,
    status: 'Pass',
    attendanceRate: 98 - (idx % 8),
    teacherRemarks: 'Excellent academic progress with commendable manners and dedication.',
    teacherRemarksUrdu: 'شاندار تعلیمی کارکردگی اور بہترین اخلاق۔ مستقبل کے لیے نیک تمنائیں!',
    dateIssued: '2026-11-05'
  };
});

// Storage helper functions
export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch {
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage save error:', e);
  }
}

export function resetAllDemoData(): void {
  localStorage.setItem('sms_school_settings', JSON.stringify(INITIAL_SCHOOL_SETTINGS));
  localStorage.setItem('sms_students_data', JSON.stringify(INITIAL_STUDENTS));
  localStorage.setItem('sms_teachers_data', JSON.stringify(INITIAL_TEACHERS));
  localStorage.setItem('sms_attendance_data', JSON.stringify(INITIAL_ATTENDANCE));
  localStorage.setItem('sms_fees_data', JSON.stringify(INITIAL_FEES));
  localStorage.setItem('sms_exams_data', JSON.stringify(INITIAL_EXAM_RESULTS));
  localStorage.setItem('sms_active_user', JSON.stringify(DEMO_ADMIN));
}
