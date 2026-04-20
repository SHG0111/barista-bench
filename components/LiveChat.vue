<template>
  <div class="chat-system">
    <!-- Floating Trigger -->
    <button
      class="chat-trigger"
      :class="{ 'is-active': isOpen }"
      @click="isOpen = !isOpen"
      aria-label="Open support chat"
    >
      <svg
        v-if="!isOpen"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
        <path
          d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
        ></path>
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Chat Window -->
    <Transition name="slide-up">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <div class="header-info">
            <div class="status-dot"></div>
            <div>
              <h3>Support Barista</h3>
              <p>Online • Responses in < 5m</p>
            </div>
          </div>
        </div>

        <div class="chat-body" ref="bodyRef">
          <div class="msg-group">
            <div class="msg bot">
              Hey there! 👋 I'm here to help with any technical questions about
              our grinders or portafilters.
            </div>
            <div class="msg bot">What can I help you perfect today?</div>
          </div>

          <div v-for="(msg, idx) in messages" :key="idx" class="msg-group">
            <div class="msg" :class="msg.type">
              {{ msg.text }}
            </div>
          </div>
        </div>

        <div class="chat-footer">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          />
          <button class="send-btn" @click="sendMessage">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
const { isOpen, toggleChat, openChat } = useSupport();
const newMessage = ref("");
const messages = ref<any[]>([]);
const bodyRef = ref<HTMLElement | null>(null);

// Auto-open logic
onMounted(() => {
  setTimeout(() => {
    // Only auto-open if the user hasn't already interacted or closed it
    if (!isOpen.value) {
      openChat();
    }
  }, 4000); // 4 seconds delay
});

function sendMessage() {
  if (!newMessage.value.trim()) return;

  messages.value.push({
    text: newMessage.value,
    type: "user",
  });

  const text = newMessage.value.toLowerCase();
  newMessage.value = "";

  // Fake bot response
  setTimeout(() => {
    let reply =
      "I've logged your request. A specialist will be with you shortly!";
    if (text.includes("shipping"))
      reply =
        "All orders over $150 include free express shipping. We typically ship within 24 hours.";
    if (text.includes("grinder"))
      reply =
        "The Artisan Series uses 48mm conical burrs. Would you like the technical specs?";

    messages.value.push({
      text: reply,
      type: "bot",
    });

    nextTick(() => {
      if (bodyRef.value) {
        bodyRef.value.scrollTop = bodyRef.value.scrollHeight;
      }
    });
  }, 800);
}
</script>

<style scoped>
.chat-system {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  font-family: var(--font-body);
}

.chat-trigger {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--accent);
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(196, 130, 74, 0.25); /* Subtle tinted shadow for gold button */
}

.chat-trigger:hover {
  transform: translateY(-4px) scale(1.05);
  background: var(--accent-hover);
  box-shadow: 0 8px 24px rgba(196, 130, 74, 0.35);
}

.chat-trigger svg {
  width: 24px;
  height: 24px;
  display: block;
}

/* Chat Window */
.chat-window {
  position: absolute;
  bottom: 72px;
  right: 0;
  width: 360px;
  height: 480px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  transform-origin: bottom right; /* Point of origin for popup */
}

.chat-header {
  padding: 24px;
  background: #f8f7f4;
  border-bottom: 1px solid var(--border);
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-dot {
  width: 10px;
  height: 10px;
  background: #2e7d4f;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(46, 125, 79, 0.15);
}

.chat-header h3 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 2px;
}

.chat-header p {
  font-size: 11px;
  color: var(--text-2);
}

.chat-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scroll-behavior: smooth;
}

.msg-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.msg {
  max-width: 85%;
  padding: 12px 16px;
  font-size: 13.5px;
  line-height: 1.5;
}

.msg.bot {
  background: #f1f0ee;
  color: var(--text);
  border-radius: 2px 16px 16px 16px;
  align-self: flex-start;
}

.msg.user {
  background: var(--text);
  color: white;
  border-radius: 16px 16px 2px 16px;
  align-self: flex-end;
}

.chat-footer {
  padding: 16px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 10px;
  background: #f8f7f4;
}

.chat-footer input {
  flex: 1;
  background: white;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.2s;
}

.chat-footer input:focus {
  border-color: var(--accent);
}

.send-btn {
  width: 40px;
  height: 40px;
  background: var(--text);
  color: white;
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.send-btn:hover {
  background: var(--accent);
}

.send-btn svg {
  width: 18px;
  height: 18px;
}

/* ──────── Premium Animations ──────── */
.slide-up-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring-like Cubic Bezier */
}

.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.7);
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 40px);
    right: -10px;
    height: 70vh;
  }
}

@media (max-width: 480px) {
  .chat-window {
    width: calc(100vw - 40px);
    right: -10px;
    height: 70vh;
  }
}
</style>
