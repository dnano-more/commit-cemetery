export interface CommitRecord {
  hash: string;
  shortHash: string;
  author: string;
  date: string;
  message: string;
  filesChanged?: number;
  insertions?: number;
  deletions?: number;
}

export interface SuspiciousCommit {
  commit: CommitRecord;
  severity: 'cursed' | 'high' | 'medium';
  verdict: string;
  evidence: string[];
}

export interface GhostFile {
  path: string;
  lastModified: string;
  daysDead: number;
  commitAuthor: string;
  reason: string;
  epitaph: string;
  riskScore: number;
}

export interface Resurrection {
  title: string;
  description: string;
  originalCommit?: string;
  resurrectedCommit?: string;
  crimeType: 'revert' | 'reincarnation' | 'zombie-patch';
  date: string;
}

export interface HauntedDeveloper {
  name: string;
  title: string;
  commitCount: number;
  lastSeen: string;
  spookyTrait: string;
  crimeCount: number;
}

export interface GraveyardSummary {
  repositoryName: string;
  repositoryPath: string;
  totalCommits: number;
  totalContributors: number;
  cemeteryAgeDays: number;
  deathRate: string;
  healthGrade: 'F (Possessed)' | 'D- (Haunted)' | 'C (Cursed)' | 'B (Restless)' | 'A (Sanctified)';
  epitaph: string;
  aiVerdict: string;
  ghostStory: string;
}

export interface CemeteryReport {
  summary: GraveyardSummary;
  suspiciousCommits: SuspiciousCommit[];
  ghostFiles: GhostFile[];
  resurrections: Resurrection[];
  hauntedDevelopers: HauntedDeveloper[];
  timeline: { date: string; event: string; type: 'birth' | 'death' | 'haunting' | 'revert' }[];
  isDemo?: boolean;
}
