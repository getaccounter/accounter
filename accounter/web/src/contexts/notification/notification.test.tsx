import React, { ReactElement } from 'react';
import { render, within } from '@testing-library/react';

import NotificationProvider, { useNotifications } from './';
import userEvent from '@testing-library/user-event';

const TestComponent = ({ children }: { children: (authData: ReturnType<typeof useNotifications>) => ReactElement }) => {
  const authData = useNotifications();
  return children(authData);
};

test('shows success notifications and hides them again', async () => {
  const title = 'some-title';
  const content = 'some content';
  const container = render(
    <div id="root">
      <NotificationProvider>
        <TestComponent>
          {({ addNotification }) => (
            <div>
              <button
                onClick={() =>
                  addNotification({
                    type: 'success',
                    title,
                    content
                  })
                }
              />
            </div>
          )}
        </TestComponent>
      </NotificationProvider>
    </div>
  );

  userEvent.click(container.getByRole('button'));
  const notificationContainer = within(container.getByRole('alert'));

  expect(notificationContainer.getByText(title)).toBeInTheDocument();
  expect(notificationContainer.getByText(content)).toBeInTheDocument();

  // close notification
  userEvent.click(container.getByRole('button', { name: 'Close' }));
  expect(notificationContainer.getByText(title)).not.toBeInTheDocument();
  expect(notificationContainer.getByText(content)).not.toBeInTheDocument();
});
