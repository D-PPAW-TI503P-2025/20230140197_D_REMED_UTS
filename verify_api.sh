#!/bin/bash

BASE_URL="http://localhost:5001/api"

echo "===== 1. Check Root Endpoint ====="
curl -s "$BASE_URL/../"

echo "\n\n===== 2. Create Book (Admin) ====="
# Should succeed
curl -s -X POST "$BASE_URL/books" \
  -H "Content-Type: application/json" \
  -H "x-user-role: admin" \
  -d '{"title": "Laskar Pelangi", "author": "Andrea Hirata", "stock": 5}'

echo "\n\n===== 3. Get All Books (Public) ====="
curl -s "$BASE_URL/books"

echo "\n\n===== 4. Create User ====="
curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "password123", "role": "user"}'

echo "\n\n===== 5. Login User ====="
curl -s -X POST "$BASE_URL/users/login" \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "password": "password123"}'

echo "\n\n===== 5. Borrow Book (User) ====="
# Should succeed. Assuming ID 1 for first user.
curl -s -X POST "$BASE_URL/borrow" \
  -H "Content-Type: application/json" \
  -H "x-user-role: user" \
  -H "x-user-id: 1" \
  -d '{"bookId": 1, "latitude": -6.2000, "longitude": 106.8166}'

echo "\n\n===== 6. Check Stock After Borrow ====="
curl -s "$BASE_URL/books/1"
