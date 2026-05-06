import { z } from 'zod';

const emailSchema = z.object({
  to: z.string().email('Please enter a valid email address'),
  subject: z.string().min(1, 'Email subject is required').max(200, 'Subject is too long'),
  content: z.string().min(1, 'Email content is required'),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  const validation = emailSchema.safeParse(body);
  if (!validation.success) {
    const firstError = validation.error.issues[0]
    throw createError({ statusCode: 400, statusMessage: firstError?.message ?? 'Validation failed' });
  }

  const { to, subject, content } = validation.data;
  
  console.log(''.padStart(50, '='));
  console.log(`✉️ EMAIL SENT SUCCESSFULLY TO: ${to}`);
  console.log(`✉️ SUBJECT: ${subject}`);
  console.log(`✉️ CONTENT: ${content}`);
  console.log(''.padStart(50, '='));
  
  return { success: true, message: "Email triggered successfully" };
});
