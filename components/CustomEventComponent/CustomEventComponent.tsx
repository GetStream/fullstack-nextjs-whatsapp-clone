import type { EventComponentProps } from 'stream-chat-react';

/**
 * Renders system messages (e.g. "Jane joined the chat") as a centered pill,
 * the way WhatsApp shows them. Passed to the SDK as the `MessageSystem`
 * component override in `components/Channel/Channel.tsx`.
 */
export const CustomEventComponent = ({ message }: EventComponentProps) => {
  if (message.type !== 'system' || !message.text) return null;

  return (
    <div className="whatsapp-system-message" data-testid="message-system">
      <span>{message.text}</span>
    </div>
  );
};
