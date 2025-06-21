// Mock the Dash docset API. Useful for testing in the browser console.

window.$ = fetch('https://code.jquery.com/jquery-3.7.1.min.js').then(res => res.text()).then(text => eval(text))
window.dashDoc = { addEntry: console.log }
