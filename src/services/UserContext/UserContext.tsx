import React, { createContext, useReducer, useMemo, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { SAVE_TOKEN, SAVE_USER, LOG_OUT, LOADING } from "./constants";
import {
  UserData,
  IUserStoreState,
  IUserContext,
  UserReducerAction,
} from "./types";

const localapi = process.env.REACT_APP_ROOT_API;
const usersUri = `${localapi}users/id/`;

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

  const { token } = store;

  // Revisar almacenamiento local buscando token
  // Si lo encuentra, lo guarda
  // Si no lo encuentra, desactiva el estado de cargando
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      dispatch({ type: SAVE_TOKEN, payload: localToken });
    } else {
      dispatch({ type: LOADING, payload: false });
    }
  }, [dispatch]);

  // Si hay cambios en el estado del token, se descodifica y se pide al server info del usuario.
  // Guarda el token en el almacenamiento local, y los datos del usuario en UserContext
  // Desactiva spinner si ya terminó el request o no pudo decodificar el token
  // decodedIdentity.sub es el ID del usuario
  useEffect(() => {
    dispatch({ type: LOADING, payload: true });
    const decodedIdentity = jwt.decode(token);
    if (decodedIdentity) {
      localStorage.setItem("token", token);
      const userDataUri = usersUri + decodedIdentity.sub;
      axios
        .get(userDataUri, { headers: { Authorization: `Bearer ${token}` } })
        .then((res: any) => {
          dispatch({ type: SAVE_USER, payload: res.data });
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch({ type: LOADING, payload: false }));
    } else {
      dispatch({ type: LOADING, payload: false });
    }
  }, [token, dispatch]);

  const userContextValue = useMemo(() => {
    return { store, dispatch };
  }, [store, dispatch]);
  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
