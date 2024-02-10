import { useState } from 'react';
import './App.css';
import { Square2StackIcon } from '@heroicons/react/24/outline';

function App() {
  const [mail, setEmail] = useState("susmitha.turaga1@gmail.com");

  // Function to copy email to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(mail).then(
      () => {
        console.log('Email copied to clipboard successfully!');
      },
      (err) => {
        console.error('Failed to copy email: ', err);
      }
    );
  };

  return (
    <div className='flex flex-col items-start p-3 w-60 bg-gray-100'>
      <span className='font-semibold text-sm text-slate-800'>Notification email</span>
      <div className='flex flex-row items-center justify-between py-1'>
        <div className='flex border items-center border-gray-300 px-1 w-40 h-8 rounded-md bg-white overflow-scroll'>
          <span className='p-1'>{mail}</span>
        </div>
          <Square2StackIcon 
            className="w-6 h-6 ml-3 rounded-lg hover:bg-gray-200 active:bg-gray-100"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
          />
      </div>
    </div>
  );
}

export default App;
