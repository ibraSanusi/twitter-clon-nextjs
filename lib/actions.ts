'use server'

export default async function postTweet(formData: FormData) {
  const content = formData.get('content')
  console.log(content)
}
