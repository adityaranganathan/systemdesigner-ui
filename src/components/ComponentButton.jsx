import { Button, Text, VStack } from '@chakra-ui/react';

import { NodeType } from './Node.jsx';
import { GetDisplayName, GetIcon } from './Utils';

const styles = {
    button: {
        height: 75,
        width: 100,
    },
};

export function ComponentButton({ type, onAddNode }) {
    let buttonText = GetDisplayName(type);
    let buttonIcon = GetIcon(type);

    const onClick = () => {
        onAddNode({ type: NodeType, data: { type: type } });
    };

    return (
        <div>
            <Button style={styles.button} onClick={onClick}>
                <VStack>
                    {buttonIcon}
                    <Text fontSize='xs'>{buttonText}</Text>
                </VStack>
            </Button>
        </div>
    );
};