<template>
  <div>
    <PageLoader />
    <AppNav />
    <main>
      <slot />
    </main>
    <AppFooter />
    <ToastContainer />
    <LiveChat />
  </div>
</template>
