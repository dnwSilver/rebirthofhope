<script setup>
import { ref } from "vue";

const config = useRuntimeConfig();
const api = config.public.api;
const loading = ref(false);
const arts = ref(null);
const error = ref(null);

if (!api?.toString().includes("rebirthofhope")) {
  console.log("Env variable NUXT_PUBLIC_API not found.");
}

const fetchData = async () => {
  error.value = arts.value = null;
  loading.value = true;

  try {
    arts.value = (await $fetch(api + "/api/arts")).arts;
  } catch (err) {
    error.value = err.toString();
    console.log("ERR", err);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  if (typeof window !== "undefined") {
    fetchData();
  }
});
</script>

<template>
  <ClientOnly>
    <div>
      <h1 v-if="loading">⏳ Loading ...</h1>

      <h1 v-if="error">💥 Что-то пошло не так...</h1>

      <h1 v-if="arts">Лучшие картины мира!</h1>
      <section v-if="arts">
        <img v-for="art in arts" v-bind:src="'/arts/' + art" height="200px" />
      </section>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "Gallery",
};
</script>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
  width: 100%;
  color: #fff;
  text-shadow: 2px 0 #111, -2px 0 #111, 0 2px #111, 0 -2px #111, 1px 1px #111, -1px -1px #111, 1px -1px #111,
    -1px 1px #111;
}
section {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  margin: 2rem;
}
</style>
