const Vixel = require("vixel");
const imageToArray = require('./image-to-array')

imageToArray('gbg_heightmap.png')
.then(heightMap => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024
  canvas.height = 720
  document.body.appendChild(canvas);
  const info = document.createElement("div");
  document.body.appendChild(info)
  const moreButton = document.createElement('button');
  moreButton.innerText = 'More Samples'
  moreButton.onclick = () => {
    currentSamples = 0;
    sample()
  }
  document.body.appendChild(moreButton)

  const zMax = 32
  // Create a vixel object with a canvas and a width (x), height (y), and depth (z).
  const vixel = new Vixel(canvas, heightMap.width, zMax, heightMap.height);

  vixel.camera(
    [heightMap.width * 1.1, 160, heightMap.height * 0.7], // Camera position
    [heightMap.width * 0.36, 5, heightMap.height * 0.36], // Camera target
    [0, 1, 0], // Up
    Math.PI / 4 // Field of view
  );

  vixel.sun(6.25, 3 * Math.PI / 2, 8, 1)
  vixel.dof(0.55, 2.5)

  const startTime = +new Date()
  for (let i = 0; i < heightMap.width; i++) {
    for (let j = 0; j < heightMap.height; j++) {
      const offset = (j * heightMap.width + i) * 4
      const h = Math.floor(heightMap.data[offset] / (256 / zMax))

      for (let k = 0; k < h; k++) {
        vixel.set(
          i, // x
          k, // y
          j, // z
          {
            red: 0.97, // Red component
            green: 0.95, // Green component
            blue: 0.85, // Blue component,
          }
        );
      }
    }
  }
  console.log('Initialization', (+new Date() - startTime))
  console.log(vixel.get(0, 0, 0))

  let currentSamples = 0
  let totalSamples = 0

  const sample = () => {
    vixel.display();
    vixel.sample(10);
    totalSamples += 10
    currentSamples += 10

    info.innerHTML = totalSamples.toString()

    if (currentSamples < 100) {
      window.requestAnimationFrame(sample)
    }
  }

  sample()
})
