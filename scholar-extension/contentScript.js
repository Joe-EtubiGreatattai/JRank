var results = [];
var resultsElements = document.querySelectorAll('.gs_ri');

resultsElements.forEach(function(element) {
  var titleElement = element.querySelector('.gs_rt a');
  if (titleElement) {
    var title = titleElement.textContent.trim();
    var authorsElement = element.querySelector('.gs_a a');
    var authors = authorsElement ? authorsElement.textContent.trim() : '';
    var citationCountElement = element.querySelector('.gs_fl a:nth-of-type(3)');
    var citationCount = citationCountElement ? citationCountElement.textContent.trim().replace('Cited by', '') : '';
    var publicationDateElement = element.querySelector('.gs_a');
    var publicationDate = publicationDateElement ? extractPublicationDate(publicationDateElement.textContent) : '';
    var abstractElement = element.querySelector('.gs_rs');
    var abstract = abstractElement ? abstractElement.textContent.trim() : '';

    results.push({
      title: title,
      authors: authors,
      citation_count: citationCount,
      publication_date: publicationDate,
      abstract: abstract
    });
  }
});

results;

function extractPublicationDate(text) {
  var datePattern = /\d{4}/;
  var match = text.match(datePattern);
  if (match) {
    return match[0];
  }
  return '';
}
