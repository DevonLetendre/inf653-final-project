# US States Data REST API

## Project Overview
A Node.js REST API for U.S. States data built with Express and MongoDB. The API serves state-related information like capitals, populations, and fun facts stored in MongoDB, while data from a `statesData.json` file is also merged.

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Atlas or local)
- .env file with MongoDB URI

### Installation

1. Clone the repo:

    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with:

    ```
    DATABASE_URI=your_mongodb_connection_string
    ```

4. Run locally:

    ```bash
    npm start
    ```

5. Open at `http://localhost:3500`.

## API Endpoints

- **GET /states**: Get all states data.
- **GET /states/:state**: Get all data for a specific state (by state abbreviation).
- **GET /states/:state/funfact**: Get a random fun fact for the state.
- **POST /states/:state/funfact**: Add fun facts to a state.
- **PATCH /states/:state/funfact**: Update a fun fact for the state.
- **DELETE /states/:state/funfact**: Remove a fun fact from the state.

## Deployment
Deployed on Glitch:  
- **API URL**: `https://your-project-name.glitch.me/states/`
- **HTML Homepage**: `https://your-project-name.glitch.me/`

## Testing
Use Postman or any HTTP client to test the API.

## GitHub Repository
[Link to GitHub Repository](https://github.com/your-username/your-repository)

---

This version includes all necessary details in a more concise format. Let me know if you'd like further adjustments!
