

<template>
  <div id="cart-app">
    <header>
      <app-header-and-nav />
    
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <app-footer />
    </footer>
  </div>
</template>

<script>
import AppHeaderAndNav from './components/AppHeaderAndNav.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  components: {
    AppHeaderAndNav,
    AppFooter
  }
}
</script>
<style scoped></style>