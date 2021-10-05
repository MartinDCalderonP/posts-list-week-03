import { fetcher } from './singletonFetcher.js';

export const urlParams = new URLSearchParams(window.location.search);
export const postId = urlParams.get('id');

export const tags = await fetcher.Get('/tags');
export const posts = await fetcher.Get('/posts');
export const authors = await fetcher.Get('/authors');
export const users = await fetcher.Get('/users');
export const post = postId && (await fetcher.Get('/posts/' + postId));
export const comments =
	postId && (await fetcher.Get('/comments?postId=' + postId));

export const searchForm = document.getElementById('searchForm');
export const searchInput = document.getElementById('searchInput');
export const searchButton = document.getElementById('searchButton');
export const suggestionsList = document.getElementById('suggestionsList');
export const chipsList = document.getElementById('chipsList');
export const featureSection = document.getElementById('featureSection');
export const regularSection = document.getElementById('regularSection');

export const form = document.getElementById('form');
export const formItems = form?.elements;
export const submitButton = document.getElementById('submitButton');
export const authorInput = document.getElementById('author');
export const tagsInput = document.getElementById('tags');

export const postContainer = document.getElementById('postContainer');
export const commentsContainer = document.getElementById('commentsContainer');
export const likeButton = document.getElementById('likeButton');
export const editButton = document.getElementById('editButton');
export const deleteButton = document.getElementById('deleteButton');
export const userSelect = document.getElementById('userSelect');
export const commentTextArea = document.getElementById('commentTextArea');
export const addCommentButton = document.getElementById('addCommentButton');

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
