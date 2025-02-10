import { QueryClientProvider } from "react-query";
import useConfigureQueryClient from "../../hooks/common/useConfigureQueryClient";
import useVerifyAuth from "../../hooks/common/useVerifyAuth";
import React from "react";

interface Props {
    children: React.ReactNode
}



const GlobalContextProvider = ({ children }: Props) => {
    const queryClient = useConfigureQueryClient();
    useVerifyAuth();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default GlobalContextProvider;