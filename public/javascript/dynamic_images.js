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


function leg_width_update(){
  var x = document.getElementById("leg_width").value;
  document.getElementById("right").setAttribute("d", "M" + (15.47*x) + ",69.59l1.34-38.24a7.28,7.28,0,0,0,.08-3.74L" + (17.5*x)+ ",0H0L" + (8.05*x) + ",30.27a39.87,39.87,0,0,0-.52,24.08,114.48,114.48,0,0,1,3.59,15.24Z");
}


/*
var body = {
  LEG_L: {},
  LEG_R: {},
  legs: {},
  torso: {}
}

SVG.on(document, 'DOMContentLoaded', function () {
  initateCarousel()

  fetch('/api/dresses')
    .then(res => res.json())
    .then(text => getJSON(text))
    .catch(e => console.error(e))

  // set up SVG.js library. 
  // #render is the document element where the graphics will be shown
  var draw = SVG('render')

  var LEG_R = {
    "LEG_R_A": "images/SVG/LEGS/SVG/LEG R A.svg",
    "LEG_R_B": "images/SVG/LEGS/SVG/LEG R B.svg",
    "LEG_R_C": "images/SVG/LEGS/SVG/LEG R C.svg",
    "LEG_R_D": "images/SVG/LEGS/SVG/LEG R D.svg",
  }
  var legs_2 = {
    "legs_2A": "images/SVG/LEGS/SVG/Asset 1.svg",
    "legs_2B": "images/SVG/LEGS/SVG/Asset 2.svg"
  }

  var torso = {
    "torso_A": "images/SVG/LEGS/SVG/Asset 3.svg",
    "torso_B": "images/SVG/LEGS/SVG/Asset 4.svg"
  }

  var legreq = Object.entries(legs_2).map(([id, url]) =>
    fetch(url)
      .then(res => res.text())
      .then(text => {
        // draw.svg() returns a reference to the draw object.
        // it doesn't return a reference to the shape we just made
        draw.svg(text)

        // so find the last shape added to the view and return it
        var children = draw.children()

        var thisSvg = children[children.length - 1]
        thisSvg.attr("id", id)
        return thisSvg
      })
      .then(node => {
        node.hide()
        body.legs[id] = node
        console.log(node)
      })
  )
  var torsoreq = Object.entries(torso).map(([id, url]) =>
    fetch(url)
      .then(res => res.text())
      .then(text => {
        // draw.svg() returns a reference to the draw object.
        // it doesn't return a reference to the shape we just made
        draw.svg(text)

        // so find the last shape added to the view and return it
        var children = draw.children()

        var thisSvg = children[children.length - 1]
        thisSvg.attr("id", id)
        return thisSvg
      })
      .then(node => {
        node.hide()
        body.torso[id] = node
        console.log(node)
      })
  )

  var requests = [...legreq, ...torsoreq]


  Promise.all(requests).then(() => {
    console.log("all svgs loaded.")
    var tA = body.torso.torso_A
    var tB = body.torso.torso_B

    var pathTorsoA = tA.select('#Torso').first()
    var pathTorsoB = tB.select('#Torso').first()

    console.log(pathTorsoA.array().value)

    // var tA = draw.path(pathTorsoA.array().toString())
    // tA.show()
    // var tB = draw.path(pathTorsoA.array().toString())
    // pathTorsoA.animate(2000, '>', 1000).plot(pathTorsoB.array())
    // // create path

    var leg_A = body.legs.legs_2A
    var leg_B = body.legs.legs_2B
    var leftA = leg_A.select('#left').first()
    var leftB = leg_B.select('#left').first()
    var rightA = leg_A.select('#right').first()
    var rightB = leg_B.select('#right').first()

    leg_A.show()
    // leg_B.show()

    leftA.animate(2000, '>', 0).plot(leftB.array())
    rightA.animate(2000, '>', 0).plot(rightB.array())



    // var path = draw.path('M150 0 L75 200 L225 200 Z')

    // // animate path
    // path.animate(2000, '>', 1000).plot('M100 0 H190 V90 H100 Z')

  })

})

*/


