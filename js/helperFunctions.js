export function sortArrayByDate(a, b) {
	return new Date(a.createDate) - new Date(b.createDate);
}
