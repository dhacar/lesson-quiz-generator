'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/schema';

export default function QuizView({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const score = questions.reduce((total, q, i) => (answers[i] === q.correctIndex ? total + 1 : total), 0);

  return (
    <div className="space-y-8">
      {questions.map((q, i) => (
        <div key={i} className="rule-line pt-4">
          <p className="font-serif text-lg mb-3">
            {i + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, oi) => {
              const isSelected = answers[i] === oi;
              const isCorrect = checked && oi === q.correctIndex;
              const isWrong = checked && isSelected && oi !== q.correctIndex;
              return (
                <label
                  key={oi}
                  className={`flex items-center gap-3 py-1 cursor-pointer ${isCorrect ? 'text-fern' : ''} ${
                    isWrong ? 'text-red-700' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${i}`}
                    checked={isSelected}
                    onChange={() => setAnswers((prev) => ({ ...prev, [i]: oi }))}
                    disabled={checked}
                    className="accent-chalkboard"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
          {checked && <p className="text-sm text-ink/70 mt-2 italic">{q.explanation}</p>}
        </div>
      ))}

      <div className="rule-line pt-6 flex items-center gap-4">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={Object.keys(answers).length < questions.length}
            className="bg-chalk text-ink px-5 py-2 font-serif disabled:opacity-40"
          >
            Check answers
          </button>
        ) : (
          <p className="font-serif text-lg">
            Score: {score} / {questions.length}
          </p>
        )}
      </div>
    </div>
  );
}
