import {
  FileText,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Presentation,
  FileType,
  File,
  type LucideIcon,
} from 'lucide-react';
import type { EvidenceType } from '@/lib/types';

export const evidenceIcons: Record<EvidenceType, LucideIcon> = {
  pdf: FileText,
  image: ImageIcon,
  video: Video,
  link: LinkIcon,
  presentation: Presentation,
  document: FileType,
  other: File,
};
