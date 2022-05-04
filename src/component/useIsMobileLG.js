import { useEffect, useState } from "react";

const getIsMobile = () => window.innerWidth <= 992; 

//use in Lyric.js for screenSize is 'lg'

export default function useIsMobileLG() {
    const [isMobile, setIsMobile] = useState(getIsMobile());

    useEffect(() => {
        const onResize = () => {
            setIsMobile(getIsMobile());
        }
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);
    
    return isMobile;
}