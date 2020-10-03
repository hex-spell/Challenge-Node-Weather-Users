import React, { createContext, useReducer, useMemo } from "react";
import { SAVE_TOKEN, SAVE_USER, LOG_OUT, LOADING } from "./constants";
import {
  UserData,
  IUserStoreState,
  IUserContext,
  UserReducerAction,
} from "./types";

const initialUserState: UserData = {
  _id: "",
  email: "",
  __v: 0,
};

const initialState: IUserStoreState = {
  user: initialUserState,
  token: "",
  isLoading: true,
};

const initialContextState: IUserContext = {
  store: initialState,
  dispatch: (action: UserReducerAction) => {
    throw new Error(
      `dispatch no instanciado, intentaste: ${JSON.stringify(action)}`
    );
  },
};

const reducer = (state: IUserStoreState, action: UserReducerAction) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: action.payload };
    // SAVE_TOKEN y SAVE_USER se encargan de guardar el token y los datos de usuario en el estado del contexto, respectivamente
    case SAVE_TOKEN:
      return { ...state, token: action.payload };
    case SAVE_USER:
      /* console.log(action.payload);
      console.log({ ...state, user: action.payload }); */
      return { ...state, user: action.payload };
    case LOG_OUT:
      // borra el token del almacenamiento y retorna a defaults el estado del usuario en la app
      localStorage.removeItem("token");
      return { user: initialUserState, token: "", isLoading: false };
    default:
      throw new Error();
  }
};

export const UserContext = createContext<IUserContext>(initialContextState);

export const UserContextProvider: React.FC = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const userContextValue = useMemo(() => {
    return { store, dispatch };
  }, [store, dispatch]);
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
