import {
	searchForm,
	searchInput,
	searchButton,
	featureSection,
	regularSection,
	posts,
} from './commonVariables.js';
import { fetcher } from './singletonFetcher.js';
import { postsNotFound, showSpinner, throttle } from './helperFunctions.js';
import { showCards } from './script.js';

searchForm.addEventListener('submit', (e) => e.preventDefault());
searchButton.addEventListener('click', throttle(searchButtonClick, 500));

export async function searchButtonClick(e) {
	if (e) {
		e.preventDefault();
	}

	let searchResult;

	if (searchInput.value) {
		showSpinner();

		searchResult = await fetcher.Get('/posts?title_like=' + searchInput.value);

		if (searchResult.length === 0) {
			postsNotFound(searchInput.value);
		} else {
			showCards(searchResult);
		}
	} else {
		showCards(posts);
	}
}
