import Card from "./components/Card";
import StudySpaces from "./components/StudySpaces";
import CandyDivider from "./components/CandyDivider";

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
  <>
    <div className="container-fluid py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <Card header='Study Space Directory'>Welcome to the root directory fo the Study Spaces. Feel free to explore them below!</Card>
        </div>
      </div>

      <CandyDivider />

      <StudySpaces />
    </div>
  </>
  );
}

export default App;
