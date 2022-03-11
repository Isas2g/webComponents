const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";
const token = "4d4bcadac019c33b3b220a293d03eeeaa17d888f";

const partyInput = document.getElementById('party');
const suggestionsDiv = document.getElementById('suggestions');

const container = document.getElementById('container');
const name_short = document.getElementById('name_short');
const name_full = document.getElementById('name_full');
const inn_kpp = document.getElementById('inn_kpp');
const address = document.getElementById('address');
let suggestionsArray = [];

partyInput.addEventListener('change', async(event) => {
  event.preventDefault();
  suggestionsDiv.classList.remove('hidden')
  let query = partyInput.value;
  try {
    const data = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
      },
      body: JSON.stringify({query: query})
    });
    const json = await data.json();
    console.log(json.suggestions);
    suggestionsArray = json.suggestions;
    suggestionsDiv.innerHTML = '';
    for (const suggestion of suggestionsArray) {
      const suggestionDiv = document.createElement(`suggestion-one`);
      suggestionDiv.setAttribute('title', suggestion.value);
      suggestionDiv.setAttribute('number', suggestion.data.inn);
      suggestionDiv.setAttribute('address', suggestion.data.address.value);

      suggestionDiv.addEventListener('click', (event) => {
        name_short.value = suggestion.data.name.full_with_opf;
        name_full.value = suggestion.data.name.short_with_opf;
        inn_kpp.value = suggestion.data.inn + ' / ' + suggestion.data.kpp;
        address.value = suggestion.data.address.value;
        suggestionsDiv.classList.add('hidden')
      });

      suggestionsDiv.appendChild(suggestionDiv);
    }
  } catch (e) {
    console.log(e);
    alert('Произошла ошибка');
  }
});