// getAuthenticationToken from localStorage for logged in users
const getAuthenticationToken = () => {
  let userToken = localStorage.getItem("user-token");
  let config = {
    headers: {
      Authorization: userToken,
    },
  };
  return config;
};

export default getAuthenticationToken;
