import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

function RefreshListenerRoute({ children }) {
  const location = useLocation();
  const cookies = new Cookies();

  useEffect(() => {
    console.log("Page refreshed!");
  }, []);

  //   useEffect(() => {
  //     const handlePageRefresh = () => {
  //       // Code to execute on page refresh for all routes
  //       if (!cookies.get("remember")) {
  //         cookies.remove("isLoggedIn");
  //         cookies.remove("token");
  //         console.log(cookies.get("token"));
  //       }
  //     };

  //     window.addEventListener("beforeunload", handlePageRefresh);

  //     return () => {
  //       window.removeEventListener("beforeunload", handlePageRefresh);
  //     };
  //   }, [location]);

  return children;
}

export default RefreshListenerRoute;
