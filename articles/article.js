window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');

    const article = articles.find(article => article.id == articleId);

    if (article) {
        document.getElementById('article-title').innerText = article.title;
        document.getElementById('article-content').innerHTML = article.content.join(' ');
    } else {
        window.location.href = 'error.html';
    }
}

function goHome() {
    window.location.href = 'index.html';
}
