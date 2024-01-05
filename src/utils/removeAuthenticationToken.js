// remove authenticationToken from localStorage when logged out & invalid token users

const removeAuthenticationToken = () => {
  localStorage.removeItem("user-token");
};

export default removeAuthenticationToken;
