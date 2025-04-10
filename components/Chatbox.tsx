
import { Chat } from "@livekit/components-react";
import { useDataChannel } from "@livekit/components-react";

export function Chatbox() {
  // Send messages to all participants via the 'chat' topic.
  const { message: latestMessage, send } = useDataChannel("chat", (msg) =>
    console.log("message received", msg)
  );
  return (
    <>      
      <Chat />
    </>
  );
}
