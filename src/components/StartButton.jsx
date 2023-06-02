import { Button, Icon } from '@chakra-ui/react';
import { BsPlayFill } from "react-icons/bs";
import { Panel } from 'reactflow';

import { startSystem } from '../services/system';

const styles = {
    button: {
        position: "fixed",
        bottom: "0%",
        left: "50%",
        transform: "translate(-50%, 0%)",
        height: "60px",
        width: "60px",
    },
};

export function StartButton({ systemId }) {
    const onClick = () => {
        startSystem(systemId);
    };

    return (
        <Panel position="bottom-center">
            <Button style={styles.button} onClick={onClick}>
                <Icon as={BsPlayFill} boxSize={"1.75rem"} />
            </Button>
        </Panel>
    );
}