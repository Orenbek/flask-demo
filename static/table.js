import { getElementById, createNode, addEvent } from 'index';

const table = getElementById('table');
const button3 = getElementById('button3');
const tableBody = document.querySelector('#table tbody');

export function createTableRow({ name }) {
  // <tr class="table-tr">
  //   <td class="table-td"><div class="table-cell">test</div></td>
  //   <td class="table-td">
  //     <div class="table-cell"><button class="table-th-button" type="button">删除</button></div>
  //   </td>
  // </tr>
  // 生成以上结构的node
  const btnNode = createNode('button', {
    className: 'table-th-button',
    type: 'button',
    innerText: '删除',
    ['data-name']: name,
  });
  btnNode.setAttribute('data-name', name);
  return createNode('tr', { className: 'table-tr' }, [
    createNode('td', { className: 'table-td' }, createNode('div', { className: 'table-cell', innerText: name })),
    createNode('td', { className: 'table-td' }, createNode('div', { className: 'table-cell' }, btnNode)),
  ]);
}

function getTable() {
  tableBody.innerHTML = '';
  fetch('/getimgs')
    .then(res => res.json())
    .then(res => {
      if (res.code === 0) {
        const { data } = res;
        const rows = data.map(name => createTableRow({ name }));
        rows.forEach(row => tableBody.appendChild(row));
      }
    });
}

addEvent(button3, 'click', getTable);

addEvent(table, 'click', e => {
  const filename = e.target.dataset.name;
  const fomData = new FormData();
  fomData.append('path', filename);
  fetch('/delete', {
    method: 'POST',
    body: fomData,
  })
    .then(res => res.json())
    .then(res => {
      if (res.code === 0) {
        alert('删除成功');
        getTable();
      }
    });
});
