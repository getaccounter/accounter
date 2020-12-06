import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import Notifications, { Type } from "./components/Notifications";
import { v5 as uuidv5 } from "uuid";

type NotificationPayload = {
  type: Type;
  title: ReactNode;
  content: ReactNode;
};

const generateDeterministicIdForNotification = (not: NotificationPayload) =>
  uuidv5(JSON.stringify(not), "3e1fe495-f36f-4c39-94ac-1eea15fbc5b8");

const notificationContext = createContext<{
  addNotification: (notification: NotificationPayload) => void;
}>(undefined!);

type Props = {
  children: ReactNode;
};

export default function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<{
    [key: string]: NotificationPayload;
  }>({});

  const addNotification = useCallback((notification: NotificationPayload) => {
    const id = generateDeterministicIdForNotification(notification);
    setNotifications((notifications) => ({
      ...notifications,
      [id]: notification,
    }));
  }, []);

  return (
    <>
      {Object.entries(notifications).map(([key, notification]) => (
        <Notifications
          key={key}
          onClose={() => {
            const { [key]: omit, ...updatedNotifications } = notifications;
            setNotifications(updatedNotifications);
          }}
          type={notification.type}
          headline={notification.title}
        >
          {notification.content}
        </Notifications>
      ))}
      <notificationContext.Provider
        children={children}
        value={{
          addNotification,
        }}
      />
    </>
  );
}

export const useNotifications = () => {
  return useContext(notificationContext);
};
