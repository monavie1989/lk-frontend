import { useEffect, useState, useRef } from "react";
import { 
  TranscriptionSegment, 
  Participant,
  TrackPublication,
  RoomEvent, 
} from "livekit-client";
import { useMaybeRoomContext } from "@livekit/components-react";

export default function Transcriptions() {
  const room = useMaybeRoomContext();
  const [transcriptions, setTranscriptions] = useState<{ [id: string]: TranscriptionSegment }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("scroll to bototm");
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transcriptions]);
  useEffect(() => {
    if (!room) {
      return;
    }

    const updateTranscriptions = (
      segments: TranscriptionSegment[],
      participant?: Participant,
      publication?: TrackPublication
    ) => {
      setTranscriptions((prev) => {
        const newTranscriptions = { ...prev };
        for (const segment of segments) {
          newTranscriptions[segment.id] = Object.assign(segment, {user: (participant.constructor.name == "LocalParticipant") ? "User" : "Assistant"});
        }
        return newTranscriptions;
      });
    };

    room.on(RoomEvent.TranscriptionReceived, updateTranscriptions);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, updateTranscriptions);
    };
  }, [room]);
  return (
    <ul className="transcriptions" ref={containerRef}>
      {Object.values(transcriptions)
        .sort((a, b) => a.firstReceivedTime - b.firstReceivedTime)
        .map((segment) => (
          <li className={"message-"+segment.user.toLowerCase()} key={segment.id}>{segment.user}: {segment.text}</li>
        ))}
    </ul>
  )
}