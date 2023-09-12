![Building WhatsApp Clone0-2000x840px](https://github.com/GetStream/fullstack-nextjs-whatsapp-clone/assets/39677/0c74c0e7-e802-4041-8d8f-17228cca9faf)

# Fullstack WhatsApp clone using Next.js, Vercel and Supabase

This project contains all the code to run the FullStack WhatsApp clone using Next.js and Supebase.

To run this code, you need to have an active [Stream](https://getstream.io/chat/trial/) and [Supabase](https://database.new) account.

## How to use

1. Create a [new Supabase project](https://database.new)
1. Sign up for a [Stream trial account](https://getstream.io/chat/trial/)
1. Rename `.env.local.example` to `.env.local`
1. Update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
1. Update the values for `NEXT_PUBLIC_REACT_APP_STREAM_KEY` and `REACT_APP_STREAM_SECRET` from [your Stream project's dashboard](https://dashboard.getstream.io/)
1. Run `npm run dev` to start the local development server

### Deploy your own instance

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FGetStream%2Ffullstack-nextjs-whatsapp-clone&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_REACT_APP_STREAM_KEY,REACT_APP_STREAM_SECRET&envDescription=This%20project%20requires%20credentials%20for%20Supabase's%20and%20Stream's%20APIs.&envLink=https%3A%2F%2Fgithub.com%2FGetStream%2Ffullstack-nextjs-whatsapp-clone)

Make sure you have the Supabase and Stream credentials available when you want to deploy to Vercel. The deployment will ask for these environment values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_REACT_APP_STREAM_KEY`
- `REACT_APP_STREAM_SECRET`

## Related Information

- [Stream Chat SDK](https://getstream.io/chat/sdk/react/)
- [Stream Video SDK](https://getstream.io/video/sdk/react/)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Next.js Auth Helpers Docs](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
