// //Search area https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

// const searchField = document.getElementById('search-field');
// const authorDetails = document.getElementById('author-details');
// const bookNumber = document.getElementById('book-numbers');
// const searchResult = document.getElementById('search-result');

// const loadImage = async (cover_i) => {
//     const url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log(data);

// }

// const searchBook = async () => {
//     searchText = searchField.value;
//     //console.log(searchText);
//     const url = `https://openlibrary.org/search.json?q=${searchText}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     loadData(data.docs);
// }


// const loadData = (data) => {
//     for (const item of data) {
//         //console.log(item);
//         const div = document.createElement('div');
//         div.innerHTML = `<div class="col">
//         <img src=loadImage('${item.author_key[0]}');
//         <div class="card-body">
//                           <h5 class="card-title">Title: ${item.title}</h5>
//                           <p class="card-text">Author Name: ${item.author_alternative_name[0]}</p>
//                           <p class="card-text">Author Name: ${item.publisher}</p>
//                           <p class="card-text">First Year of Publication: ${item.first_publish_year}</p>
//                       </div>
//                       </div>
//   `;
//         searchResult.appendChild(div);
//     }

// }


// document.getElementById('error-message').style.display = 'none';
// document.getElementById('spinner').style.display = 'none';
// document.getElementById('author-details').textContent = ''


const errorMessage = document.getElementById('error-message');
const spinner = document.getElementById('spinner');
const authorDetails = document.getElementById('author-details');

const searchResult = document.getElementById('search-result');
const searchBook = () => {
    errorMessage.style.display = 'none';
    spinner.style.display = 'none';
    authorDetails.textContent = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';

    // This is handling empty string from the user
    if (searchText == '') {
        // please write something to display
        displayError();
    }
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('error-message').style.display = 'none';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(error => displayError());
    }
}

const displayError = () => {
    // document.getElementById('error-message').style.display = 'block';
    // document.getElementById('spinner').style.display = 'none';
    // document.getElementById('book-numbers').textContent = '';
    // document.getElementById('author-details').textContent = '';
    errorMessage.style.display = 'block';
    spinner.style.display = 'none';
    authorDetails.textContent = '';

}
// This is display body
const displaySearchResult = items => {
    document.getElementById('book-numbers').textContent = '';

    searchResult.textContent = '';

    const bookItem = items.docs;
    if (bookItem.length == 0) {
        displayError();
    }
    else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Books Found ${bookItem.length}`;
        // Retrieve each book and display in a card
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

// Fetch author detail
const loadAuthorDetail = authorId => {
    fetch(`https://openlibrary.org/authors/${authorId}.json`)
        .then(res => res.json())
        .then(res => displayAuthorDetail(res));
}

const displayAuthorDetail = (authorDetail) => {
    window.scrollTo(0, 40);
    const authorShow = document.getElementById('author-details');
    authorShow.textContent = ''
    const div = document.createElement('div');
    div.classList.add('card', 'bg-gray', 'text-warning', 'text-center');
    div.innerHTML = `
    <div class="card-body">
        
        <h1 class="card-title">Author name: ${authorDetail.name}</h1>
    </div>
    `;
    authorShow.appendChild(div);
}