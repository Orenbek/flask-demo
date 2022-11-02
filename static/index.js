export function getElementById(id) {
  return document.getElementById(id);
}
export function getElementByClassName(className) {
  return document.getElementsByClassName(className);
}

export function addEvent(element, event, callback) {
  element.addEventListener(event, callback);
}
export function createNode(element, options = {}, childNode) {
  const node = document.createElement(element);
  Object.keys(options).forEach(key => {
    node[key] = options[key];
  });
  if (childNode) {
    if (Array.isArray(childNode)) {
      childNode.forEach(child => {
        node.appendChild(child);
      });
    } else {
      node.appendChild(childNode);
    }
  }
  return node;
}

const button1 = getElementById('button1');
const button2 = getElementById('button2');
const input1 = getElementById('input1');
const input2 = getElementById('input2');
const imgInfo = getElementById('imginfo');

addEvent(button1, 'click', () => {
  const files = [...input1.files];
  const imgFiles = files.filter(file => file.type.includes('image'));
  if (imgFiles.length === 0) {
    alert('没有图片文件');
    return;
  }
  const formData = new FormData();
  imgFiles.forEach(img => formData.append(img.webkitRelativePath, img));
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(res => {
      if (res.code === 0) {
        alert('上传成功');
      }
    });
});
addEvent(button2, 'click', () => {
  if (input2.files.length === 0) {
    alert('没有图片文件');
    return;
  }
  const formData = new FormData();
  formData.append('img', input2.files[0]);
  fetch('/imginfo', {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(res => {
      if (res.code === 0) {
        imgInfo.innerText = JSON.stringify(res.data);
      }
    });
});
