// composables/useSupport.ts
export const useSupport = () => {
  const isOpen = useState('support-chat-open', () => false)
  
  const openChat = () => { isOpen.value = true }
  const closeChat = () => { isOpen.value = false }
  const toggleChat = () => { isOpen.value = !isOpen.value }
  
  return {
    isOpen,
    openChat,
    closeChat,
    toggleChat
  }
}
