import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(date: string | Date, pattern = 'MMMM d, yyyy') {
  return format(new Date(date), pattern)
}

export function formatDateTime(date: string | Date) {
  return format(new Date(date), "MMMM d, yyyy 'at' h:mm a")
}

export function timeAgo(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

export const SECTIONS = [
  { label: 'Front Page', value: 'front-page', href: '/' },
  { label: 'Government', value: 'government', href: '/section/government' },
  { label: 'Business', value: 'business', href: '/section/business' },
  { label: 'Community', value: 'community', href: '/section/community' },
  { label: 'Schools', value: 'schools', href: '/section/schools' },
  { label: 'Events', value: 'events', href: '/events' },
  { label: 'History', value: 'history', href: '/section/history' },
  { label: 'Directory', value: 'directory', href: '/directory' },
] as const

export const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  submitted_to_teacher: 'Submitted to Teacher',
  returned_by_teacher: 'Returned by Teacher',
  teacher_approved: 'Teacher Approved',
  submitted: 'Submitted',
  ai_reviewed: 'AI Reviewed',
  needs_edit: 'Needs Edit',
  ready: 'Ready',
  scheduled: 'Scheduled',
  published: 'Published',
  archived: 'Archived',
}

export const STATUS_TONES: Record<string, string> = {
  draft: 'muted',
  submitted_to_teacher: 'default',
  returned_by_teacher: 'warning',
  teacher_approved: 'accent',
  submitted: 'default',
  ai_reviewed: 'default',
  needs_edit: 'warning',
  ready: 'accent',
  scheduled: 'accent',
  published: 'dark',
  archived: 'muted',
}
