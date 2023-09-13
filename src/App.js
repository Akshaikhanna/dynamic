import { Route, Routes } from "react-router-dom";
import "./App.css";
import DataTable from "./Components/Datatable";
import Validation from './Components/Validation'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DataTable />} />
        <Route path="/validate" element={<Validation/>} />
      </Routes>
    </div>
  );
}

export default App;
