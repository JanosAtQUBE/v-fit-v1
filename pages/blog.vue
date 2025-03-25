<template>
  <div class="grid gap-8 grid-cols-1 lg:grid-cols-3 p-6">
    <SinglePost v-for="post in posts" :key="post.uri" :post="post"></SinglePost>
  </div>

</template>
<script lang="ts" setup>

  const config = useRuntimeConfig();

  interface Post {
    title: string;
    date: string;
    excerpt: string;
    uri: string;
  }

  interface FetchResponse {
    data: {
      posts: {
        nodes: Post[];
      };
    };
  }

  const { data, refresh, pending } = await useFetch<FetchResponse>(config.public.wordpressUrl, {
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
    });

  const posts = data?.value?.data.posts.nodes || [];

</script>