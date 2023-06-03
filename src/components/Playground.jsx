import { useCallback, useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { NodeType, Node } from './Node.jsx';
import { ComponentMenu } from './ComponentMenu';
import { StartButton } from './StartButton';
import { InfoButton } from './InfoButton';

import { VITE_WS_URL } from '../services/config.js'
import { fetchSystem } from '../services/system.js';
import { createEdge, deleteEdges } from '../services/edge.js';
import { createNode, updateNodePosition, deleteNodes } from '../services/node.js';

const styles = {
  playground: {
    height: '100vh',
    width: '100vw',
  },
  spinner: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
};

const nodeTypes = {
  [NodeType]: Node
};

const defaultEdgeOptions = {
  animated: true,
  markerEnd: {
    type: MarkerType.Arrow,
    height: 40,
    width: 40,
  },
};

export function Playground({ systemID, createNewSystem }) {
  const [nodes, setNodes] = useState(null);
  const [edges, setEdges] = useState(null);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetchSystem(systemID)
      .then(system => {
        setNodes(system.nodes);
        setEdges(system.edges)
        setLoading(false);
      })
      .catch(error => {
        if (error.response.status === 404) {
          console.log("system does not exist. creating system:");
          createNewSystem();
        } else {
          console.error('error fetching system:', error);
        }
      })

    const ws = new WebSocket(`${VITE_WS_URL}/api/systems/${systemID}/metrics`);

    ws.onopen = () => {
      console.log('websocket connection opened:', systemID);
    }

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      // console.log('websocket message received:', messageData);

      setNodes((prevNodes) => {
        let newNodes = prevNodes.map(node => {
          if (node.id === messageData.nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                metrics: messageData.metrics,
              }
            };
          } else {
            return node;
          }
        });

        return newNodes;
      });
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    }

  }, [systemID]);


  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds))
  }, [systemID]);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), [systemID]);

  const onConnect = useCallback(async (params) => {
    createEdge(systemID, params).then(() => {
      fetchSystem(systemID).then(updatedSystem => {
        setNodes(updatedSystem.nodes);
        setEdges(updatedSystem.edges);
      });
    });
  }, [systemID]);

  const onEdgesDelete = useCallback(async (edgesToDelete) => {
    deleteEdges(systemID, edgesToDelete).then(() => {
      fetchSystem(systemID).then(updatedSystem => {
        setNodes(updatedSystem.nodes);
        setEdges(updatedSystem.edges);
      });
    })
  }, [systemID]);

  const addNode = useCallback(async (nodeData) => {
    createNode(systemID, nodeData).then(() => {
      fetchSystem(systemID).then(updatedSystem => {
        setNodes(updatedSystem.nodes);
        setEdges(updatedSystem.edges);
      });
    });
  }, [systemID]);

  const onNodesDelete = useCallback(async (nodesToDelete) => {
    deleteNodes(systemID, nodesToDelete).then(() => {
      fetchSystem(systemID).then(updatedSystem => {
        setNodes(updatedSystem.nodes);
        setEdges(updatedSystem.edges);
      });
    });
  }, [systemID]);

  const onNodeDragStop = useCallback(async (event, node) => {
    updateNodePosition(systemID, node.id, node.position);
  }, [systemID]);

  if (isLoading) {
    return <Spinner style={styles.spinner} />
  }

  return (
    <div style={styles.playground}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        defaultEdgeOptions={defaultEdgeOptions}
      >

        <ComponentMenu onAddNode={addNode} />
        <StartButton systemId={systemID} />
        <InfoButton></InfoButton>
        <Controls />
        {/* <MiniMap /> */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}