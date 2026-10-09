export const DEPARTMENT = {
  NAME: 'Oakridge Roleplay',
  ABBREVIATION: 'ORP',
  DESCRIPTION:
    'Official application portal for Oakridge Roleplay. Apply for departments, track your status, and help build the community.',
  LOGO: '/logo.png',
};

export const DEPARTMENTS = [
  {
    id: 'sahp',
    name: 'San Andreas Highway Patrol',
    abbreviation: 'SAHP',
    icon: '🚨',
    color: '#1d4ed8',
    description: 'Highway enforcement, pursuit operations, and road safety initiatives.',
    enabled: true,
  },
  {
    id: 'lspd',
    name: 'Los Santos Police Department',
    abbreviation: 'LSPD',
    icon: '👮',
    color: '#0284c7',
    description: 'City policing and emergency response across Los Santos.',
    enabled: true,
  },
  {
    id: 'bcso',
    name: "Blaine County Sheriff's Office",
    abbreviation: 'BCSO',
    icon: '🛡️',
    color: '#7c3aed',
    description: 'County law enforcement and rural patrol operations.',
    enabled: true,
  },
  {
    id: 'safd',
    name: 'San Andreas Fire Department',
    abbreviation: 'SAFD',
    icon: '🚒',
    color: '#dc2626',
    description: 'Emergency response, fire suppression, and rescue operations.',
    enabled: true,
  },
  {
    id: 'dispatch',
    name: 'Communications / Dispatch',
    abbreviation: 'DISPATCH',
    icon: '📡',
    color: '#059669',
    description: 'Coordination, communications, and emergency dispatch services.',
    enabled: true,
  },
  {
    id: 'civilian',
    name: 'Civilian Operations',
    abbreviation: 'CIV',
    icon: '👔',
    color: '#6b7280',
    description: 'Business, community, and civilian role opportunities.',
    enabled: true,
  },
  {
    id: 'staff',
    name: 'Staff Team',
    abbreviation: 'STAFF',
    icon: '⚙️',
    color: '#f59e0b',
    description: 'Moderation, management, and leadership team positions.',
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
