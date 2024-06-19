# Slidely Backend

This is the backend server for the Slidely task using Express and TypeScript.

## Endpoints

- `GET /ping`: Check if the server is running. Always returns `true`.
- `POST /submit`: Submit a form. Requires `name`, `email`, `phone`, `github_link`, and `stopwatch_time` in the body.
- `GET /read`: Read a specific submission by index. Requires `index` as a query parameter.

## Running the Server

1. Install dependencies:
   ```bash
   npm install
