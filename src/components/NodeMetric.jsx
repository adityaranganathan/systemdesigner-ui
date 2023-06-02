import { VStack, Text } from "@chakra-ui/react";

const styles = {
    metric: {
        minWidth: "75px",
    },
};

function getColor(percentage) {
    const red = Math.round(percentage * 255);
    return `rgb(${red}, 0, 0)`;
}

export function NodeMetric({ name, value, unit, severity }) {
    return (
        <VStack style={styles.metric}>
            <Text fontSize="xs">{name}</Text>
            <Text color={getColor(severity)} fontSize="sm">{value} {unit}</Text>
        </VStack>
    );
}