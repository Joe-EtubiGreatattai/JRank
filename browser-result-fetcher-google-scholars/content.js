chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'collectResults') {
      var results = [];
  
      // Extract information from search results
      var searchResults = document.querySelectorAll('.gs_ri');
      searchResults.forEach(function(result) {
        var title = result.querySelector('.gs_rt a').textContent;
        var authors = Array.from(result.querySelectorAll('.gs_a')).map(function(author) {
          return author.textContent;
        });
        var citationCount = result.querySelector('.gs_fl a:nth-child(3)').textContent.match(/\d+/)[0];
        var publicationDate = result.querySelector('.gs_a').textContent.match(/\d{4}/)[0];
        var abstract = result.querySelector('.gs_rs').textContent;
  
        results.push({
          title: title,
          authors: authors,
          citation_count: parseInt(citationCount),
          publication_date: publicationDate,
          abstract: abstract
        });
      });
  
      sendResponse({ results: results });
    }
  });
  