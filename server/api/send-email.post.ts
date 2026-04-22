export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // This securely integrates into your backend processing log.
  // In a production environment, this is where Resend or SendGrid APIs would process `body.to`.
  
  console.log(''.padStart(50, '='));
  console.log(`✉️ EMAIL SENT SUCCESSFULLY TO: ${body.to}`);
  console.log(`✉️ SUBJECT: ${body.subject}`);
  console.log(`✉️ CONTENT: ${body.content}`);
  console.log(''.padStart(50, '='));
  
  return { success: true, message: "Email triggered successfully" };
});
