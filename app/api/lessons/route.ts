import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { lessonSchema } from '@/lib/schema';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('lesson-generator');
    const lessons = await db
      .collection('lessons')
      .find({}, { projection: { quiz: 0, sections: 0 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(lessons);
  } catch (err) {
    console.error('Failed to list lessons:', err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = lessonSchema.safeParse(body.lesson);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid lesson data' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('lesson-generator');
    const result = await db.collection('lessons').insertOne({
      ...parsed.data,
      topic: body.topic,
      language: body.language,
      gradeLevel: body.gradeLevel,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId });
  } catch (err) {
    console.error('Failed to save lesson:', err);
    return NextResponse.json({ error: 'Failed to save lesson' }, { status: 500 });
  }
}
