<template>
  <header class="app-header">
    <nav class="main-nav">
      <h1 class="logo">Vue Moving Light</h1>
      <div class="nav-right">
        <a
          href="https://github.com/DOCHIS/vue-movinglight"
          target="_blank"
          rel="noopener"
          class="github-link"
          title="View on GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=DOCHIS&repo=vue-movinglight&type=star&count=true"
          frameborder="0"
          scrolling="0"
          width="150"
          height="20"
          title="GitHub Stars"
          class="github-stars"
        ></iframe>
        <button
          class="menu-toggle"
          @click="isMenuOpen = !isMenuOpen"
          :aria-expanded="isMenuOpen"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="sr-only">Toggle menu</span>
        </button>
        <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
          <router-link to="/single" @click="isMenuOpen = false"
            >Single Light</router-link
          >
          <router-link to="/showroom" @click="isMenuOpen = false"
            >Light Showroom</router-link
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 3.5rem;
}

.main-nav {
  background: rgba(40, 40, 40, 0.95);
  backdrop-filter: blur(8px);
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.github-link {
  color: white;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
}

.github-link:hover {
  opacity: 0.8;
}

.github-stars {
  transform: scale(1.1);
  margin-right: 0.5rem;
}

.nav-links {
  display: flex;
  gap: 0.75rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-links a.router-link-active {
  background: #555;
}

.menu-toggle {
  display: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 640px) {
  .github-stars {
    display: none;
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    padding: 0.5rem;
    margin-left: 0.5rem;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  .bar {
    display: block;
    width: 22px;
    height: 2px;
    background-color: white;
    transition: 0.3s;
  }

  .bar:first-child {
    margin-bottom: 6px;
  }

  .menu-toggle[aria-expanded="true"] .bar:first-child {
    transform: rotate(45deg) translate(4px, 4px);
  }

  .menu-toggle[aria-expanded="true"] .bar:last-child {
    transform: rotate(-45deg) translate(4px, -4px);
  }

  .nav-links {
    position: fixed;
    top: 3.5rem;
    left: 0;
    right: 0;
    background: rgba(40, 40, 40, 0.98);
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-links a {
    width: 100%;
    text-align: center;
    padding: 0.75rem;
  }
}
</style>
