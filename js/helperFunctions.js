import { tagsUrl, postsUrl, authorsUrl, authors } from './commonVariables.js';

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
