import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";
// import { db } from './db'; // Import this line to use the Firestore database connection

function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
