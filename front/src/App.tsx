import { useEffect, useState } from "react";
import ChatOverlay from "./pages/ChatOverlay";
import HomePage from "./pages/HomePage";

const App = () => {
  const [channel, setChannel] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      console.log(window.location.hash);
      setChannel(hash ?? null);
    };

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    }
  }, []);

  if (channel) return (
    <ChatOverlay channelId={channel}  />
  )
  return ( <HomePage /> );
}

export default App
