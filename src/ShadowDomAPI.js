// export interface DOMAPI {
//   createElement: (tagName: any) => HTMLElement;
//   createElementNS: (namespaceURI: string, qualifiedName: string) => Element;
//   createTextNode: (text: string) => Text;
//   createComment: (text: string) => Comment;
//   insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node | null) => void;
//   removeChild: (node: Node, child: Node) => void;
//   appendChild: (node: Node, child: Node) => void;
//   parentNode: (node: Node) => Node;
//   nextSibling: (node: Node) => Node;
//   tagName: (elm: Element) => string;
//   setTextContent: (node: Node, text: string | null) => void;
//   getTextContent: (node: Node) => string | null;
//   isElement: (node: Node) => node is Element;
//   isText: (node: Node) => node is Text;
//   isComment: (node: Node) => node is Comment;
// }


const Element = function (tag, type = 'c') {
  this.tag = type[0] === 'c'? tag: null
  this.attrs = {}
  this.children = []
  this.parent = null
  this.type = type
  if (type[0] === 't') {
    this.attrs['text'] = tag
  }
  if (type[0] === '!') {
    this.attrs['comment'] = tag
  }
  this.setAttribute = (attr, value) => {
    console.log('setAttribute', attr, value)
    this.attrs[attr] = value
  };
  this.addEventListener = (event, func) => {
    console.log('addEventListener', event, func)
  }
  this.removeEventListener = (event, func) => {
    console.log('removeEventListener', event, func)
  }
  this.insertBefore = (child, reference) => {
    console.log('insertBefore', child, reference)
    if (!reference) {
      this.children.push(child)
      child.parent = this
      return
    }
    let index = this.children.indexOf(reference);
    if (index !== -1) {
      this.children.splice(index, 0, child)
      child.parent = this
    }
  }
  this.removeChild = (child) => {
    let index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null
    }
  }
  this.appendChild = (child) => {
    this.children.push(child)
    child.parent = this
    console.log(this)
  }
  this.findNextSibling = (child) => {
    let index = this.children.indexOf(child);
    if (index !== -1 && this.children.length > (index + 1)) {
      return this.children[index + 1]
    }
  }
}

export const shadowDomApi = {
  createElement: (tag) => {
    console.log('createElement', tag);
    return new Element(tag)
  },
  createTextNode: (text) => {
    console.log('createTextNode', text);
    return new Element(text, 't')
  },
  createComment: (text) => {
    console.log('createComment', text);
    return new Element(text, '!')
  },
  insertBefore: (parent, child, sibling) => {
    console.log('insertBefore', parent, child, sibling);
    parent.insertBefore(child, sibling)
  },
  removeChild: (parent, child) => {
    console.log('removeChild', parent, child);
    parent.removeChild(child)
  },
  appendChild: (parent, child) => {
    console.log('appendChild', parent, child);
    return parent.appendChild(child)
  },
  parentNode: (node) => {
    console.log('parentNode');
    return node.parent;
  },
  nextSibling: (node) => {
    console.log('nextSibling', node);
    return node.parent && node.parent.findNextSibling(node);
  },
  tagName: (node) => {
    console.log('tagName', node);
    return 'ROOT';
  },
  setTextContent: (node, text) => {
    console.log('setTextContent', node, text);
  },
  getTextContent: (node) => {
    console.log('getTextContent', node);
  },
  isElement: (node) => {
    console.log('isElement', node);
  },
  isText: (node) => {
    console.log('isText', node);
  },
  isComment: (node) => {
    console.log('isComment', node);
    return false
  },
};
export {Element}
export default shadowDomApi;
