// popup.js

  // Function to extract search query from a URL
  function extractSearchQuery(url) {
    var searchParams = new URLSearchParams(new URL(url).search);
    return searchParams.get('q') || '';
  }
  
  // Function to fetch the browser history
  function fetchBrowserHistory() {
    chrome.history.search({ text: '', maxResults: 100 }, function (data) {
      // Process the history data here
      displayHistory(data);
    });
  }

// Function to display the history data
function displayHistory(historyData) {
    var historyList = document.getElementById('history-list');
  
    // Iterate through the history data
    historyData.forEach(function (historyItem) {
      var listItem = document.createElement('li');
      var siteName = historyItem.title || historyItem.url;
      var siteURL = historyItem.url;
      var clickCount = historyItem.visitCount;
      var visitTimestamp = new Date(historyItem.lastVisitTime);
      var visitDuration = (historyItem.visitDuration / 60).toFixed(2) + ' minutes';
      var searchQuery =  extractSearchQuery(historyItem.url);
  
      listItem.innerHTML = `
        <div>
          <h3>${siteName}</h3>
          <p>URL Link: <a href="${siteURL}" target="_blank">${siteURL}</a></p>
          <p>Visit Timestamp: ${visitTimestamp.toLocaleString()}</p>
          <p>Visit Duration: ${visitDuration}</p>
          <p>Visit Frequency: ${clickCount}</p>
          <p>Search Queries: ${searchQuery}</p>
        </div>
      `;
  
      historyList.appendChild(listItem);
    });
  }
  
  
  // Fetch the browser history when the extension is loaded
  document.addEventListener('DOMContentLoaded', fetchBrowserHistory);
   