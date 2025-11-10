export function serviceWeight(onData) {
  let prototypeId = localStorage.getItem("selectedPrototypeId") || "1234aleo";
  const socket = new WebSocket(`wss://pybot.aleosh.online/ws/ws/hx?prototype_id=${prototypeId}`);

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.weight_g !== undefined) {
        onData(data.weight_g);
      }
    } catch (err) {
      console.error('Error parsing WS message:', err);
    }
  };

  socket.onerror = (err) => {
    console.error('WebSocket error:', err);
  };

  return socket;
}
