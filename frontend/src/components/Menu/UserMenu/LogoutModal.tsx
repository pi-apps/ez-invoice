
import { Button, Flex, Modal, Text } from '@phamphu19498/pibridge_uikit';
import { LogoutIcon } from 'components/Svg';
import { useState } from 'react';
import styled from 'styled-components';


interface LogoutProps {
    onDismiss?: () => void
}

const LogoutModal: React.FC<LogoutProps> = ({ onDismiss }) => {
  return (
    <Modal title="" onDismiss={onDismiss} maxWidth="550px" modalIcon={<LogoutIcon/>}>
        <Flex flexDirection="column" width="100%">
            <Text bold fontSize='18px' width="100%" textAlign="center">Are you sure want to log out?</Text>
            <Flex mt="1rem" justifyContent="space-between">
                <Button width="48%" variant='secondary' onClick={onDismiss}>
                    Cancel
                </Button>
                <Button width="48%">
                    Confirm
                </Button>
            </Flex>
        </Flex>
    </Modal>
  )
}
export default LogoutModal


