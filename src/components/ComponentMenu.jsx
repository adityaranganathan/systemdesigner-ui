import { VStack } from '@chakra-ui/react';
import { Panel } from 'reactflow';

import { ComponentButton } from './ComponentButton';

const styles = {
    componentPanel: {
        position: "fixed",
        top: "50%",
        left: 0,
        transform: "translate(0,-50%)",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        padding: '15px'
    },
};

export function ComponentMenu({ onAddNode }) {
    return (
        <Panel style={styles.componentPanel}>
            <VStack spacing='10px'>
                <ComponentButton type='client' onAddNode={onAddNode} />
                <ComponentButton type='server' onAddNode={onAddNode} />
                <ComponentButton type='load balancer' onAddNode={onAddNode} />
            </VStack>
        </Panel>
    );
};