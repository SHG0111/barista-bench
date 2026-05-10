import { createClient } from '@supabase/supabase-js'

export async function createNotification(event: any, notification: {
  type: string
  icon?: string
  title: string
  description?: string
  link?: string
}) {
  const config = useRuntimeConfig(event)
  const supabase = createClient(config.public.supabaseUrl as string, config.supabaseSecretKey as string, {
    auth: { persistSession: false },
  })

  const { error } = await supabase.from('notifications').insert({
    type: notification.type,
    icon: notification.icon || getDefaultIcon(notification.type),
    title: notification.title,
    description: notification.description || null,
    link: notification.link || null,
  })

  if (error) {
    console.error('Failed to create notification:', error)
  }
}

function getDefaultIcon(type: string): string {
  const iconMap: Record<string, string> = {
    order: 'solar:cart-check-broken',
    user: 'solar:user-plus-broken',
    payment: 'solar:wallet-broken',
    alert: 'solar:danger-broken',
    return: 'solar:undo-left-round-broken',
    review: 'solar:chat-round-like-broken',
  }
  return iconMap[type] || 'solar:info-circle-broken'
}
