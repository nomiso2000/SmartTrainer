const isAuthenticated = (state) => !!state.auth.token;
const getLoading = (state) => state.auth.loading;
const getUser = (state) => state.auth.user;
const getBalance = (state) => state.auth.balance;

export default {
  isAuthenticated,
  getLoading,
  getUser,
  getBalance,
};
