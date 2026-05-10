export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, title, description, link, icon } = body

  if (!type || !title) {
    throw createError({ statusCode: 400, statusMessage: 'type and title are required' })
  }

  await createNotification(event, { type, title, description, link, icon })

  return { success: true }
})
