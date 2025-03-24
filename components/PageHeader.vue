<template>
  <div
    class="vfit-nav--wrapper"
    :class="[props.navAltStyle ? 'vfit-nav--alt' : '', scrollY > 0 ? 'vfit-nav--scrolled' : '']"
  >
    <div class="vfit-nav--logo">
      <a href="/">
        <img src="../assets/media/Logo-color.svg" :class="hideLogo && scrollY === 0 ? 'hidden' : ''" alt="logo" />
      </a>
    </div>
    <nav>
      <ul>
        <li v-for="item in nav" :key="item.label">
          <nuxt-link :to="item.to">{{ item.label }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts" setup>
  import { useWindowScroll } from "@vueuse/core";

  interface NavItem {
    label: string;
    to: string;
  }

  interface Props {
    nav: NavItem[];
    navAltStyle: boolean;
  }

  const props = defineProps<Props>();

  const router = useRouter();

  const { x, y } = useWindowScroll();
  const hideLogo = ref(true);
  const scrollY = ref(y.value);

  watch(y, (val) => {
    scrollY.value = val;
  });

  onMounted(() => {
    setTimeout(() => {
      hideLogo.value = false;
    }, 300);
  });

</script>
<style lang="scss" scoped>
  .vfit-nav--wrapper {
    position: sticky;
    top: 1em;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    margin: 0;
    background-color: $color-white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    box-sizing: border-box;
    .vfit-nav--logo {
      position: relative;
      width: 128px;
      height: 50px;
      img {
        position: absolute;
        top: Calc(50% - 64px);
        height: 128px;
        animation: fadeIn 300ms ease-in forwards;
      }
    }
    nav {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 64px;
      ul {
        display: flex;
        justify-content: center;
        list-style: none;
        gap: 2em;
        li {
          a {
            padding: 0.5em 2em;
            color: $color-primary;
            text-decoration: none;
            border: 1px solid $color-white;
            border-radius: 2rem;
            background-color: $color-white;
            transition: $transition;
            &:hover {
              border-color: $color-primary;
              background-color: $color-primary;
              color: $color-white;
            }
            &.router-link-active {
              color: $color-secondary;
              border: 1px solid $color-secondary;
              border-radius: 2rem;
              transition: $transition;
              &:hover {
                background-color: $color-secondary;
                color: $color-white;
              }
            }
          }
        }
      }
    }

    &.vfit-nav--alt {
      background-color: transparent;
      box-shadow: none;
      transition: $transition;
      .vfit-nav--logo {
        img {
          animation: fadeOutScale 300ms ease-out forwards;
        }
      }
      &.vfit-nav--scrolled {
        background-color: $color-white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        .vfit-nav--logo {
          img {
            animation: fadeInScale 300ms ease-in forwards;
          }
        }
      }
    }
  }

  .hidden {
    visibility: hidden;
  }
</style>
