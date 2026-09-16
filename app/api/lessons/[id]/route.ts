import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('lesson-generator');
    const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(params.id) });

    if (!lesson) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(lesson);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
}
