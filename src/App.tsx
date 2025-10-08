import { useState } from "react";
import "./index.css";
import StartPage from "./pages/StartPage";

function App() {
  function setPage(arg0: string) {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="app">
      <StartPage onStart={() => setPage("game")}/>

    </div>
  );
}

export default App