# Inventory Management Web Application

## Tech
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- DB: MySQL

## Setup
### 1) MySQL
- Import `database/inventory.sql`
- Update DB credentials in `backend/db.js`:
  - `user`, `password`, `database`

### 2) Backend
```bash
cd backend
npm install
npm run dev
```
Server runs on `http://localhost:5000`.

### 3) Frontend
Open `frontend/index.html` in a browser.

## API
- `POST   /api/items` (add multiple items) 
- `GET    /api/items` (JOIN items + item_types)
- `PUT    /api/items/:id` (update)
- `DELETE /api/items/:id` (delete)

