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

  var svgToPaths = svg => {

    // get all the paths contained in an svg into an array
    const paths = []

    svg.each((i, children) => {
      const currChild = children[i]

      // console.log(currChild)

      if(currChild.array) paths.push(currChild)
    }, true)
    console.log(paths)
    return paths
  }

  var textToSvg = text => {
    // draw.svg() returns a reference to the draw object.
    // it doesn't return a reference to the shape we just made
    draw.svg(text)

    // so find the last shape added to the view and return it
    var children = draw.children()
    var thisSvg = children[children.length - 1]

    return thisSvg
  }

  // var requests = [...legreq, ...torsoreq]

  var body1req = fetch('images/SVG/Body1.svg')
    .then(res => res.text())
    .then(textToSvg)
  var body2req = fetch('images/SVG/Body2.svg')
  .then(res => res.text())
  .then(textToSvg)


  var requests = [body1req,body2req]

  var animateAll = (fromSvg, toSvg, time) => {
    const fromPaths = svgToPaths(fromSvg)
    const toPaths = svgToPaths(toSvg)
    const anims = []
    if(fromPaths.length !== toPaths.length) {
      console.error('paths not similar shape.')
    } else {
      for(var i = 0; i < fromPaths.length; i++) {
        var from = fromPaths[i]
        var to = toPaths[i]
        const anim = from.animate()
        anim.plot(to.array())
      }
    }
    return anims
  }
  
  Promise.all(requests)
  .then(([body1node,body2node]) => {


    console.log("all svgs loaded.")
    body2node.hide()
    // body1node.animate(2000, '>', 0).plot(body2node)
    console.dir(body1node)
    animateAll(body1node,body2node)
    // var tA = body.torso.torso_A
    // var tB = body.torso.torso_B

    // var pathTorsoA = tA.select('#Torso').first()
    // var pathTorsoB = tB.select('#Torso').first()

    // console.log(pathTorsoA.array().value)


    // var leg_A = body.legs.legs_2A
    // var leg_B = body.legs.legs_2B
    // var leftA = leg_A.select('#left').first()
    // var leftB = leg_B.select('#left').first()
    // var rightA = leg_A.select('#right').first()
    // var rightB = leg_B.select('#right').first()

    // leg_A.show()
    // leg_B.show()

    // leftA.animate(2000, '>', 0).plot(leftB.array())
    // rightA.animate(2000, '>', 0).plot(rightB.array())



    // var path = draw.path('M150 0 L75 200 L225 200 Z')

    // // animate path
    // path.animate(2000, '>', 1000).plot('M100 0 H190 V90 H100 Z')

  })

})