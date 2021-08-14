import { useState, useEffect, useCallback } from "react";
import { server } from ".";

interface State<T> {
    [x: string]: any;
    data: T | null
}

interface Result<T> {
    state: State<T> | null;
    refreshListings: () => void
}

  export const useQuery = <T = any>(query: string): Result<T> => {
    const [state, setState] = useState<State<T> | null>({ data: null });
    const refreshListings = useCallback(() => {
        const fetchApi = async () => {
            const { data } = await server.fetch<State<T>>({ query });
            setState(data);
          };
          fetchApi();
    }, [query]);
    useEffect(() => refreshListings(), [refreshListings])
    return { state, refreshListings };
  };