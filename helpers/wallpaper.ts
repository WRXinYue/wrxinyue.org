/**
 * Randomly switch wallpaper
 */
function chooseRandomWallpaper(wallpaperList: string[], wallpaperType: string) {
  let randomWallpaper = ''
  const shouldChooseNewWallpaper = () => {
    const lastUpdateTime = localStorage.getItem(`${wallpaperType}lastUpdateTime`)
    const currentTime = Date.now()

    // 12-hour cache
    return !lastUpdateTime || currentTime - Number(lastUpdateTime) >= 12 * 60 * 60 * 1000
  }

  if (shouldChooseNewWallpaper()) {
    // Screen wallpapers that conform to wallpaperType
    if (wallpaperList.length > 0) {
      const randomIndex = Math.floor(Math.random() * wallpaperList.length)
      randomWallpaper = wallpaperList[randomIndex]
      localStorage.setItem(`${wallpaperType}lastUpdateTime`, String(Date.now()))
      localStorage.setItem(`current${wallpaperType}`, randomWallpaper)
    }
    else {
      randomWallpaper = ''
    }
  }
  else {
    const cachedWallpaper = localStorage.getItem(`current${wallpaperType}`)
    if (cachedWallpaper)
      randomWallpaper = cachedWallpaper
  }

  return randomWallpaper
}

export default chooseRandomWallpaper
