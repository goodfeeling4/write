# Setup Guide for Write App

## Issues Fixed

1. **API Route Syntax Error**: Fixed the return statement in `/app/api/message/route.js`
2. **Form Functionality**: Added proper form handling and API integration to `/app/addThoughts/[id]/page.jsx`
3. **MongoDB Connection**: Improved connection handling with caching
4. **Error Handling**: Added proper error handling throughout the application

## Environment Setup

### 1. Create Environment File

Create a `.env.local` file in your project root with the following content:

```env
MONGODB_URI=your_mongodb_connection_string_here
```

### 2. MongoDB Connection Options

**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/write-app
```

**Option B: MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/write-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

## How to Test

1. Navigate to `http://localhost:3000/addThoughts/any-id`
2. Fill in the title and content fields
3. Click Submit
4. Check the browser console and terminal for any errors
5. If successful, you should see "Message created successfully!"

## Troubleshooting

### Common Issues:

1. **"Please define the MONGODB_URI environment variable"**
   - Make sure you have created `.env.local` file
   - Ensure the file is in the project root directory
   - Restart your development server after creating the file

2. **"MongoDB connection failed"**
   - Check if MongoDB is running (if using local MongoDB)
   - Verify your connection string is correct
   - For MongoDB Atlas, ensure your IP is whitelisted

3. **"Failed to create message"**
   - Check the browser's Network tab for detailed error information
   - Verify your MongoDB connection is working
   - Check the terminal for server-side errors

## API Endpoints

- **POST** `/api/message` - Creates a new message
  - Body: `{ "title": "string", "description": "string" }`
  - Response: `{ "message": "message created" }` (201 status)

## File Structure

```
write/
├── app/
│   ├── api/message/route.js    # API endpoint for creating messages
│   └── addThoughts/[id]/page.jsx  # Form page for creating messages
├── lib/mongodb.js              # MongoDB connection utility
├── models/message.js           # Message model schema
└── .env.local                  # Environment variables (create this)
``` 
