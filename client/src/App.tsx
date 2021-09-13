import Filter from './filter/Filter';
import RatInfo from './rat-info/RatInfo';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [value, setValue] = useState('');
  const ratSelected = (event: string) => {
    setValue(event);
  };

  const displayMessage = (message: string) =>{
    toast.error(message);
  };

  return (
      

      <div className="container">
          <div className="row justify-content-center">
            <Filter onError={displayMessage} onRatSelected={ratSelected} />
            <RatInfo onError={displayMessage} name={value} />
            <ToastContainer position="top-center"/>
          </div>
          
      </div>

  );
}

export default App;
