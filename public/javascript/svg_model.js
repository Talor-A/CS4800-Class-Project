
var showdress

SVG.on(document, 'DOMContentLoaded', function () {
  initateCarousel()

  fetch('/api/dresses')
    .then(res => res.json())
    .then(text => getJSON(text))
    .catch(e => console.error(e))


  // set up SVG.js library. 
  // #render is the document element where the graphics will be shown
  var draw = SVG('render').size(555, 405)

  var svgToPaths = svg => {

    // get all the paths contained in an svg into an array
    const paths = []

    svg.each((i, children) => {
      const currChild = children[i]

      // console.log(currChild)

      if (currChild.array) paths.push(currChild)
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

  var dress1req = fetch('images/SVG/Dress1.svg')
    .then(res => res.text())
    .then(textToSvg)


  var requests = [body1req, body2req, dress1req]

  var getAllAnimations = (fromSvg, toSvg, time) => {
    const fromPaths = svgToPaths(fromSvg)
    const toPaths = svgToPaths(toSvg)
    const anims = []
    if (fromPaths.length !== toPaths.length) {
      console.error('paths not similar shape.')
    } else {
      for (var i = 0; i < fromPaths.length; i++) {
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
    .then(([body1node, body2node, dress1node]) => {

      function updateDresses() { dress1node.transform({ a: 1 + ws, b: 0, c: 0, d: hs, e: (-245 * ws), f: 115 * (1 - hs) }) }

      body2node.hide()
      const anims = getAllAnimations(body1node, body2node)

      dress1node.front()


      const waistSlider = document.getElementById("weight")
      var ws = waistSlider.value / 100

      waistSlider.oninput = function () {
        ws = waistSlider.value / 100
        updateDresses()

        anims.map(anim => {
          anim.at(Math.min(1, Math.max(0, ws)))
        })
      }

      const heightSlider = document.getElementById("height")
      var hs = heightSlider.value / 100

      heightSlider.oninput = function () {
        hs = heightSlider.value / 100
        updateDresses()
        body1node.children()[4].children()[0].transform({ a: 1, b: 0, c: 0, d: hs, e: 0, f: 55 * (1 - hs) }) //55 is a magic number, it lines the head up with the neck as it resizes, straight resizing is along the center, so we have to adjust the hight as well
      }

      showdress = s => {
        dress1node.hide()
        dress1node = textToSvg(s)
        updateDresses()
        dress1node.show()
      }
    })
})
