import {
	formItems,
	submitButton,
	authorInput,
	tagsInput,
	tags,
	postId,
	post,
	authors,
} from './commonVariables.js';
import { fetcher } from './fetcher.js';
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

	for (let i = 0; i < formItems.length - 2; i++) {
		let item = formItems[i];

		formData[item.name] = item.value;
	}

	formData['author'] = await getAuthorId();
	formData['tags'] = await getTagsId();
	formData['likes'] = post.likes;

	let fetchUrl = '/posts';
	let response;

	if (!postId) {
		formData['createDate'] = getCreateDate();
		response = await fetcher.Post(fetchUrl, formData);
	} else {
		fetchUrl += '/' + postId;
		formData['createDate'] = post.createDate;
		response = await fetcher.Put(fetchUrl, formData);
	}

	if (response) {
		let alertWord = postId ? 'edited' : 'created';

		alert(`Post ${alertWord} successfully!`);

		window.location.href = `/post.html?id=${response.id}`;
	}
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

	let fetchUrl = '/authors';

	let response = await fetcher.Post(fetchUrl, newAuthor);

	return response.id;
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

	let fetchUrl = '/tags';

	let response = await fetcher.Post(fetchUrl, newTag);

	return response.id;
}
