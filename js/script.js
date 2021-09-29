'use strict';

import { getTags } from './fetcher.js';

let chipsList = document.getElementById('chipsList');

getTags(showChips);

function showChips(tags) {
	for (let i = 0; i < tags.length; i++) {
		chipsList.innerHTML += `<div class="chips-container__chips-list__chip">${tags[i].name}</div>`;
	}
}
