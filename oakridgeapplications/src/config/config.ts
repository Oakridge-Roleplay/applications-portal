export const DEPARTMENT = {
  NAME: 'Oakridge Roleplay',
  ABBREVIATION: 'ORP',
  DESCRIPTION: 'Official application portal for Oakridge Roleplay. Apply for departments, track your status, and help build the community.',
  LOGO: '/logo.png',
};

export const DEPARTMENTS = [
  {
    id: 'sahp',
    name: 'San Andreas Highway Patrol',
    abbreviation: 'SAHP',
    icon: '🚨',
    color: '#60a5fa',
    description: 'Highway enforcement, pursuit operations, and road safety initiatives.',
    enabled: true,
  },
  {
    id: 'lspd',
    name: 'Los Santos Police Department',
    abbreviation: 'LSPD',
    icon: '👮',
    color: '#38bdf8',
    description: 'City policing and emergency response across Los Santos.',
    enabled: true,
  },
  {
    id: 'bcso',
    name: "Blaine County Sheriff's Office",
    abbreviation: 'BCSO',
    icon: '🛡️',
    color: '#a78bfa',
    description: 'County law enforcement and rural patrol operations.',
    enabled: true,
  },
  {
    id: 'safd',
    name: 'San Andreas Fire Department',
    abbreviation: 'SAFD',
    icon: '🚒',
    color: '#f87171',
    description: 'Emergency response, fire suppression, rescue, and patient care.',
    enabled: true,
  },
  {
    id: 'dispatch',
    name: 'Communications / Dispatch',
    abbreviation: 'DISPATCH',
    icon: '📡',
    color: '#34d399',
    description: 'Coordination, communications, and emergency dispatch support.',
    enabled: true,
  },
  {
    id: 'civilian',
    name: 'Civilian Operations',
    abbreviation: 'CIV',
    icon: '👔',
    color: '#94a3b8',
    description: 'Business, civilian, and community-focused roles.',
    enabled: true,
  },
  {
    id: 'staff',
    name: 'Staff Team',
    abbreviation: 'STAFF',
    icon: '⚙️',
    color: '#fbbf24',
    description: 'Moderation, leadership, and management positions.',
    enabled: true,
  },
];

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  DENIED: 'denied',
};

export const USER_ROLES = {
  USER: 'user',
  REVIEWER: 'reviewer',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
};
