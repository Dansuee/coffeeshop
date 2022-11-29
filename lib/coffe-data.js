import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const unSplashPhotoLinks = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee',
    perPage: 40,
    
  });
  const unsplashResult = photos.response.results
  return unsplashResult.map((result) => result.urls["small"]);
}

const urls = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeData = async (latLong ='37.548,126.991')  => {
  const photo = await unSplashPhotoLinks();
  const response = await fetch(urls(latLong, 'coffee', 30),{
    headers: {
     "Access-Control-Allow-Origin": "*",
     "Authorization":process.env.NEXT_PUBLIC_API_KEY, 
     "accept": "application/json"
    },
     })

  
  const data = await response.json();
    return data.results.map((location, idx) => {
      return {
        // ...location,
        fsq_id: location.fsq_id,
        name: location.name, 
        location: location.location,
        imgUrl: photo[idx]
      }
    });

}

