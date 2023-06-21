import { Flex, Slider } from '@mantine/core';
import { FC } from 'react';

export const VolumeSliders: FC = () => {
  return (
    <Flex mih={50} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
      <Slider
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
        w="100%"
      />
    </Flex>
  );
};
