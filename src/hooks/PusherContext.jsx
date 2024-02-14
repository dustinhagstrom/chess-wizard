import React, { createContext, useContext } from "react";
import Pusher from "pusher-js";

export const PusherContext = createContext();

function usePusher() {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error(`usePusher must be used within a PusherProvider`);
  }
  return context;
}

function PusherProvider(props) {
  const pusher = new Pusher("818ada0edb4cce9891cc", {
    cluster: "us2",
  });

  return <PusherContext.Provider value={pusher} {...props} />;
}

export { PusherProvider, usePusher };