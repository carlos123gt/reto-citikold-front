import ApplicationRoutes from "./routes"
import { useSelector } from "react-redux";
import Loader from "./components/root/Loader/Loader";

function App() {
  const loading = useSelector((state) => state.loader.loadState)
  return (
    <>
    {loading && (
      <Loader/>
    )}
    
     <ApplicationRoutes/>
    </>
  )
}

export default App
