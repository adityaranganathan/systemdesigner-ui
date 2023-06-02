import axios from "axios";

import { NodeType } from "../components/Node";

import { VITE_API_URL } from './config.js'

export async function fetchSystem(systemId)  {
  let response = await axios.get(`${VITE_API_URL}/api/systems/${systemId}`)
  if (response.status != 200){
    return new Error(response.statusText)
  }

  for (let node of response.data.nodes){
    node.type = NodeType
  }

  return response.data
};

export async function createSystem()  {
  let response = await axios.post(`${VITE_API_URL}/api/systems`)
  if (response.status != 201){
    return new Error(response.statusText)
  }

  return response.data
};

export async function startSystem(systemId) {
  let response = await axios.put(`${VITE_API_URL}/api/systems/${systemId}/start`)
  if (response.status != 200){
    return new Error(response.statusText)
  }

  return
}