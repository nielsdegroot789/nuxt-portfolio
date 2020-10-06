<template>
  <div class="search-container">
    <input
      id="searchBar"
      v-model="searchTerm"
      type="text"
      placeholder="search"
      @keyup="search"
    />
    <MultiSelectContainer />
  </div>
</template>

<script>
import MultiSelectContainer from '../components/MultiSelectContainer';
export default {
  name: 'Search',
  components: {
    MultiSelectContainer,
  },
  data() {
    return {
      searchTerm: '',
      filterTimeout: 0,
      timeoutId: null,
    };
  },
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
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
.search-container {
  padding-top: 5rem;
}
</style>
