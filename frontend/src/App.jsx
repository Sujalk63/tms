import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Signup } from "./Pages/Signup";
import { Signin } from "./Pages/Signin";
import { Dashboard } from "./Pages/DashBoard";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "./AuthContext";

function InnerApp() {
  const { authState } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={authState.token ? <Dashboard /> : <Navigate to="/signin" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

// why inner app inside the app: becuz this throws an error "useAuth didnt destrucred", this is because the authContext js is not rendered before authContext the app is getting rendered in which the dashboard component is using authContext but the auth contectIsnot yet rendered 
// by giving innerApp we achieve: by the time app calls the inner app in this span of time authcontext gets rendered and hence is available to be used in dashBoard

export default App;

