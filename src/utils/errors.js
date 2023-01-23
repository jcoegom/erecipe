export const handleError = e => {
  //We handle errors in a centralized way.
  console.log(e) //as example we only display the error in console. In a real project we can send
  //the error to Cloudwatch, Slack..etc

  if (e.Error && typeof e.Error === 'string') {
    return e.Error === 'Incorrect IMDb ID.'
      ? 'Input search text is mandatory'
      : e.Error
  }
  return 'And error has occurred!'
}
