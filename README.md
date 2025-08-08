# Mobile Shop Inventory Management System

## Description

A comprehensive and user-friendly web application designed to streamline the buying, selling, and inventory management process for mobile phones. This system is ideal for mobile shops, resellers, and distributors who want to efficiently manage stock, suppliers, sales, and customers — all in one place.

---

## README File (This file)

This README contains:

* A concise project overview.
* A clean screenshot placeholder (replace with a real screenshot).
* A list of the main technologies used.
* Highlighted core features.
* Mention of the main dependencies used.
* A step-by-step guide to run the project locally.
* Live project links and other relevant resources (placeholders — replace with your URLs).

---

---

## Live Project Links

* **Live demo (Client):** `[https://your-live-client-url.com](https://inventory-management-chi-liard.vercel.app)` *(replace with actual URL)*


---

## Main Technologies Used

* **Frontend:** React (Vite or Create React App), Tailwind CSS, React Router
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcrypt
* **Other:** PDF generation for invoices (pdfkit / jspdf / puppeteer), image upload (Cloudinary / imgbb), JWT auth, CORS

---

## Core Features

* Centralized inventory management for mobile phones (add/edit/delete products)
* Supplier management and purchase records
* Sales management with support for full and partial payments
* Customer management and sales history
* Generate PDF invoices/receipts for sales
* Authentication and role-based access (Admin / Staff)
* Search, filter, and sort products
* Dashboard with key metrics (stock levels, sales summary, low-stock alerts)
* Image upload for product listings
* Export and reporting (CSV/PDF)

---

## Dependencies (Examples)

> *Install versions that match your project — these are common packages used in similar MERN apps.*

**Server** (example packages)

* `express`
* `mongoose`
* `dotenv`
* `bcryptjs`
* `jsonwebtoken`
* `multer` (or `cloudinary` SDK for image uploads)
* `cors`
* `pdfkit` or `puppeteer` (for PDFs)

**Client** (example packages)

* `react`, `react-dom`
* `react-router-dom`
* `tailwindcss`
* `axios` (or use `fetch`)
* `react-hook-form` (optional)
* `classnames` (optional)

---

## Project Structure (recommended)

```
/ (repo root)
├─ /client       # React app
├─ /server       # Express API
├─ README.md
└─ .env.example
```

---

## Environment Variables (.env.example)

Create a `.env` file in the `server` folder and add the following (update with your values):

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_key
CLOUDINARY_API_SECRET=your_cloud_secret
IMGBB_API_KEY=your_imgbb_key   # if using imgbb
```

If the client needs environment variables (for Vite or CRA), create `.env` in `client` with variables like:

```
VITE_API_URL=https://your-api-url.com   # for Vite projects
REACT_APP_API_URL=https://your-api-url.com  # for CRA
```

---

## How to Run the Project Locally

Follow these steps to get the project running on your machine.

### Prerequisites

* Node.js (v16+ recommended) and npm (or pnpm/yarn)
* MongoDB (local) or a MongoDB Atlas cluster
* Git

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Setup the server

```bash
cd server
cp .env.example .env   # or create .env from template
npm install
# Seed the DB if you have seed script
# node seed.js   # or `npm run seed`
npm run dev   # or `node index.js` (depending on your server script)
```

### 3. Setup the client

*Open a new terminal tab/window*

```bash
cd client
npm install
# If your client uses Vite:
npm run dev
# If your client uses Create React App:
npm start
```

### 4. Run server + client together (optional)

From the root you can create cross-start scripts (example using `concurrently`) and run both with:

```bash
npm run dev
```

(Adjust according to how your repo's `package.json` scripts are set up.)

### 5. Visit the app

* Frontend: `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA)
* Backend API: `http://localhost:5000`

---

## Production Build & Deployment (quick notes)

* Build the client: `cd client && npm run build`
* Serve `client/dist` (Vite) or `client/build` (CRA) from Express in production or deploy to Netlify/Vercel.
* Use environment variables on your host (Render, Heroku, Vercel, Railway, etc.).

---

## Troubleshooting

* `ECONNREFUSED` to MongoDB: check `MONGO_URI` and your Atlas IP whitelist or local MongoDB service.
* CORS errors: ensure `cors()` is configured on Express and client `API_URL` is correct.
* Image upload issues: confirm Cloudinary/ImgBB credentials and that requests match their API.

---

## Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: add ...'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## License

Specify a license (e.g., MIT) or remove this section if not needed.

---

## Contact

* **Author:** Md. Raihan Islam
* **Email:** `mdraihan51674@gmail.com`
* **GitHub:** `https://github.com/raihan51674`

---

## Useful Resources

* React docs — official documentation
* Tailwind CSS docs
* MongoDB Atlas docs
* Node/Express docs

---

*Last updated: 2025-08-08*

