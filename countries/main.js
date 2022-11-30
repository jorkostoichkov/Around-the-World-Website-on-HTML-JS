// constants
const BASE_URL = 'https://restcountries.com/v3.1';

// elements
const countryTemplate = document.getElementById('country-template');
const countriesList = document.getElementById('countries-list');
const switchButtons = document.querySelector('.countries-list-switch');
const searchForm = document.getElementById('search-form');
const searchResultsList = document.getElementById('search-result-list');
const searchFormInput = searchForm.querySelector('input[name="country"]');

// request api
async function requestApi(path) {
    return fetch(`${BASE_URL}/${path}`)
            .then(request => request.json())
}


// get country clone
function getCountryHtml(countryData) {
    const cloneElement = document.importNode(countryTemplate, true);

    cloneElement.removeAttribute('id');
    cloneElement.classList.remove('d-none');

    cloneElement.querySelector('.country-name').innerText = countryData.name.common;
    cloneElement.querySelector('.country-capital').innerText = countryData.capital;
    cloneElement.querySelector('.country-population').innerText = countryData.population.toLocaleString('bg-BG');
    cloneElement.querySelector('.country-region').innerText = countryData.region;
    cloneElement.querySelector('.country-flag').setAttribute('src', countryData.flags.svg);

    return cloneElement;
}

// render countries
function renderCountries(countries, toElement) {
    toElement.innerHTML = '';
    countries.forEach(element => {
        const html = getCountryHtml(element);
        toElement.appendChild(html);
    });
}


// load countries list
function loadCountries(region) {
    requestApi(`region/${region}`)
        .then(data => {
            renderCountries(data, countriesList);
        })
}
loadCountries('europe');

// list switcher
switchButtons.addEventListener('click', event => {
    const selectedButton = event.target;
    const region = selectedButton.dataset.region;
    loadCountries(region);

    const activeButton = switchButtons.querySelector('.btn.active');
    activeButton.classList.remove('active');
    selectedButton.classList.add('active');
});

// load search results
function loadSerchCountry(serchTerm) {
        requestApi(`name/${serchTerm}`)
            .then(data => {
                renderCountries(data, searchResultsList);
            })

}

// search form
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    loadSerchCountry(searchFormInput.value);
});
