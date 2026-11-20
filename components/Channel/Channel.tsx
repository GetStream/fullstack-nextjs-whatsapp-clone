import {
  MessageComposer,
  MessageList,
  ThreadHeader,
  WithComponents,
} from 'stream-chat-react';
import { ChannelSlot, ThreadSlot } from 'stream-chat-react/slot-layout';
import { CustomEventComponent } from '../CustomEventComponent';
import { ChannelHeader } from '../ChannelHeader';

const overrides = { MessageSystem: CustomEventComponent };

export const Channel = () => (
  <WithComponents overrides={overrides}>
    <ChannelSlot
      slot="channel"
      fallback={<p>Select a conversation to start chatting</p>}
    >
      <ChannelHeader />
      <MessageList />
      <MessageComposer focus />
    </ChannelSlot>
    <ThreadSlot slot="thread">
      <ThreadHeader />
      <MessageList />
      <MessageComposer focus />
    </ThreadSlot>
  </WithComponents>
);
