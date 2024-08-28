import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const auth = useSelector((store) => store.auth);
  return (
    <>
      {auth && (
        <main id="main">
          <Outlet />
        </main>
      )}
    </>
  );
}

export default App;
