/* eslint-disable @typescript-eslint/no-explicit-any */
import { Console, Hook, Unhook } from "console-feed";
import React, { useEffect, useState } from "react";

const LogsContainer: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // Hook the console to capture logs
    const hookedConsole = Hook(
      window.console,
      (log: any) => setLogs((currLogs) => [...currLogs, log]),
      false
    );

    // Return the cleanup function (no return value or a function returning void)
    return () => {
      Unhook(hookedConsole); // Cleanup the console hook
    };
  }, []);

  return <Console filter={[]} logs={logs} variant="light" />;
};

export { LogsContainer };
