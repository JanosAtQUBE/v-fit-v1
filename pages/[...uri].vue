<template>
  <div>
    <main class="bg-gray-100 container mx-auto mt-6 p-6 rounded-lg">
      <NuxtLink to="/blog" class="text-blue-500">Back to blog</NuxtLink>
      <h1 class="text-4xl">{{ post?.title }}</h1>
      <div class="text-2xl mt-4">
        <time>{{ post?.date instanceof Date ? post.date.toLocaleDateString() : new Date(post?.date || "").toLocaleDateString() }}</time>
        <hr class="my-4" />
        <h2 class="text-3xl">Content</h2>
        <hr class="my-4" />
        <img v-if="post?.featuredImage?.node?.sourceUrl" :src="post.featuredImage.node.sourceUrl" alt="Featured image" class="mt-4" />
        <hr class="my-4" />
        <article class="mt-4 space-y-2" v-html="sanitizedContent" >
        </article>
        <img v-if="extraImages[0]" v-for="(image, index) in extraImages" :key="index" :src="image" alt="Extra image" class="mt-4" />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>

  const route = useRoute();
  const uriParam = route.params.uri;
  const uri = Array.isArray(uriParam) ? uriParam.join("/") : uriParam ?? "";
  const config = useRuntimeConfig();

  interface Post {
    id: string;
    title: string;
    date: Date;
    content: string;
    uri: string;
    featuredImage: {
      node: {
        sourceUrl: string;
      };
    };
    postExtraImages: {
      additionalImage1: {
        node: {
          sourceUrl: string;
        };
      };
      additionalImage2: {
        node: {
          sourceUrl: string;
        };
      };
      additionalImage3: {
        node: {
          sourceUrl: string;
        };
      };
    };
  }

  interface FetchResponse {
    data: {
      nodeByUri: Post | null;
    };
  }

  import DOMPurify from "dompurify";

  const { data, refresh, pending } = await useFetch<FetchResponse>(config.public.wordpressUrl, {
    method: "POST",
    body: {
      query: `
      query MyQuery3($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Post {
            id
            title
            date
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
            postExtraImages {
              additionalImage1 {
                node {
                  sourceUrl
                }
              }
              additionalImage2 {
                node {
                  sourceUrl
                }
              }
              additionalImage3 {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `,
      variables: {
        uri: uri,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Explicitly type `post` to ensure TypeScript understands its structure
  // Extract the post data
  const post = computed(() => data.value?.data.nodeByUri ?? null);

  // Sanitize the content only on the client side
  const sanitizedContent = computed(() => {
    if (import.meta.client && post.value?.content) {
      return DOMPurify.sanitize(post.value.content);
    }
    // Return raw content for SSR
    return post.value?.content || "";
  });

  const extraImages = computed<string[]>(() => {
    return [
      post.value?.postExtraImages?.additionalImage1?.node?.sourceUrl || "",
      post.value?.postExtraImages?.additionalImage2?.node?.sourceUrl || "",
      post.value?.postExtraImages?.additionalImage3?.node?.sourceUrl || "",
    ];
  });

  useHead({
    title: post.value?.title || "Post",
  });
</script>
