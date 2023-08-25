import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function POST(request: Request) {
  console.log("POST /api/create-user");

  // 1 get the user ID we need as a parameter
  const requestBody = await request.json();
  const userId = requestBody.userId;

  // 2 send user ID and any other required data to Stream Chat backend
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || "Set API Key";
  const apiSecret = process.env.REACT_APP_STREAM_SECRET || "Set API Secret";
  const client = StreamChat.getInstance(apiKey, apiSecret);

  // 3 generate a user token
  const upsertResponse = await client.upsertUser({
    id: userId,
    role: "user",
  });

  const token = client.createToken(userId);

  // URL to redirect to after sign in process completes
  return NextResponse.json({
    userToken: token,
  });
}
