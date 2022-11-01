function getElementById(id) {
  return document.getElementById(id);
}
function getElementByClassName(className) {
  return document.getElementsByClassName(className);
}

function addEvent(element, event, callback) {
  element.addEventListener(event, callback);
}

const button1 = getElementById("button1");
const button2 = getElementById("button2");
const input1 = getElementById("input1");
const input2 = getElementById("input2");
const imgInfo = getElementById("imginfo");

addEvent(button1, "click", () => {
  const files = [...input1.files];
  const imgFiles = files.filter((file) => file.type.includes("image"));
  if (imgFiles.length === 0) {
    alert("没有图片文件");
    return;
  }
  const formData = new FormData();
  imgFiles.forEach((img) => formData.append(img.webkitRelativePath, img));
  fetch("/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log({ res });
      if (res.code === 0) {
        alert("上传成功");
      }
    });
});
addEvent(button2, "click", () => {
  if (input2.files.length === 0) {
    alert("没有图片文件");
    return;
  }
  const formData = new FormData();
  formData.append("img", input2.files[0]);
  fetch("/test", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.code === 0) {
        imgInfo.innerText = JSON.stringify(res.data);
      }
    });
});
