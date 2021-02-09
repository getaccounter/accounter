import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import Notification, { Type } from "./components/Notification";
import { v5 as uuidv5 } from "uuid";

type NotificationPayload = {
  type: Type;
  title: ReactNode;
  content: ReactNode;
  timeToShow?: number;
};

const generateDeterministicIdForNotification = (
  notification: NotificationPayload
) =>
  uuidv5(JSON.stringify(notification), "3e1fe495-f36f-4c39-94ac-1eea15fbc5b8");

const notificationContext = createContext<{
  addNotification: (notification: NotificationPayload) => void;
}>(undefined!);

type Props = {
  children: ReactNode;
};

export default function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<{
    [id: string]: {
      notification: NotificationPayload;
      timeoutId: number;
    };
  }>({});

  const closeNotifications = useCallback((id: string) => {
    setNotifications((notifications) => {
      const { [id]: omit, ...updatedNotifications } = notifications;
      return {
        ...updatedNotifications,
      };
    });
  }, []);

  const addNotification = useCallback(
    (notification: NotificationPayload) => {
      const id = generateDeterministicIdForNotification(notification);
      setNotifications((notifications) => {
        const { [id]: oldNotification } = notifications;
        if (oldNotification) {
          window.clearTimeout(oldNotification.timeoutId);
        }
        const timeoutId = window.setTimeout(() => closeNotifications(id), notification.timeToShow ?? 5000);
        return {
          ...notifications,
          [id]: {
            notification,
            timeoutId,
          },
        };
      });
    },
    [closeNotifications]
  );

  return (
    <>
      <div className="fixed inset-0 pointer-events-none">
        {Object.entries(notifications).map(([id, { notification }]) => (
          <Notification
            key={id}
            onClose={() => closeNotifications(id)}
            type={notification.type}
            headline={notification.title}
          >
            {notification.content}
          </Notification>
        ))}
      </div>
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
