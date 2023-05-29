document.addEventListener('DOMContentLoaded', function() {
    var collectButton = document.getElementById('collectButton');
    var resultContainer = document.getElementById('resultContainer');
  
    collectButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'collectResults' }, function(response) {
          if (response && response.results) {
            var results = response.results;
  
            // Save results as JSON file
            var json = JSON.stringify(results, null, 2);
            var blob = new Blob([json], { type: 'application/json' });
            var url = URL.createObjectURL(blob);
            chrome.downloads.download({ url: url, filename: 'results.json' });
  
            // Display JSON format in the extension popup
            resultContainer.textContent = json;
          }
        });
      });
    });
  });
  