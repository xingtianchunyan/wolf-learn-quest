# Environment Setup Guide

## Environment Variables Configuration

This project uses environment variables to manage sensitive configuration data securely.

### Setup Steps

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Fill in your Supabase credentials:**
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to Settings > API
   - Copy the required values:
     - `VITE_SUPABASE_URL`: Your project URL
     - `VITE_SUPABASE_ANON_KEY`: Your project's anon/public key
     - `VITE_SUPABASE_PROJECT_ID`: Your project ID
     - `VITE_SUPABASE_PUBLISHABLE_KEY`: Same as anon key for most cases

### Security Notes

- **Never commit `.env` files to version control**
- The `.env` file is already added to `.gitignore`
- Only use the anon/public key for client-side applications
- For production deployments, set these environment variables in your hosting platform

### Development vs Production

- **Development**: Use `.env` file in project root
- **Production**: Set environment variables in your hosting platform (Vercel, Netlify, etc.)

### Troubleshooting

If you encounter connection issues:

1. Verify your Supabase project is active
2. Check that your environment variables match your Supabase dashboard
3. Ensure you're using the correct project URL format: `https://your-project.supabase.co`
