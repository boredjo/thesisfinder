# ThesisFinder Backend

The backend of the ThesisFinder application is responsible for handling server-side logic, database interactions, and API endpoints.

## Tech Stack

- **Python:** The primary programming language used for backend development.
- **Flask:** A lightweight web framework for building RESTful APIs.
- **MySQL:** The chosen relational database for storing user accounts, research ideas, and other data.

## Directory Structure

- `/src`: Contains the main source code for the Flask application.
  - `/models`: Defines data models, such as User and Idea.
  - `/routes`: Implements various routes and API endpoints.
  - `/utils`: Holds utility functions, including those for authentication and database interactions.

- `/venv`: The virtual environment folder. This is where Python dependencies are isolated.

## Getting Started

To set up the backend locally, follow these steps:

1. Install dependencies by running: `pip install -r requirements.txt`.
2. Set up the virtual environment using `virtualenv` or your preferred tool.
3. Create a `.env` file based on the provided `.env.example`.

For more detailed instructions, refer to the [setup guide](./src/SETUP_GUIDE.md).

## Contributing

If you're interested in contributing to the ThesisFinder backend, please read our [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](../LICENSE).
