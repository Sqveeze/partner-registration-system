import React from "react";

interface IOpenModal {
  type: string;
  payload?: JSX.Element;
}

interface ICloseModal {
  type: string;
  payload?: JSX.Element;
}

type TActionTypes = IOpenModal | ICloseModal

interface IState {
  isModalOpen: boolean;
  modalContent?: JSX.Element;
  openModal?: (component: JSX.Element) => void;
  closeModal?: () => void;
}

const initialState: IState = {
  isModalOpen: false,
  modalContent: undefined,
};

const reducer = (state: IState, action: TActionTypes) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        isModalOpen: true,
        modalContent: action.payload,
      };
    case "CLOSE_MODAL":
      console.log('closingModal');
      return {
        ...state,
        isModalOpen: false,
        modalContent: undefined,
      };
    default:
      return state;
  }
};

export const StoreContext = React.createContext<IState>(initialState)

export const Store = ({
  children
}: {
  children: JSX.Element
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const openModal = (component: JSX.Element) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: component,
    });
  };

  const closeModal = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };

  return (
    <StoreContext.Provider
      value={{
        isModalOpen: state.isModalOpen,
        modalContent: state.modalContent,
        openModal,
        closeModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
