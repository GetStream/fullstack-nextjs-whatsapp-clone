import { StreamCall, useCalls } from '@stream-io/video-react-sdk';

import {
  CallingState,
  CancelCallButton,
  PaginatedGridLayout,
  RingingCall,
  ScreenShareButton,
  SpeakingWhileMutedNotification,
  ToggleAudioPublishingButton,
  ToggleVideoPublishingButton,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useChatContext, useWorkspaceNavigation } from 'stream-chat-react';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '../../app/hooks';

const CallPanel = () => {
  const call = useCall();
  const { useCallCallingState, useCallCustomData } = useCallStateHooks();
  const callingState = useCallCallingState();
  const customData = useCallCustomData();
  const { client } = useChatContext();
  const { isChannelActive, openChannel } = useWorkspaceNavigation();
  const [panelElement, setPanelElement] = useState<HTMLDivElement | null>(null);
  useDraggable(panelElement);

  // Once the call is joined, open the chat channel it was started from, so
  // the person who accepted it lands in the conversation. Only once per call,
  // so the user can still navigate to other channels during the call.
  const channelCid: string | undefined = customData.channelCid;
  const openedCallChannel = useRef(false);
  useEffect(() => {
    if (callingState !== CallingState.JOINED || openedCallChannel.current) return;
    openedCallChannel.current = true;
    if (!channelCid || isChannelActive(channelCid)) return;

    const [type, id] = channelCid.split(':');
    // returns the instance the channel list already loaded, if there is one
    const channel = client.channel(type, id);
    // the channel slot renders an initialized channel; it does not query
    (channel.initialized ? Promise.resolve() : channel.watch())
      .then(() => openChannel(channel))
      .catch((err) => console.error('Could not open the call channel', err));
  }, [callingState, channelCid, client, isChannelActive, openChannel]);

  if (!call) return null;

  // Incoming and outgoing rings are shown whatever channel is open: v15 opens
  // no channel on load, so gating on the active channel would hide them.
  if (callingState === CallingState.JOINED) {
    return (
      <div
        className="str-video__call-panel rmc__call-panel-wrapper"
        ref={setPanelElement}
      >
        <PaginatedGridLayout groupSize={4} />
        <div className="rmc__active-call-controls">
          <ScreenShareButton />
          <SpeakingWhileMutedNotification>
            <ToggleAudioPublishingButton />
          </SpeakingWhileMutedNotification>
          <ToggleVideoPublishingButton />
          <CancelCallButton />
        </div>
      </div>
    );
  } else if (
    [CallingState.RINGING, CallingState.JOINING].includes(callingState)
  ) {
    return (
      <div className="rmc__call-panel-wrapper" ref={setPanelElement}>
        <RingingCall />
      </div>
    );
  }

  return null;
};

export const Video = () => {
  const calls = useCalls();
  return (
    <>
      {calls.map((call) => (
        <StreamCall call={call} key={call.cid}>
          <CallPanel />
        </StreamCall>
      ))}
    </>
  );
};
