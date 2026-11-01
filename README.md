<div align="center">

  <img src="public/logo.svg" alt="Commit Cemetery Logo" width="120" height="120" />

  # 🪦 COMMIT CEMETERY
  
  ### *Every repository has a past. Dig through yours.*

  An offline, local-first AI code archaeologist and forensic autopsy engine for Git repositories.  
  Powered by **Next.js 16**, **TypeScript**, and local open-weight AI (**Gemma** via **Ollama**).

  <p align="center">
    <a href="#-the-problem"><img src="https://img.shields.io/badge/Next.js-16.4.3-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" /></a>
    <a href="#-why-open-source-ai-gemma"><img src="https://img.shields.io/badge/AI-Gemma_2-6366f1?style=for-the-badge&logo=google&logoColor=white" alt="Gemma AI" /></a>
    <a href="#-architecture"><img src="https://img.shields.io/badge/Tailwind-CSS_v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="#-source-code-privacy"><img src="https://img.shields.io/badge/Privacy-100%25_Offline-10b981?style=for-the-badge&logo=shield&logoColor=white" alt="100% Offline" /></a>
    <a href="#-quick-start"><img src="https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge" alt="MIT License" /></a>
  </p>

  <p align="center">
    <a href="#-the-problem">The Problem</a> •
    <a href="#-core-features">Features</a> •
    <a href="#-architecture">Architecture</a> •
    <a href="#-why-open-source-ai-gemma">Why Gemma?</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-the-séance-chamber">The Séance</a> •
    <a href="#-sample-autopsy-report">Sample Report</a>
  </p>

</div>

---

## 💀 The Problem

Over months and years, every software repository turns into a haunted cemetery:

- **Ghost Files**: Unreferenced utility files and deprecated scripts from 2 years ago that survive 14 refactors because nobody dares delete them.
- **Deceptive Commits**: Commits titled `"temporary fix (DO NOT TOUCH)"` pushed at 2:41 AM that quietly hardened into critical production dependencies.
- **Reincarnated Code**: Features that were ceremoniously pruned from the master branch, only to be resurrected under aliases like `feature-v2.ts` three weeks later.
- **Test Desecration**: Assertions commented out in panic just to pass green CI checks before a sprint deadline.

Most developer tools merely count lines of code or run linters. **Commit Cemetery performs a supernatural forensic autopsy** on your git log and reflog history, exposing the ghosts haunting your architecture.

---

## 🔮 Core Features

### 1. ☠️ Suspicious Commit Forensics (The Crime Scenes)
Deterministically scans commit messages and time distributions for signs of developer despair and reckless emergency triage:
* **Desperation Incantations**: Flagging commits containing `"pls work"`, `"final-final-v2"`, or `"whoops"`.
* **Broken Promises**: Detecting `"temporary"`, `"wip"`, or `"clean up later"`.
* **Sacrificed Assertions**: Flagging deleted tests and `"commenting out tests so CI passes"`.
* **The Witching Hour**: Tracking commits pushed between 12:00 AM and 5:00 AM under nocturnal stress.

### 2. 👻 Ghost File Autopsy
Identifies dormant files lingering undisturbed in the repository catacombs:
* Calculates a **Necrotic Risk Score (0–100)** based on dormance duration and inward AST reference absence.
* Generates custom **Tombstone Epitaphs** memorializing why the file died.
* Highlights abandoned configuration and backup scripts left in root folders.

### 3. 💀 Resurrections & Reverts
Traces the supernatural lifecycle of code that refused to stay buried:
* **Reincarnations**: Deleted files that reappeared with near-identical structure under a new name.
* **The Failed Exorcism**: Reverts of reverts that re-summoned previously banished bugs.

### 4. 🧙 Haunted Developer Archetypes
Analyzes contributor habits to confer historical titles:
* **The Midnight Gravedigger**: Contributors with $>50\%$ of commits pushed during the witching hour.
* **The Chaos Necromancer**: Authors of multiple high-severity anomalous commits.
* **The Ancient Caretaker**: Committer who survived multiple force-push cleansings and git rebase purges.

### 5. 🔮 The Séance Chamber (Commune with the Repo)
An interactive AI-powered séance chamber where developers can chat directly with the spirit of the codebase:
> *"Who broke production on Friday?"*  
> *"Is it safe to delete legacyAuth.ts?"*  
> *"Why did sprint 12 fail?"*

### 6. 🎧 Ambient Crypt Synth Drone
Built directly with the browser's native **Web Audio API** (oscillator + low-frequency modulation). Zero external sound files, 100% offline, creating an eerie atmospheric environment while inspecting code.

### 7. 📜 One-Click Exhumation Export
Export the full forensic autopsy report as formatted Markdown ready to embed into GitHub Pull Requests, sprint retrospectives, or DEV.to community articles.

---

## 🏗️ Architecture

Commit Cemetery is **not a naive LLM wrapper**. It executes a deterministic two-stage pipeline: **Deterministic Forensic Extraction** followed by **Local AI Archaeological Interpretation**.

```text
               Local Git Repository
                        │
                        ▼
       ┌─────────────────────────────────┐
       │   DETERMINISTIC GIT ENGINE      │
       │   • git log --all --pretty      │
       │   • git diff & revert detection │
       │   • dormant file age analysis   │
       │   • author time heuristics      │
       └────────────────┬────────────────┘
                        │
                        ▼ Structured Evidence Matrix
       ┌─────────────────────────────────┐
       │   LOCAL OPEN-WEIGHT AI (GEMMA)  │ ◄── 100% Offline (Ollama)
       │   • Interprets evidence matrix  │     Source code NEVER leaves
       │   • Generates Gothic narrative  │     developer's machine
       │   • Powers interactive Séance   │
       └────────────────┬────────────────┘
                        │
                        ▼
       ┌─────────────────────────────────┐
       │     NEXT.JS CEMETERY UI         │
       │   • Tombstone Health Grade      │
       │   • Crime Scene Cards           │
       │   • Web Audio Crypt Synth       │
       │   • Markdown Autopsy Exporter   │
       └─────────────────────────────────┘
```

---

## 🧠 Why Open-Source AI (Gemma)?

We deliberately chose Google's open-weight **Gemma** model running locally via **Ollama** rather than calling a third-party cloud API:

1. **Source Code Privacy**: Repositories contain proprietary algorithms, sensitive configuration patterns, and internal company secrets. Pushing git reflogs and code snippets to cloud APIs creates serious security and compliance liabilities. With Gemma, **your source code never leaves localhost**.
2. **Deterministic Fallback**: If Ollama is not installed or offline, Commit Cemetery seamlessly falls back to its internal forensic heuristics engine—the UI never crashes or halts.
3. **Zero Token Cost & Rate Limits**: Forensic exhumations can parse hundreds of commits at zero marginal API cost.
4. **Reproducibility**: Local model weights ensure consistent archaeological audits across any development machine.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: `v18.18+` or `v20+`
- **Git**: Installed and available in PATH
- **(Optional) Ollama with Gemma**:
  ```bash
  # Install Ollama (https://ollama.com)
  ollama run gemma:2b
  ```
  *(Note: If Ollama is not active, Commit Cemetery will automatically use its internal procedural archaeological engine with zero setup required!)*

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/dnano-more/commit-cemetery.git
cd commit-cemetery

# Install dependencies
npm install
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🪦 Interactive Archetype Demos

Don't have an old repository handy? Commit Cemetery comes with built-in archetypal graveyards:

| Demo Repository | The Haunting | Key Crime |
| :--- | :--- | :--- |
| **Zenith Form** | Authentication ritual abandoned mid-ceremony | 47-file commit titled `"temporary fix (DO NOT TOUCH)"` at 2:41 AM |
| **CryptoCasket SaaS** | Corporate fad necromancy | Renamed Web3 smart contracts to `"enterprise-ai-helpers"` |
| **Local Project (`.`)** | Live local inspection | Autopsies the current Commit Cemetery codebase in real time |

---

## 📜 Sample Autopsy Output

```markdown
# 🪦 Forensic Autopsy Report: zenith-form
Location: C:/Users/Dnano/projects/zenith-form
Condition: F (Possessed)
Epitaph: "Here lies Zenith Form: where temporary fixes became sacred dogma."

🧠 Gemma AI Forensic Verdict:
> This repository appears to contain the residual haunting of an authentication overhaul 
> abandoned mid-ritual. Multiple commits died violent deaths at 2:00 AM, only to be 
> resurrected under aliases like "fix-final-final-v2".

☠️ Most Suspicious Commit:
- Hash: c8f491b
- Author: Dnyaneshwar (2026-05-14 02:41 AM)
- Message: "temporary fix (DO NOT TOUCH)"
- Evidence:
  * 47 files touched in an unreviewed midnight push
  * Explicit forbidden warning in commit message
  * Reverted 48 hours later, then rewritten 11 times afterward

👻 Ghost Files:
- src/utils/legacyAuth.ts (256 days dormant)
  * Tombstone: "R.I.P. legacyAuth.ts — Abandoned during the Great JWT Migration."
  * Necrotic Risk: 92/100
```

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **AI Engine**: [Gemma](https://ai.google.dev/gemma) via [Ollama](https://ollama.com/) (Local Open-Weight Inference)
* **Audio Engine**: Web Audio API (Procedural Synthesizer)
* **Version Control Forensics**: Native Git CLI & AST analysis

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with 🖤 for the <b>DEV Community Hacktoberfest Challenge: Ghost in the Machine</b>.</sub><br />
  <sub><i>"May your commits be atomic, and your merges conflict-free."</i> 👻</sub>
</div>
