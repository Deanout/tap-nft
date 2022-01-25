import Install from "./components/Install";
import Home from "./components/Home";
import './App.css'

declare global {
  interface Window {
      ethereum:any;
  }
}
function App() {
  
  if (window.ethereum) {
    return <Home />
  } else {
    return <Install />
  }

}

export default App
