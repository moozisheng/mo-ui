export const copyToClipBoard = (text: string) => {
  const ele = document.createElement('textarea')
  ele.innerText = text
  document.body.appendChild(ele)
  ele.select()
  document.execCommand('copy')
  ele.remove()
}