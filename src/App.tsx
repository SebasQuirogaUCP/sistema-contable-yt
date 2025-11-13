import { Outlet } from "react-router";
import "./App.css";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Sidebar />

      <main className="lg:pl-72 min-h-screen">
        <div className="animate-in">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
