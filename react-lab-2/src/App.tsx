import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import { useAuth } from "./contexts/useAuth";
import AuthProvider from "./contexts/AuthProvider";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
