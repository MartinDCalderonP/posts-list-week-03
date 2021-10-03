import { chipsList, tags, posts } from './commonVariables.js';
import { showChips } from './helperFunctions.js';
import { showCards } from './script.js';

chipsList.addEventListener('click', filterByTag);

showChips(tags);

function filterByTag(e) {
	if (e.target.className.match('list__chip')) {
		let filteredPosts;
		let id = parseInt(e.target.id);

		filteredPosts = posts.filter((item) => item.tags.includes(id));

		showCards(filteredPosts);
	}
}
