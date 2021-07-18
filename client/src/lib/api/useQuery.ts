import { useState, useEffect } from "react";
import { server } from ".";

interface State<T> {
    data: T | null
}

export const useQuery = <T = any>(query: string) => {
    const [state, setState] = useState<State<T> | null>({ data: null });
    useEffect(() => {
        const fetchApi = async () => {
            const { data } = await server.fetch<T>({ query });
            setState({ data });
          };
          fetchApi();
    }, [query])   
    return state; 
  };