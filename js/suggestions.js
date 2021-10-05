import { searchInput, suggestionsList } from './commonVariables.js';
import { searchButtonClick } from './search.js';
import { debounce } from './helperFunctions.js';
import { fetcher } from './singletonFetcher.js';

searchInput.addEventListener('keyup', debounce(getSuggestions, 500));
searchInput.addEventListener('keydown', keyNavigation);
suggestionsList.addEventListener('click', searchBySuggested);
document.addEventListener('click', clickOutsideSuggestionsList);

let suggestionsItems = suggestionsList.children;
let current = 0;

async function getSuggestions(e) {
	if (!searchInput.value) {
		hideSuggestionsList();
		return;
	}

	let key = e.key.charCodeAt();

	if (e.key === 'Backspace' || (key >= 97 && key <= 122) || key == 241) {
		let searchResult;

		searchResult = await fetcher.Get('/posts?title_like=' + searchInput.value);

		showSuggestionsList(searchResult);
	}
}

function showSuggestionsList(suggestions) {
	if (suggestions.length > 0) {
		suggestionsList.innerHTML = '';
		suggestionsList.style.display = 'block';
		searchInput.parentElement.style.borderRadius = '25px 25px 0px 0px';

		addItemsToSuggestionsList(suggestions);

		suggestionsItems[0].style.backgroundColor = '#eeeeee';
		current = 0;
	} else {
		hideSuggestionsList();
	}
}

function addItemsToSuggestionsList(suggestions) {
	for (let i = 0; i < 5; i++) {
		let item = suggestions[i];

		if (item) {
			suggestionsList.innerHTML += `<li>${item.title}</li>`;
		}
	}
}

function hideSuggestionsList() {
	suggestionsList.style.display = 'none';
	searchInput.parentElement.style.borderRadius = '25px';
}

function keyNavigation(e) {
	if (suggestionsItems.length > 1 && searchInput.value) {
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
			downAndUpArrows(e.key);
		}
	}
}

function downAndUpArrows(key) {
	suggestionsItems[current].style.backgroundColor = 'transparent';

	if (key === 'ArrowDown' && current < suggestionsItems.length - 1) {
		++current;
	}

	if (key === 'ArrowUp' && current > 0) {
		--current;
	}

	searchInput.value = suggestionsItems[current].textContent;

	suggestionsItems[current].style.backgroundColor = '#eeeeee';
}

function searchBySuggested(e) {
	if (e.target.matches('li')) {
		searchInput.value = e.target.textContent;
		searchButtonClick();
		hideSuggestionsList();
	}
}

function clickOutsideSuggestionsList(e) {
	if (!e.target.matches('li') && !e.target.matches('ul')) {
		hideSuggestionsList();
	}
}
