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

  // v15's header is a three-column grid: start, data and end
  return (
    <div className="str-chat__channel-header">
      <div className="str-chat__channel-header__start">
        <WorkspaceNavigationBackButton />
        <Avatar
          imageUrl={displayImage}
          userName={displayTitle}
          size={channel?.type === 'commerce' ? '2xl' : 'lg'}
        />
      </div>
      <div className="str-chat__channel-header__data">
        <div className="str-chat__channel-header__data__title">
          {displayTitle}{' '}
          {live && <span>{t(asDynamicKey('live'), 'live')}</span>}
        </div>
        {subtitle && (
          <div className="str-chat__channel-header__data__subtitle">
            {subtitle}
          </div>
        )}
        <div className="str-chat__channel-header__data__subtitle">
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
        </div>
      </div>
      <div className="str-chat__channel-header__end">
        <CreateCallButton />
      </div>
    </div>
  );
};

/**
 * The ChannelHeader component renders some basic information about a Channel.
 */
export const ChannelHeader = React.memo(
  UnMemoizedChannelHeader,
) as typeof UnMemoizedChannelHeader;
