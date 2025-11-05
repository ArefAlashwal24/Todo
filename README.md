Todo – Rails API + Next.js + Cypress

Overview

Simple Todo app to demonstrate:

Backend API only with Ruby on Rails 8.1 (SQLite)

Frontend with Next.js 16

E2E tests with Cypress

Users can create, list, toggle, and delete todos.

Repo layout
/todo_api        # Rails API (port 3001)
/todo_frontend   # Next.js UI (port 3000)

Tech stack

Ruby 3.3, Rails 8.1, Puma, SQLite3

Next.js 16, React, Axios

Cypress 15 (Chrome headless)

Run locally
Backend (Rails)
cd todo_api
bundle install
rails db:prepare
rails s -p 3001
# API on http://localhost:3001

CORS (already configured)

config/initializers/cors.rb allows:

http://localhost:3000
http://127.0.0.1:3000

Frontend (Next.js)
cd ../todo_frontend
npm install
echo NEXT_PUBLIC_API_URL=http://localhost:3001 > .env.local
npm run dev
# UI on http://localhost:3000

API endpoints

Base: http://localhost:3001

Method	Path	Body example	Notes
GET	/todos	—	list
POST	/todos	{ "todo": { "title": "Buy milk" } }	create
GET	/todos/:id	—	show
PATCH	/todos/:id	{ "todo": { "done": true } }	update/toggle
DELETE	/todos/:id	—	delete
Minimal controller (for reference)

app/controllers/todos_controller.rb exposes CRUD and uses strong params: permit(:title, :done).

Frontend notes

Reads NEXT_PUBLIC_API_URL

Renders list

Adds data-testids for Cypress:

new-title, add-btn, todo-list, todo-item, toggle, del-btn

Cypress E2E
Run interactively
cd todo_frontend
npx cypress open

Headless with video
npx cypress run --browser chrome
# videos in cypress/videos/
Example specs

todos_green.cy.ts – add, toggle, delete (pass)

todos_red.cy.ts – intentional failing check (fail demo)

Demo links 

Green run (YouTube): https://www.youtube.com/watch?v=OzQgv9hSoKI

Red run (YouTube): https://www.youtube.com/watch?v=VbHwivm_1Uc

LinkedIn post: https://shorturl.at/o9Jcn

Scenario 

How to test quickly with curl
curl http://localhost:3001/todos
curl -X POST http://localhost:3001/todos -H "Content-Type: application/json" -d "{\"todo\":{\"title\":\"Buy milk\"}}"

Contributors / Mentions

Add Nurettin Şenyer and Ömer Durmuş
 *Aref Alashwal 
