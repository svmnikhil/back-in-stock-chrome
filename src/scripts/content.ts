
(function() {
  const selectors = ['button', 'span', 'input[type="button"]', 'input[type="submit"]'];
  const elements = document.querySelectorAll(selectors.join(', '));

  const searchTexts = ["notify me", "notify me when available", "join waitlist", "out of stock", "sold out"];
  const foundElements = [];

  elements.forEach(element => {
      const textContent = element.textContent.toLowerCase().trim();
      // Ensure valueContent is an empty string if element.value is undefined
      const valueContent = (element.value || '').toLowerCase().trim();
      if (searchTexts.some(searchText => textContent.includes(searchText) || valueContent.includes(searchText))) {
        foundElements.push(element);
        console.log(element);
      }
  });

  console.log("hello world");

})();


