import { useState, useEffect } from "react";

export const useFetch = (url) => {

        const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(false);
        const [error, setError] = useState(null);

    useEffect( () => {
           
        const abortController = new AbortController();
        const signal = abortController.signal;

        const getData = async (url) => {
           setIsPending(true);
        try {
            let res = await fetch(url);  
            
            if(!res.ok) {
                    let err = new Error("Error en la petición Fetch");
                    err.status = res.status || "000";
                    err.statusText = res.statusText || "Ocurrió un error";
                    throw err;
            };

            const json = await res.json();

            if(!signal.aborted) {
                setData(json);
                setError(null);
            };

        } catch (error) {
            if(!signal.aborted) {
            setData(null);
            setError(error);
            }
        } finally {
            if(!signal.aborted) {
            setIsPending(false);
            }
        }
    };
        getData(url);

    return () => abortController.abort();

    }, [url]);
   
return {
        data,
        isPending,
        error
};
}    