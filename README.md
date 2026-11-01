# 🪦 Commit Cemetery

> **"Every repository has dead code, forgotten features, suspicious commits, and bugs that refused to die."**  
> An offline AI archaeological forensic tool that exhumes your Git repository's catacombs using local open-weight AI (**Gemma** via **Ollama**).

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Gemma AI](https://img.shields.io/badge/AI-Gemma_2-purple?style=flat)](https://ai.google.dev/gemma)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Local-First](https://img.shields.io/badge/Privacy-100%25_Offline-emerald?style=flat)](https://github.com)

---

## 👻 What is Commit Cemetery?

Most software projects accumulate ghosts:
- Modules created during a 2:41 AM panic that no one imports anymore.
- Commits titled `"temporary fix (DO NOT TOUCH)"` that became load-bearing infrastructure.
- Features that were ceremoniously deleted, only to be reincarnated 3 commits later under an alias.
- Sacred unit tests commented out just to get green CI checks.

**Commit Cemetery** brings forensic archaeology to software development. Instead of sending your sensitive proprietary source code to a third-party closed API, Commit Cemetery extracts structured Git evidence deterministically and feeds it to a **local open-weight Gemma model**.

---

## 🔮 Core Capabilities

### 1. ☠️ Suspicious Commit Forensics (The Crime Scenes)
Scans every commit for indicators of developer anguish, desperation, and reckless triage:
- Desperation incantations (`"pls work"`, `"final-final-v2"`, `"revert revert"`)
- Deceptive permanence (`"temporary fix"`, `"clean up later"`)
- Test desecration (`"commenting out tests so CI passes"`)
- Witching-hour commits pushed between 12:00 AM and 5:00 AM

### 2. 👻 Ghost File Autopsy
Identifies dormant, unreferenced files that have been resting undisturbed in the repository catacombs for months or years, calculating a **Necrotic Risk Score (0-100)** and generating personalized tombstone epitaphs.

### 3. 💀 Resurrections & Reverts
Traces the supernatural lifecycle of code:
- **The Reincarnation**: Features that were deleted, then reborn with slightly altered names.
- **The Failed Exorcism**: Reverts of reverts that re-summoned previously banished bugs.

### 4. 🧙 Gravedigger Contributor Archetypes
Analyzes contributor commit patterns to award historical titles:
- *The Midnight Gravedigger*: 67% of commits pushed during the witching hour.
- *The Chaos Necromancer*: Author of multiple high-severity anomalous commits.
- *The Ancient Caretaker*: Survived multiple force-push cleansings and git rebase purges.

### 5. 🔮 The Séance Chamber (Commune with the Repo)
An interactive AI-powered séance where developers can ask questions directly to the spirit of the codebase:
- *"Who broke production on Friday?"*
- *"Is it safe to delete legacyAuth.ts?"*
- *"Why does this script still exist?"*

---

## 🏗️ Architecture: Why Open-Source AI?

```text
       Local Git Repository
               │
               ▼
   ┌───────────────────────┐
   │ Deterministic Engine  │
   │  • git log parser     │
   │  • AST import scanner │
   │  • Revert detector    │
   └───────────┬───────────┘
               │ Structured Evidence
               ▼
   ┌───────────────────────┐
   │   Local Gemma Model   │ ◄── 100% Offline via Ollama
   │ (Open-Weight Privacy) │     No source code ever leaves localhost
   └───────────┬───────────┘
               │ Forensic Interpretation
               ▼
   ┌───────────────────────┐
   │  Cemetery UI & Séance │
   │  • Interactive Cards  │
   │  • Audio Drone Synth  │
   │  • Markdown Exhumation│
   └───────────────────────┘
```

### Why Open-Source AI (Gemma)?
1. **Source Code Privacy**: Repositories frequently contain proprietary logic, internal secrets, and unreleased IP. Sending code to closed SaaS AI endpoints creates unacceptable compliance risk.
2. **Zero Cost & Infinite Runs**: Run infinite forensics locally with no token meters or rate limits.
3. **Reproducibility**: Local weights guarantee deterministic forensic evaluation across environments.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- (Optional) [Ollama](https://ollama.com/) with Gemma: `ollama run gemma:2b`  
  *(Commit Cemetery includes an intelligent deterministic archaeological fallback if Ollama is not currently active).*

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/commit-cemetery.git
cd commit-cemetery

# Install dependencies
pnpm install # or npm install

# Start the dev server
pnpm dev # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Exportable Markdown Autopsies
With one click, export a complete forensic report of any repository to share with your engineering team or embed in a pull request post-mortem!

---

*Built for the DEV Community Hacktoberfest Challenge: Ghost in the Machine.* 🎃👻


---

*Built for the DEV Community Hacktoberfest Challenge: Ghost in the Machine.* 🎃👻
