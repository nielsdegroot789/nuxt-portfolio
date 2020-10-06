<template>
  <div>
    <input
      v-model="searchComic"
      class="autoComplete"
      type="input"
      placeholder="autocomplete"
      @keyup="suggestComic()"
    />
    <div>{{ multiselectResult }}</div>
    <ul class="autocomplete-list">
      <li
        v-for="(comic, index) in comics"
        :key="index"
        class="autocomplete-items"
        @click="saveComic(comic.title, comic.id)"
      >
        {{ comic.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MultiSelectContainer',
  data() {
    return {
      multiselectResult: [],
      searchComic: '',
    };
  },
  computed: {
    comics() {
      return this.$store.getters.comics;
    },
    batchComic() {
      return this.$store.batchComic;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        // const comicIdArray = this.$route.query.comic.split(',');
        // this.$store.dispatch('addComicBatch', comicIdArray);
      },
    },
  },
  methods: {
    suggestComic() {
      this.$store.dispatch('getComics', this.searchComic);
    },
    saveComic(comicName, comicId) {
      const queryString = this.$route.query.comic
        ? this.$route.query.comic + ',' + comicId
        : comicId;
      this.multiselectResult.push(comicName);
      this.$router.push({
        query: { comic: queryString },
      });
    },
  },
};
</script>

<style></style>
