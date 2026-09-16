'use client';

import type { Lesson } from '@/lib/schema';
import QuizView from './QuizView';

interface LessonResultProps {
  lesson: Lesson;
  language: 'en' | 'ar';
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}

export default function LessonResult({ lesson, language, onSave, saving, saved }: LessonResultProps) {
  const isArabic = language === 'ar';

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-arabic' : ''}>
      <h2 className="font-serif text-3xl mb-4">{lesson.title}</h2>

      <div className="mb-8">
        <h3 className="text-sm italic text-ink/60 mb-2">{isArabic ? 'أهداف الدرس' : 'Objectives'}</h3>
        <ul className="list-disc ps-5 space-y-1">
          {lesson.objectives.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-6 mb-10">
        {lesson.sections.map((section, i) => (
          <div key={i} className="rule-line pt-4">
            <h3 className="font-serif text-xl mb-2">{section.heading}</h3>
            <p className="leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

      <h3 className="font-serif text-2xl mb-4">{isArabic ? 'اختبار قصير' : 'Quiz'}</h3>
      <QuizView questions={lesson.quiz} />

      <div className="mt-8">
        <button
          onClick={onSave}
          disabled={saving || saved}
          className="border-2 border-chalkboard text-chalkboard px-5 py-2 font-serif disabled:opacity-50"
        >
          {saved
            ? isArabic
              ? 'تم الحفظ'
              : 'Saved'
            : saving
            ? isArabic
              ? 'جارٍ الحفظ…'
              : 'Saving…'
            : isArabic
            ? 'حفظ الدرس'
            : 'Save lesson'}
        </button>
      </div>
    </div>
  );
}
