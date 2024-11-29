# LokVoucher - Voucher Management App

LokVoucher is a web application designed to manage and claim vouchers with ease. It provides a seamless user experience for browsing, filtering, and claiming vouchers based on categories.

---

## Features

- **Authentication**:
  - Secure login and logout using `NextAuth`.
- **Voucher Management**:
  - Browse available vouchers.
  - Filter vouchers by category (e.g., Food, Fashion, Tech).
  - Claim vouchers and track claim history.
- **Responsive Design**:
  - Optimized for both desktop and mobile views.
  - Sticky sidebar for better navigation on large screens.
- **Backend Integration**:
  - API endpoints to fetch and claim vouchers.
  - Uses Prisma ORM to interact with the database.

---

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) (React Framework)
  - [Tailwind CSS](https://tailwindcss.com/) for styling
- **Backend**:
  - [NextAuth](https://next-auth.js.org/) for authentication
  - [Prisma](https://www.prisma.io/) as ORM for database management
- **Database**:
  - PostgreSQL (or any database supported by Prisma)
- **Deployment**:
  - Vercel for hosting

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lokajaya1/voucher-app.git
   cd voucher-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install dependencies**:

   Set up environment variables

4. **Migrate the database**:

   ```bash
   npx prisma migrate dev
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Access the application**:

   ```bash
   http://localhost:3000
   ```

## API Endpoints

Here are the key API endpoints used in this application:

### **GET /api/voucher**

Fetch all available vouchers.

- **Method**: `GET`
- **URL**: `/api/voucher`
- **Response**:
  - **200 OK**: Returns an array of available vouchers.
  - **Example**:
    ```json
    [
      {
        "id": 1,
        "nama": "Discount 50% Food",
        "kategori": "Food",
        "foto": "https://example.com/images/voucher1.jpg",
        "createdAt": "2024-11-30T10:00:00.000Z"
      },
      {
        "id": 2,
        "nama": "Buy 1 Get 1 Free Coffee",
        "kategori": "Beverage",
        "foto": "https://example.com/images/voucher2.jpg",
        "createdAt": "2024-11-29T14:30:00.000Z"
      }
    ]
    ```
  - **Error Responses**:
    - **500 Internal Server Error**: If there's an issue fetching the vouchers.

---

### **POST /api/voucher/:id/claim**

Claim a specific voucher. Requires authentication.

- **Method**: `POST`
- **URL**: `/api/voucher/:id/claim`
- **Headers**:
  - `Content-Type`: `application/json`
- **Request Body**:
  - `userId` (string): The ID of the authenticated user.
  - **Example**:
    ```json
    {
      "userId": "12345"
    }
    ```
- **Response**:
  - **200 OK**: Returns a success message with the claimed voucher details.
  - **Example**:
    ```json
    {
      "message": "Voucher claimed successfully",
      "voucher": {
        "id": 1,
        "nama": "Discount 50% Food",
        "kategori": "Food",
        "foto": "https://example.com/images/voucher1.jpg",
        "createdAt": "2024-11-30T10:00:00.000Z"
      }
    }
    ```
  - **Error Responses**:
    - **400 Bad Request**: If the `userId` is missing or invalid.
    - **404 Not Found**: If the voucher does not exist or is already claimed.
    - **500 Internal Server Error**: If there's an issue claiming the voucher.

---

Make sure to include the required headers and body format when calling these endpoints.
