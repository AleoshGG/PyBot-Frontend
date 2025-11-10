export function serviceChangeUser(
  token: string,
  newFirstName: string,
  onSuccess: (data: any) => void,
  onError: (error: string) => void
) {
  fetch(`https://pybot.aleosh.online/api2/users/new_username/${encodeURIComponent(newFirstName)}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        // Intentamos sacar el error en formato JSON
        const errData = await res.json().catch(() => null);
        const msg = errData?.message || 'Error al actualizar usuario';
        throw new Error(msg);
      }
      return res.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((error: Error) => {
      console.error('Fetch error:', error);
      onError(error.message);
    });
}
