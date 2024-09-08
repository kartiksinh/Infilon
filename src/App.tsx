import "./App.css";
import { makeServer } from "./mirage/index";
import User from "./components/User";

makeServer();

const App = () => {
  return (
    <div className="App">
      <User />
    </div>
  );
};

export default App;
