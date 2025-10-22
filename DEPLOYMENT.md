# Deployment Guide

## Issues Fixed

1. **Malformed API URL Issue**: 
   - Removed problematic proxy configuration from client/package.json
   - Added proper environment variable handling for API URLs

2. **CORS Issue**: 
   - Improved CORS configuration to allow requests from deployed frontend domain
   - Added specific origin whitelisting for security

3. **Environment Variables**: 
   - Created proper .env files for different environments
   - Updated server entry point to use index.js

## Deployment Steps

### Frontend (Vercel)
1. Set environment variables in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-domain.vercel.app
   ```

2. Make sure to add your frontend domain to the CORS whitelist in the server configuration

### Backend (Vercel)
1. Set environment variables in Vercel dashboard:
   ```
   MONGO_URI=your_production_mongodb_uri_here
   PORT=8080
   ```

## Environment Files

### Client
- `.env.development` - Used in development
- `.env.production` - Used in production
- `.env` - Default fallback

### Server
- `.env` - Environment variables for the server

## Troubleshooting

### CORS Errors
1. Check that your frontend domain is in the CORS whitelist in `server.js`
2. Verify that the `REACT_APP_API_URL` is set correctly in your environment variables

### Network Errors
1. Ensure that your MongoDB connection string is correct
2. Check that your backend is running and accessible
3. Verify that environment variables are set correctly in your deployment platform

### Data Not Loading
1. Check browser console for specific error messages
2. Verify that the API endpoints are returning data when accessed directly
3. Ensure that the MongoDB connection is successful