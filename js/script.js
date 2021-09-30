'use strict';

import './chipsList.js';
import { featureSection, regularSection } from './commonVariables.js';
import { getPosts, sortArrayByDate } from './helperFunctions.js';

export const posts = await getPosts();

showCards(posts);

export function showCards(posts) {
	posts.sort(sortArrayByDate);
	posts.reverse();

	featureSection.innerHTML = '';
	regularSection.innerHTML = '';

	if (posts.length > 0) {
		insertPostsInHtml(posts);
	} else {
		featureSection.innerHTML =
			"<h1>There aren't posts for this tags. Try another</h1>";
	}
}

function insertPostsInHtml(posts) {
	for (let i = 0; i < posts.length; i++) {
		if (i < 3) {
			featureSection.innerHTML += `<div class="feature-section__card">
											<h1>${posts[i].title}</h1>
											<h2>${posts[i].subTitle}</h2>
											<img src=${posts[i].image}>
											<p>${posts[i].body}</p>
										</div>`;
		} else {
			regularSection.innerHTML += `<div class="regular-section__card">
											<h1>${posts[i].title}</h1>
											<img src=${posts[i].image}>
										</div>`;
		}
	}
}
