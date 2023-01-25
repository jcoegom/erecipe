export const handleError = e => {
  //We handle errors in a centralized way.
  console.log(e) //as example we only display the error in console. In a real project we can send
  //the error to Cloudwatch, Slack..etc

  if (
    e.response?.data?.message &&
    typeof e.response.data.message === 'string'
  ) {
    return e.response.data.message
  }
  return 'And error has occurred!'
}
