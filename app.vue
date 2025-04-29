<template>
  <div class="li">
    <div class="container">
      <Navbar></Navbar>

      <NuxtPage />
    </div>
  </div>
</template>


<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

body{
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background: #F8F8F8;
}
*{
  box-sizing: border-box;
}
.li{
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px 0 5px 0;
}






.container {
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}

</style>
<script setup lang="ts">
</script>