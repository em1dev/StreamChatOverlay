import { AuthenticationPage } from '@/pages/AuthenticationPage';
import { Landing } from '@/pages/Landing';
import { AddToStream } from '@/pages/Settings/AddToStream';
import { AdvanceSettings } from '@/pages/Settings/AdvanceSettings';
import { BasicSettings } from '@/pages/Settings/BasicSettings';
import { CustomThemeSettings } from '@/pages/Settings/CustomThemeSettings';
import { TextToSpeechSettings } from '@/pages/Settings/TextToSpeechSettings';
import { SettingsTemplate } from '@/templates/SettingsTemplate';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/o/:userId',
    lazy: { Component: async () => (await import('@/pages/ChatOverlay')).default }
  },

  {
    path: '/',
    lazy: { Component: async () => (await import('@/app/SettingsWrapper')).default },
    children: [
      { index: true, Component: Landing },
      {
        Component: SettingsTemplate,
        path: 'settings',
        children: [
          { index: true, Component: BasicSettings },
          { path: 'add-to-stream', Component: AddToStream },
          { path: 'tts', Component: TextToSpeechSettings },
          { path: 'advance-settings', Component: AdvanceSettings },
          { path: 'custom-theme', Component: CustomThemeSettings },
        ]
      },
      { path: '/auth', Component: AuthenticationPage }
    ]
  },
]);

export default router;