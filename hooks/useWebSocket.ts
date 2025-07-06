'use client'

import { useEffect, useState } from "react"

export type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

export const useWebSocket = () => {
    const [status, setStatus] = useState<ConnectionStatus>('connected')

    useEffect(() => {
        const interval = setTimeout(() => {
            setStatus("reconnecting");

            setTimeout(() => {
                setStatus("connected");
            }, 2000)
        }, 2000)

        return () => clearInterval(interval);
    }, []);

    return {
        status,
        isConnected: status === "connected",
    };
}