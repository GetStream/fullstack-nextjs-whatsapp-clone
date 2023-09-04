import {
  Channel as StreamChatChannel,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import { ChannelHeader } from '../ChannelHeader';

export const Channel = () => (
  <StreamChatChannel>
    <Window>
      <ChannelHeader />
      <MessageList />
      <MessageInput focus />
    </Window>
    <Thread />
  </StreamChatChannel>
);
