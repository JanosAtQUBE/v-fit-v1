<template>
  <div class="grid gap-8 grid-cols-1 lg:grid-cols-3 p-6">
    <SinglePost v-for="post in data" :key="post.uri" :post="post"></SinglePost>
  </div>

</template>
<script lang="ts" setup>
  const route = useRoute();
  const config = useRuntimeConfig();
  const wordpressUrl = config.public.wordpressUrl as string;

  const { data, refresh, pending } = await useFetch(wordpressUrl, {
    method: "get",
    query: {
      query: `
     query NewQuery {
       posts(first:10){
         nodes {
           title
           date
           excerpt
           uri
         }
       }
     }`,
    },
    transform(data) {
      return data.data.posts.nodes as Array<Record<"title" | "date" | "excerpt" | "uri", string>>;
    },
  });

</script>