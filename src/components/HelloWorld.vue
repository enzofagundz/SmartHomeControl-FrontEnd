<script setup lang="ts">

</script>

<template>
  <div>
    <h1>
      HelloWorld.vue
    </h1>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
      <li>
        <router-link to="/registerConfirm">Register Confirm</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>

ul {
  display: flex;
  flex-direction: column;
}

li a {
  text-decoration: none;
  margin-right: 10px;
}

</style>