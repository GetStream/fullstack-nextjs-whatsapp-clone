import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { StreamClient } from '@stream-io/node-sdk';

export const dynamic = 'force-dynamic';

// tokens expire after an hour; the client's tokenProvider fetches a new one
const TOKEN_VALIDITY_IN_SECONDS = 60 * 60;

export async function POST() {
  // 1 only a signed-in user gets a token, and only for their own user ID
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  // 2 make sure the user exists on Stream's backend
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
  const apiSecret = process.env.REACT_APP_STREAM_SECRET || 'Set API Secret';
  const client = new StreamClient(apiKey, apiSecret);

  await client.upsertUsers([{ id: user.id }]);

  // 3 generate a short-lived user token for the chat and video clients
  const token = client.generateUserToken({
    user_id: user.id,
    validity_in_seconds: TOKEN_VALIDITY_IN_SECONDS,
  });

  return NextResponse.json({
    userToken: token,
  });
}
