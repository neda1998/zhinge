
import React, { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../appReducer";

interface PropsAppContext {
    children: React.ReactNode
}

interface AppState {
    toggleSidebar: () => void;
    showSidebar: boolean;
    theme:any;
    changeTheme:(item:any)=>void
}

const initialState = {
    showSidebar: false,
    theme: localStorage.getItem("theme") || "light"
};

const AppContext = createContext<AppState | undefined>(undefined);

const AppProvider = ({ children }: PropsAppContext) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const toggleSidebar = () => {
        dispatch({ type: "TOGGLE_SIDEBAR" })
    }

    const changeTheme = (theme: any) => {
        dispatch({ type: "CHANGE_THEME", payload: theme })
    }

    useEffect(() => {
        localStorage.setItem("theme", state.theme)
    }, [state.theme])

    return (
        <AppContext.Provider value={{ ...state, toggleSidebar, changeTheme }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};

export { useAppContext, AppProvider };
