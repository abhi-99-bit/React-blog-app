import {useState, useEffect} from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const abortConst = new AbortController(); // CLEAN UP FUCTION 
        fetch(url, {signal: abortConst.signal})
            .then(response => {
                if(!response.ok){
                    throw Error('could not get response from server');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
                setError(null)
            })
            .catch(err => {
                console.log(err.message);
                setLoading(false);
                setError(err.message);
                setData(null)
            })
        return () => abortConst.abort();
    }, [url])
    return { data, isLoading, error}
}
export default useFetch;
