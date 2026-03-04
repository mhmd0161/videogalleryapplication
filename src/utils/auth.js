export const getToken = () => localStorage.getItem("access");

export const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});