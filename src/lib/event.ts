export const EVENT = {
  theme: "Building Tomorrow's Tech Leaders Through Knowledge",
  title: "Beyond the Code",
  subtitle: "General Assembly 2026",
  date: "August 27, 2026",
  time: "7:30 AM – 5:00 PM",
  venue: "ST Quadrangle",
};

// Swap this one constant once the real attendance/QR app URL is available.
export const PLACEHOLDER_ATTENDANCE_URL = "https://example.com/attendance";

export interface ProgramItem {
  time: string;
  segment: string;
  presenter?: string;
  role?: string;
}

export const PROGRAM_AM: ProgramItem[] = [
  { time: "7:30 AM – 8:15 AM", segment: "Arrival and Registration", presenter: "CCS-CSC Officers" },
  { time: "8:15 AM – 8:30 AM", segment: "Preliminaries", presenter: "AVP" },
  { time: "8:30 AM – 8:50 AM", segment: "Opening Remarks", presenter: "Anna Loretta C. Romulo", role: "CCS, Dean" },
  { time: "8:50 AM – 9:10 AM", segment: "Prospectus (4 Program)", presenter: "Fritzgerald Enric Imperial", role: "CCS, Faculty" },
  { time: "9:10 AM – 9:30 AM", segment: "AI Policy and Netiquette", presenter: "Liela Gardose", role: "CCS, Faculty" },
  { time: "9:30 AM – 10:00 AM", segment: "Socio Emotional Learning Program", presenter: "Zyrus Jobert B. Botor, RPm", role: "Guidance Associate of CCS" },
  { time: "10:00 AM – 10:20 AM", segment: "Compassion Voucher & Internal Scholarship", presenter: "Layra D. Flordeliz", role: "Scholarship Coordinator" },
  { time: "10:20 AM – 10:40 AM", segment: "Bank Accounts & External Scholarship", presenter: "Mitos S. Padua", role: "Accounting Office" },
  { time: "10:40 AM – 11:00 AM", segment: "Laboratory Policy", presenter: "Jaime Tantiado", role: "CCS Lab Custodian" },
  { time: "11:00 AM – 11:20 AM", segment: "LRC Day", presenter: "Lorenzo Jay R. Pantalla", role: "CCS, Faculty" },
  { time: "11:20 AM – 11:40 AM", segment: "Brigada Day & SAF", presenter: "Kurt Basti B. Tacorda", role: "CCS-CSC, Governor" },
  { time: "11:40 AM – 12:00 NN", segment: "Awarding PL/DL", presenter: "Anna Loretta C. Romulo", role: "CCS, Dean" },
];

export const PROGRAM_PM: ProgramItem[] = [
  { time: "12:30 NN – 1:00 PM", segment: "Afternoon Registration", presenter: "CCS-CSC Officers" },
  { time: "1:00 PM – 1:30 PM", segment: "Microcredentials & Micro-certificates", presenter: "Brenn Yulo M. Bacus", role: "Coordinator, Microcredential and Certificate Programs" },
  { time: "1:30 PM – 2:00 PM", segment: "Lifelong Learning & ICT Certification", presenter: "Emmanuel Enalpe III", role: "Software Developer" },
  { time: "2:00 PM – 2:30 PM", segment: "Community Extension Activities", presenter: "Andy Durante", role: "CCS, Faculty" },
  { time: "2:30 PM – 3:00 PM", segment: "Retention Policy", presenter: "Ronald Baldemoro", role: "CCS, Faculty" },
  { time: "3:00 PM – 3:30 PM", segment: "Research Agenda", presenter: "Ronel Simon", role: "Director, Research Office" },
  { time: "3:30 PM – 3:45 PM", segment: "Tiger Leap", presenter: "Anna Loretta C. Romulo", role: "CCS, Dean" },
  { time: "3:45 PM – 4:10 PM", segment: "Practicum, Internship Program and OJT", presenter: "Junice Ilagan", role: "CCS, Faculty" },
  { time: "4:10 PM – 5:00 PM", segment: "Campaign", presenter: "CCS-CSC Officers" },
];
