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
import { useWorkspaceNavigation } from 'stream-chat-react';
import { useState } from 'react';
import { useDraggable } from '../../app/hooks';

const CallPanel = () => {
  const call = useCall();
  const { useCallCallingState, useCallCustomData } = useCallStateHooks();
  const callingState = useCallCallingState();
  const customData = useCallCustomData();
  const { isChannelActive } = useWorkspaceNavigation();
  const [panelElement, setPanelElement] = useState<HTMLDivElement | null>(null);
  useDraggable(panelElement);

  if (!call) return null;

  // an incoming call only rings while its channel is open in the channel slot
  const callingToActiveChannel = isChannelActive(customData.channelCid);
  if (CallingState.RINGING === callingState && !callingToActiveChannel)
    return null;

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
