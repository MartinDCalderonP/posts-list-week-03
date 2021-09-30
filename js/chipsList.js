import { posts, showCards } from './script.js';
import { getTags } from './helperFunctions.js';

chipsList.addEventListener('click', filterByTag);

const tags = await getTags();

showChips(tags);

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

		filteredPosts = posts.filter((item) =>
			item.tags.includes(parseInt(e.target.id))
		);

		showCards(filteredPosts);
	}
}
