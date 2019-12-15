module.exports = url => new Promise((resolve, reject) => {
  const img = document.createElement('img')
  img.src = url

  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    resolve(ctx.getImageData(0, 0, canvas.width, canvas.height))
  }

  img.onerror = err => reject(err)
})
