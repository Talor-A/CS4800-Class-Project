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
    "LEG_R_A": "images/SVG/LEGS/LEG R A.svg",
    "LEG_R_B": "images/SVG/LEGS/LEG R B.svg",
    "LEG_R_C": "images/SVG/LEGS/LEG R C.svg",
    "LEG_R_D": "images/SVG/LEGS/LEG R D.svg",
  }
  var legs_2 = {
    "legs_2A": "images/SVG/LEGS/Asset 1.svg",
    "legs_2B": "images/SVG/LEGS/Asset 2.svg"
  }

  var torso = {
    "torso_A": "images/SVG/LEGS/Asset 3.svg",
    "torso_B": "images/SVG/LEGS/Asset 4.svg"
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