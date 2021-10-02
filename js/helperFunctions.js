import {
	tags,
	tagsUrl,
	postsUrl,
	authorsUrl,
	authors,
	postId,
	post,
	months,
} from './commonVariables.js';

export function showChips() {
	for (let i = 0; i < tags.length; i++) {
		chipsList.innerHTML += `<div id=${tags[i].id} class="chips-container__chips-list__chip">
									${tags[i].name}
								</div>`;
	}
}

export async function getTags() {
	try {
		const response = await fetch(tagsUrl);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(
			`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
		);
	}
}

export async function getPosts() {
	try {
		const response = await fetch(postsUrl);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(
			`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
		);
	}
}

export async function getPostById() {
	try {
		const response = await fetch(postsUrl + '/' + postId);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(
			`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
		);
	}
}

export async function getAuthors() {
	try {
		const response = await fetch(authorsUrl);
		const result = await response.json();
		return result;
	} catch (err) {
		console.log(
			`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
		);
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

export function isValid(input) {
	if (input.value.length === 0) {
		return `<li>${input.placeholder} is required.</li>`;
	}

	const regexTypes = {
		tags: /\S+\, \S+$/,
		imageUrl: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-])\/?$/,
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

export function changePostDateFormat() {
	let splittedDate = post.createDate.split('/');
	let day = splittedDate[2];
	let month = months[splittedDate[1] - 1];
	let year = splittedDate[0];

	let result = `${month} ${day}, ${year}`;

	return result;
}
