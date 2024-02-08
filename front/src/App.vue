<template>
  <div>
    <router-view/>
    <footer>
      <p>Copyright © Epitech Digital School YOWL grp 4 PGP2028</p>
    </footer>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
</script>

<style scoped>

footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
  position: relative;
  width: 100%;
}


footer p {
  color: #666;
  font-size: 0.9rem;
}
</style>
