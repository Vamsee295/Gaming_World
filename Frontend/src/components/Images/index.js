// Eagerly import any images placed in this folder and expose a safe getter.
// Drop files (jpg/png/webp) here and reference by exact filename.
const imageModules = import.meta.glob('./*', { eager: true, as: 'url' })

export function getImage(filename, fallbackUrl) {
  return imageModules[`./${filename}`] || fallbackUrl
}

// Find an image by numeric order, accepting common naming patterns like:
// image1.jpg, Image_1.png, img-1.webp, 1.jpg (less preferred)
export function getImageByIndex(index, fallbackUrl) {
  const candidates = Object.keys(imageModules)
  const rx = new RegExp(`^\.\/((?:image|img|Image|IMG)[ _-]?${index}|${index})\.[a-zA-Z0-9]+$`)
  const hit = candidates.find(k => rx.test(k))
  return hit ? imageModules[hit] : fallbackUrl
}

// Suggested filenames you can place in this folder:
//  - cyberpunk2077.jpg
//  - spiderman.jpg
//  - gta5.jpg
//  - nfs-heat.jpg
//  - lastofus.jpg
//  - detroit.jpg
//  - a-way-out.jpg
//  - wukong.jpg
//  - uncharted.jpg
//  - days-gone.jpg


