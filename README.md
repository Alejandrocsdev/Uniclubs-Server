# Gamech

## 🛠️ Backend Server Setup Guid

This guide provides clear steps for frontend teammates to **start and run the backend server**.

## 1. Clone or Pull the Repository

```
git clone https://github.com/Alejandrocsdev/Uniclubs-Server.git
```

or if the Git repository was already created locally, you can pull the latest changes:

```
git pull
```

## 2. Install Dependencies
In the backend project directory, run:

```
npm install
```

## 3. Create `.env` File
Create a `.env` file in the root of the backend directory. Use the provided data for the contents. You need to configure the following variables:

`MYSQL_DEV_USERNAME` — Your MySQL database username for development

`MYSQL_DEV_PASSWORD` — Your MySQL database password for development

`AT_SECRET` — Access Token secret (generate using `npm run gen:secret`)

`RT_SECRET` — Refresh Token secret (generate using `npm run gen:secret`)

`EMAIL_USER` — Your Gmail account email address

`EMAIL_PASS` — Your Gmail app password (not your Gmail login password; generate an app password)

## 4. Set Up MySQL Database

Install MySQL on your local machine if not already installed.

Create a MySQL user and assign the username and password you specified in `MYSQL_DEV_USERNAME` and `MYSQL_DEV_PASSWORD`.

## 5. Generate Secrets and Hashes

To generate a secure **Access Token Secret (AT_SECRET)** and **Refresh Token Secret (RT_SECRET)**, run:

```
npm run gen:secret
```

This will output random secret strings to be used in your `.env` file.

During development, if you need to create a hashed password (e.g., for testing or seeding), use:

```
npm run gen:hash
```

## 6. Database Migration and Seeding Commands

To reset the **production database** (drop, create, migrate, seed), run:

```
npm run db:reset
```

To reset the **local development database**, run:

```
npm run db:reset:dev
```

## 7. Running the Backend Server

Start the backend server with:

```
npm run start
```

For development with hot reloading:

```
npm run dev
```

To run the server with CORS allowed for a specific Wi-Fi host (must set `WIFI_URL` in .env):

```
npm run dev:wifi
```