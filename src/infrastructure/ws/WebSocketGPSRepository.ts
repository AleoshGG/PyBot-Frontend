import type { GPSData } from "../../domain/entities/GPSData";
import type { IGPSRepository } from "../../domain/repositories/IGPSRepository";

// es la implementación concreta de IGPRepository que usa el ws para obtener los datos
export class WebSocketGPSRepository implements IGPSRepository {
  private ws: WebSocket | null = null;
  private callback?: (data: GPSData) => void;

  connect(prototypeId: string) {
    const url = `wss://pybot.aleosh.online/ws/ws/neo?prototype_id=${prototypeId}`;
    this.ws = new WebSocket(url);
    this.ws.onopen = () => console.log("WS conectado");
    this.ws.onmessage = (event) => {
      if (!this.callback) return;
      const data: GPSData = JSON.parse(event.data);
      this.callback(data);
    };
    this.ws.onerror = (err) => console.error("Error WS", err);
    this.ws.onclose = () => console.warn("WS cerrado");
  }

  onUpdate(callback: (data: GPSData) => void) {
    this.callback = callback;
  }

  disconnect() {
    this.ws?.close();
  }
}