
import './App.css';
import { createTheme, Divider, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import { ModalsProvider } from '@mantine/modals';

import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { store, persistor } from './Store';
import AppRoutes from './AppRoutes';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const theme = createTheme({
    colors: {
      'brightSun': ["#fffbeb", "#fff3c6", "#ffe588", "#ffd149", "#ffbd20", "#f99b07", "#dd7302", "#b75006",
        "#943c0c", "#7a330d", "#461902"
      ],
      'mineShaft': ["#f6f6f6", "#e7e7e7", "#d1d1d1", "#b0b0b0", "#888888",
        "#6d6d6d", "#5d5d5d", "#4f4f4f", "#454545", "#3d3d3d", "#2d2d2d",
      ],
      'fountainBlue':
        [
          "#effcfc", "#d6f7f7", "#b2eeef", "#7de0e3", "#41c9cf",
          "#26afb7", "#228c98", "#22717c", "#245c66", "#224e57", "#11333b",],
      'shakeSpeare':
        ["#f3f8fc",
          "#e6f1f8",
          "#c8e3ef",
          "#97cce2",
          "#5fb0d1",
          "#4ba3c7",
          "#2a799f",
          "#236281",
          "#21526b",
          "#20465a",
          "#152d3c",],
    },
    focusRing: "never",
    primaryColor: 'fountainBlue',
    primaryShade: 4,
    fontFamily: "poppins, sans-serif"
  })
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider defaultColorScheme='dark' theme={theme} >
          <ModalsProvider>
            <Notifications position='top-center' zIndex={1000} />
            <AppRoutes />
          </ModalsProvider>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
