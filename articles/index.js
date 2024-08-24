function renderArticles() {
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';

    const topArticles = articles.slice(0, 10);
    topArticles.forEach(article => {
        const articleItem = `
            <div class="article-card" onclick="openArticle(${article.id})">
                <h3>${article.title}</h3>
                <p>${article.date}</p>
                <p>${article.description}</p>
            </div>
        `;
        articleList.innerHTML += articleItem;
    });
}

function openArticle(id) {
    window.location.href = `article.html?id=${id}`;
}

function searchArticles() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );

    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';

    filteredArticles.forEach(article => {
        const articleItem = `
            <div class="article-card" onclick="openArticle(${article.id})">
                <h3>${article.title}</h3>
                <p>${article.date}</p>
                <p>${article.description}</p>
            </div>
        `;
        articleList.innerHTML += articleItem;
    });
}

renderArticles();
