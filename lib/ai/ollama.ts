import { CemeteryReport } from '../git/types';

interface OllamaResponse {
  response?: string;
  error?: string;
}

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const DEFAULT_MODEL = process.env.OLLAMA_MODEL || 'gemma:2b';

async function queryOllama(prompt: string, timeoutMs: number = 3500): Promise<string | null> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        prompt,
        stream: false
      }),
      signal: controller.signal
    });

    clearTimeout(id);
    if (!res.ok) return null;
    const data = (await res.json()) as OllamaResponse;
    return data.response?.trim() || null;
  } catch {
    clearTimeout(id);
    return null; // Graceful fallback
  }
}

export async function enrichReportWithAI(report: CemeteryReport): Promise<CemeteryReport> {
  const prompt = `You are Commit Cemetery, a dry-witted forensic archaeologist analyzing a software repository graveyard.
Repository Name: ${report.summary.repositoryName}
Total Commits: ${report.summary.totalCommits}
Suspicious Commits: ${report.suspiciousCommits.length}
Ghost Files: ${report.ghostFiles.map((g) => g.path).join(', ')}
Key Crime: ${report.suspiciousCommits[0]?.verdict || 'None'}

Provide a 2-3 sentence supernatural technical verdict.`;

  const ollamaText = await queryOllama(prompt);

  if (ollamaText) {
    report.summary.aiVerdict = ollamaText;
  }

  return report;
}

export async function askSeance(question: string, report: CemeteryReport): Promise<string> {
  const prompt = `You are the Ghost of the Repository "${report.summary.repositoryName}".
Epitaph: "${report.summary.epitaph}"
Ghost Files: ${report.ghostFiles.map((g) => g.path).join(', ')}
Haunted Developers: ${report.hauntedDevelopers.map((d) => `${d.name} (${d.title})`).join(', ')}
Suspicious commits: ${report.suspiciousCommits.map((c) => c.commit.message).join(' | ')}

A developer is conducting a séance and asks: "${question}".
Answer in character as the haunted spirit of this codebase in 2-4 sentences. Be slightly spooky, humorous, yet technically insightful.`;

  const ollamaAnswer = await queryOllama(prompt, 5000);
  if (ollamaAnswer) {
    return ollamaAnswer;
  }

  // Fallback procedural ghost response based on keywords
  const q = question.toLowerCase();
  if (q.includes('who broke') || q.includes('who did') || q.includes('blame')) {
    const dev = report.hauntedDevelopers[0]?.name || 'a forgotten contributor';
    return `*A cold draft rustles your git log...* The reflogs remember: ${dev} pushed a commit at midnight without passing tests. Do not search for their branch—it was pruned long ago.`;
  }
  if (q.includes('delete') || q.includes('remove') || q.includes('safe to delete')) {
    return `*A spectral sigh echoes through node_modules...* You wish to delete it? Proceed if you dare, but know that somewhere in line 418 of a forgotten script, someone is importing it with a relative path three levels deep.`;
  }
  if (q.includes('refactor') || q.includes('rewrite') || q.includes('clean')) {
    return `*The crypt door creaks...* Every sprint team promises a total rewrite. They too lie buried here in git stash drop. What makes you think your branch will escape the tomb?`;
  }
  if (q.includes('auth') || q.includes('security') || q.includes('password') || q.includes('token')) {
    return `*Green ectoplasm glows on screen...* Look into the git history of 6 months ago. The tokens were once hardcoded, then replaced by env vars, then leaked again in a debug log. Proceed with incense and git filter-repo.`;
  }
  return `*The spirits of ${report.summary.repositoryName} whisper...* You ask of "${question}", but the commits from the witching hour hold truths mortals were never meant to rebase. Run "git status" and fear no evil.`;
}

