import { Box, Button, Container, MantineProvider, Title } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { FiGithub } from 'react-icons/fi';

const Options = () => {
  const preferredColorScheme = useColorScheme();
  return (
    <MantineProvider
      theme={{ colorScheme: preferredColorScheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container p="md">
        <Title order={1} size="h1">
          Options
        </Title>
        <Box pt="md">
          <a href="https://github.com/r4ai/browser-tab-volume-manager">
            <Button
              leftIcon={<FiGithub />}
              size="md"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'Purple' }}
            >
              Star on GitHub
            </Button>
          </a>
        </Box>
      </Container>
    </MantineProvider>
  );
};

export default Options;
