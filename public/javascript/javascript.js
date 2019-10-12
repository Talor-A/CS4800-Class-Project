// send a request to the API backend endpoint

fetch('/api/dresses')
  .then(res => res.json())
  .then(text => console.log(text))
  .catch(e => console.error(e))

