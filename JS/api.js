//Search area

const searchField = document.getElementById('search-field');
const authorDetails = document.getElementById('author-details');
const bookNumber = document.getElementById('book-numbers');
const searchResult = document.getElementById('search-result');

const loadData = async () => {
    searchText = searchField.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    searchBook(data);
}

const searchBook = () => {

}