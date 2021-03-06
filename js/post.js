import {
	postContainer,
	post,
	tags,
	commentsContainer,
	comments,
	editButton,
	deleteButton,
	likeButton,
	addCommentButton,
	commentTextArea,
	users,
	userSelect,
} from './commonVariables.js';
import { fetcher } from './singletonFetcher.js';
import {
	changePostDateFormat,
	getAuthorName,
	showChips,
	getUserName,
	throttle,
} from './helperFunctions.js';

let selectedUserId = 1;

if (post.id) {
	showPost();
	showPostChips();
	showComments();
	showUsersOnSelect();
} else {
	window.location.href = '/index.html';
}

likeButton.addEventListener('click', throttle(likePost, 500));
editButton.addEventListener('click', throttle(editPost, 500));
deleteButton.addEventListener('click', throttle(deletePost, 500));
addCommentButton.addEventListener('click', throttle(addComment, 500));
userSelect.addEventListener('click', getSelectedUserId);

function showPost() {
	postContainer.innerHTML = `<div class="post-container__row">
                                <p>${changePostDateFormat(post.createDate)}</p>
                            </div>
                            <div class="post-container__body">
                                <h1>${post.title}</h1>
                                <h2>${post.subTitle}</h2>
                                <p>Por: ${getAuthorName(post.author)}</p>
                                <img class="appear-card" src=${post.image} alt=${post.title}>
                                <div class="post-container__body__icons">
                                    
                                </div>
                                <p>${post.body}</p>
                            </div>`;
	likeButton.innerHTML += post.likes;
}

function showPostChips() {
	let postTags = [];

	for (let i = 0; i < post.tags.length; i++) {
		let postTag = tags.find((item) => item.id === post.tags[i]);

		postTags.push(postTag);
	}

	showChips(postTags);
}

function showUsersOnSelect() {
	for (let i = 0; i < users.length; i++) {
		const item = users[i];

		userSelect.innerHTML += `<option value="${item.id}">${item.name} ${item.lastName}</option>`;
	}
}

function getSelectedUserId(e) {
	if (e.target.matches('option')) {
		selectedUserId = e.target.value;
	}
}

function showComments() {
	if (comments.length > 0) {
		for (let i = 0; i < comments.length; i++) {
			const item = comments[i];

			commentsContainer.innerHTML += `<div>
                                            <p>
                                                <strong>
                                                    ${getUserName(item.user)}
                                                </strong>
                                            </p>
                                            <p>${item.comment}</p>
                                        </div>`;
		}
	} else {
		commentsContainer.innerHTML += `<h4>There aren't comments yet.</h4>`;
	}
}

async function likePost() {
	let addLike = {};
	addLike['likes'] = post.likes + 1;

	let fetchUrl = '/posts/' + post.id;

	let response = await fetcher.Patch(fetchUrl, addLike);

	if (response) {
		alert('Post liked successfully!');
	}
}

function editPost() {
	window.location.href = `/createEdit.html?id=${post.id}`;
}

async function deletePost() {
	let result = confirm(
		'Are you sure to delete the post? This action cannot be undone.'
	);

	if (!result) {
		return;
	}

	let fetchUrl = '/posts/' + post.id;

	let response = await fetcher.Delete(fetchUrl);

	if (response) {
		alert('Deleted post.');
		window.location.replace('index.html');
	}
}

async function addComment() {
	if (commentTextArea.value) {
		let newComment = {};

		newComment['comment'] = commentTextArea.value;
		newComment['postId'] = post.id;
		newComment['user'] = selectedUserId;

		let response = await fetcher.Post('/comments', newComment);

		if (response) {
			alert('Post commented successfully!');
		}
	}
}
