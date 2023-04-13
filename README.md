# AI Highlight Summarizer Server

This is the backend for the AI Highlight Summarizer project. The frontend of the project can be found at [https://github.com/kingsleykbc/ai-highlight-summarizer-frontend](https://github.com/kingsleykbc/ai-highlight-summarizer-frontend).

The project is a Node.js server that handles AI text summarization and user authentication. The server uses OpenAI's GPT-3 to generate a summary of a given text, and also provides endpoints for user authentication and authorization.

## Requirements

To run the project, you will need the following:

- MongoDB connection string
- Open AI API key

## Installation

1.  Clone the repository:

`git clone https://github.com/your-username/ai-highlight-summarizer-server.git`

2.  Install dependencies:

`cd ai-highlight-summarizer-server
npm install`

3.  Create an `.env` file with the following values:

`DB_URI=<your-mongodb-connection-string>
OPENAI_API_KEY=<your-openai-api-key>
JWT_SECRET=<your-jwt-secret>`

## Running the server

To start the server, run the following command:

`npm run start`

To run the server in development mode, run the following command:

`npm run start:dev`

## Contributing

If you find any issues or have any suggestions for improvement, feel free to create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://chat.openai.com/LICENSE).
