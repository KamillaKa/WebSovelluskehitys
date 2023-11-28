Features
GET /: API docs
GET /items: All items
GET /items/:id: Single item
POST /items: Add item

Run
node index.js

Tests
Status codes follow HTTP standards.

Future
Add PUT, DELETE.

PUT /api/media/:id: Only the owner of the media item can update it. Authentication is required.
DELETE /api/media/:id: Only the owner of the media item can delete it. Authentication is required.
PUT /api/users/: Users can only update their own user information. Authentication is required.
