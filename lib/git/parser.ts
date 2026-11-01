import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { CemeteryReport, CommitRecord, GhostFile, GraveyardSummary, HauntedDeveloper, Resurrection, SuspiciousCommit } from './types';
import { DEMO_REPOSITORIES } from './sampleData';

const SUSPICIOUS_PATTERNS = [
  { regex: /temp(orary)?/i, reason: 'Claims to be temporary (guaranteed to be permanent)', severity: 'cursed' as const },
  { regex: /final[-_ ]*final/i, reason: 'Desperation detected: recursive "final" incantation', severity: 'cursed' as const },
  { regex: /pls|please\s*work/i, reason: 'Prayer-based software engineering', severity: 'high' as const },
  { regex: /do\s*not\s*(delete|touch)/i, reason: 'Taboo code sealed with an ancient developer ward', severity: 'cursed' as const },
  { regex: /hotfix|quick\s*fix/i, reason: 'Necrotic patch applied in panic', severity: 'medium' as const },
  { regex: /wip|work\s*in\s*progress/i, reason: 'Unfinished business haunting production', severity: 'medium' as const },
  { regex: /commenting\s*out\s*tests?/i, reason: 'Sacrificing unit test shrine to appease CI', severity: 'cursed' as const },
  { regex: /revert\s*revert/i, reason: 'The Revert of the Revert: dead code returned from the abyss', severity: 'cursed' as const },
  { regex: /hack|clean\s*up\s*later/i, reason: '"Clean up later" promise broken across dimensions', severity: 'high' as const },
  { regex: /oops|my\s*bad|whoops/i, reason: 'Accidental production catastrophe confessed in message', severity: 'high' as const },
  { regex: /emergency|urgent/i, reason: 'High-adrenaline triage with likely collateral damage', severity: 'medium' as const },
  { regex: /fuck|shit|damn|wtf/i, reason: 'Developer spirit reached critical anguish threshold', severity: 'cursed' as const }
];

export async function analyzeRepository(targetPath?: string, demoType?: string): Promise<CemeteryReport> {
  // If demoType requested or path matches demo
  if (demoType && DEMO_REPOSITORIES[demoType]) {
    return DEMO_REPOSITORIES[demoType];
  }

  const resolvedPath = targetPath ? path.resolve(targetPath) : process.cwd();

  // Check if directory exists
  if (!fs.existsSync(resolvedPath)) {
    return {
      ...DEMO_REPOSITORIES['zenith-form'],
      summary: {
        ...DEMO_REPOSITORIES['zenith-form'].summary,
        repositoryPath: resolvedPath,
        aiVerdict: `Target path "${resolvedPath}" was not found in the mortal realm. Summoning the spirit of Zenith Form instead.`
      }
    };
  }

  // Check if .git exists
  const gitDir = path.join(resolvedPath, '.git');
  const isGitRepo = fs.existsSync(gitDir);

  if (!isGitRepo) {
    // Check if it's our own commit-cemetery directory or a subfolder without git yet
    return {
      ...DEMO_REPOSITORIES['zenith-form'],
      summary: {
        ...DEMO_REPOSITORIES['zenith-form'].summary,
        repositoryName: path.basename(resolvedPath),
        repositoryPath: resolvedPath,
        aiVerdict: `No Git tomb found at "${resolvedPath}". We exhume the haunted archetypal repository (Zenith Form) to demonstrate the autopsy report.`
      }
    };
  }

  try {
    // 1. Fetch commits via git log
    const gitLogRaw = execSync(
      'git log --all --pretty=format:"%H|%an|%ad|%s" --date=iso -n 300',
      { cwd: resolvedPath, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );

    const lines = gitLogRaw.trim().split('\n').filter(Boolean);
    if (lines.length === 0) {
      return DEMO_REPOSITORIES['zenith-form'];
    }

    const commits: CommitRecord[] = [];
    const authorStats: Record<string, { count: number; crimes: number; lastSeen: string; nightOwlCount: number }> = {};
    const suspiciousCommits: SuspiciousCommit[] = [];
    const resurrections: Resurrection[] = [];

    lines.forEach((line) => {
      const parts = line.split('|');
      if (parts.length < 4) return;
      const [hash, author, dateStr, ...msgParts] = parts;
      const message = msgParts.join('|');
      const shortHash = hash.slice(0, 7);

      const commit: CommitRecord = {
        hash,
        shortHash,
        author: author.trim(),
        date: dateStr.trim(),
        message: message.trim()
      };
      commits.push(commit);

      // Track developer stats
      const authKey = commit.author || 'Unknown Ghost';
      if (!authorStats[authKey]) {
        authorStats[authKey] = { count: 0, crimes: 0, lastSeen: commit.date, nightOwlCount: 0 };
      }
      authorStats[authKey].count++;

      // Check night owl (11 PM - 5 AM)
      const hour = new Date(commit.date).getHours();
      if (hour >= 23 || hour <= 5) {
        authorStats[authKey].nightOwlCount++;
      }

      // Check suspicion
      let matchedSuspicion = null;
      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.regex.test(commit.message)) {
          matchedSuspicion = pattern;
          break;
        }
      }

      if (matchedSuspicion) {
        authorStats[authKey].crimes++;
        const evidence: string[] = [matchedSuspicion.reason];
        if (hour >= 23 || hour <= 5) {
          evidence.push(`Committed during the witching hour (${hour}:00)`);
        }
        suspiciousCommits.push({
          commit,
          severity: matchedSuspicion.severity,
          verdict: `Flagged under forensic clause: "${matchedSuspicion.reason}"`,
          evidence
        });
      }

      // Check reverts
      if (/^revert\s*"/i.test(commit.message) || /^revert\s*revert/i.test(commit.message)) {
        resurrections.push({
          title: `Revert Detected: ${commit.message.slice(0, 60)}`,
          description: `Commit ${commit.shortHash} attempted to reverse an earlier historical trauma.`,
          crimeType: commit.message.toLowerCase().includes('revert revert') ? 'reincarnation' : 'revert',
          resurrectedCommit: commit.shortHash,
          date: commit.date.split('T')[0] || commit.date
        });
      }
    });

    // 2. Scan files to find Ghost Files (oldest untouched files)
    const ghostFiles: GhostFile[] = [];
    try {
      const lsFiles = execSync('git ls-files', { cwd: resolvedPath, encoding: 'utf8' }).trim().split('\n').filter(Boolean);
      // Sample up to 10 files to check their last modified date
      const filesToCheck = lsFiles.slice(0, 30);
      const now = Date.now();

      for (const relFile of filesToCheck) {
        if (relFile.endsWith('.json') || relFile.endsWith('.lock') || relFile.endsWith('.md')) continue;
        try {
          const fileLog = execSync(`git log -1 --pretty=format:"%ad|%an" --date=iso -- "${relFile}"`, {
            cwd: resolvedPath,
            encoding: 'utf8'
          }).trim();
          if (fileLog) {
            const [fDate, fAuthor] = fileLog.split('|');
            const fileTime = new Date(fDate).getTime();
            const daysDead = Math.max(1, Math.floor((now - fileTime) / (1000 * 60 * 60 * 24)));
            if (daysDead > 14 || ghostFiles.length < 3) {
              ghostFiles.push({
                path: relFile,
                lastModified: fDate,
                daysDead,
                commitAuthor: fAuthor || 'Unknown Ghost',
                reason: `Untouched for ${daysDead} days in the repository catacombs.`,
                epitaph: `Here rests ${path.basename(relFile)}, undisturbed by mortal hands.`,
                riskScore: Math.min(99, 40 + Math.floor(daysDead / 5))
              });
            }
          }
        } catch {
          // ignore single file error
        }
      }
    } catch {
      // ignore
    }

    // Sort ghost files by days dead
    ghostFiles.sort((a, b) => b.daysDead - a.daysDead);

    // 3. Compile Haunted Developers
    const hauntedDevelopers: HauntedDeveloper[] = Object.entries(authorStats)
      .map(([name, stat]) => {
        let title = 'The Wandering Committer';
        let trait = `Committed ${stat.count} times.`;
        if (stat.nightOwlCount > stat.count * 0.4) {
          title = 'The Midnight Gravedigger';
          trait = `${Math.round((stat.nightOwlCount / stat.count) * 100)}% of commits pushed during the witching hour.`;
        } else if (stat.crimes > 3) {
          title = 'The Chaos Necromancer';
          trait = `Responsible for ${stat.crimes} flagged suspicious commits.`;
        } else if (stat.count > 100) {
          title = 'The Ancient Caretaker';
          trait = 'Has survived multiple repository cleansings and git rebase purges.';
        }

        return {
          name,
          title,
          commitCount: stat.count,
          lastSeen: stat.lastSeen.split('T')[0] || stat.lastSeen,
          spookyTrait: trait,
          crimeCount: stat.crimes
        };
      })
      .sort((a, b) => b.crimeCount - a.crimeCount || b.commitCount - a.commitCount)
      .slice(0, 5);

    // 4. Calculate Summary
    const firstCommit = commits[commits.length - 1];
    const lastCommit = commits[0];
    const repoAgeDays = Math.max(
      1,
      Math.floor((new Date(lastCommit.date).getTime() - new Date(firstCommit.date).getTime()) / (1000 * 60 * 60 * 24))
    );

    const deathPercentage = Math.min(95, Math.max(20, Math.round((suspiciousCommits.length / commits.length) * 100 * 2.5)));
    let healthGrade: GraveyardSummary['healthGrade'] = 'B (Restless)';
    if (suspiciousCommits.length > 10 || deathPercentage > 70) {
      healthGrade = 'F (Possessed)';
    } else if (suspiciousCommits.length > 5) {
      healthGrade = 'D- (Haunted)';
    } else if (suspiciousCommits.length > 2) {
      healthGrade = 'C (Cursed)';
    }

    const repoName = path.basename(resolvedPath);

    return {
      isDemo: false,
      summary: {
        repositoryName: repoName,
        repositoryPath: resolvedPath,
        totalCommits: commits.length,
        totalContributors: Object.keys(authorStats).length,
        cemeteryAgeDays: repoAgeDays,
        deathRate: `${deathPercentage}% necro-entropy index`,
        healthGrade,
        epitaph: `Here lies ${repoName}: bounded by git reflogs and unfinished refactors.`,
        aiVerdict: `Forensic audit reveals ${suspiciousCommits.length} anomalous commits, ${ghostFiles.length} dormant files, and evidence of nocturnal stress pushing.`,
        ghostStory: `The repository exhibits standard signs of software purgatory: rushed fixes under pressure, forgotten utilities, and contributors who departed without leaving documentation.`
      },
      suspiciousCommits: suspiciousCommits.slice(0, 8),
      ghostFiles: ghostFiles.slice(0, 6),
      resurrections: resurrections.slice(0, 5),
      hauntedDevelopers,
      timeline: commits.slice(0, 6).map((c) => ({
        date: c.date.split('T')[0] || c.date,
        event: `${c.shortHash}: ${c.message}`,
        type: c.message.toLowerCase().includes('revert') ? 'revert' : 'haunting'
      }))
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Git analysis error:', errorMsg);
    return {
      ...DEMO_REPOSITORIES['zenith-form'],
      summary: {
        ...DEMO_REPOSITORIES['zenith-form'].summary,
        repositoryPath: resolvedPath,
        aiVerdict: `Git autopsy halted due to an anomaly: ${errorMsg}. Reverting to the Zenith Form evidence casket.`
      }
    };
  }
}
