import { tagsUrl, postsUrl, authorsUrl } from './commonVariables.js';

export const tags = await getTags();
export const posts = await getPosts();
const authors = await getAuthors();

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

async function getAuthors() {
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
