const tagsUrl = 'http://localhost:3000/tags';

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

export function getLastThreePosts(successFunction) {
	fetch(postsUrl)
		.then((data) => data.json())
		.then(successFunction)
		.catch((err) => {
			console.log(
				`El servidor devolvió un error: ${err}. <br> Inténtelo de nuevo más tarde.`
			);
		});
}
