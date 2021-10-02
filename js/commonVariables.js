import {
	getTags,
	getPosts,
	getPostById,
	getAuthors,
} from './helperFunctions.js';

export const serverUrl = 'https://posts-list-db.herokuapp.com';
export const postsUrl = serverUrl + '/posts';
export const tagsUrl = serverUrl + '/tags';
export const authorsUrl = serverUrl + '/authors';

export const urlParams = new URLSearchParams(window.location.search);
export const postId = urlParams.get('id');

export const body = document.getElementsByTagName('body');
export const chipsList = document.getElementById('chipsList');
export const featureSection = document.getElementById('featureSection');
export const regularSection = document.getElementById('regularSection');

export const form = document.getElementById('form');
export const formItems = form?.elements;
export const submitButton = document.getElementById('submitButton');
export const tagsInput = document.getElementById('tags');

export const container = document.getElementById('container');

export const tags = await getTags();
export const posts = await getPosts();
export const authors = await getAuthors();
export const post = await getPostById();

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
