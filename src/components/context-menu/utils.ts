//获取可视区宽度
export const winWidth = () => {
  return document.documentElement.clientWidth || document.body.clientWidth;
};

//获取可视区高度
export const winHeight = () => {
  return document.documentElement.clientHeight || document.body.clientHeight;
};

interface INode {
  nodeName: string;
  classList: string[];
  className: string;
  id: string;
  parentNodeName: string;
  parentNodeClassList: string[];
}
export const generateELementNodeMap = (
  element: HTMLElement,
  nodeList: INode[] = [],
) => {
  if (element.id && !nodeList.find((itemNode) => itemNode.id === element.id)) {
    nodeList.push({
      nodeName: element.nodeName,
      classList: element.classList
        ? (Array.from(element.classList) as string[])
        : element.classList,
      className: element.className,
      id: element.id,
      parentNodeName: '',
      parentNodeClassList: [],
    });
  }
  const childNodes = element.childNodes;

  childNodes?.forEach((itemNode: any) => {
    const obj = {
      nodeName: itemNode.nodeName,
      classList: itemNode.classList
        ? (Array.from(itemNode.classList) as string[])
        : itemNode.classList,
      id: itemNode.id,
      className: itemNode.className,
      value: itemNode.value,
      parentNodeName: element.nodeName,
      parentNodeClassList: element.classList
        ? (Array.from(element.classList) as string[])
        : element.classList,
    };
    nodeList.push(obj);
    if (itemNode.childNodes) {
      return generateELementNodeMap(itemNode, nodeList);
    }
  });
  return nodeList;
};

export const findNode = (currentNode: HTMLElement, nodeList: INode[]) => {
  const nodeName = currentNode.nodeName;
  const classList = currentNode.classList
    ? Array.from(currentNode.classList)
    : currentNode.classList;
  const id = currentNode.id;

  const findResult = nodeList.find((itemNode) => {
    if (!itemNode.classList?.join(',')?.includes(classList?.join(','))) {
      return null;
    } else if (
      itemNode.nodeName === nodeName &&
      ((itemNode.className &&
        currentNode.className &&
        itemNode.classList?.join(',')?.includes(classList?.join(','))) ||
        itemNode.id === id)
    ) {
      return itemNode;
    } else if (itemNode.id === id) {
      return itemNode;
    } else {
      return null;
    }
  });

  return findResult;
};

export const findChildren = (currentNode: any, childrens: any): any => {
  if (!Array.isArray(childrens)) {
    if (
      (currentNode.innerText === currentNode.innerHTML &&
        currentNode.innerText) === childrens.props?.children
    ) {
      return currentNode;
    }
    return null;
  }

  return childrens?.find((itemChild: any) => {
    const children = itemChild.props?.children;

    if (
      children &&
      typeof children === 'string' &&
      children === currentNode.innerText &&
      currentNode.innerText === currentNode.innerHTML
    ) {
      return itemChild;
    } else if (children && Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        return findChildren(currentNode, children);
      }
    } else if (
      itemChild.type === 'img' &&
      itemChild.props.src === (currentNode as any).currentSrc
    ) {
      return itemChild;
    } else {
      return null;
    }
  });
};
