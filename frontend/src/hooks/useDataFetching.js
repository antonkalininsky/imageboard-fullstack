import { useState, useEffect } from "react";

const useDataFetching = (fetchFoo) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (options) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetchFoo(options)
            // todo - сделать по всем статусам
            if (response.status > 399) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            setData(response.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    // useEffect(() => fetchData, [fetchFoo, options])

    return { data, loading, error, fetchData }
}

export default useDataFetching