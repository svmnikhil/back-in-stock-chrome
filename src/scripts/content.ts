
(async function() {
  const selectors = ['button', 'span', 'input[type="button"]', 'input[type="submit"]'];
  const elements = document.querySelectorAll(selectors.join(', '));
  var productImageSrc = null;
  var productName = "";
  var companyName = "";
  // var response = null;

  const searchTexts = ["notify me", "notify me when available", "join waitlist", "out of stock", "sold out"];
  const foundElements = [];

  elements.forEach(element => {
      const textContent = element.textContent.toLowerCase().trim();
      // Ensure valueContent is an empty string if element.value is undefined
      const valueContent = (element.value || '').toLowerCase().trim();
      if (searchTexts.some(searchText => textContent.includes(searchText) || valueContent.includes(searchText))) {
        foundElements.push(element);
        // console.log(element);
      }
  });

  if (foundElements.length > 0) {
    findLargestProductImage().then(async productImageSrc => {
      [companyName, productName] = findProductName();
      const data = {
        productImage: productImageSrc, 
        productName: productName,
        companyName: companyName,
        productUrl: window.location.href
      }
      console.log(data);
      // if data contains a valid productImgSrc. Then we qualify it is a real out of stock item. 
      if (data.productImage != null) {
        try {
          const response = await new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(data, (response) => {
              if (chrome.runtime.lastError) {
                // Handle any error that might have occurred during sendMessage
                reject(chrome.runtime.lastError);
              }
              resolve(response);
            });
          });
      
          console.log("Response from background script:", response);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      }
    }).catch(async error => {

      try {
        const response = await new Promise((resolve, reject) => {
          chrome.runtime.sendMessage(null, (response) => {
            if (chrome.runtime.lastError) {
              // Handle any error that might have occurred during sendMessage
              reject(chrome.runtime.lastError);
            }
            resolve(response);
          });
        });
        console.log("Response from background script:", response);
        } catch (error) {
          console.error("Error sending message:", error);
        }

    });    
  }

})();

function findLargestProductImage() {
  return new Promise((resolve, reject) => {
    const setupObserver = () => {
      let largestImage = null;
      let maxArea = 0;

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const area = img.naturalWidth * img.naturalHeight;
            if (area > maxArea && area > 90000) {
              largestImage = img;
              maxArea = area;
            }
          }
        });

        // If a largest image is found, resolve the promise with its src
        if (largestImage) {
          observer.disconnect(); // Stop observing once the largest image is found
          resolve(largestImage.src);
        }
      }, { rootMargin: '0px', threshold: 0.01 });

      // Observe all images on the page
      document.querySelectorAll('img').forEach(img => {
        observer.observe(img);
      });

      // Provide a way to reject the promise if necessary, e.g., timeout
      setTimeout(() => {
        observer.disconnect(); // Ensure no memory leaks
        if (!largestImage) {
          reject(null);
        }
      }, 10000); // Timeout after 10 seconds, adjust as needed
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupObserver);
    } else {
      setupObserver(); // DOMContentLoaded has already fired
    }
  });
}


function findProductName() {
  // Function to extract domain name from URL
  const extractDomainName = (url) => {
    const matches = url.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
    let domain = matches && matches[1]; // domain will be null if no match is found
    // Remove www if it exists
    domain = domain && domain.replace('www.', '');
    //remove top level domain 
    if (domain) {
      const lastDotIndex = domain.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        domain = domain.substring(0, lastDotIndex);
      }
    }
    //console.log(domain);
    return domain;
  };

  // Attempt to use Schema.org metadata
  const schemaOrgData = document.querySelector('script[type="application/ld+json"]');
  let productName = "";
  if (schemaOrgData) {
    try {
      const data = JSON.parse(schemaOrgData.textContent);
      if (data.name) {
        productName = data.name;
      }
    } catch (e) {
      console.error('Error parsing Schema.org data:', e);
    }
  }

  // If productName is still empty, check for common semantic tags and attributes
  if (!productName) {
    const potentialSelectors = [
      'meta[property="og:title"]', // Open Graph title
      'meta[name="twitter:title"]', // Twitter title
      '[itemprop="name"]', // Schema.org itemprop
      'h1', 'h2', '.product-name', '.product-title', '#productTitle', '#productName'
    ];

    for (let selector of potentialSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        const content = element.content || element.textContent;
        if (content) {
          productName = content.trim();
          break; // Break the loop once a productName is found
        }
      }
    }
  }

  // Validate productName against the domain name
  const companyName = extractDomainName(window.location.href);
  if (companyName && productName.replace(/\s+/g, '').toLowerCase().includes(companyName.toLowerCase())) {
    // Fallback to document title if productName is similar to the domain name
    productName = document.title;
  } else if (!productName) {
    // If no productName has been set by now, also fallback to document title
    productName = document.title;
  }

  return [companyName, productName];
}


// puppeteer "add to bag, add to cart, buy, checkout"
