function getJSON(data){
  str_full = "";
  for ( i = 0; i < data.length; i++){

    if(i<3)
      active = " active";
    else
      active = ""

    str_full += "<div class=\"col-xs-4\"><a href=\"#1\"><img src=\"" + data[i].base64 + "\" class=\"img-responsive\"></a></div>"
    if( i % 3 == 2){
	document.getElementById('carousel-inner').innerHTML += "<div class=\"item" + active + "\">" + str_full + "</div>";
        str_full = "";
    }
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


