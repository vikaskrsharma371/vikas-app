import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/components/About';
import Alert from './components/components/Alert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

 
function App() {
  const[mode, setMode] = React.useState('dark');
  const[alert, setAlert] = React.useState(null);
  const showAlert = (message, type) => {
    setAlert(
      {
        message: message,
        type: type
      }
    )
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode = () => {
    if(mode === 'light') {  
    setMode('dark')
    document.body.style.backgroundColor = '#042743'
    showAlert("Dark mode has been enabled", "success")
    document.title = 'TextUtils - Dark Mode'
    
  }else{
    setMode('light')
    document.body.style.backgroundColor = 'white' 
    showAlert("Light mode has been enabled", "success")
    document.title = 'TextUtils - Light Mode'
   
  }
}
  
  return (<>
  <Router>
    <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} about="About" />
    <Alert  mode={mode} alert={alert}/>  
    <div className="container my-3">
     <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode} />} />
          <Route path="/" element={<TextForm showAlert={showAlert} heading="Enter the text to analyze" mode={mode} />} />
     </Routes>
    </div>
    </Router>
  </>
  );
} 

export default App;
