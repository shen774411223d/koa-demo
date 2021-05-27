const list = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]

const diffList = (data, editData, index) => {
  const prevData = data.slice(0, index)
  const nextData = data.slice(index + 1)
  const currentData = {...data[index], ...editData}
  return [...prevData, currentData, ...nextData]
}

console.log(diffList(list, {id: 10086}, 2))