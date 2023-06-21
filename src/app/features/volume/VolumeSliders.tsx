import { Flex } from '@mantine/core';
import { FC } from 'react';
import { VolumeSlider } from './VolumeSlider';

export const VolumeSliders: FC = () => {
  return (
    <>
      <Flex mih={50} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
        <VolumeSlider />
      </Flex>
    </>
  );
};
