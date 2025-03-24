<template>

  <PageHeader :nav="nav" :navAltStyle="currentLocation.value" />
  <NuxtPage />


</template>

<script lang="ts" setup>
const appConfig = useAppConfig()
const router = useRouter();

const nav = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
  {
    label: 'Blog',
    to: '/blog',
  }
];

const currentLocation = ref();

currentLocation.value = computed(() => router.currentRoute.value.path === '/');


</script>

