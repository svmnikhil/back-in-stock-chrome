import { useState } from 'react';
import './App.css';
import { Square2StackIcon } from '@heroicons/react/24/outline';

function App() {
  const [mail, setEmail] = useState("svmnikhil@gmail.com");

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
    <div className='flex flex-col items-start p-3'>
      <span className='font-semibold text-sm'>Notification email</span>
      <div className='flex flex-row items-center justify-between py-1'>
        <div className='flex items-center border px-1 rounded-md bg-white'>
          <span className='p-1'>{mail}</span>
        </div>
          <Square2StackIcon 
            className="w-6 h-6 ml-3"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
          />
      </div>
    </div>
  );
}

export default App;
