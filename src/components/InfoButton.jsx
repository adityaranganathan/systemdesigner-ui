import { useState } from 'react';
import { Icon, Text, Box, CloseButton, Button, Link, HStack } from '@chakra-ui/react';
import { Panel } from 'reactflow';
import { BsInfoCircle } from "react-icons/bs";
import { FaReact, FaServer, FaGlobe } from "react-icons/fa";

const styles = {
    infoPanel: {
        position: "fixed",
        top: "0%",
        left: "50%",
        transform: "translate(-50%, 0%)",

        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        padding: "10px 10px",
    },
    button: {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        height: "60px",
        width: "60px",
    },
};

const iconStyles = {
    boxSize: 5,
};

export function InfoButton() {
    const [showInfo, setShowInfo] = useState(true);

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    };

    return (
        <div>
            {showInfo && (
                <Panel style={styles.infoPanel}>
                    <HStack >
                        <Box>
                            <Text margin={"10px 10px"}>
                                Visualize load balancing in action!
                            </Text>
                            <HStack justify='center' margin="0px 0px" spacing={"10px"}>
                                <Link href="https://github.com/adityaranganathan/systemdesigner-ui" isExternal>
                                    <Icon as={FaReact} {...iconStyles} />
                                </Link>
                                <Link href="https://github.com/adityaranganathan/systemdesigner" isExternal>
                                    <Icon as={FaServer} {...iconStyles} />
                                </Link>
                                <Link href="https://aditya-r.com" isExternal>
                                    <Icon as={FaGlobe} {...iconStyles} />
                                </Link>
                            </HStack>
                        </Box>
                        <CloseButton onClick={toggleInfo} />
                    </HStack>
                </Panel>
            )}

            <Panel position="bottom-right" >
                <Button style={styles.button} onClick={toggleInfo}>
                    <Icon as={BsInfoCircle} boxSize={"1.75rem"} />
                </Button>
            </Panel>
        </div>
    );
}
