import React from 'react';
import {
  Avatar,
  useChannelPreviewInfo,
  useChannelStateContext,
  useChatContext,
  useTranslationContext,
} from 'stream-chat-react';
import type { ChannelResponse } from 'stream-chat';
import { CreateCallButton, StreamChatType } from '../CreateCallButton';

export type ChannelHeaderProps = {
  /** Manually set the image to render, defaults to the Channel image */
  image?: string;
  /** Show a little indicator that the Channel is live right now */
  live?: boolean;
  /** Set title manually */
  title?: string;
};

export const MenuIcon = () => (
  <svg
    data-testid="menu-icon"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Menu</title>
    <path
      d="M0 88C0 74.75 10.75 64 24 64H424C437.3 64 448 74.75 448 88C448 101.3 437.3 112 424 112H24C10.75 112 0 101.3 0 88zM0 248C0 234.7 10.75 224 24 224H424C437.3 224 448 234.7 448 248C448 261.3 437.3 272 424 272H24C10.75 272 0 261.3 0 248zM424 432H24C10.75 432 0 421.3 0 408C0 394.7 10.75 384 24 384H424C437.3 384 448 394.7 448 408C448 421.3 437.3 432 424 432z"
      fill="currentColor"
    />
  </svg>
);

const UnMemoizedChannelHeader = (props: ChannelHeaderProps) => {
  const { image: overrideImage, live, title: overrideTitle } = props;

  const { channel, watcher_count } =
    useChannelStateContext<StreamChatType>('ChannelHeader');
  const { openMobileNav } = useChatContext<StreamChatType>('ChannelHeader');
  const { t } = useTranslationContext('ChannelHeader');
  const { displayImage, displayTitle } = useChannelPreviewInfo({
    channel,
    overrideImage,
    overrideTitle,
  });
  const { member_count, subtitle } = (channel?.data as ChannelResponse) || {};

  return (
    <div className="str-chat__header-livestream str-chat__channel-header">
      <button
        aria-label="Menu"
        className="str-chat__header-hamburger"
        onClick={openMobileNav}
      >
        <MenuIcon />
      </button>
      <Avatar
        image={displayImage}
        name={displayTitle}
        shape="rounded"
        size={channel?.type === 'commerce' ? 60 : 40}
      />
      <div className="str-chat__header-livestream-left str-chat__channel-header-end">
        <p className="str-chat__header-livestream-left--title str-chat__channel-header-title">
          {displayTitle}{' '}
          {live && (
            <span className="str-chat__header-livestream-left--livelabel">
              {t<string>('live')}
            </span>
          )}
        </p>
        {!!subtitle && (
          <p className="str-chat__header-livestream-left--subtitle">
            {t<string>('{{ subtitle }}', {
              subtitle: subtitle,
            })}
          </p>
        )}
        <p className="str-chat__header-livestream-left--members str-chat__channel-header-info">
          {!live && !!member_count && member_count > 0 && (
            <>
              {t('{{ memberCount }} members', {
                memberCount: member_count,
              })}
              ,{' '}
            </>
          )}
          {t<string>('{{ watcherCount }} online', {
            watcherCount: watcher_count,
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
