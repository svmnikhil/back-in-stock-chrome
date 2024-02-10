/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./src/scripts/content.ts ***!
  \********************************/

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



/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudFNjcmlwdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJlLW9yZGVyLy4vc3JjL3NjcmlwdHMvY29udGVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbigpIHtcbiAgY29uc3Qgc2VsZWN0b3JzID0gWydidXR0b24nLCAnc3BhbicsICdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJywgJ2lucHV0W3R5cGU9XCJzdWJtaXRcIl0nXTtcbiAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycy5qb2luKCcsICcpKTtcblxuICBjb25zdCBzZWFyY2hUZXh0cyA9IFtcIm5vdGlmeSBtZVwiLCBcIm5vdGlmeSBtZSB3aGVuIGF2YWlsYWJsZVwiLCBcImpvaW4gd2FpdGxpc3RcIiwgXCJvdXQgb2Ygc3RvY2tcIiwgXCJzb2xkIG91dFwiXTtcbiAgY29uc3QgZm91bmRFbGVtZW50cyA9IFtdO1xuXG4gIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBjb25zdCB0ZXh0Q29udGVudCA9IGVsZW1lbnQudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICAvLyBFbnN1cmUgdmFsdWVDb250ZW50IGlzIGFuIGVtcHR5IHN0cmluZyBpZiBlbGVtZW50LnZhbHVlIGlzIHVuZGVmaW5lZFxuICAgICAgY29uc3QgdmFsdWVDb250ZW50ID0gKGVsZW1lbnQudmFsdWUgfHwgJycpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuICAgICAgaWYgKHNlYXJjaFRleHRzLnNvbWUoc2VhcmNoVGV4dCA9PiB0ZXh0Q29udGVudC5pbmNsdWRlcyhzZWFyY2hUZXh0KSB8fCB2YWx1ZUNvbnRlbnQuaW5jbHVkZXMoc2VhcmNoVGV4dCkpKSB7XG4gICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICB9XG4gIH0pO1xuXG4gIGNvbnNvbGUubG9nKFwiaGVsbG8gd29ybGRcIik7XG5cbn0pKCk7XG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9