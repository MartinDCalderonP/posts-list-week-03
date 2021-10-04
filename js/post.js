import {
	postContainer,
	post,
	tags,
	commentsContainer,
	comments,
	editButton,
	deleteButton,
	postsUrl,
	likeButton,
} from './commonVariables.js';
import {
	changePostDateFormat,
	getAuthorName,
	showChips,
	getUserName,
	throttle,
} from './helperFunctions.js';

showPost();
showPostChips();
showComments();

likeButton.addEventListener('click', throttle(likePost, 500));
editButton.addEventListener('click', throttle(editPost, 500));
deleteButton.addEventListener('click', throttle(deletePost, 500));

function showPost() {
	postContainer.innerHTML = `<div class="post-container__row">
                                <p>${changePostDateFormat(post.createDate)}</p>
                            </div>
                            <div class="post-container__body">
                                <h1>${post.title}</h1>
                                <h2>${post.subTitle}</h2>
                                <p>Por: ${getAuthorName(post.author)}</p>
                                <img src=${post.image} alt=${post.title}>
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

function showComments() {
	if (comments.lengt > 0) {
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

function likePost() {
	let addLike = {};
	addLike['likes'] = post.likes + 1;

	fetch(postsUrl + '/' + post.id, {
		method: 'PATCH',
		body: JSON.stringify(addLike),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((data) => data.json())
		.then((data) => alert('Like added to: ' + JSON.stringify(data)))
		.catch((err) => alert('Error: ' + JSON.stringify(err)));
}

function editPost() {
	window.location.href = `/createEdit.html?id=${post.id}`;
}

function deletePost() {
	let result = confirm(
		'Are you sure to delete the post? This action cannot be undone.'
	);

	if (result) {
		fetch(postsUrl + '/' + post.id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((data) => data.json())
			.then((data) => alert('Deleted post.'))
			.catch((err) => 'An error has occurred, please try again later.');
	}
}
