import { useState, useEffect, useRef } from 'react';
import { Cartesian3 } from 'cesium';

export function useTelemetry(wsUrl) {
  const [telemetry, setTelemetry] = useState({});
  const [trails, setTrails] = useState({});
  const [status, setStatus] = useState('CONNECTING');
  const [lastUpdateTime, setLastUpdateTime] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    let reconnectTimeout;

    const connect = () => {
      setStatus('CONNECTING');
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus('CONNECTED');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const { droneId, latitude, longitude, altitude } = data;
          
          setLastUpdateTime(new Date());

          setTelemetry(prev => ({
            ...prev,
            [droneId]: data
          }));

          setTrails(prev => {
            const currentTrail = prev[droneId] || [];
            const newTrail = [...currentTrail, Cartesian3.fromDegrees(longitude, latitude, altitude)].slice(-100);
            return {
              ...prev,
              [droneId]: newTrail
            };
          });

        } catch (e) {
          console.error("Error parsing telemetry data", e);
        }
      };

      ws.onclose = () => {
        setStatus('DISCONNECTED');
        reconnectTimeout = setTimeout(connect, 3000);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws.close();
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [wsUrl]);

  return { telemetry, trails, status, lastUpdateTime };
}
