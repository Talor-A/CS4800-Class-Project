function getJSON(data){
  for ( i = 0; i < data.length; i++){
    if(i==0)
      c = "class=\"first\"";
    else
      c = ""
    document.getElementById('photobanner').innerHTML += "<img " + c + " src=" + data[i].base64 + " width =\"300\" height=\"400\"/>";
  }
}

// Instantiate the Bootstrap carousel
$('.multi-item-carousel').carousel({
  interval: false
});

// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));
  
  if (next.next().length>0) {
    next.next().children(':first-child').clone().appendTo($(this));
  } else {
  	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
  }
});
fetch('/api/dresses')
  .then(res => res.json())
  .then(text => getJSON(text))
  .catch(e => console.error(e))


