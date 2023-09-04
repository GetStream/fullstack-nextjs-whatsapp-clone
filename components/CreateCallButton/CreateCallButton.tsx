import { useCallback } from 'react';
import {
  MemberRequest,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useChannelStateContext } from 'stream-chat-react';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  10,
);

import type { LiteralStringForUnion, UR } from 'stream-chat';
import { User } from '@stream-io/video-react-sdk';

export type AttachmentType = UR;
export type ChannelType = UR & { subtitle?: string };
export type CommandType = LiteralStringForUnion;
export type EventType = UR;
export type MessageType = UR;
export type ReactionType = UR;
export type UserType = Omit<User, 'type'>;

export type StreamChatType = {
  attachmentType: AttachmentType;
  channelType: ChannelType;
  commandType: CommandType;
  eventType: EventType;
  messageType: MessageType;
  reactionType: ReactionType;
  userType: UserType;
};

export function meetingId(length = 12) {
  return nanoid(length);
}
export const CreateCallButton = () => {
  const videoClient = useStreamVideoClient();
  const { channel } = useChannelStateContext<StreamChatType>();

  const createCall = useCallback(() => {
    videoClient
      ?.call('default', meetingId())
      .getOrCreate({
        ring: true,
        data: {
          custom: {
            channelCid: channel.cid,
          },
          members: Object.values(channel.state.members).map<MemberRequest>(
            (member) => ({
              user_id: member.user_id!,
            }),
          ),
        },
      })
      .then((call) => {
        console.log('call', call);
      });
  }, [videoClient, channel.cid, channel.state.members]);

  const disableCreateCall = !videoClient;
  return (
    <button
      className="rmc__button rmc__button--green"
      disabled={disableCreateCall}
      onClick={createCall}
    >
      <span>Start a call</span>
    </button>
  );
};
