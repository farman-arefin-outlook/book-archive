/* //Search area https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

const searchField = document.getElementById('search-field');
const authorDetails = document.getElementById('author-details');
const bookNumber = document.getElementById('book-numbers');
const searchResult = document.getElementById('search-result');

const loadImage = async (cover_i) => {
    const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

}

const searchBook = async () => {
    searchText = searchField.value;
    //console.log(searchText);
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    loadData(data.docs);
}


const loadData = (data) => {
    for (const item of data) {
        //console.log(item);
        const div = document.createElement('div');
        div.innerHTML = `<div class="col">
        <img src=loadImage('${item.author_key[0]}');
        <div class="card-body">
                          <h5 class="card-title">Title: ${item.title}</h5>
                          <p class="card-text">Author Name: ${item.author_alternative_name[0]}</p>
                          <p class="card-text">Author Name: ${item.publisher}</p>
                          <p class="card-text">First Year of Publication: ${item.first_publish_year}</p>
                      </div>
                      </div>
  `;
        searchResult.appendChild(div);
    }

}
 */


const errorMessage = document.getElementById('error-message');
const spinner = document.getElementById('spinner');
const authorDetails = document.getElementById('author-details');

const searchResult = document.getElementById('search-result');
const bookNumber = document.getElementById('book-numbers');
const searchBook = () => {
    errorMessage.style.display = 'none';
    spinner.style.display = 'none';
    authorDetails.textContent = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';

    // This is handling empty string from the user
    if (searchText == '') {
        displayError();
    }
    else {
        // This is Spinner
        spinner.style.display = 'block';
        errorMessage.style.display = 'none';
        // Load the data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(error => displayError());
    }
}

const displayError = () => {
    errorMessage.style.display = 'block';
    spinner.style.display = 'none';
    authorDetails.textContent = '';

}
// This is display body
const displaySearchResult = items => {
    bookNumber.textContent = '';

    searchResult.textContent = '';

    const bookItem = items.docs;
    if (bookItem.length == 0) {
        displayError();
    }
    else {
        errorMessage.style.display = 'none';
        spinner.style.display = 'none';
        bookNumber.innerText = `Found Items ${bookItem.length}`;
        // Find books and showing in cards
        bookItem.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick="loadAuthorDetail('${book.author_key ? book.author_key[0] : "n/a"}')" class="card h-100 text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    
                    <h5 class="card-title">Title: ${book.title}</h5>
                    <p class="card-text">Author Name:${book.author_name ? book.author_name[0] : "n/a"}</p>
                    <p class="card-text">Publisher: ${book.publisher ? book.publisher[0] : "n/a"}</p>
                    <p class="card-text">First Year of Publication: ${book.first_publish_year ? book.first_publish_year : "n/a"}</p>
                </div>
            </div>
            `;

            searchResult.appendChild(div);
        });
    }

}

const loadAuthorDetail = async authorId => {
    const url = `https://openlibrary.org/authors/${authorId}.json`;
    const response = await fetch(url);
    const data = await response.json();
    displayAuthorDetail(data);
}

const displayAuthorDetail = (authorDetail) => {
    const authorDetails = document.getElementById('author-details');
    authorDetails.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card', 'bg-gray', 'text-primary', 'text-center');
    div.innerHTML = `
    <div class="card-body">
        
        <h1 class="card-title">Author name: ${authorDetail.name}</h1>
    </div>
    `;
    authorDetails.appendChild(div);
}