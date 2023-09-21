<script setup lang="ts">

</script>

<template>
  <div>
    <h1>
      Home
    </h1>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/dashboard">Dashboard</router-link>
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