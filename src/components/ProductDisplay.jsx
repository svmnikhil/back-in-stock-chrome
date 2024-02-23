import '../App.css';


export default function ProductDisplay({data, preOrderSubmitted}) {

    const preOrderSent = () => {
        preOrderSubmitted = true;
        console.log("this is the state of preOrder Sent: ", preOrderSubmitted);
    }
    
    return (
        <div>
            <div className='flex flex-row justify-start p-1'>
                <img className='w-20 h-20 bg-black' src={data.productImageSrc} alt="Product"/>
                <div className='flex flex-col mx-3'>
                    <span className='font-bold uppercase'>{data.productName}</span>
                    <span className='uppercase'>{data.companyName}</span>
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
        </div>
        
    )
}