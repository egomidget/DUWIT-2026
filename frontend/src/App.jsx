import { Link } from "react-router-dom";
import Card from "./components/Card";
import StudySpaces from "./components/StudySpaces";
import CandyDivider from "./components/CandyDivider";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
  <>
    <div className="container-fluid py-5">
      <div className="row justify-content-center align-items-center mb-4">
        <div className="col-md-6 text-center">
          <Card header='Study Space Directory'>Welcome to the root directory fo the Study Spaces. Feel free to explore them below!</Card>
          <Link to="/spinner" className="btn btn-go-time mt-3">TRY THE CANDY SPINNER!</Link>
        </div>
      </div>

      <CandyDivider />

      <StudySpaces />
    </div>
  </>
  );
}

export default App;
