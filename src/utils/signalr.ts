'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import useTryCatch from '@/hooks/use-try-catch';

interface SignalRContextProps {
  connection?: any;
}

const SignalRContext = createContext<SignalRContextProps>(undefined!);

export function SignalRProvider({ children }: any) {
  const [currentUser, setUser] = useState<boolean>();

  return { children };
  /*
    return (
        <SignalRContext.Provider>
        { children }
        < /SignalRContext.Provider>
    ) */
}

// TODO: manage authentication ...
export default function useSignalConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null,
  );

  const connect = useCallback(
    useTryCatch(
      async () => {
        setIsConnecting(false);
        const conn = new signalR.HubConnectionBuilder()
          .withUrl(`${process.env.API_HOST}/api/signal`) // TODO: change that ...
          .withAutomaticReconnect()
          .build();

        conn.onclose((error) => {
          if (error) {
            console.error(`SignalR connection closed with error: ${error}`);
          }
        });
        conn.onreconnecting(() => {
          console.log(`SignalR client is trying to reconnect ...`);
          setIsConnecting(true);
        });
        conn.onreconnected(() => {
          console.log(`SignalR Connection reestablished`);
          setIsConnecting(false);
        });

        async function start() {
          try {
            await conn.start();
            console.log('SignalR Connected.');
            setConnection(conn);
            setIsConnecting(true);

            // Keep alive every 30 seconds, in case you impement "WhoIsOnline" feature!
            // setInterval(() => {
            //    conn.invoke('Ping').catch((error) => console.error(`SignalR could not ping: ${error}`));
            // }, 30000);
          } catch (err) {
            setIsConnecting(false);
            setTimeout(start, 5000);
          }
        }

        await start();
      },
      () => {
        setIsConnecting(false);
        setConnection(null);
      },
    ),
    [],
  );

  return { connect, isConnecting, connection };
}

export function useSignalRContext(): SignalRContextProps {
  const context = useContext(SignalRContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useSignalRContext should be used within the SignalRContext provider!',
    );
  }

  return context;
}
