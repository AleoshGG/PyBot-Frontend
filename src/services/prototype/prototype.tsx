export interface Prototype {
  prototype_id: string;
  prototype_name: string;
  model: string;
  user_id: string;
}

const BASE_URL = 'https://pybot.aleosh.online/api2/prototypes/';

function getHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// Obtener todos los prototipos
export async function getAllPrototypes(): Promise<{ data: { prototypes: Prototype[] } }> {
  const res = await fetch(BASE_URL, {
    headers: getHeaders()
  });

  if (!res.ok) throw new Error('Error al obtener prototipos');
  return await res.json();
}

// Obtener un prototipo por ID
export async function getPrototype(id: string): Promise<Prototype> {
  const res = await fetch(`${BASE_URL}${id}`, {
    headers: getHeaders()
  });

  if (!res.ok) throw new Error(`Prototipo con ID ${id} no encontrado`);
  return await res.json();
}

// Crear un nuevo prototipo (solo se envía prototype_id y prototype_name)
export async function createPrototype(data: {
  prototype_id: string;
  prototype_name: string;
}): Promise<Prototype> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al crear prototipo: ${errorText}`);
  }

  const json = await res.json();

  // Adaptar la respuesta que devuelve el backend
  return {
    prototype_id: json.data.prototype_id,
    prototype_name: json.data.attributes.prototype_name,
    model: json.data.attributes.model,
    user_id: json.data.attributes.user_id
  };
}

// Actualizar un prototipo (requiere todos los campos)
export async function updatePrototype(data: Prototype): Promise<Prototype> {
  const res = await fetch(BASE_URL, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al actualizar prototipo: ${errorText}`);
  }

  return await res.json();
}

// Eliminar un prototipo por ID
export async function deletePrototype(id: string): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al eliminar prototipo: ${errorText}`);
  }

  return await res.json();
}
