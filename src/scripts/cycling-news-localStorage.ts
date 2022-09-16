const articlesKey = "kiosq_article_seen_urls";

if (localStorage.getItem(articlesKey)) {
  localStorage.removeItem(articlesKey);
}

export {};
