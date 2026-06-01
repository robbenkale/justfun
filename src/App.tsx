/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useApp } from './AppContext';
import { AppLayout } from './components/layout';
import { AuthScreens } from './components/auth-screens';
import { PagesContainer } from './components/pages';

function InnerApp() {
  const { screen } = useApp();
  const isAuthScreen = screen.type === 'login' || screen.type === 'register';

  if (isAuthScreen) {
    return <AuthScreens />;
  }

  return (
    <AppLayout>
      <PagesContainer />
    </AppLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  );
}

