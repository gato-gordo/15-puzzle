const { unsplashed } = CONFIG

class Fetch {
  static randomImg () {
    return window.fetch(
      `${unsplashed.baseUrl}/photos/random?orientation=squarish&w=400&h=400`, {
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
