import { fetchCountries } from './js/fetchCountries';
import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  const countryName = e.target.value.trim();
  if (countryName === '') {
    return;
  }
  resetCountries();
  fetchCountries(countryName)
    .then(countries => {
      if (countries.length > 10) {
        findToManyCountries(countries);
      } else if (countries.length === 1) {
        findOneCountry(countries[0]);
      } else if (countries.length >= 2 || countries.length <= 10) {
        renderCountriesList(countries);
      }
    })
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountriesList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `<li><img src="${flags.svg}" alt="${name}" width="25" height="15"><span>${name}</span></li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function findToManyCountries(countries) {
  countriesList.innerHTML = '';
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function findOneCountry({ name, capital, population, flags, languages }) {
  countriesList.innerHTML = '';
  const countryLanguages = languages.map(lang => lang.name).join(', ');
  const markupInfo = `<h1><img src="${flags.svg}" alt="${name}" width="25" height="20"><span>${name}</span></h1>
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>Languages</b>: ${countryLanguages}</p>`;

  countryInfo.innerHTML = markupInfo;
}

function resetCountries() {
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';
}
