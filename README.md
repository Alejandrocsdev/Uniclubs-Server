# Gamech

## 🛠️ Backend Server Setup Guide

This guide provides clear steps for teammates to **start and run the backend server**.

## 1. Clone or Pull the Repository

If you haven't cloned the repository yet, do:

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

`PORT` — Your server port for development

`CLIENT_PORT` — The frontend Vite server port for development

`MYSQL_DEV_USERNAME` — Your MySQL database username for development

`MYSQL_DEV_PASSWORD` — Your MySQL database password for development

`AT_SECRET` — Access Token secret (generate using `npm run gen:secret`)

`RT_SECRET` — Refresh Token secret (generate using `npm run gen:secret`)

`EMAIL_USER` — Your Gmail account email address

`EMAIL_PASS` — Your Gmail app password (not your Gmail login password; generate an app password)

## 4. Set Up MySQL Database

### 🔹 Local MySQL Setup

Install MySQL on your local machine if not already installed.

1. Visit [https://dev.mysql.com/downloads/workbench](https://dev.mysql.com/downloads/workbench)
2. Click **"No thanks, just start my download."** to start downloading the package.
3. During installation, keep all options as default.
4. After installing MySQL Workbench, open it.
5. Select **"Local instance MySQL80"** from the home screen.
6. Set your **root password** and enable **"Save password in vault"**.
7. This completes your local MySQL database setup.

Make sure the password you set is used as the value for `MYSQL_DEV_PASSWORD` in your `.env` file.

### 🔹 Production AWS RDS Setup

If you're connecting to the production AWS RDS database:

1. Visit [https://whatismyipaddress.com](https://whatismyipaddress.com) to get your current IPv4 address.
2. Provide this IP to the **database owner** to authorize access.
3. Once authorized, open **MySQL Workbench**.
4. Click the **"+"** icon next to **"MySQL Connections"**.
5. Fill in:
   - **Connection Name**: Uniclubs-database
   - **Hostname**: use the `MYSQL_PRO_HOST` value
   - **Username**: use the `MYSQL_PRO_USERNAME` value
   - **Password**: click **"Store in Vault..."** and enter the `MYSQL_PRO_PASSWORD` value
6. Click **OK** to save and connect.

## 5. Database Migration and Seeding Commands

To reset the **production database** (drop, create, migrate, seed), run:

```
npm run db:reset
```

To reset the **local development database**, run:

```
npm run db:reset:dev
```

## 6. Generate Secrets and Hashes

To generate a secure **Access Token Secret (AT_SECRET)** and **Refresh Token Secret (RT_SECRET)**, run:

```
npm run gen:secret
```

This will output random secret strings to be used in your `.env` file.

During development, if you need to create a hashed password (e.g., for testing or seeding), use:

```
npm run gen:hash
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

## 8. Deployment to Render

Every time you push to the `main` branch, the backend server will be automatically deployed to `Render` via Render’s built-in Git integration.