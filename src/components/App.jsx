import { useState, useEffect } from 'react';

import { createSystem } from '../services/system.js';
import { Playground } from './Playground.jsx';

import '../index.css';

const styles = {
    app: {
        height: '100vh',
        width: '100vw',
    },
};

const SYSTEM_ID_KEY = 'systemId';

export default function App() {
    const [systemID, setSystemID] = useState(null);

    const handleCreateSystem = () => {
        return createSystem()
            .then(newSystem => {
                localStorage.setItem(SYSTEM_ID_KEY, newSystem.id);
                setSystemID(newSystem.id)
            })
            .catch(error => {
                console.error('Error creating system:', error);
            });
    };

    useEffect(() => {
        const storedSystemId = localStorage.getItem(SYSTEM_ID_KEY);
        if (storedSystemId) {
            setSystemID(storedSystemId)
        } else {
            handleCreateSystem();
        }
    }, []);

    return (
        <div style={styles.app}>
            {systemID && <Playground systemID={systemID} createNewSystem={handleCreateSystem} />}
        </div>
    );
}
