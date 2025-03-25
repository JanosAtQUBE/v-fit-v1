export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await $fetch('https://vfit.theuselesspage.com/graphql', {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
})