import type { CamData } from "../../domain/entities/CamMessageData";
import type { ICameraRepository } from "../../domain/repositories/ICameraRepository";

// es la implementación concreta de ICameraRepository que usa el ws para obtener los datos
export class WebSocketCameraRepository implements ICameraRepository {
    private ws: WebSocket | null = null;
    private callback?: ((data: CamData) => void) | null = null;

    connect(prototypeId: string) {
        const url = `wss://pybot.aleosh.online/ws/ws/cam?prototype_id=${prototypeId}`
        this.ws = new WebSocket(url)
    
        this.ws.onopen = () => console.log("WS de Camara CONECTADO");
        this.ws.onerror = (err) => console.error("Error WS", err);
        this.ws.onclose = () => console.warn("WS cerrado");    
        
        this.ws.onmessage = (event) => {
            if(!this.callback) return;
            const data: CamData = JSON.parse(event.data);
            this.callback(data);
        };
        
    }

    onUpdate(callback: (data: CamData) => void): void {
        this.callback = callback;
    }
    
    disconnect(): void {
        this.ws?.close();
    }
}