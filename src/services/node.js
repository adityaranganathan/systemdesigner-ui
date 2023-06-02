import axios from 'axios';
import { VITE_API_URL } from './config.js'

export async function createNode(systemId, nodeData) {
  let response = await axios.post(`${VITE_API_URL}/api/systems/${systemId}/nodes`, nodeData.data);

  if (response.status !== 201) {
    throw new Error(response.statusText);
  }

  return response.data;
}

export async function updateNodePosition(systemId, nodeId, newPosition) {
  let response = await axios.patch(`${VITE_API_URL}/api/systems/${systemId}/nodes/${nodeId}`, newPosition);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
}

export async function deleteNodes(systemId, nodes) {
  let nodeIds = nodes.map((node)=>node.id)
  let idsQuery = nodeIds.map(id => `id=${id}`).join("&");
  let response = await axios.delete(`${VITE_API_URL}/api/systems/${systemId}/nodes?${idsQuery}`);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
}