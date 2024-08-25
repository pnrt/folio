let articles = [];

// Fetch articles from JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        articles = data;
        displayArticles();
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
        window.location.href = 'error.html';
    });

// Display top 10 articles
function displayArticles() {
    const articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = ''; // Clear previous articles

    // Sort by date to ensure the latest articles are shown first
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const top10Articles = sortedArticles.slice(0, 10); // Get top 10 latest articles
    top10Articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.onclick = () => openArticle(article.id);

        card.innerHTML = `
            <div class="card-title">${article.title}</div>
            <div class="card-description">${article.description}</div>
            <div class="card-date">${article.date}</div>
        `;
        articlesList.appendChild(card);
    });
}

// Search and filter articles
function searchArticles() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchResults = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm)
    );
    displaySearchResults(searchResults);
}

// Display search results
function displaySearchResults(results) {
    const articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = ''; // Clear previous results

    results.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.onclick = () => openArticle(article.id);

        card.innerHTML = `
            <div class="card-title">${article.title}</div>
            <div class="card-date">${article.date}</div>
            <div class="card-description">${article.description}</div>
            
        `;
        articlesList.appendChild(card);
    });
}

// Open full article
function openArticle(id) {
    const article = articles.find(article => article.id === id);
    if (article) {
        window.location.href = `article.html?id=${id}`;
    } else {
        window.location.href = `error.html`;
    }
}

// Display full article content
function loadArticleContent() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    const article = articles.find(article => article.id == articleId);

    if (article) {
        document.getElementById('article-content').innerHTML = article.content;
    } else {
        window.location.href = 'error.html';
    }
}

// Go back to article list
function goBack() {
    window.history.back();
}

// On page load for article.html, load the article content
if (window.location.pathname.includes('article.html')) {
    window.addEventListener('DOMContentLoaded', loadArticleContent);
}
