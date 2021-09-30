'use strict';

import {
	chipsList,
	featureSection,
	regularSection,
} from './commonVariables.js';

import {
	getTags,
	getPosts,
	filterByTag,
	sortArrayByDate,
} from './helperFunctions.js';

chipsList.addEventListener('click', filterByTag);

getTags(showChips);
getPosts(showPosts);

function showChips(tags) {
	for (let i = 0; i < tags.length; i++) {
		chipsList.innerHTML += `<div class="chips-container__chips-list__chip">${tags[i].name}</div>`;
	}
}

function showPosts(posts) {
	posts.sort(sortArrayByDate);
	posts.reverse();

	for (let i = 0; i < posts.length; i++) {
		if (i < 3) {
			featureSection.innerHTML += `<div class="feature-section__card">
											<h1>${posts[i].title}</h1>
											<h2>${posts[i].subTitle}</h2>
											<img src=${posts[i].image}>
											<p>${posts[i].body}</p>
											<p>${posts[i].createDate}</p>
											<p>Likes: ${posts[i].likes}</p>
											<p>Author: ${posts[i].author}</p>
											<p>Tags: ${posts[i].tags}</p>
										</div>`;
		} else {
			regularSection.innerHTML += `<div class="regular-section__card">
											<h1>${posts[i].title}</h1>
											<h2>${posts[i].subTitle}</h2>
											<img src=${posts[i].image}>
											<p>${posts[i].body}</p>
											<p>${posts[i].createDate}</p>
											<p>Likes: ${posts[i].likes}</p>
											<p>Author: ${posts[i].author}</p>
											<p>Tags: ${posts[i].tags}</p>
										</div>`;
		}
	}
}
