const { unsplashed } = CONFIG

class Fetch {
  static randomImg () {
    return window.fetch(
      `${unsplashed.baseUrl}/photos/random?orientation=squarish&w=00&h=800`, {
        headers: {
          'Authorization': `Client-ID ${unsplashed.keys.public}`,
          'Accept-Version': 'v1',
          'Content-Type': 'application/json',
        }
      }
    )
    .then(res => res.json())
    .then(res => res.urls.regular)
  }
}

export default Fetch
