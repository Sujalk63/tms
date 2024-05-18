import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {Signup} from "./Pages/Signup"
// import {Signin} from "./pages/Signin"
// import {Dashboard} from "./pages/Dashboard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          {/* <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
