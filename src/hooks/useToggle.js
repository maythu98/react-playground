import { useState } from "react";

function useToggle(initial = true) {
    const [visible, setVisible] = useState(initial);
    
    function toggle()
    {
        setVisible(previ => !previ);
    }

    return [visible, toggle];
}

export default useToggle;