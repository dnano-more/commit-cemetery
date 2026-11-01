import { NextResponse } from 'next/server';
import { analyzeRepository } from '@/lib/git/parser';
import { enrichReportWithAI } from '@/lib/ai/ollama';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { repositoryPath, demoType } = body;

    const report = await analyzeRepository(repositoryPath, demoType);
    const enriched = await enrichReportWithAI(report);

    return NextResponse.json(enriched);
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to exhume repository', details: errorMsg },
      { status: 500 }
    );
  }
}

