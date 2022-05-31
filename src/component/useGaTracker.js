import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const useGaTracker = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.initialize('G-854NDFJES5');
        //ReactGA.send(location.pathname);
        ReactGA.send({hitType: "pageview", page: location.pathname})

    }, [location]);

};

export default useGaTracker;
