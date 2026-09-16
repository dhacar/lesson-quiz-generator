import { z } from 'zod';

export const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
  explanation: z.string(),
});

export const lessonSchema = z.object({
  title: z.string(),
  objectives: z.array(z.string()),
  sections: z.array(
    z.object({
      heading: z.string(),
      content: z.string(),
    })
  ),
  quiz: z.array(quizQuestionSchema),
});

export type Lesson = z.infer<typeof lessonSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
