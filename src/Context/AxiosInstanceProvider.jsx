import React from "react";

const AxiosStateContext = React.createContext(null);
const AxiosDispatchContext = React.createContext();

const countReducer = (state, action) => {
  switch (action.type) {
    case 'setToken': {
      return { ...state, token: action.payload }
    }
    case 'setUsersData': {
      return { ...state, usersData: action.payload }
    }
    case 'setPage': {
      return { ...state, page: state.page + 1 }
    }
    case 'setLoading': {
      return { ...state, loading: action.payload }
    }
    case 'setError': {
      return { ...state, error: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
};

const AxiosInstanceProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(countReducer, { token: null, usersData: null, page: 1, loading: false, error: false });

  return (
    <AxiosStateContext.Provider value={state}>
      <AxiosDispatchContext.Provider value={dispatch} >
        {children}
      </AxiosDispatchContext.Provider>
    </AxiosStateContext.Provider>
  );
};

export { AxiosInstanceProvider, AxiosStateContext, AxiosDispatchContext }