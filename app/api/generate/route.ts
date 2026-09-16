import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { lessonSchema } from '@/lib/schema';

export async function POST(req: Request) {
  const { topic, language, gradeLevel, questionCount } = await req.json();

  if (!topic || typeof topic !== 'string') {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
  }

  const languageName = language === 'ar' ? 'Arabic' : 'English';
  const count = Math.min(Math.max(Number(questionCount) || 5, 3), 10);

  try {
    const { object } = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: lessonSchema,
      prompt: `You are an experienced teacher creating classroom materials.
Write a lesson in ${languageName} on the topic: "${topic}", for ${gradeLevel} students.

Include:
- 3 to 5 clear learning objectives
- 3 to 5 lesson sections, each with a heading and teaching content
- ${count} multiple-choice quiz questions, each with exactly 4 options, the index of the correct option (0-3), and a short explanation of why it's correct

Write entirely in ${languageName}, and keep the tone and vocabulary appropriate for ${gradeLevel} students.`,
    });

    return NextResponse.json(object);
  } catch (err) {
    console.error('Lesson generation failed:', err);
    return NextResponse.json({ error: 'Failed to generate lesson' }, { status: 500 });
  }
}
