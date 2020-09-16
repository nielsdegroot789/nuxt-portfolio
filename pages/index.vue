<template>
  <div>
    <div class="results-container">
      <div v-for="(item, index) in people.results" :key="index" class="results">
        {{ item.name }}
      </div>
    </div>
    <div class="container-2">
      <li
        v-for="item in items"
        :key="item.id"
        :class="{ active: selected == item.id }"
        @click="getValue(item.id)"
      >
        {{ item.id }}
      </li>
    </div>
    <input type="button" value="Go Back" class="back" @click="Back" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      selected: [],
      items: [],
      goBack: true,
    };
  },
  computed: {
    people() {
      return this.$store.getters.people;
    },
    secondIndex() {
      return this.$store.state.index[1];
    },
  },
  created() {
    this.$store.dispatch('loadPeople');
    this.generateLinks();
  },
  methods: {
    generateLinks() {
      for (let i = 1; i < 10; i++) {
        this.items.push({
          id: i,
        });
      }
    },

    getValue(id) {
      this.selected = id;
      this.$store.dispatch('changePage', id);
    },
    Back() {
      const index = this.secondIndex;
      this.selected = index;
      this.$store.dispatch('goBack', index);
    },
  },
};
</script>

<style>
.results-container {
  height: 320px;
}
input[type='button'] {
  background-color: rgb(149, 201, 149);
  border-radius: 3px;
  width: 5rem;
  height: 2rem;
  display: block;
  margin: auto;
  width: 50%;
}
.results {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  list-style: none;
}

.container-2 {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  list-style: none;
}

li {
  padding: 1rem;
  cursor: pointer;
  border-radius: 3px;
}
.active {
  border: 5px solid goldenrod;
}
.navigation {
  text-align: center;
  cursor: pointer;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
