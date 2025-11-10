const API_BASE_URL = "https://pybot.aleosh.online/api2/users/"; 

interface UserData {
  // Ajusta los campos según tu estructura real
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface ResponseData {
  // Estructura esperada en la respuesta exitosa
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  // Agrega otros campos si los hay
}

export function serviceAccount(
  userData: UserData,
  onSuccess: (data: ResponseData) => void,
  onError: (errorMessage: string) => void
): void {
  fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errData: { error?: string }) => {
          throw new Error(errData.error || "Error al registrar el usuario");
        });
      }
      return response.json();
    })
    .then((data: ResponseData) => {
      onSuccess(data);
    })
    .catch((err: Error) => {
      console.error("Error en serviceAccount:", err);
      onError(err.message);
    });
}
