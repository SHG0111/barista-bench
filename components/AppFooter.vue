<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <div class="footer-logo-box"><span>BB</span></div>
            <span>BARISTA BENCH</span>
          </div>
          <p>
            The destination for meticulous baristas seeking tools that match
            their passion. Precision in every gram, every click, and every shot.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link">ig</a>
            <a href="#" class="social-link">tt</a>
            <a href="#" class="social-link">fb</a>
          </div>
        </div>

        <div class="footer-col">
          <h5>Shop</h5>
          <NuxtLink to="/shop?category=manual-grinders"
            >Manual Grinders</NuxtLink
          >
          <NuxtLink to="/shop?category=portafilters">Portafilters</NuxtLink>
          <NuxtLink to="/shop?category=tampers"
            >Tampers &amp; Levelers</NuxtLink
          >
          <NuxtLink to="/bundle">Bundle Builder</NuxtLink>
          <NuxtLink to="/reviews">Customer Reviews</NuxtLink>
        </div>

        <div class="footer-col">
          <h5>Support</h5>
          <NuxtLink to="/shippingPolicy">Shipping Policy</NuxtLink>
          <NuxtLink to="/returns">Returns &amp; Refunds</NuxtLink>
          <NuxtLink to="/compatibility">Compatibility Guide</NuxtLink>
          <NuxtLink to="/contact">Contact Us</NuxtLink>
        </div>

        <div class="footer-col">
          <h5>Newsletter</h5>
          <p class="newsletter-desc">
            Join our inner circle for precision tips and early access to drops.
          </p>
          <form class="newsletter-form" @submit.prevent="subscribe">
            <input v-model="email" type="email" placeholder="Your email" />
            <button type="submit">JOIN</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <span
          >© {{ new Date().getFullYear() }} Barista Bench. Precision tools for
          meticulous rituals.</span
        >
        <div class="footer-bottom-links">
          <NuxtLink to="/terms">Terms of Service</NuxtLink>
          <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref("");
const { success } = useToast();

function subscribe() {
  if (!email.value) return;
  success("You're on the list — welcome to the bench.");
  email.value = "";
}
</script>

<style scoped>
.app-footer {
  background: var(--bg-dark);
  color: #888;
  /* margin-top: 100px; */
}
.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 32px 28px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr 1.4fr;
  gap: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid var(--border-dark);
  margin-bottom: 24px;
}
.footer-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
}
.footer-logo-box {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-logo-box span {
  color: black;
  font-size: 8px;
  font-weight: 800;
}
.footer-brand p {
  font-size: 12.5px;
  color: #5a5855;
  line-height: 1.75;
  max-width: 260px;
}
.footer-social {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}
.social-link {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #555;
  text-decoration: none;
  transition: all 0.15s;
  text-transform: uppercase;
}
.social-link:hover {
  border-color: #555;
  color: #aaa;
}
.footer-col h5 {
  color: white;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: var(--font-body);
}
.footer-col a {
  display: block;
  color: #5a5855;
  font-size: 13px;
  text-decoration: none;
  margin-bottom: 11px;
  transition: color 0.15s;
}
.footer-col a:hover {
  color: #aaa;
}
.newsletter-desc {
  font-size: 12.5px;
  color: #5a5855;
  margin-bottom: 14px;
  line-height: 1.6;
}
.newsletter-form {
  display: flex;
}
.newsletter-form input {
  flex: 1;
  background: #252422;
  border: 1px solid var(--border-dark);
  border-right: none;
  border-radius: 5px 0 0 5px;
  padding: 9px 14px;
  color: white;
  font-size: 12px;
  font-family: var(--font-body);
  outline: none;
}
.newsletter-form input::placeholder {
  color: #444;
}
.newsletter-form button {
  background: var(--accent);
  color: white;
  border: none;
  padding: 9px 18px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-family: var(--font-body);
}
.newsletter-form button:hover {
  background: var(--accent-hover);
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #3a3835;
}
.footer-bottom-links {
  display: flex;
  gap: 24px;
}
.footer-bottom-links a {
  color: #3a3835;
  text-decoration: none;
  transition: color 0.15s;
}
.footer-bottom-links a:hover {
  color: #666;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 48px;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-brand p {
    max-width: 100%;
  }

  .footer-social {
    justify-content: center;
  }
  
  .newsletter-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
