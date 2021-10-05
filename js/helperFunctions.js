import { authors, months, users, tags } from './commonVariables.js';

export function showChips(tags) {
	for (let i = 0; i < tags.length; i++) {
		chipsList.innerHTML += `<div id=${tags[i].id} class="chips-container__chips-list__chip">
									${tags[i].name}
								</div>`;
	}
}

export function sortArrayByDate(a, b) {
	return new Date(a.createDate) - new Date(b.createDate);
}

export function getAuthorName(id) {
	let author = authors.find((item) => item.id === parseInt(id));
	let fullName = `${author.name} ${author.lastName}`;
	return fullName;
}

export function getTagsNames(ids) {
	let tagsNames = [];

	for (let i = 0; i < ids.length; i++) {
		let selectedTag = tags.find((item) => item.id === ids[i]);

		if (selectedTag) {
			tagsNames.push(selectedTag.name);
		}
	}

	let result = tagsNames.join(', ');

	return result;
}

export function isValid(input) {
	if (input.value.length === 0) {
		return `<li>${input.placeholder} is required.</li>`;
	}

	const regexTypes = {
		tags: /\S+\, \S+$/,
		imageUrl: /\S+\.\S+\.\S+/,
	};

	const messagesTypes = {
		tags: `<li>${input.placeholder} must be separated by commas: "Tag1, Tag2, etc".</li>`,
		imageUrl: `<li>${input.placeholder} format must be "http://www.example.com".</li>`,
	};

	let regex = regexTypes[input.id];
	let message = messagesTypes[input.id];

	if (input.value.match(regex)) {
		return true;
	} else {
		return message;
	}
}

export function getCreateDate() {
	let date = new Date();

	let day = String(date.getDate()).padStart(2, '0');
	let month = String(date.getMonth() + 1).padStart(2, '0');
	let year = date.getFullYear();

	let result = `${year}/${month}/${day}`;

	return result;
}

export function nameToSlug(string) {
	let lowerCasedString = string.toLowerCase();
	let result = lowerCasedString.replace(' ', '-');

	return result;
}

export function changePostDateFormat(postDate) {
	let splittedDate = postDate.split('/');
	let day = splittedDate[2];
	let month = months[splittedDate[1] - 1];
	let year = splittedDate[0];

	let result = `${month} ${day}, ${year}`;

	return result;
}

export function getUserName(id) {
	let user = users.find((item) => item.id === parseInt(id));
	let fullName = `${user.name} ${user.lastName}`;
	return fullName;
}

export function debounce(fn, delay) {
	let timeoutID;

	return function (...args) {
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		timeoutID = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}

export function throttle(fn, delay) {
	let last = 0;

	return function (...args) {
		const now = new Date().getTime();

		if (now - last < delay) {
			return;
		}

		last = now;
		return fn(...args);
	};
}
