import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

/**
 * useSocket — connects to a Socket.IO server.
 * Reads URL from localStorage("SOCKET_URL"). Falls back to no-op if unset,
 * so the UI works without a backend in this hackathon scaffold.
 */
export function useSocket(events = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const url = typeof window !== "undefined" ? window.localStorage.getItem("SOCKET_URL") : null;
    if (!url) return;

    const socket = io(url, { transports: ["websocket"], autoConnect: true });
    ref.current = socket;
    Object.entries(events).forEach(([event, handler]) => socket.on(event, handler));

    return () => {
      Object.keys(events).forEach((event) => socket.off(event));
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
