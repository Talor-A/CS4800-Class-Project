carousel_images_per_slide = 3

function getJSON(data) {
  str_full = "";
  for (i = 0; i < data.length; i++) {

    //set the first slide of images to active
    if (i < carousel_images_per_slide)
      active = " active";
    else
      active = ""

    str_full += "<div class=\"col-xs-4\"><a href=\"#1\"><img src=\"" + data[i].base64 + "\" class=\"img-responsive\"></a></div>"

    if (i % carousel_images_per_slide == (carousel_images_per_slide - 1)) {
      document.getElementById('carousel-inner').innerHTML += "<div class=\"item" + active + "\">" + str_full + "</div>";
      str_full = "";
    }
  }
}


function initateCarousel() {
  // Instantiate the Bootstrap carousel
  $('.multi-item-carousel').carousel({
    interval: false
  });

  // for every slide in carousel, copy the next slide's item in the slide.
  // Do the same for the next, next item.
  $('.multi-item-carousel .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {
      next.next().children(':first-child').clone().appendTo($(this));
    } else {
      $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });
}
