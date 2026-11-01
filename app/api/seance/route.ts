import { NextResponse } from 'next/server';
import { askSeance } from '@/lib/ai/ollama';
import { CemeteryReport } from '@/lib/git/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, report } = body as { question: string; report: CemeteryReport };

    if (!question || !report) {
      return NextResponse.json({ error: 'Question and cemetery report are required' }, { status: 400 });
    }

    const answer = await askSeance(question, report);
    return NextResponse.json({ answer });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
