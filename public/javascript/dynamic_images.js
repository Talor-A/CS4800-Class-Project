function getJSON(data) {
  str_full = "";
  for (i = 0; i < data.length; i++) {

    if (i < 3)
      active = " active";
    else
      active = ""

    str_full += "<div class=\"col-xs-4\"><a href=\"#1\"><img src=\"" + data[i].base64 + "\" class=\"img-responsive\"></a></div>"
    if (i % 3 == 2) {
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

function svgloaded(el, draw) {
  console.log(el.getAttribute(id) + " loaded");
  var svg = el.getSVGDocument();

  // var gn = svg.get("greenBlock");
  // gn.setAttribute("fill", "#ff0000");

  console.log(svg.get(".cls-1"))
}

var body = {
  LEG_L: {},
  LEG_R: {},
}

SVG.on(document, 'DOMContentLoaded', function () {
  fetch('/api/dresses')
    .then(res => res.json())
    .then(text => getJSON(text))
    .catch(e => console.error(e))

  // set up SVG.js library. 
  // #render is the document element where the graphics will be shown
  var draw = SVG('render')

  var LEG_R = {
    "LEG_R_A":"images/SVG/LEGS/SVG/LEG R A.svg",
    "LEG_R_B":"images/SVG/LEGS/SVG/LEG R B.svg",
    "LEG_R_C":"images/SVG/LEGS/SVG/LEG R C.svg",
    "LEG_R_D":"images/SVG/LEGS/SVG/LEG R D.svg",
  }

  var requests = Object.entries(LEG_R).map(([id, url]) =>
    fetch(url)
    .then(res => res.text())
    .then(text => {
      // draw.svg() returns a reference to the draw object.
      // it doesn't return a reference to the shape we just made
      draw.svg(text)

      // so find the last shape added to the view and return it
      var children = draw.children()

      var thisSvg = children[children.length -1]
      thisSvg.attr("id", id)
      return thisSvg
    })
    // .then(svg => svg.hide())
    // .then(svg => svg.select('path.cls-1').first())
    .then(node => {
      console.log(node === draw)
      node.hide()
      body.LEG_R[id] = node
      console.log(node)
    })
  )

  Promise.all(requests).then(()=>{
    console.log("leg loaded.")
    // console.log(body.LEG_R.LEG_R_A.select('path.cls-1').first())
    var pathRA = body.LEG_R.LEG_R_A.select('path.cls-1').first().array().toString()
    var pathRB = body.LEG_R.LEG_R_C.select('path.cls-1').first().array().toString()
    console.log(pathRA)
    console.log(pathRB)

    var legA = draw.path(pathRA)
    legA.animate(2000, '>', 1000).plot(pathRB)
    // create path
    var path = draw.path('M150 0 L75 200 L225 200 Z')

    // animate path
    path.animate(2000, '>', 1000).plot('M100 0 H190 V90 H100 Z')

  })
  






})




