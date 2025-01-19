<template>
  <div class="app">
    <app-header />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./components/Header.vue";
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #0a0a0a;
  color: #ffffff;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

.app {
  min-height: 100vh;
}

.main-content {
  padding-top: 3.5rem;
}
</style>
