import {
	formItems,
	submitButton,
	postsUrl,
	authorInput,
	tagsInput,
	tags,
	tagsUrl,
	postId,
	post,
	authors,
	authorsUrl,
} from './commonVariables.js';
import {
	showChips,
	isValid,
	getCreateDate,
	nameToSlug,
	getAuthorName,
	getTagsNames,
} from './helperFunctions.js';

const errorsList = document.getElementById('Errors List');
let errorsArray = [];

chipsList.addEventListener('click', selectAnExistingTag);
submitButton.addEventListener('click', customSubmit);

if (postId) {
	showPostToEdit();
}

showChips(tags);

function showPostToEdit() {
	for (let i = 0; i < formItems.length; i++) {
		const item = formItems[i];

		const inputsTypes = {
			title: post.title,
			subTitle: post.subTitle,
			author: getAuthorName(post.author),
			image: post.image,
			body: post.body,
			tags: getTagsNames(post.tags),
		};

		item.value = inputsTypes[item.name];
	}
}

function selectAnExistingTag(e) {
	if (e.target.className.match('list__chip')) {
		tagsInput.value += `${e.target.innerText}, `;
	}
}

function customSubmit(e) {
	e.preventDefault();

	errorsArray = [];

	for (let i = 0; i < formItems.length - 1; i++) {
		let item = formItems[i];
		let validationResult = isValid(item);

		if (typeof validationResult !== 'string') {
			inputSuccess(item);
		} else {
			inputError(item, validationResult);
		}
	}

	if (errorsArray.length > 0) {
		errorsList.innerHTML = errorsArray.join('');
	} else {
		errorsList.innerHTML = '';
		createPost();
	}
}

function inputSuccess(input) {
	input.parentElement.className = 'form__input success';
}

function inputError(input, message) {
	errorsArray.push(message);

	input.parentElement.className = 'form__input error';
}

async function createPost() {
	let formData = {};
	let fetchUrl = postsUrl;
	let method = 'POST';

	for (let i = 0; i < formItems.length - 2; i++) {
		let item = formItems[i];

		formData[item.name] = item.value;
	}

	if (!postId) {
		formData['createDate'] = getCreateDate();
	} else {
		formData['createDate'] = post.createDate;
	}

	formData['author'] = await getAuthorId();
	formData['tags'] = await getTagsId();

	if (postId) {
		method = 'PUT';
		fetchUrl = postsUrl + '/' + postId;
	}

	if (formData.tags) {
		let undefinedTag = formData.tags.find((item) => typeof item !== 'number');

		if (undefinedTag) {
			return;
		}
	}

	fetch(fetchUrl, {
		method: method,
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((data) => data.json())
		.then((data) => {
			if (!method === 'PUT') {
				alert('Post created: ' + JSON.stringify(data));
			} else {
				alert('Post modified: ' + JSON.stringify(data));
			}
		})
		.catch((err) => alert('Error: ' + JSON.stringify(err)));
}

async function getAuthorId() {
	let author = authorInput.value.split(' ');
	let authorName = author[0];
	let authorLastName = author[1];
	let authorId;

	let selectedAuthor = authors.find(
		(item) => item.name === authorName && item.lastName === authorLastName
	);

	if (selectedAuthor) {
		authorId = selectedAuthor.id;
	} else {
		authorId = await createNewAuthor(authorName, authorLastName);
	}

	return authorId;
}

async function createNewAuthor(authorName, authorLastName) {
	let newAuthor = {};

	newAuthor['name'] = authorName;
	newAuthor['lastName'] = authorLastName;

	let newAuthorId = await getNewAuthorId(newAuthor);

	return newAuthorId;
}

async function getNewAuthorId(newAuthor) {
	try {
		const response = await fetch(authorsUrl, {
			method: 'POST',
			body: JSON.stringify(newAuthor),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result.id;
	} catch (err) {
		alert('Error: ' + JSON.stringify(err));
	}
}

async function getTagsId() {
	let insertedTags = tagsInput.value.split(', ');
	let tagsIds = [];

	for (let i = 0; i < insertedTags.length; i++) {
		let selectedTag = tags.find((item) => item.name === insertedTags[i]);

		if (selectedTag) {
			tagsIds.push(selectedTag.id);
		} else {
			tagsIds.push(await createNewTag(insertedTags[i]));
		}
	}

	return tagsIds;
}

async function createNewTag(newTagName) {
	let newTag = {};

	newTag['name'] = newTagName;
	newTag['slug'] = nameToSlug(newTagName);

	let newTagId = await getNewTagId(newTag);

	return newTagId;
}

async function getNewTagId(newTag) {
	try {
		const response = await fetch(tagsUrl, {
			method: 'POST',
			body: JSON.stringify(newTag),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		return result.id;
	} catch (err) {
		alert('Error: ' + JSON.stringify(err));
	}
}
