import { useState, useEffect } from "react"

function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        let item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initial;
    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage