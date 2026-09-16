'use client';

import { useState, useEffect } from 'react';
import LessonForm from '@/components/LessonForm';
import LessonResult from '@/components/LessonResult';
import type { Lesson } from '@/lib/schema';

interface SavedLessonSummary {
  _id: string;
  title: string;
  topic: string;
  language: string;
  createdAt: string;
}

interface FormData {
  topic: string;
  language: 'en' | 'ar';
  gradeLevel: string;
  questionCount: number;
}

export default function Home() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<SavedLessonSummary[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    fetch('/api/lessons')
      .then((res) => res.json())
      .then(setHistory)
      .catch(() => {});
  }, [saved]);

  async function handleGenerate(data: FormData) {
    setIsLoading(true);
    setError(null);
    setLesson(null);
    setSaved(false);
    setLanguage(data.language);
    setFormData(data);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Generation failed');
      const generated: Lesson = await res.json();
      setLesson(generated);
    } catch {
      setError('Something went wrong generating the lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!lesson || !formData) return;
    setSaving(true);
    try {
      await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lesson,
          topic: formData.topic,
          language: formData.language,
          gradeLevel: formData.gradeLevel,
        }),
      });
      setSaved(true);
    } catch {
      // Saving is best-effort for v1; the generated lesson is still on screen either way.
    } finally {
      setSaving(false);
    }
  }

  async function loadSavedLesson(id: string) {
    const res = await fetch(`/api/lessons/${id}`);
    if (!res.ok) return;
    const data = await res.json();
    setLesson(data);
    setLanguage((data.language as 'en' | 'ar') ?? 'en');
    setSaved(true);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-4xl text-chalkboard">Lesson &amp; Quiz Generator</h1>
        <p className="text-ink/70 mt-2">Turn any topic into a ready-to-teach lesson plan and quiz.</p>
      </header>

      <LessonForm onSubmit={handleGenerate} isLoading={isLoading} />

      {error && <p className="text-red-700 mt-6">{error}</p>}

      {lesson && (
        <div className="mt-14 rule-line pt-10">
          <LessonResult lesson={lesson} language={language} onSave={handleSave} saving={saving} saved={saved} />
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-20 rule-line pt-10">
          <h2 className="font-serif text-2xl mb-4">Recent lessons</h2>
          <ul className="space-y-2">
            {history.map((item) => (
              <li key={item._id}>
                <button
                  onClick={() => loadSavedLesson(item._id)}
                  className="text-ink hover:text-chalkboard underline underline-offset-4"
                >
                  {item.title || item.topic}
                </button>
                <span className="text-ink/50 text-sm ms-2">{new Date(item.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
