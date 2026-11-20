'use client';

import { useEffect, useMemo, useState } from 'react';

import { ChannelPaginator, StreamChat } from 'stream-chat';
import { ChannelNavigation, Chat, WithComponents } from 'stream-chat-react';
import { ChatView } from 'stream-chat-react/slot-layout';
import type { LayoutDescriptor } from 'stream-chat-react/slot-layout';

import { Channel } from './Channel';
import {
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';

import { Video } from './Video';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import './layout.css';
import './styles/index.scss';

import { User } from '@supabase/supabase-js';
import ChannelListHeader from './ChannelListHeader';

// our header replaces the channel list's default one
const channelListOverrides = { ChannelListHeader };

// one view with two slots: the open channel and a thread opened from it
const layouts: LayoutDescriptor[] = [
  { id: 'channels', slots: ['channel', 'thread'] },
];

export default function WhatsAppChat({ user }: { user: User }) {
  const apiKey = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY || 'Set API Key';
  const userId = user.id;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const chatClient = StreamChat.getInstance(apiKey);
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  // the channel list: messaging channels this user is a member of, most recent first
  const paginator = useMemo(
    () =>
      new ChannelPaginator({
        client: chatClient,
        id: 'whatsapp-channels',
        filters: { type: 'messaging', members: { $in: [userId] } },
        sort: [{ direction: -1, field: 'last_message_at' }],
      }),
    [chatClient, userId],
  );

  useEffect(() => {
    chatClient.channelManager.insertPaginator({ paginator });
    return () => {
      chatClient.channelManager.removePaginator(paginator);
    };
  }, [chatClient, paginator]);

  useEffect(() => {
    // the same user, as the video client expects it
    const chatUser = { id: userId };

    fetch('/api/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    }).then(async (res) => {
      const response: { userToken: string } = await res.json();

      await chatClient.connectUser({ id: userId }, response.userToken);

      const _videoClient = new StreamVideoClient({
        apiKey,
        user: chatUser,
        token: response.userToken,
      });

      await _videoClient.connectUser({ id: userId }, response.userToken);

      setVideoClient(_videoClient);

      setIsLoading(false);
    });
  }, [apiKey, chatClient, userId]);

  return (
    <>
      {isLoading && (
        <div className="text-white w-full flex items-center justify-center">
          <p>Loading…</p>
        </div>
      )}
      {!isLoading && videoClient && (
        <div id="root">
          <Chat client={chatClient}>
            <StreamVideo client={videoClient}>
              <StreamTheme as="main" className="main-container">
                <ChatView
                  layouts={layouts}
                  views={{
                    channels: (
                      <>
                        <div className="channel-list-container">
                          <WithComponents overrides={channelListOverrides}>
                            <ChannelNavigation />
                          </WithComponents>
                        </div>
                        <Channel />
                        <Video />
                      </>
                    ),
                  }}
                />
              </StreamTheme>
            </StreamVideo>
          </Chat>
        </div>
      )}
    </>
  );
}
