<template>
  <div>
    <div>
      <search class="search" />
      <spinner v-if="loading" class="spinner" />
      <div v-else class="results-container">
        <div v-for="(item, index) in people" :key="index" class="results">
          {{ item.name }}
          {{ item.modified }}
        </div>
      </div>
    </div>
    <Pagination />
  </div>
</template>

<script>
import spinner from '../components/SpinnerComponent';
import Pagination from '../components/Pagination';
export default {
  components: {
    Pagination,
    spinner,
  },
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
    },
    characters() {
      return this.$store.state.characters;
    },
    amount() {
      return this.$store.state.length;
    },
    people() {
      return this.$store.getters.people;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style></style>
