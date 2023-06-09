document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];

    // Retrieve the last searched query from history
    chrome.history.search({ text: '', maxResults: 1, startTime: 0, endTime: Date.now(), text: 'scholar.google.com' }, function(historyItems) {
      if (historyItems.length > 0) {
        var lastSearchQuery = extractSearchQuery(historyItems[0].url);
        fetchGoogleScholarResults(tab, lastSearchQuery, function(results) {
          var resultsList = document.getElementById('results-list');
          results.forEach(function(result) {
            var listItem = document.createElement('li');
            var title = document.createElement('h3');
            var authors = document.createElement('p');
            var citationCount = document.createElement('p');
            var publicationDate = document.createElement('p');
            var abstract = document.createElement('p');

            title.innerHTML = result.title;
            authors.innerHTML = '<b>Authors:</b> ' + result.authors;
            citationCount.innerHTML = '<b>Cited by:</b> ' + result.citation_count;
            publicationDate.innerHTML = '<b>Publication Date:</b> ' + result.publication_date;
            abstract.innerHTML = result.abstract;

            listItem.appendChild(title);
            listItem.appendChild(authors);
            listItem.appendChild(citationCount);
            listItem.appendChild(publicationDate);
            listItem.appendChild(abstract);

            resultsList.appendChild(listItem);
          });

          // Send the results to the Python endpoint
          sendResultsToPython(results);
        });
      }
    });
  });
});



function fetchGoogleScholarResults(tab, query, callback) {
  var url = 'https://scholar.google.com/scholar?q=' + query + '&hl=en&as_sdt=0,5';

  chrome.tabs.update(tab.id, { url: url }, function() {
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
      if (tabId === tab.id && changeInfo.status === 'complete' && tab.url.startsWith('https://scholar.google.com')) {
        chrome.tabs.onUpdated.removeListener(listener);

        chrome.tabs.executeScript(tab.id, { file: 'contentScript.js' }, function(results) {
          callback(results[0]);
        });
      }
    });
  });
}

function extractSearchQuery(url) {
  var queryParam = 'q=';
  var queryStartIndex = url.indexOf(queryParam);
  var queryEndIndex = url.indexOf('&', queryStartIndex);
  if (queryEndIndex === -1) {
    queryEndIndex = url.length;
  }
  var query = url.substring(queryStartIndex + queryParam.length, queryEndIndex);
  return decodeURIComponent(query);
}
