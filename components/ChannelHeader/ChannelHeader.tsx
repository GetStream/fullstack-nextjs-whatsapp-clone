import React from 'react';
import type { ChannelStateData } from 'stream-chat';
import {
  asDynamicKey,
  Avatar,
  useChannel,
  useChannelPreviewInfo,
  useStateStore,
  useTranslationContext,
  WorkspaceNavigationBackButton,
} from 'stream-chat-react';

import { CreateCallButton } from '../CreateCallButton';

// subtitle is a custom field, so declare it on the channel's custom data
declare module 'stream-chat' {
  interface CustomChannelData {
    subtitle?: string;
  }
}

export type ChannelHeaderProps = {
  /** Manually set the image to render, defaults to the Channel image */
  image?: string;
  /** Show a little indicator that the Channel is live right now */
  live?: boolean;
  /** Set title manually */
  title?: string;
};

const headerSelector = (state: ChannelStateData) => ({
  data: state.data,
  memberCount: state.memberCount,
  watcherCount: state.watcherCount,
});

const UnMemoizedChannelHeader = (props: ChannelHeaderProps) => {
  const { image: overrideImage, live, title: overrideTitle } = props;

  const channel = useChannel();
  const { data, memberCount, watcherCount } = useStateStore(
    channel.state,
    headerSelector,
  );
  const { t } = useTranslationContext();
  const { displayImage, displayTitle } = useChannelPreviewInfo({
    channel,
    overrideImage,
    overrideTitle,
  });

  const subtitle = data?.custom?.subtitle;

  return (
    <div className="str-chat__header-livestream str-chat__channel-header">
      <WorkspaceNavigationBackButton />
      <Avatar
        imageUrl={displayImage}
        userName={displayTitle}
        size={channel?.type === 'commerce' ? '2xl' : 'lg'}
      />
      <div className="str-chat__header-livestream-left str-chat__channel-header-end">
        <p className="str-chat__header-livestream-left--title str-chat__channel-header-title">
          {displayTitle}{' '}
          {live && (
            <span className="str-chat__header-livestream-left--livelabel">
              {t(asDynamicKey('live'), 'live')}
            </span>
          )}
        </p>
        {subtitle && (
          <p className="str-chat__header-livestream-left--subtitle">
            {subtitle}
          </p>
        )}
        <p className="str-chat__header-livestream-left--members str-chat__channel-header-info">
          {!live && !!memberCount && memberCount > 0 && (
            <>
              {t(
                'channelHeader.online.members.label',
                '{{ memberCount }} members',
                { memberCount },
              )}
              ,{' '}
            </>
          )}
          {t('channelHeader.online.online.label', '{{ watcherCount }} online', {
            watcherCount,
          })}
        </p>
      </div>
      <CreateCallButton />
    </div>
  );
};

/**
 * The ChannelHeader component renders some basic information about a Channel.
 */
export const ChannelHeader = React.memo(
  UnMemoizedChannelHeader,
) as typeof UnMemoizedChannelHeader;
