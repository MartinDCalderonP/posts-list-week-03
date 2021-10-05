import { nameToSlug } from './helperFunctions.js';

function ObjectsFactory() {
	this.createObject = function (type, name, lastName) {
		let object;

		const objectTypes = {
			author: new Author(name, lastName),
			tag: new Tag(name),
		};

		object = objectTypes[type];

		return object;
	};
}

const Author = function (name, lastName) {
	this.name = name;
	this.lastName = lastName;
};

const Tag = function (name) {
	this.name = name;
	this.slug = nameToSlug(name);
};

export const factory = new ObjectsFactory();
