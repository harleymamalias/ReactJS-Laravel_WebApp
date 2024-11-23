import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/route";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}

export default App;
