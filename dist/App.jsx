import { useState, useEffect } from 'react';
import './App.css';
import NotifyEmail from './components/NotifyEmail';
import ProductDisplay from './components/ProductDisplay';
import OrderSent from './components/OrderSent';
import NoProduct from './components/NoProduct';

function App() {
  const [mail, setEmail] = useState("blah-blah@xyz.com");
  const [data, setData] = useState({ productName: '', productImageSrc: '', companyName: '' });
  const [notifyMe, setNotifyMe] = useState(true); //passing this data from the webpage figure out the userflow
  const [preOrderSubmitted, setPreOrderSubmitted] = useState(false);
  const [noProductDetected, setNoProductDetected] = useState(false);
 

  useEffect(() => {
    // Define an async function inside the useEffect to use await
    const fetchData = async () => {
      try {
        // Get the current active tab
        const queryOptions = { active: true, currentWindow: true };
        const [currentTab] = await chrome.tabs.query(queryOptions);
  
        if (currentTab.id != null) {
          chrome.storage.local.get(['dataObj'], function(result) {
            if (result.dataObj && result.dataObj.tabId === currentTab.id) {
              setData({
                productName: result.dataObj.productName || '',
                productImageSrc: result.dataObj.productImage || '',
                companyName: result.dataObj.companyName || ''
              });
            } else {
              setNoProductDetected(true);
            }
          });
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []); 

  return (
    <div className='flex flex-col py-3 px-1 bg-white rounded-lg'>
      {
        noProductDetected ? <NoProduct />
        : preOrderSubmitted ? <OrderSent />
        :  <>
            <div className='flex justify-start items-start font-medium text-[15px] border-slate-300 border-b mb-2 pb-2 pl-2'>
              Track This Item
            </div>
            {notifyMe ? <NotifyEmail mail={mail} data={data}/> : null }
            <ProductDisplay data={data} preOrderSubmitted={preOrderSubmitted}/>
          </>
      }
    </div>
  );
}

export default App;
