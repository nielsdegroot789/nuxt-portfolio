<template>
  <div>
    <input
      id="searchBar"
      v-model="searchTerm"
      type="text"
      placeholder="search"
      @keyup="search"
    />
    <div>
      <input
        v-model="searchComic"
        class="autoComplete"
        type="input"
        placeholder="autocomplete"
        @keyup="suggestComic"
      />
      <ul class="autocomplete-list">
        <li
          v-for="(comic, index) in comics"
          :key="index"
          class="autocomplete-items"
        >
          {{ comic.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchTerm: '',
      filterTimeout: 0,
      timeoutId: null,
      searchComic: '',
    };
  },
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
    },
    comics() {
      return this.$store.getters.comics;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.searchTerm = route.query.name;
        this.$store.dispatch('loadPeople', {
          pageNr: this.pageNr,
          name: this.searchTerm,
        });
      },
    },
  },
  methods: {
    search() {
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(() => {
        this.$router.push({
          path: '/characters/1',
          query: { name: this.searchTerm },
        });
      }, 1000);
    },
    suggestComic() {
      this.$store.dispatch('getComics', this.searchComic);
    },
  },
};
</script>

<style>
.autocomplete-items {
  border: 1px solid #d4d4d4;
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-items:hover {
  background-color: #4aae60;
  color: white;
}
</style>
