import "./App.css";
import Landing from "./components/landing/Landing";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}>
          <Route path="/verify/:token" element={<Landing />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/verify/:token" element={<Finish />} /> */}
      </Routes>
    </div>
  );
}

export default App;
