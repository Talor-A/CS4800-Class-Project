function getJSON(data){
  for ( i = 0; i < data.length; i++){
    if(i==0)
      c = "class=\"first\"";
    else
      c = ""
    document.getElementById('photobanner').innerHTML += "<img " + c + " src=" + data[i].base64 + " width =\"300\" height=\"400\"/>";
  }
}

fetch('/api/dresses')
  .then(res => res.json())
  .then(text => getJSON(text))
  .catch(e => console.error(e))


