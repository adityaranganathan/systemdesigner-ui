import { Card, HStack, Text, VStack, Divider } from "@chakra-ui/react";
import { Handle, Position } from 'reactflow';

import { NodeMetric } from "./NodeMetric";
import { GetIcon, GetDisplayName } from './Utils';

const styles = {
  node: {
    background: "white",
    padding: "1rem",
    borderRadius: "0.25rem",
    boxShadow: "md",
    transition: "box-shadow 0.2s",
    "&:hover": {
      boxShadow: "lg",
    },
  },
  handle: {
    width: "7px",
    height: "7px",
  }
}

export const NodeType = 'node'


export function Node({ data: { type, metrics } }) {
  const renderMetrics = (metrics) => {
    return metrics.map((metric, index) => (
      <NodeMetric key={index} name={metric.name} value={metric.value} unit={metric.unit} severity={metric.severity} />
    ));
  };

  return (
    <Card sx={styles.node}>
      <VStack>

        <HStack width="100%">
          {GetIcon(type)}
          <Text fontSize="sm">{GetDisplayName(type)}</Text>
        </HStack>

        <Divider></Divider>

        {metrics && (
          <HStack alignItems="flex-start" ml={4} spacing={1}>
            {renderMetrics(metrics)}
          </HStack>
        )}

      </VStack>

      <Handle type="target" position={Position.Left} style={styles.handle} />
      <Handle type="source" position={Position.Right} style={styles.handle} />
    </Card>
  );
};