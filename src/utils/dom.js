function getClassName (dom, className) {
  let _className = dom.className;
  if (_className === 'win10-warrper') {
    return false;
  } else if (className === _className) {
    return true;
  } else {
    return getClassName(dom.parentNode, className);
  }
}

function getWinName (dom, className) {
  let _className = dom.className;
  if (_className === className) {
    return dom.getAttribute('data-name');
  } else {
    return getWinName(dom.parentNode, className);
  }
}

function getDom (dom, className) {
  let _className = dom.className;
  if (_className === className) {
    return dom;
  } else {
    return getDom(dom.parentNode, className);
  }
}

export {getClassName, getDom, getWinName};
