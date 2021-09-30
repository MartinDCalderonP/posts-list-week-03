import { tagsUrl, postsUrl } from './commonVariables.js';

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

export function sortArrayByDate(a, b) {
	return new Date(a.createDate) - new Date(b.createDate);
}