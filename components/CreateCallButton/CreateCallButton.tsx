import { useCallback } from 'react';
import {
  MemberRequest,
  useStreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useChannel } from 'stream-chat-react';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  10,
);

export function meetingId(length = 12) {
  return nanoid(length);
}
export const CreateCallButton = () => {
  const videoClient = useStreamVideoClient();
  const channel = useChannel();

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
  }, [videoClient, channel]);

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
