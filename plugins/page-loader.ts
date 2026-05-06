export default defineNuxtPlugin(() => {
  const router = useRouter()
  const isLoading = useState("page-loading", () => false)
  let timeout: ReturnType<typeof setTimeout> | null = null

  router.beforeEach(() => {
    if (timeout) clearTimeout(timeout)
    isLoading.value = true
  })

  router.afterEach(() => {
    timeout = setTimeout(() => {
      isLoading.value = false
    }, 300)
  })

  router.onError(() => {
    isLoading.value = false
  })
})
