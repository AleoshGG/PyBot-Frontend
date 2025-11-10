const API_BASE_URL = "https://pybot.aleosh.online/api2/users/login";

interface SignInData {
  email: string;
  password: string;
}

interface SignInSuccessResponse {
  mensaje: string;
  access_token: string;
  status: boolean;
}

export async function serviceLogin(
  credentials: SignInData,
  onSuccess: (data: SignInSuccessResponse) => void,
  onError: (error: string) => void
): Promise<void> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    const text = await response.text();

    // Intentar parsear JSON
    let data: SignInSuccessResponse;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Respuesta no es JSON válido");
    }

    if (!response.ok) {
      throw new Error(data.mensaje || "Error desconocido al iniciar sesión");
    }

    if (!data.access_token) {
      throw new Error("No se recibió token de acceso");
    }

    // Guardar token en localStorage
    localStorage.setItem("token", data.access_token);

    onSuccess(data);
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    onError(error.message);
  }
}
