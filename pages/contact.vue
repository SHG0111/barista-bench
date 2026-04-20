<template>
  <div class="contact-landing">
    <div class="container">
      
      <!-- 1. Hero Section -->
      <div class="hero-section">
        <div class="hero-left">
          <div class="hero-label">SUPPORT &amp; INQUIRIES</div>
          <h1 class="hero-title">
            Contact<br />
            <span class="hero-italic">Us</span>
          </h1>
          <p class="hero-desc">
            We are here to assist with technical support, order inquiries, or gear advice. Reach out to our team of specialists for a prompt and personalized response.
          </p>
        </div>
        <div class="hero-right">
          <NuxtImg src="/contact_hero.png" alt="Contact Customer Service" class="hero-img" />
        </div>
      </div>

      <!-- 2. Grid Sections -->
      <div class="details-grid">
        
        <!-- Contact Form Card -->
        <div class="detail-card card-form">
          <h2>Send a message</h2>
          <p style="margin-bottom:24px;">Please fill out the form below and a sensory sommelier will be with you shortly.</p>
          
          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="input-group">
                <label>First Name</label>
                <input type="text" placeholder="John" required />
              </div>
              <div class="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" required />
              </div>
            </div>
            
            <div class="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="john.doe@example.com" required />
            </div>
            
            <div class="input-group">
              <label>Subject</label>
              <select required>
                <option value="" disabled selected>Select an inquiry type...</option>
                <option value="order">Order Update</option>
                <option value="technical">Technical Support</option>
                <option value="press">Press / Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="input-group">
              <label>Message</label>
              <textarea rows="4" placeholder="How can we help you?" required></textarea>
            </div>

            <button type="submit" class="btn-primary-alt" :disabled="submitted">
              {{ submitted ? 'MESSAGE SENT' : 'SEND MESSAGE' }}
            </button>
          </form>
        </div>

        <!-- Sidebar Info -->
        <div class="sidebar-info">
          
          <div class="detail-card info-card">
            <div class="info-icon">🕒</div>
            <h3>Operating Hours</h3>
            <p>Mon – Fri: 9:00 AM – 5:00 PM (EST)<br/>Sat – Sun: Closed</p>
            <div class="small-note">Holiday hours may vary.</div>
          </div>

          <div class="detail-card info-card">
            <div class="info-icon">✉️</div>
            <h3>Direct Lines</h3>
            <p>General: <a href="mailto:hello@baristabench.com" class="text-link">hello@baristabench.com</a><br/>
               Support: <a href="mailto:support@baristabench.com" class="text-link">support@baristabench.com</a></p>
          </div>

          <div class="detail-card info-card card-chat">
            <div class="chat-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.5 8.38 8.38 0 0 1 3.8.9L21 3z"></path>
              </svg>
            </div>
            <h3>Live Chat</h3>
            <p>For immediate technical assistance during our operating hours.</p>
            <button class="btn-chat-trigger" @click="openChat">START CHAT</button>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
definePageMeta({ layout: 'default' });

const { openChat } = useSupport();
const submitted = ref(false);
const submitForm = () => {
  submitted.value = true;
  setTimeout(() => submitted.value = false, 3000);
};
</script>

<style scoped>
/* Copied and adapted exact aesthetics */
.contact-landing {
  background-color: #1a1918;
  color: #f7f5f2;
  min-height: 100vh;
  padding: 80px 0 100px;
  --accent-gold: #e2b382;
  --card-bg: #272524;
  --text-muted: #aca9a4;
  font-family: var(--font-body);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 1. Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  gap: 80px;
  margin-bottom: 80px;
}

.hero-left {
  flex: 1;
}

.hero-label {
  color: var(--accent-gold);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 82px;
  line-height: 1.05;
  margin-bottom: 24px;
  color: #fff;
  font-weight: 600;
}

.hero-italic {
  font-style: italic;
  color: var(--accent-gold);
  font-weight: 500;
}

.hero-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 440px;
  margin-bottom: 40px;
}

.hero-right {
  flex: 1;
}

.hero-img {
  width: 100%;
  height: 480px; /* Specific crop for contact page */
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

/* 2. Grid System */
.details-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
  margin-bottom: 80px;
  align-items: start;
}

.detail-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.detail-card h2 {
  font-family: var(--font-display, "Playfair Display", serif);
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 12px;
  color: #fff;
}

.detail-card h3 {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #fff;
}

.detail-card p {
  font-size: 13.5px;
  color: var(--text-muted);
  line-height: 1.65;
}

/* Form Styles */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.input-group input, 
.input-group select, 
.input-group textarea {
  background-color: #1a1918;
  border: 1px solid #3b3732;
  border-radius: 4px;
  padding: 12px 16px;
  color: #fff;
  font-family: var(--font-body);
  font-size: 14px;
  transition: all 0.2s;
}

.input-group input:focus, 
.input-group select:focus, 
.input-group textarea:focus {
  outline: none;
  border-color: var(--accent-gold);
}

.btn-primary-alt {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 28px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  background-color: var(--accent-gold);
  color: #1a1918;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 10px;
}

.btn-primary-alt:hover:not(:disabled) {
  background-color: #f1bf8b;
  transform: translateY(-2px);
}

.btn-primary-alt:disabled {
  background-color: #3b3732;
  color: var(--text-muted);
  cursor: not-allowed;
}

/* Sidebar Notes */
.sidebar-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  padding: 30px;
}

.info-icon {
  font-size: 24px;
  margin-bottom: 16px;
  color: var(--accent-gold);
}

.text-link {
  color: var(--accent-gold);
  text-decoration: none;
  font-weight: 600;
}

.text-link:hover {
  text-decoration: underline;
}

.small-note {
  font-size: 11px;
  color: #666;
  margin-top: 12px;
}

.card-chat {
  background: #1c1b18;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.chat-icon-wrap {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  color: var(--accent-gold);
}

.chat-icon-wrap svg {
  width: 22px;
  height: 22px;
}

.btn-chat-trigger {
  width: 100%;
  padding: 18px;
  background: #2a2826;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-chat-trigger:hover {
  background: #3a3835;
  letter-spacing: 0.2em;
  color: var(--accent-gold);
}

/* Responsive Overrides */
@media (max-width: 900px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }
  .hero-title {
    font-size: 56px;
  }
  .details-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 40px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .btn-primary-alt {
    width: 100%;
  }
}
</style>
