//Search area https://covers.openlibrary.org/b/id/{cover_i}-M.jpg

const searchField = document.getElementById('search-field');
const authorDetails = document.getElementById('author-details');
const bookNumber = document.getElementById('book-numbers');
const searchResult = document.getElementById('search-result');


const searchBook = async () => {
    searchText = searchField.value;
    //console.log(searchText);
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.docs)
    loadAuthorDetail(data.docs);
}


const loadAuthorDetail = (data) => {
    for (const item of data) {
        console.log(item.key);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` <div onclick="loadAuthorDetail('${item.created.key}')" class="card h-100 text-center">
                    <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Title: ${item.title}</h5>
                        <p class="card-text">Author Name: ${item.alternative_names}</p>

                    </div>
                </div>
            </div>`;
        searchResult.appendChild(div);
    }

}