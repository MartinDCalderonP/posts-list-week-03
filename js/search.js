import {
	searchForm,
	searchInput,
	searchButton,
	featureSection,
	regularSection,
} from './commonVariables.js';
import { fetcher } from './singletonFetcher.js';
import { throttle } from './helperFunctions.js';
import { showCards } from './script.js';

let searchResult;

searchForm.addEventListener('submit', (e) => e.preventDefault());
searchButton.addEventListener('click', throttle(searchButtonClick, 500));

export async function searchButtonClick(e) {
	if (e) {
		e.preventDefault();
	}

	if (searchInput.value) {
		searchResult = await fetcher.Get('/posts?title_like=' + searchInput.value);
		showCards(searchResult);
	} else {
		searchNotFound();
	}
}

function searchNotFound() {
	featureSection.innerHTML = `<h1>Posts for "${searchInput.value}" not found. <br> Search again please.</h1>`;
	featureSection.style.color = 'red';
	regularSection.innerHTML = '';
}
