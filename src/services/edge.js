import axios from 'axios';

export async function createEdge(systemId, edgeData) {
  let response = await axios.post(`http://localhost:8080/api/systems/${systemId}/edges`, edgeData);

  if (response.status !== 201) {
    throw new Error(response.statusText);
  }

  return response.data;
}

export async function deleteEdges(systemId, edges) {
  let edgeIds = edges.map((edge)=>edge.id)
  let idsQuery = edgeIds.map(id => `id=${id}`).join("&");
  let response = await axios.delete(`http://localhost:8080/api/systems/${systemId}/edges?${idsQuery}`);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data;
}