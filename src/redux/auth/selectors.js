export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isrefreshing;
export const selectUsersEmail = state => state.auth.user.email;
export const selectIsError = state => state.auth.isError;