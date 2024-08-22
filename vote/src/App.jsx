import { Routes, Route } from 'react-router-dom';  // Importing Routes and Route
import Form from './Form.jsx';
import Vote from './Vote.jsx';  // Importing the Vote component
import Results from './Results.jsx'
import './App.css'; 

function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/results" element={<Results />}></Route>
      </Routes>
    </>
  );
}

export default App;
