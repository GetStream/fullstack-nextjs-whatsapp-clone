'use client';

import { useEffect, useState } from 'react';

import { StreamChat, ChannelSort, ChannelFilters } from 'stream-chat';
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';

import '@stream-io/stream-chat-css/dist/css/index.css';
import './layout.css';
import { User } from '@supabase/supabase-js';

export default function WhatsAppChat({ user }: { user: User }) {
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const chatClient = StreamChat.getInstance(apiKey);

  const sort: ChannelSort = { last_message_at: -1 };
  const filters: ChannelFilters = {
    type: 'messaging',
    members: { $in: [user.id] },
  };

  useEffect(() => {
    console.log('user', user);
    const userId = user.id;
    fetch('/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userId }),
    }).then(async (res) => {
      const response = await res.json();
      console.log(response);

      await chatClient.connectUser({ id: userId }, response.userToken);

      // const channel = chatClient.channel('messaging', {
      //   name: 'Magic Chat',
      //   members: [userId, 'jeroenleenartsgetstreamio'],
      // });

      // channel
      //   .create()
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading && (
        <div className="text-white w-full flex items-center justify-center">
          <p>Loading…</p>
        </div>
      )}
      {!isLoading && (
        <Chat client={chatClient}>
          <ChannelList sort={sort} filters={filters} />
          <Channel>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      )}
    </>
  );
}
