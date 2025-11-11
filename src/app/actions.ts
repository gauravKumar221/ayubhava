'use server';

import {
  generateReport,
  type GenerateReportOutput,
} from '@/ai/flows/generate-report-from-notes';
import { z } from 'zod';

const reportSchema = z.object({
  text: z.string().min(10, { message: 'Please enter at least 10 characters.' }),
});

export type FormState = {
  message: string;
  data?: GenerateReportOutput;
  error?: boolean;
};

export async function generateReportAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = reportSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please enter valid text to generate a report.',
      error: true,
    };
  }

  try {
    const output = await generateReport({ text: validatedFields.data.text });
    return { message: 'Report generated successfully.', data: output };
  } catch (e) {
    return {
      message: 'Failed to generate report. Please try again.',
      error: true,
    };
  }
}
