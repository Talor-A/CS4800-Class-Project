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
  var draw = SVG('render').size(555,405)

  var svgToPaths = svg => {

    // get all the paths contained in an svg into an array
    const paths = []

    svg.each((i, children) => {
      const currChild = children[i]

      // console.log(currChild)

      if(currChild.array) paths.push(currChild)
    }, true)
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

  var getAllAnimations = (fromSvg, toSvg, time) => {
    const fromPaths = svgToPaths(fromSvg)
    const toPaths = svgToPaths(toSvg)
    const anims = []
    if(fromPaths.length !== toPaths.length) {
      console.error('paths not similar shape.')
    } else {
      for(var i = 0; i < fromPaths.length; i++) {
        var from = fromPaths[i]
        var to = toPaths[i]
        const anim = from.animate().loop()
        anim.plot(to.array())
        from.pause()
        anims.push(anim)
      }
    }
    return anims
  }
  
  Promise.all(requests)
  .then(([body1node,body2node]) => {


    console.log("all svgs loaded.")
    body2node.hide()

    console.dir(body1node)
    const anims = getAllAnimations(body1node,body2node)


    const waistSlider = document.getElementById("weight")
    waistSlider.oninput = function() {
      anims.map(anim => {
        anim.at(Math.min(1,Math.max(0,waistSlider.value / 100)))
      })
    }

    const heightSlider = document.getElementById("height")
    heightSlider.oninput = function() {
      body1node.transform({scaleY:heightSlider.value/100})
    }
    

  })

})