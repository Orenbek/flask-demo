function getElementById(id) {
  return document.getElementById(id);
}
function getElementByClassName(className) {
  return document.getElementsByClassName(className);
}

function addEvent(element, event, callback) {
  element.addEventListener(event, callback);
}

const button1 = getElementById('button1');
const button2 = getElementById('button2');
const input1 = getElementById('input1');
const input2 = getElementById('input2');

addEvent(button1, 'click', () => {});
addEvent(button2, 'click', () => {});
console.log(button1, button2, input1, input2);
