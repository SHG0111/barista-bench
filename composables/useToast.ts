// composables/useToast.ts
interface Toast { id: string; message: string; icon?: string; duration?: number }

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  function show(message: string, icon = '✓', duration = 3000) {
    const id = Date.now().toString()
    toasts.value.push({ id, message, icon, duration })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  function success(message: string) { show(message, '✓') }
  function error(message: string) { show(message, '✕') }
  function info(message: string) { show(message, 'ℹ') }

  return { toasts, show, success, error, info }
}
