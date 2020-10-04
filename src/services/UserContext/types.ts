export type UserData = {
  _id: string;
  email: string;
  __v: number;
};

export interface IUserStoreState {
  user: UserData;
  token: string;
  isLoading: boolean;
}

// tengo que averiguar como usar las constantes importadas en typescript
export type UserReducerAction =
  | { type: "LOADING"; payload: boolean }
  | { type: "SAVE_TOKEN"; payload: string }
  | { type: "LOG_OUT"; payload: null }
  | { type: "SAVE_USER"; payload: UserData };

export interface IUserContext {
  store: IUserStoreState;
  dispatch: (action: UserReducerAction) => void;
}
