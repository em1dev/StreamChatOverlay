import { useEffect, useState } from "react";
import ChatOverlay from "./pages/ChatOverlay";
import HomePage from "./pages/HomePage";
import { UserInformation } from "./api/elpatoApi/types";
import { elPatoApi } from "./api/elpatoApi";

const App = () => {
  const [channel, setChannel] = useState<UserInformation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = async () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setChannel(null);
        return;
      }
      const resp = await elPatoApi.getUserDetails(hash);
      if (resp.data) {
        setChannel(resp.data);
        return;
      }
      if (resp.status === 404) {
        setError('User not found');
        return
      }
      setError('Unexpected error');
    };

    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    }
  }, []);

  if (error) return (
    <h1>{error}</h1>
  )

  if (channel) return (
    <ChatOverlay userInformation={channel}  />
  )
  
  if (!location.hash.replace('#', '')) {
    return ( <HomePage /> );
  }

  return null;
}

export default App
