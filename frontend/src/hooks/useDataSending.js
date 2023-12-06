import { useState } from "react";

const useDataSending = (sendFoo) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sendData = async (options) => {
        setLoading(true)
        setError(null)
        try {
            const response = await sendFoo(options)
            // todo - сделать по всем статусам
            if (response.status > 399) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            setData(response.data)
            console.log(data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, sendData }
}

export default useDataSending