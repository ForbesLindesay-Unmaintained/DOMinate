module.exports = DOMinate;

/**
 * Parse a DOMfragment in JsonML and return the resulting DOM element.
 * 
 * @param {Array}       DOMfragment Array containing the DOMfragment in JsonML
 * @param {String}      namespace   Optional namespace (defaults to xhtml)
 * @return {DOMElement}             The resulting DOM element
 */
function DOMinate(DOMfragment, namespace) {
  namespace = namespace || 'http://www.w3.org/1999/xhtml';

  if (typeof DOMfragment[0] == 'string')
    DOMfragment[0] = createElement(namespace, DOMfragment[0]);

  for (var i = 1; i < DOMfragment.length; i++) {
    if (typeof DOMfragment[i] == 'string') {
      DOMfragment[0].appendChild(document.createTextNode(DOMfragment[i]));
    } else if (typeof DOMfragment[i].pop == 'function') { //if (DOMfragment[i] is an Array)
      DOMfragment[0].appendChild(DOMinate(DOMfragment[i], namespace));
    } else {
      for (var property in DOMfragment[i]) {
        DOMfragment[0].setAttribute(property, DOMfragment[i][property])
      }
    }
  }

  return DOMfragment[0]
}

// create DOM element from syntax sugar string (tagName#tagID.classA.classB.classC)
function createElement(namespace, sugarString) {
  var temp;

  var element = document.createElementNS(namespace, sugarString.match(/^\w+/)[0]);

  if(temp = sugarString.match(/#([\w\-]+)/))
    element.id = temp[1];

  if(temp = sugarString.match(/\.[\w\-]+/g))
    element.setAttribute('class', temp.join(' ').replace(/\./g, ''));

  return element;
}