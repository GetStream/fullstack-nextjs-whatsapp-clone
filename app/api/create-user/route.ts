import { NextResponse } from 'next/server';
import { StreamClient } from '@stream-io/node-sdk';

export async function POST(request: Request) {
  // 1 get the user ID we need as a parameter
  const requestBody = await request.json();
  const userId = requestBody.userId;

  // 2 send user ID and any other required data to Stream's backend
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
  const apiSecret = process.env.REACT_APP_STREAM_SECRET || 'Set API Secret';
  const client = new StreamClient(apiKey, apiSecret);

  await client.upsertUsers([{ id: userId, role: 'user' }]);

  // 3 generate a user token. The client passes it to connectUser as a fixed
  // string (no token provider), so it must not expire.
  const token = client.generatePermanentUserToken({ user_id: userId });

  return NextResponse.json({
    userToken: token,
  });
}
