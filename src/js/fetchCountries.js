const BASE_URL = 'https://restcountries.com/v2/';

export const fetchCountries = name => {
  return fetch(
    // 'https://restcountries.com/v3.1/all?fields=name.official,capital,population, flags.svg, languages'
    `${BASE_URL}name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  // .then(data => {
  //   console.log(data);
  //   return data;
  // })
  // .catch(error => {
  //   console.log(error);
  // });
};
