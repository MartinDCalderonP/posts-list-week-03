const serverUrl = 'https://posts-list-db.herokuapp.com';

const Singleton = (function () {
	let instance;

	function createInstance() {
		const Get = async function (fetchUrl) {
			try {
				const response = await fetch(serverUrl + fetchUrl);
				const result = await response.json();
				return result;
			} catch (err) {
				console.log(`${err}. <br> Try again later.`);
			}
		};

		const Post = async function (fetchUrl, createdObject) {
			try {
				const response = await fetch(serverUrl + fetchUrl, {
					method: 'POST',
					body: JSON.stringify(createdObject),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				return result;
			} catch (err) {
				console.log(`${err}. <br> Try again later.`);
			}
		};

		const Put = async function (fetchUrl, editedObject) {
			try {
				const response = await fetch(serverUrl + fetchUrl, {
					method: 'PUT',
					body: JSON.stringify(editedObject),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				return result;
			} catch (err) {
				console.log(`${err}. <br> Try again later.`);
			}
		};

		const Patch = async function (fetchUrl, postedObject) {
			try {
				const response = await fetch(serverUrl + fetchUrl, {
					method: 'PATCH',
					body: JSON.stringify(postedObject),
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				return result;
			} catch (err) {
				console.log(`${err}. <br> Try again later.`);
			}
		};

		const Delete = async function (fetchUrl) {
			try {
				const response = await fetch(serverUrl + fetchUrl, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				const result = await response.json();
				return result;
			} catch (err) {
				console.log(`${err}. <br> Try again later.`);
			}
		};

		return { Get, Post, Put, Patch, Delete };
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}

			return instance;
		},
	};
})();

export const fetcher = await Singleton.getInstance();
