# JRank
A chrome extension that uses collaborative filtering to ranking google scholars search results to user bases on browser history.
# Google Scholar Recommendations

This project fetches and displays Google Scholar search results based on the user's browser history. It utilizes a Chrome extension and a server-side component written in Python to provide personalized recommendations.

## Description

The project consists of two main components:

1. Chrome Extension: The Chrome extension collects the user's browser history and extracts the last searched query on Google Scholar. It sends this query to the server for processing.

2. Server-Side Component: The server is built using the Flask web framework in Python. It receives the last searched query from the Chrome extension and performs collaborative filtering to generate personalized recommendations. The recommendations are then sent back to the extension.

## Installation

To run the project, follow these steps:

1. Install the Chrome extension:
   - Open Google Chrome and navigate to `chrome://extensions`.
   - Enable the "Developer mode" toggle.
   - Click on "Load unpacked" and select the directory containing the Chrome extension files.

2. Set up the server:
   - Open a terminal and navigate to the server directory.
   - Create a virtual environment (optional but recommended).
   - Install the required dependencies using `pip install -r requirements.txt`.
   - Start the server by running `python server.py`.
   - The server will start listening on `http://localhost:5000`.

## Usage

1. Open Google Chrome and click on the Chrome extension icon.
2. The extension will fetch the last searched query from the browser history and send it to the server.
3. The server will process the query and generate personalized recommendations.
4. The recommendations will be displayed in the Chrome extension popup.

## Contributing

To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Commit your changes and push the branch to your forked repository.
5. Open a pull request from your branch to the main repository.
6. Provide a detailed description of your changes and any relevant information.

## License

This project is licensed under the [MIT License](LICENSE).

