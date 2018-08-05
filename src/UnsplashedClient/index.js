export const fetchRandomImg = () => 
  window.fetch(
      'https://api.unsplash.com/photos/random?orientation=squarish&w=600&h=600', {
        headers: {
          'Authorization': 'Client-ID 99d6128f78e8bc5ae4e7d798d86a9fdb7bcf54d3203d5f5b8a36e59dd2fe27f0',
          'Accept-Version': 'v1',
          'Content-Type': 'application/json',
        }
      }
    )
    .then(res => res.json())
    .then(res => res.urls.regular)

