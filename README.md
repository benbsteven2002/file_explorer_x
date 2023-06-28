# File Explorer X
Containerised Node.js API + Angular 13 client for file system exploration, listing, details, and management.

This project consists of a Node.js API and an Angular 13+ client that allows users to obtain the directory listing of a given directory path on the local filesystem of the host machine. The API provides file information such as filename, full path, file size, extension/file type, created date, and file permissions/attributes. The client application can call the API and display the results in a responsive and visually appealing manner.

## Features

- Retrieves the full directory listing of a given directory path on the local filesystem.
- Includes filename, full path, file size, extension/file type, created date, and file permissions/attributes in the results.
- Supports large directory sizes.
- Differentiates between directories and files in the results.
- Allows users to select a directory and update the results with the newly selected directory path.
- Simple pagination on directories with more than 50 files.

## Technologies Used

- Node.js: Backend development and API implementation.
- Angular 13+: Frontend development and client application.
- Docker: Containerization of the application for easy deployment and system independence.
- REST: Communication protocol used between the frontend and backend.
- NGINX: Server for the Angular container.

## Getting Started

To run the File Explorer X application, follow the instructions below:

### Prerequisites

- Docker: Install Docker on your system to enable containerization.

### Installation

1. Clone the repository:

    ```shell
    git clone https://github.com/benbsteven2002/file_explorer_x.git
    ```

2. Build the Docker Images
    
    - Navigate to the project root directory:
    ```shell
    cd file_explorer_x
    ```
    - Build the Docker images using Docker Compose:
    ```shell
    docker-compose up --build
    ```
    
    - This command will build and start the frontend and backend containers defined in the docker-compose.yml file.
    
3. Access the Application

    - Once the containers are up and running, you can access the File Explorer X client application in your browser at:

    ```shell
    http://localhost:80
    ```
