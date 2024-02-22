import { Square2StackIcon } from '@heroicons/react/24/outline';
import '../App.css';


export default function NotifyEmail({mail, data}) {

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
    <div className='flex flex-col items-start pl-2 mb-2 pb-4 border-slate-200 border-b'>
        <div className='flex flex-row items-center justify-between pb-1'>
        <span className='text-[14px] font-light text-neutral-900'>Notify Email for</span>
        <span className='uppercase pl-1 overflow-clip text-[14px]'>{data.companyName}</span>

        </div>
        <div className='flex flex-row justify-center items-center'>
        <div className='flex border items-center border-gray-300 w-40 h-8 rounded-md bg-white overflow-clip'>
            <span className='p-1'>{mail}</span>
        </div>
        <Square2StackIcon 
            className="w-6 h-6 ml-1 rounded-lg hover:bg-gray-200 active:bg-gray-100"
            onClick={copyToClipboard}
            aria-label="Copy to clipboard"
        />
        </div>
    </div>
  )
}