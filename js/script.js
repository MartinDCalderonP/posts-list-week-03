'use strict';

import { getTags, getLastThreePosts } from './fetcher.js';

let featureSection = document.getElementById('featureSection');
let chipsList = document.getElementById('chipsList');

getTags(showChips);
getLastThreePosts(showFeatureSection);

function showChips(tags) {
	for (let i = 0; i < tags.length; i++) {
		chipsList.innerHTML += `<div class="chips-container__chips-list__chip">${tags[i].name}</div>`;
	}
}

function showFeatureSection(posts) {
	for (let i = 0; i < 3; i++) {
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
	}
}
