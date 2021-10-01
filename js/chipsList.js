import { chipsList } from './commonVariables.js';
import { tags, posts } from './helperFunctions.js';
import { showCards } from './script.js';

showChips(tags);

chipsList.addEventListener('click', filterByTag);

function showChips(tags) {
	for (let i = 0; i < tags.length; i++) {
		chipsList.innerHTML += `<div id=${tags[i].id} class="chips-container__chips-list__chip">
									${tags[i].name}
								</div>`;
	}
}

function filterByTag(e) {
	if (e.target.className.match('list__chip')) {
		let filteredPosts;
		let id = parseInt(e.target.id);

		filteredPosts = posts.filter((item) => item.tags.includes(id));

		showCards(filteredPosts);
	}
}
