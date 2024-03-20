import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NoticeDetail from "./components/NoticeDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
