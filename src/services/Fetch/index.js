const { unsplashed } = CONFIG

/**
 * Abstraction for fetching random image, plucking src, width, and height.
 */
class Fetch {
  static randomImg () {
    return window.fetch(
      `${unsplashed.baseUrl}/photos/random?orientation=squarish`, {
        headers: {
          'Authorization': `Client-ID ${unsplashed.keys.public}`,
          'Accept-Version': 'v1',
          'Content-Type': 'application/json',
        }
      }
    )
    .then(res => res.json())
    .then(res => ({ width: res.width, height: res.height, url: res.urls.full }))
  }
}

export default Fetch
