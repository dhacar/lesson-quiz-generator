'use client';

import { useState, FormEvent } from 'react';

interface LessonFormProps {
  onSubmit: (data: { topic: string; language: 'en' | 'ar'; gradeLevel: string; questionCount: number }) => void;
  isLoading: boolean;
}

export default function LessonForm({ onSubmit, isLoading }: LessonFormProps) {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [gradeLevel, setGradeLevel] = useState('middle school');
  const [questionCount, setQuestionCount] = useState(5);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit({ topic: topic.trim(), language, gradeLevel, questionCount });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="topic" className="block font-serif text-lg text-ink mb-2">
          What&apos;s today&apos;s lesson about?
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. the water cycle, fractions, the five pillars of Islam"
          className="w-full border-b-2 border-rule bg-transparent py-2 text-ink placeholder:text-ink/40 focus:outline-none focus:border-chalkboard"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="language" className="block text-sm text-ink/70 mb-1">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
            className="w-full border-b-2 border-rule bg-transparent py-2 text-ink focus:outline-none focus:border-chalkboard"
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        <div>
          <label htmlFor="gradeLevel" className="block text-sm text-ink/70 mb-1">
            Grade level
          </label>
          <select
            id="gradeLevel"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="w-full border-b-2 border-rule bg-transparent py-2 text-ink focus:outline-none focus:border-chalkboard"
          >
            <option value="elementary">Elementary</option>
            <option value="middle school">Middle school</option>
            <option value="high school">High school</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="questionCount" className="block text-sm text-ink/70 mb-1">
          Quiz questions: {questionCount}
        </label>
        <input
          id="questionCount"
          type="range"
          min={3}
          max={10}
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          className="w-full accent-chalkboard"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-chalkboard text-paper px-6 py-3 font-serif text-lg hover:bg-chalkboard/90 disabled:opacity-50 transition-colors"
      >
        {isLoading ? 'Writing the lesson…' : 'Generate lesson'}
      </button>
    </form>
  );
}
