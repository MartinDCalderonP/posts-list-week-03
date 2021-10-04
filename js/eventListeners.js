import { searchInput, searchButton } from './commonVariables.js';

searchInput.addEventListener('focusin', inputFocusIn);
searchInput.addEventListener('focusout', inputFocusOut);

function inputFocusIn() {
	searchInput.parentElement.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
	searchInput.parentElement.style.borderColor = 'black';
	searchButton.style.color = 'black';
}

function inputFocusOut() {
	searchInput.parentElement.style.boxShadow = 'none';
	searchInput.parentElement.style.borderColor = 'var(--detailsColor)';
	searchButton.style.color = 'var(--detailsColor)';
}
