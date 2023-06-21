import { Container, Title } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { VolumeSliders } from '../app/features/volume/VolumeSliders';

const Popup = () => {
  document.body.style.width = '20em';
  document.body.style.height = '7em';
  const preferredColorScheme = useColorScheme();

  return (
    <MantineProvider
      theme={{ colorScheme: preferredColorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container p="md">
        <Title order={1} size="h4">
          Volume Control
        </Title>
        <VolumeSliders />
      </Container>
    </MantineProvider>
  );
};

export default Popup;
