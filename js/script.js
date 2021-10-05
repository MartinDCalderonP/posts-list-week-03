'use strict';

import './search.js';
import './eventListeners.js';
import './suggestions.js';
import './chipsList.js';
import { featureSection, regularSection, posts } from './commonVariables.js';
import { getAuthorName, sortArrayByDate } from './helperFunctions.js';

showCards(posts);

export function showCards(posts) {
	posts.sort(sortArrayByDate);
	posts.reverse();

	featureSection.innerHTML = '';
	regularSection.innerHTML = '';

	if (posts.length > 0) {
		insertPostsInCards(posts);
	} else {
		featureSection.innerHTML =
			"<h1>There aren't posts for this tags. Try another</h1>";
		featureSection.style.color = 'red';
	}
}

function insertPostsInCards(posts) {
	for (let i = 0; i < posts.length; i++) {
		if (i < 3) {
			featureSection.innerHTML += `<div class="feature-section__card appear-card">
											<a href="post.html?id=${posts[i].id}">
												<h1>${posts[i].title}</h1>
											</a>
											<a href="post.html?id=${posts[i].id}">
												<h2>${posts[i].subTitle}</h2>
											</a>
											<p class="feature-section__card__author">
												Por: ${getAuthorName(posts[i].author)}
											</p>
											<a href="post.html?id=${posts[i].id}">
												<img src=${posts[i].image} alt=${posts[i].title}>
											</a>
											<p class="feature-section__card__description">
												${posts[i].body}
											</p>
										</div>`;
		} else {
			regularSection.innerHTML += `<div class="regular-section__card appear-card">
											<a href="post.html?id=${posts[i].id}">
												<h1>${posts[i].title}</h1>
											</a>
											<a href="post.html?id=${posts[i].id}">
												<img src=${posts[i].image} alt=${posts[i].title}>
											</a>
										</div>`;
		}
	}
}
