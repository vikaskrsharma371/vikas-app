import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/components/About';

const name = "John Doe";
function App() {
  return (<>
    <Navbar title="TextUtils" about="About TextUtils" />
    <div className="container my-3">
    <TextForm heading="Enter the text to analyze" />
    <About/>
    </div>
  </>
  );
}

export default App;
