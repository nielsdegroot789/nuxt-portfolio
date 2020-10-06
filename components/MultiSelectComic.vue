<template>
  <div>
    <div v-for="comic in comics" :key="comic.id">
      {{ comic.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiSelectComic',

  data() {
    return {
      comics: [],
    };
  },
  computed: {
    getBatchComics() {
      return this.$store.batchComic;
    },
  },
};
</script>

<style></style>
