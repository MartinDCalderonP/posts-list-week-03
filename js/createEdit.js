import {
	formItems,
	submitButton,
	postsUrl,
	tagsInput,
	tags,
	tagsUrl,
} from './commonVariables.js';
import { getCreateDate, nameToSlug } from './helperFunctions.js';

let id;
let errorsArray = [];

submitButton.addEventListener('click', customSubmit);

function customSubmit(e) {
	e.preventDefault();

	errorsArray = [];

	for (let i = 0; i < formItems.length - 1; i++) {
		let item = formItems[i];

		if (typeof isValidValue(item) !== 'string') {
			inputSuccess(item);
		} else {
			inputError(item, isValidValue(item));
		}
	}

	if (errorsArray.length > 0) {
		errorsList.innerHTML = errorsArray.join('');
	} else {
		console.log('Éxito');
		// createPost();
	}
}

function inputSuccess(input) {
	input.parentElement.className = 'inputDiv success';
}

function inputError(input, message) {
	errorsArray.push(message);

	input.parentElement.className = 'inputDiv error';
}

async function createPost() {
	let formData = {};
	let method = 'POST';

	for (let i = 0; i < formItems.length - 2; i++) {
		let item = formItems[i];

		formData[item.name] = item.value;
	}

	formData['createDate'] = getCreateDate();
	formData['tags'] = await getTagsId();

	if (id) {
		method = 'PUT';
	}

	if (formData.tags) {
		let undefinedTag = formData.tags.find((item) => typeof item !== 'number');

		if (undefinedTag) {
			return;
		}
	}

	fetch(postsUrl, {
		method: method,
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((data) => data.json())
		.then((data) => alert('Post created: ' + JSON.stringify(data)))
		.catch((err) => alert('Error: ' + JSON.stringify(err)));
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
