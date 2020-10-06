<template>
  <div
    :class="{
      'marvel-header': true,
      'marvel-header--fixed': fixed,
      'marvel-header--show': show,
      'marvel-header--animate': animate,
    }"
  >
    <div class="logo">
      <img src="../assets/1200px-MarvelLogo.svg.png" alt="marvel" />
    </div>
    <div v-for="link in navlinks" :key="link.index" class="link-container">
      <nuxt-link class="links" :to="link.path">{{ link.label }} </nuxt-link>
      <div v-if="link.subMenu.length" class="subMenu">
        <div
          v-for="sublink in link.subMenu"
          :key="sublink.index"
          class="subLink"
        >
          <nuxt-link :to="sublink.path">{{ sublink.label }}</nuxt-link>
        </div>
      </div>
    </div>
    <button
      :class="['nav-button', { active: hamburger }]"
      @click="openHamburger"
    >
      <span class="span span-1"></span>
      <span class="span span-2"></span>
      <span class="span span-3"></span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      hamburger: false,
      scrollDirection: '',
      goingUp: false,
      previousScroll: '',
      navlinks: [
        {
          label: 'Home',
          path: '/characters/1',
          subMenu: [],
        },
        {
          label: 'About',
          path: '/characters/about',
          subMenu: [],
        },
        {
          label: 'Contact',
          path: '/characters/contact',
          subMenu: [],
        },
        {
          label: 'Marvel',
          path: '/characters/1',
          subMenu: [
            {
              label: 'characters',
              path: '/characters/1',
            },
            {
              label: 'comics',
              path: '/characters/comics',
            },
            {
              label: 'stories',
              path: '/characters/stories',
            },
          ],
        },
      ],
    };
  },
  computed: {
    fixed() {
      if (this.goingUp) {
        return this.previousScroll > 0;
      } else {
        return this.previousScroll >= 50;
      }
    },
    show() {
      if (this.goingUp) {
        return this.scrollDirection - this.previousScroll > 50;
      }
      return false;
    },
    animate() {
      return this.previousScroll >= 100 || this.goingUp;
    },
  },

  created() {
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('scroll', this.checkScroll);
    }
  },
  methods: {
    openHamburger() {
      if (this.hamburger === false) {
        this.hamburger = true;
      } else {
        this.hamburger = false;
      }
    },
    checkScroll() {
      console.log('test');
      const goingUp = this.previousScroll > window.scrollY;
      if (this.goingUp !== goingUp) {
        this.scrollDirection = window.scrollY;
        this.goingUp = goingUp;
      }
      this.previousScroll = window.scrollY;
    },
  },
};
</script>

<style>
.marvel-header {
  height: 5rem;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.marvel-header--animate {
  transition: 150ms top linear;
}
.marvel-header--fixed {
  position: fixed;
  top: -5rem;
}

.marvel-header--show {
  position: fixed;
  top: 0;
}
.links {
  box-sizing: border-box;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ee171f;
  text-decoration: none;
  font-weight: bold;
  font-size: x-large;
}

.link-container {
  width: auto;
  height: 5rem;
}

@media screen and (max-width: 600px) {
  .nav-button {
    display: block;
  }
  .marvel-header .link-container {
    display: none;
  }
}

.responsive-links {
  display: block;
  text-align: left;
}
.nav-button {
  background-color: transparent;
  border-radius: 0;
  width: 60px;
  height: 50px;
  position: relative;
  border: none;
}
.nav-button:focus {
  outline: none;
}

span {
  display: inline-block;
  background-color: black;
  width: 3rem;
  margin: 4px 0;
  height: 6px;
  border-radius: 1em;
}

img {
  display: block;
  max-height: 5rem;
  margin: auto;
}
.logo {
  max-height: 5rem;
  width: 140px;
}
.subMenu {
  position: absolute;
  display: none;
  width: 127px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.link-container:last-of-type:hover .subMenu {
  display: block;
}

.subLink {
  background-color: #ee171f;
  display: block;
  line-height: 2;
  text-align: center;
  font-size: 1.2em;
}

a {
  color: #ee171f;
  text-decoration: none;
}

.link-container:hover {
  background-color: #ee171f;
  color: white;
}
.link-container:hover a {
  color: white;
}

.active .span {
  transition: 0.2s ease-in-out all;
}

.active .span-1 {
  transform: translateY(20px) rotate(135deg);
}

.active .span-2 {
  transform: scale(0);
}

.active .span-3 {
  transform: translateY(-11px) rotate(-134deg);
}
</style>
