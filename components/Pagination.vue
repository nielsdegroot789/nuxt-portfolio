<template>
  <div>
    <h1>Pagination</h1>
    <nuxt-link
      v-if="!first == false"
      :to="{ path: '/characters/' + first, query: { name: searchTerm } }"
      >First</nuxt-link
    >
    <nuxt-link
      v-if="!previous == false"
      :to="{ path: '/characters/' + previous, query: { name: searchTerm } }"
      >previous</nuxt-link
    >
    <nuxt-link
      v-for="page in pageButtons"
      :key="page"
      :to="{
        path: '/characters/' + page,
        query: { name: searchTerm },
      }"
    >
      {{ page }}
    </nuxt-link>
    <nuxt-link
      v-if="!next == false"
      :to="{ path: '/characters/' + next, query: { name: searchTerm } }"
      >next</nuxt-link
    >
    <nuxt-link
      v-if="!last == false"
      :to="{ path: '/characters/' + last, query: { name: searchTerm } }"
      >Last</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  computed: {
    pageNr() {
      return parseInt(this.$route.params.page);
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
    first() {
      if (this.pageNr === 1) {
        return false;
      }
      return 1;
    },
    next() {
      if (this.pageNr === this.totalPages) {
        return false;
      }
      return this.pageNr + 1;
    },
    previous() {
      if (this.pageNr === 1) {
        return false;
      }
      return this.pageNr - 1;
    },
    last() {
      if (this.pageNr === this.totalPages) {
        return false;
      }
      return this.totalPages;
    },
    searchTerm() {
      return this.$store.getters.searchTerm;
    },

    pageButtons() {
      const start = Math.min(this.totalPages - 4, Math.max(1, this.pageNr - 2));
      const array = [];
      for (let i = start; i <= start + 5; i++) {
        array.push(i + 1);
      }
      return array;
    },
  },
};
</script>

<style></style>
