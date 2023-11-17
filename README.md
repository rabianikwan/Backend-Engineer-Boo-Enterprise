# Backend Engineer Test

As part of your application, we also need to test your skills. Please see the instructions below.

This attachment contains the starting code for a node.js server that renders a single static page using mock data.

## Part 1

### Store the profile data in a MongoDB database instead of in memory. For ease of testing, use mongodb-memory-server (<https://github.com/nodkz/mongodb-memory-server>) instead of connecting to an external database

- Add a post route for creating new profiles. Note: you can re-use the same image for all profiles. You do not need to handle picture uploads.
- Update the get route to handle profile ids in the url. The server should retrieve the corresponding profile from the database and render the page accordingly.

## Part 2

### Implement a backend API that supports the commenting and voting functionality described in the Figma: <https://www.figma.com/file/8Iqw3VwIrHceQxaKgGAOBX/HTML%2FCSS-Coding-Test?node-id=0%3A1>

- You do not need to implement the frontend. Assume that the frontend will call your backend API in order to create user accounts, post comments, get/sort/filter comments, and like/unlike comments.
- You do not need to implement secure auth or picture uploads. The only attribute needed for user accounts is name. Assume that anyone can access and use any user account.
- All data should be stored in the same database used in Part 1

## Part 3

- Add automated tests to verify the implementation of Part 1 and Part 2.
- If you have questions, please let me know.
