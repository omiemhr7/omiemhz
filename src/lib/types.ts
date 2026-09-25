export type EvidenceType = 'pdf' | 'image' | 'video' | 'link' | 'presentation' | 'document' | 'other';

export interface Standard {
  id: string;
  number: number;
  title: string;
  description: string | null;
  is_hidden: boolean;
  sort_order: number;
  created_at: string;
}

export interface Evidence {
  id: string;
  title: string;
  type: EvidenceType;
  description: string | null;
  semester: string | null;
  date: string | null;
  academic_year: string | null;
  notes: string | null;
  url: string | null;
  file_path: string | null;
  cover_image_path: string | null;
  is_placeholder: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface EvidenceStandard {
  id: string;
  evidence_id: string;
  standard_id: string;
}

export interface Initiative {
  id: string;
  name: string;
  idea: string | null;
  target_audience: string | null;
  goal: string | null;
  impact: string | null;
  link_url: string | null;
  cover_image_path: string | null;
  created_at: string;
}

export interface TechTool {
  id: string;
  name: string;
  usage_description: string | null;
  example: string | null;
  url: string | null;
  created_at: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string | null;
  date: string | null;
  hours: string | null;
  category: string | null;
  description: string | null;
  certificate_url: string | null;
  certificate_file_path: string | null;
  cover_image_path: string | null;
  is_certificate: boolean;
  created_at: string;
}

export interface StudentWork {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  unit: string | null;
  activity_name: string | null;
  date: string | null;
  image_url: string | null;
  url: string | null;
  file_path: string | null;
  standard_id: string | null;
  created_at: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  specialty: string;
  school: string;
  academic_year: string;
  bio: string;
}

export const EVIDENCE_TYPE_LABELS: Record<EvidenceType, string> = {
  pdf: 'PDF',
  image: 'صورة',
  video: 'فيديو',
  link: 'رابط خارجي',
  presentation: 'عرض تقديمي',
  document: 'ملف مستند',
  other: 'ملف آخر',
};

export const EVIDENCE_TYPE_ICONS: Record<EvidenceType, string> = {
  pdf: 'FileText',
  image: 'Image',
  video: 'Video',
  link: 'Link',
  presentation: 'Presentation',
  document: 'FileType',
  other: 'File',
};

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'video/mp4',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const ADMIN_EMAIL = 'omiemh.r7@gmail.com';
