import { tagsUrl, postsUrl } from './commonVariables.js';

export function getTags(successFunction) {
	fetch(tagsUrl)
		.then((data) => data.json())
		.then(successFunction)
		.catch((err) => {
			console.log(
				`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
			);
		});
}

export function getPosts(successFunction) {
	fetch(postsUrl)
		.then((data) => data.json())
		.then(successFunction)
		.catch((err) => {
			console.log(
				`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
			);
		});
}
