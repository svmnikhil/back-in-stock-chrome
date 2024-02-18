import { useState, useEffect } from 'react';


function PageWidget() {
    const [mail, setEmail] = useState("blah-blah@xyz.com");
    const [productName, setProductName] = useState("iPhone 16 Pro");
    const [companyName, setCompanyName] = useState("Apple Inc.");
    const [notifyMe, setNotifyMe] = useState(true);
    const [preOrderSubmitted, setPreOrderSubmitted] = useState(false);
    const [productImageSrc, setProductImgSrc] = useState(null);

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
    
    const preOrderSent = () => {
        setPreOrderSubmitted(true);
        console.log("this is the state of preOrder Sent: ", preOrderSubmitted);
    }
    
    return (
        <div className='flex flex-col py-3 px-1 bg-white rounded-lg'>

            {preOrderSubmitted === false ?
            <>
                <div className='flex justify-start items-start font-medium text-[15px] border-slate-300 border-b mb-2 pb-2 pl-2'>
                Track This Item
                </div>
                {notifyMe === true ?
                <>
                    <div className='flex flex-col items-start pl-2 mb-2 pb-4 border-slate-200 border-b'>
                    <div className='flex flex-row items-center justify-between pb-1'>
                    <span className='text-[14px] font-light text-neutral-900'>Notify Email for</span>
                    <span className='uppercase pl-1 overflow-clip text-[14px]'>{companyName}</span>

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
                </>
                : null
                }
            

                <div className='flex flex-row justify-start p-1'>
                <picture className='w-20 h-20 bg-black'></picture>
                <div className='flex flex-col mx-3'>
                    <span className='font-bold uppercase'>{productName}</span>
                    <span className='uppercase'>{companyName}</span>
                    <div className='flex flex-row'>
                    <span className='font-medium mr-2'>Quantity: </span>
                    <span>1</span> 
                    </div>
                </div>
                
                </div>
            
                <div className='flex flex-col items-center justify-center p-1'>
                <div className='relative flex flex-col items-end'>
                    <button className='w-60 h-8 bg-green-500 rounded-sm flex justify-center items-center' onClick={preOrderSent}>
                    <span className='text-white font-semibold text-[14px]'>"Pre-Order" Item</span>
                    </button>
                    <button className='text-xs text-blue-500 underline' onClick={() => {}}>Not detected?</button>
                </div>
                </div>
            </>
            :
            <div className='flex flex-col justify-center'>
            <span className='font-medium text-[14px] origin-left transition-transform duration-300 ease-out'>Tracking Confirmed!</span>
            <div>
                Look at ya damn notifications on your phone
                Arigato!
            </div>

            </div> 
            }
        </div>
    );
}