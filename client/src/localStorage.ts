export const setToken = (token: string) => {
  window.localStorage.setItem("token", JSON.stringify(token));
  window.dispatchEvent(new Event("storage"));
};

export const getToken = (): string | null => {
  const token = window.localStorage.getItem("token");

  return token ? JSON.parse(token) : null;
};

export const removeToken = () => {
  window.localStorage.removeItem("token");
  window.dispatchEvent(new Event("storage"));
};
