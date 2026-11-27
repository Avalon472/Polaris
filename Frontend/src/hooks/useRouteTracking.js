import { useEffect } from "react";
import { useLocation, useMatches } from "react-router-dom";

const useRouteTracking = () => {
  const location = useLocation();
  const matches = useMatches();

  useEffect(() => {
    const is404 = matches.some((match) => match.handle?.is404);

    if (!is404) {
      sessionStorage.setItem(
        "lastValidRoute",
        location.pathname + location.search + location.hash,
      );
    }
  }, [location, matches]);
};

export default useRouteTracking;
