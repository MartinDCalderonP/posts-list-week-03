import {
	postContainer,
	post,
	tags,
	commentsContainer,
	comments,
} from './commonVariables.js';
import {
	changePostDateFormat,
	getAuthorName,
	showChips,
	getUserName,
} from './helperFunctions.js';

showPost();
showPostChips();
showComments();

function showPost() {
	postContainer.innerHTML = `<div class="post-container__row">
                                <p>${changePostDateFormat(post.createDate)}</p>
                            </div>
                            <div class="post-container__body">
                                <h1>${post.title}</h1>
                                <h2>${post.subTitle}</h2>
                                <p>Por: ${getAuthorName(post.author)}</p>
                                <img src=${post.image} alt=${post.title}>
                                <p class="post-container__body__likes">
                                    <i class="far fa-thumbs-up"></i>
                                    ${post.likes}
                                </p>
                                <p>${post.body}</p>
                            </div>`;
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
