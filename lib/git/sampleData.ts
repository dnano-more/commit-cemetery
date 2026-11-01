import { CemeteryReport } from './types';

export const DEMO_REPOSITORIES: Record<string, CemeteryReport> = {
  'zenith-form': {
    isDemo: true,
    summary: {
      repositoryName: 'zenith-form',
      repositoryPath: 'C:/Users/Dnano/projects/zenith-form',
      totalCommits: 387,
      totalContributors: 4,
      cemeteryAgeDays: 512,
      deathRate: '68% of code untouched > 6 months',
      healthGrade: 'F (Possessed)',
      epitaph: 'Here lies Zenith Form: where "temporary fixes" became sacred dogma.',
      aiVerdict:
        'This repository appears to contain the residual haunting of an authentication overhaul that was abandoned mid-ritual. Multiple commits died violent deaths at 2:00 AM, only to be resurrected under aliases like "fix-final-final-v2".',
      ghostStory:
        'Legend whispers that on May 14th, a 47-file commit titled "temporary fix" was cast into the master branch. Two days later, an exorcism was attempted via git revert, but the shadow of the old state continues to linger in abandoned utility modules.'
    },
    suspiciousCommits: [
      {
        commit: {
          hash: 'c8f491b2e8a107382d6b4991ac899120de8402bc',
          shortHash: 'c8f491b',
          author: 'Dnyaneshwar',
          date: '2026-05-14T02:41:19Z',
          message: 'temporary fix (DO NOT TOUCH)',
          filesChanged: 47,
          insertions: 3821,
          deletions: 1104
        },
        severity: 'cursed',
        verdict: 'Committed at 2:41 AM with 3,821 insertions under the deceptive title "temporary fix".',
        evidence: [
          '47 files touched in a single unreviewed commit',
          'Explicit forbidden warning in commit message ("DO NOT TOUCH")',
          'Reverted 48 hours later, then rewritten 11 times afterward'
        ]
      },
      {
        commit: {
          hash: '7a12de938b819fbc74910a30b192837492019481',
          shortHash: '7a12de9',
          author: 'Alex (Intern)',
          date: '2026-08-22T23:14:02Z',
          message: 'fix: final final fix for real this time pls work',
          filesChanged: 12,
          insertions: 430,
          deletions: 390
        },
        severity: 'high',
        verdict: 'Desperation incantation detected in commit message ("pls work").',
        evidence: [
          'Fourth consecutive commit with the words "final" and "fix"',
          'Broke production build pipeline immediately upon merging',
          'Author logged out immediately after pushing'
        ]
      },
      {
        commit: {
          hash: '4d8301fa38290192847291a0b382910492817263',
          shortHash: '4d8301f',
          author: 'Dnyaneshwar',
          date: '2026-09-02T19:22:45Z',
          message: 'WIP: commenting out tests so CI passes',
          filesChanged: 6,
          insertions: 18,
          deletions: 412
        },
        severity: 'cursed',
        verdict: 'Desecration of the Test Shrine: 412 lines of unit tests martyred for green CI.',
        evidence: [
          'Massive deletion of assertions in auth.test.ts',
          'Bypassed pre-commit hooks via git commit --no-verify',
          'Tests never restored in any subsequent commit'
        ]
      },
      {
        commit: {
          hash: '91bc8201fa839201938472910a82736491029384',
          shortHash: '91bc820',
          author: 'Sarah M.',
          date: '2026-10-10T14:05:11Z',
          message: 'quick hotfix for memory leak in prod',
          filesChanged: 2,
          insertions: 4,
          deletions: 1
        },
        severity: 'medium',
        verdict: 'Band-aid applied over a necrotic arterial hemorrhage.',
        evidence: [
          'Added process.exit(0) inside an uncaughtException handler',
          'Memory leak masked rather than remedied'
        ]
      }
    ],
    ghostFiles: [
      {
        path: 'src/utils/legacyAuth.ts',
        lastModified: '2026-02-18T10:14:00Z',
        daysDead: 256,
        commitAuthor: 'Dnyaneshwar',
        reason: 'Zero inward imports found across repository. Contains deprecated MD5 salt logic.',
        epitaph: 'R.I.P. legacyAuth.ts — Abandoned during the Great JWT Migration of February.',
        riskScore: 92
      },
      {
        path: 'src/services/stripe_v1_backup_old.js',
        lastModified: '2025-11-04T16:30:20Z',
        daysDead: 362,
        commitAuthor: 'Former Contractor',
        reason: 'Uncompiled vanilla JS file living in TypeScript src folder with hardcoded test API keys.',
        epitaph: 'Survived 14 refactors because everyone was afraid deleting it would crash billing.',
        riskScore: 98
      },
      {
        path: 'src/components/HalloweenModal.tsx',
        lastModified: '2025-10-31T23:59:00Z',
        daysDead: 366,
        commitAuthor: 'Alex (Intern)',
        reason: 'Seasonal promotional modal configured with display: none for an entire calendar year.',
        epitaph: 'Frozen in perpetual trick-or-treat purgatory.',
        riskScore: 40
      },
      {
        path: 'scripts/migrate-db-urgent.sh',
        lastModified: '2026-01-12T03:11:00Z',
        daysDead: 293,
        commitAuthor: 'Dnyaneshwar',
        reason: 'Shell script containing DROP TABLE IF EXISTS without dry-run validation.',
        epitaph: 'A loaded weapon left unlocked in the root scripts directory.',
        riskScore: 89
      }
    ],
    resurrections: [
      {
        title: 'The Reincarnation of Old-Auth',
        description:
          'src/auth/basic.ts was ceremoniously deleted in commit 3e91ba0, then resurrected 3 commits later as src/auth/basic-v2.ts with 96% identical AST structure.',
        originalCommit: '3e91ba0',
        resurrectedCommit: '81f092b',
        crimeType: 'reincarnation',
        date: '2026-04-18'
      },
      {
        title: 'The Failed Exorcism of PR #42',
        description:
          'Commit "revert revert feat: dynamic form grid" re-introduced a catastrophic CSS infinite flex layout loop.',
        originalCommit: '12ba891',
        resurrectedCommit: '44fc901',
        crimeType: 'revert',
        date: '2026-06-30'
      }
    ],
    hauntedDevelopers: [
      {
        name: 'Dnyaneshwar',
        title: 'The Midnight Gravedigger',
        commitCount: 243,
        lastSeen: '2026-10-29',
        spookyTrait: '67% of commits created between 1:00 AM and 4:30 AM.',
        crimeCount: 19
      },
      {
        name: 'Alex (Intern)',
        title: 'The Phantom Committer',
        commitCount: 84,
        lastSeen: '2026-09-14',
        spookyTrait: 'Pushed directly to main, blamed caching, disappeared from Slack.',
        crimeCount: 8
      },
      {
        name: 'Former Contractor',
        title: 'The Necromancer',
        commitCount: 42,
        lastSeen: '2025-11-05',
        spookyTrait: 'Wrote unformatted JavaScript with zero comments and left the country.',
        crimeCount: 12
      }
    ],
    timeline: [
      { date: '2025-06-10', event: 'Repository Genesis: "first commit (clean start)"', type: 'birth' },
      { date: '2025-11-04', event: 'Contractor departs, leaving unreferenced backup files', type: 'death' },
      { date: '2026-02-18', event: 'legacyAuth.ts abandoned without burial', type: 'haunting' },
      { date: '2026-05-14', event: 'The Great 2:41 AM "temporary fix" Cataclysm', type: 'haunting' },
      { date: '2026-06-30', event: 'The Revert of the Revert resurrects broken CSS', type: 'revert' },
      { date: '2026-09-02', event: 'Tests commented out to appease CI overlords', type: 'death' }
    ]
  },

  'haunted-saas': {
    isDemo: true,
    summary: {
      repositoryName: 'cryptocasket-saas',
      repositoryPath: 'E:/projects/cryptocasket-saas',
      totalCommits: 842,
      totalContributors: 9,
      cemeteryAgeDays: 780,
      deathRate: '81% of services deprecated',
      healthGrade: 'F (Possessed)',
      epitaph: 'A hyper-scaled microservice architecture for an app with 11 monthly active users.',
      aiVerdict:
        'The codebase contains multiple overlapping eras of architectural fads: Redux, MobX, Zustand, and a handwritten event bus all co-exist in an uneasy subterranean truce.',
      ghostStory:
        'In late 2024, the founders pivoted from B2B Web3 AI Agents to Enterprise B2B SaaS. Rather than deleting the blockchain smart contracts, they renamed the directory to "internal/web2/helpers" and prayed nobody would notice.'
    },
    suspiciousCommits: [
      {
        commit: {
          hash: 'fe94018274910382910293847291039481920394',
          shortHash: 'fe94018',
          author: 'Lead Architect',
          date: '2025-03-19T21:00:00Z',
          message: 'quick pivot: rename web3 to enterprise-ai',
          filesChanged: 114,
          insertions: 489,
          deletions: 512
        },
        severity: 'cursed',
        verdict: 'Corporate necromancy: masquerading dead crypto contracts as enterprise AI agents.',
        evidence: [
          'File search and replace: ethers.js renamed to aiAgentProvider',
          'Gas estimation function repurposed as token usage calculator'
        ]
      }
    ],
    ghostFiles: [
      {
        path: 'src/lib/solanaWalletConnector.ts',
        lastModified: '2024-12-01T08:00:00Z',
        daysDead: 700,
        commitAuthor: 'Lead Architect',
        reason: 'Solana wallet provider still bundled into client bundle, adding 4.2MB of unexecuted bytecode.',
        epitaph: 'A 4.2MB digital ghost haunting every mobile page load.',
        riskScore: 95
      }
    ],
    resurrections: [
      {
        title: 'The Zombie GraphQL Gateway',
        description: 'Deprecated in sprint 12, resurrected in sprint 34 because the mobile app broke without it.',
        crimeType: 'zombie-patch',
        date: '2025-08-11'
      }
    ],
    hauntedDevelopers: [
      {
        name: 'Lead Architect',
        title: 'The Fad Shifter',
        commitCount: 512,
        lastSeen: '2026-08-10',
        spookyTrait: 'Rewrote the state management layer 5 times without shipping a feature.',
        crimeCount: 31
      }
    ],
    timeline: [
      { date: '2024-08-01', event: 'Conception: "Revolutionary Web3 AI protocol"', type: 'birth' },
      { date: '2025-03-19', event: 'Pivoted to Enterprise AI overnight', type: 'haunting' },
      { date: '2025-08-11', event: 'Zombie GraphQL Gateway exhumed from grave', type: 'revert' }
    ]
  }
};
