import { Icon } from '@chakra-ui/react'
import { GrServerCluster } from "react-icons/gr";
import { FaLaptop, FaServer } from "react-icons/fa";

const iconSize = "1.75rem"

export function GetIcon(type) {
    switch(type) {
        case 'client':
            return <Icon as={FaLaptop} boxSize={iconSize} />
        case 'server':
            return <Icon as={FaServer} boxSize={iconSize} />
        case 'load balancer':
            return <Icon as={GrServerCluster} boxSize={iconSize} />
        default:
            return null;
    }
}

export function GetDisplayName(type) {
    switch(type) {
        case 'client':
            return 'Client'
        case 'server':
            return 'Server'
        case 'load balancer':
            return 'Load Balancer'
        default:
            return null;
    }
}
