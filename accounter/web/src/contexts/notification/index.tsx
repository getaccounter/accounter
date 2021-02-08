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

const generateDeterministicIdForNotification = (notification: NotificationPayload) =>
  uuidv5(JSON.stringify(notification), "3e1fe495-f36f-4c39-94ac-1eea15fbc5b8");

const notificationContext = createContext<{
  addNotification: (notification: NotificationPayload) => void;
}>(undefined!);

type Props = {
  children: ReactNode;
};

export default function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<{
    [id: string]: NotificationPayload;
  }>({});

  const closeNotifications = useCallback((id: string) => {
    setNotifications((notifications) => {
      const { [id]: omit, ...updatedNotifications } = notifications;
      return ({
        ...updatedNotifications,
      })
    });
  }, []);

  const addNotification = useCallback((notification: NotificationPayload) => {
    const id = generateDeterministicIdForNotification(notification);
    setNotifications((notifications) => ({
      ...notifications,
      [id]: notification,
    }));

    setTimeout(() => closeNotifications(id), 5000)
  }, [closeNotifications]);

  return (
    <>
      {Object.entries(notifications).map(([id, notification]) => (
        <Notifications
          key={id}
          onClose={() => closeNotifications(id)}
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
