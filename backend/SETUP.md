# 🚀 Cravely Backend Setup Guide

Welcome to the **Cravely** backend! This guide will walk you through setting up the necessary dependencies (PostgreSQL and Redis) and running the Spring Boot application locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
*   **Java 17+** ([Download JDK](https://adoptium.net/))
*   **Maven 3.8+** ([Download Maven](https://maven.apache.org/download.cgi))
*   **PostgreSQL 14+** ([Download PostgreSQL](https://www.postgresql.org/download/))
*   **Redis** ([Download Redis for Windows](https://github.com/microsoftarchive/redis/releases) or use Docker/WSL)

---

## 🐘 1. PostgreSQL Database Setup

The application requires a PostgreSQL database to store users, vendors, orders, and other persistent data.

### Option A: Using pgAdmin (GUI)
1. Open **pgAdmin**.
2. Connect to your local server.
3. Right-click on **Databases** → **Create** → **Database...**
4. Name the database `cravely_db`.
5. Click **Save**.

### Option B: Using psql (Command Line)
Open your terminal or command prompt and log into PostgreSQL:
```bash
psql -U postgres
```
*(Enter your password when prompted)*

Then run the following SQL command to create the database:
```sql
CREATE DATABASE cravely_db;
```
Type `\q` to exit `psql`.



## ⚙️ 3. Application Configuration

Open the `backend/src/main/resources/application.yml` file and verify the database credentials. 

By default, it assumes your PostgreSQL username and password are `postgres`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/cravely_db
    username: postgres   # <--- Change this if your PG username is different
    password: postgres   # <--- Change this if your PG password is different
```
*Note: Hibernate is configured with `ddl-auto: update`, which means Spring Boot will automatically create all the required SQL tables for you upon startup!*

---

## ▶️ 4. Running the Application

1. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd path/to/Multi-Vendor-Food-Ordering-App/backend
   ```

2. Clean and build the application using Maven to download all dependencies:
   ```bash
   mvn clean install -DskipTests
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

You should see the Spring ASCII art appear, and shortly after, a log stating:
`Started CravelyApplication in X seconds (process running for Y)`

The backend will now be running on: **http://localhost:8080**

---

## 📡 5. Testing the APIs

Here are the primary endpoints to verify the application is working. You can use tools like **Postman** or **Insomnia**.

### 1. Register a User (Customer)
*   **URL**: `POST http://localhost:8080/api/auth/register`
*   **Body (JSON)**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "password": "password123",
      "role": "CUSTOMER"
    }
    ```

### 2. Login
*   **URL**: `POST http://localhost:8080/api/auth/login`
*   **Body (JSON)**:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
*(Copy the `accessToken` from the response and use it as a `Bearer Token` in the Authorization header for subsequent requests).*

### 3. Browse Restaurants (Public)
*   **URL**: `GET http://localhost:8080/api/restaurants`

### 4. WebSocket Endpoint
*   **URL**: `ws://localhost:8080/ws` (Connect using a STOMP client)

Happy Coding! 🍔🍕
