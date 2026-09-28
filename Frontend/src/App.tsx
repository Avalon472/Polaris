import { Outlet } from "react-router-dom";
import LoadingSpinner from "./components/layout/LoadingSpinner";
import Navbar from "./components/layout/Navbar";
import { useAuthUser } from "./features/auth/api/AuthQueries";
import splash from "./res/Splash.jpg";

function App() {
  const { data: authUser, isLoading } = useAuthUser();

  return (
    <div className="flex w-screen h-screen bg-bgTransparent relative">
      <img
        src={splash}
        className="h-screen w-screen absolute left-0 top-0 opacity-50 -z-10"
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {authUser && <Navbar />}
          <div className="w-full mx-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
