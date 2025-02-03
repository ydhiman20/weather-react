import { Console, Hook, Unhook } from "console-feed";
import { useState, useEffect } from "react";

const LogsContainer = () => {
  const [logs, setLogs] = useState([]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(hookedConsole);
  }, []);

  return <Console filter={[]} logs={logs} variant="light" />;
};

export { LogsContainer };
