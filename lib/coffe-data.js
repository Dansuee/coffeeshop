import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const unSplashPhotoLinks = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee',
    perPage: 30,
    
  });
  const unsplashResult = photos.response.results
  console.log(unsplashResult)
  return unsplashResult.map((result) => result.urls["small"]);
}


export const fetchCoffeeData = async ()  => {
  const photo = await unSplashPhotoLinks();
  const response = await fetch(process.env.API,{
     headers: {
      "Access-Control-Allow-Origin": "*",
      "Authorization":process.env.API_KEY, 
      "accept": "application/json"
     },
      })

  const data = await response.json();
    console.log(data);
    return data.results.map((location, idx) => {
      return {
        ...location,
        imgUrl: photo[idx]
      }
    });

}

console.log(fetchCoffeeData())