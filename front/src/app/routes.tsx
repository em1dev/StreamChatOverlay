import { AuthenticationPage } from '@/pages/AuthenticationPage';
import { ConnectionPage } from '@/pages/ConnectionPage';
import { Privacy } from '@/pages/Privacy';
import { Terms } from '@/pages/Terms';
import { InfoTemplate } from '@/templates/InfoTemplate';
import { SettingsTemplate } from '@/templates/SettingsTemplate';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/o/:userId',
    lazy: { Component: async () => (await import('@Pages/ChatOverlay')).ChatOverlay }
  },

  {
    path: '/',
    lazy: { Component: async () => (await import('@/app/MainWrapper')).MainWrapper }, // includes fonts
    children: [
      { index: true, lazy: { Component: async () => (await import('@Pages/Landing')).Landing } },
      {
        Component: InfoTemplate,
        children: [
          { path: 'privacy',  Component: Privacy },
          { path: 'terms',  Component: Terms },
        ]
      },
      {
        Component: SettingsTemplate,
        path: 'settings',
        children: [
          { index: true, lazy: { Component: async () => (await import('@Pages/Settings/BasicSettings')).BasicSettings } },
          { path: 'add-to-stream', lazy: { Component: async () => (await import('@Pages/Settings/AddToStream')).AddToStream } },
          { path: 'connections', lazy: { Component: async () => (await import('@Pages/Settings/Connections')).Connections } },
          { path: 'tts', lazy: { Component: async () => (await import('@Pages/Settings/TextToSpeechSettings')).TextToSpeechSettings } },
          { path: 'advance-settings', lazy: { Component: async () => (await import('@Pages/Settings/AdvanceSettings')).AdvanceSettings } },
          { path: 'custom-theme', lazy: { Component: async () => (await import('@Pages/Settings/CustomThemeSettings')).CustomThemeSettings } },
        ]
      },
      { path: '/auth', Component: AuthenticationPage },
      { path: '/connect/:provider', Component: ConnectionPage }
    ]
  },
]);

export default router;
