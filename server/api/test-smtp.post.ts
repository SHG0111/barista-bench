export default defineEventHandler(async () => {
  const resendApiKey = process.env.RESEND_API_KEY

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'Barista Bench <onboarding@resend.dev>',
      to: ['shahenda.galal.sh@gmail.com'],
      subject: 'SMTP Test',
      html: '<h1>Test</h1><p>If you see this, Resend works.</p>',
    }),
  })

  const result = await response.json()

  console.log('=== RESEND DIRECT TEST ===')
  console.log('Status:', response.status)
  console.log('Response:', JSON.stringify(result, null, 2))
  console.log('==========================')

  return { status: response.status, result }
})
