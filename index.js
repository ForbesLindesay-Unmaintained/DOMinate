module.exports = DOMinate;

function DOMinate(DOMfragment) {
  //`tagName#tagID.classA.classB.classC`
  var sugarString = DOMfragment[0];
  var temp;
  var element = {};
  element.tag = sugarString.match(/^\w+/)[0];
  element.attributes = {};
  element.children = [];
  if(temp = sugarString.match(/#([\w\-]+)/))
    element.attributes.id = temp[1];

  if(temp = sugarString.match(/\.[\w\-]+/g))
    element.attributes.class = temp.join(' ').replace(/\./g, '');

  for (var i = 1; i < DOMfragment.length; i++) {
    if (typeof DOMfragment[i] == 'string') {
      element.children.push(DOMfragment[i]);
    } else if (Array.isArray(DOMfragment[i])) {
      element.children.push(DOMinate(DOMfragment[i]));
    } else {
      for (var property in DOMfragment[i]) {
        element.attributes[property] = DOMfragment[i][property];
      }
    }
  }
  var res = ['<', element.tag];
  Object.keys(element.attributes)
    .forEach(function (attribute) {
      res.push(' ', attribute, '="', element.attributes[attribute], '"');
    });
  res.push('>');
  for (var i = 0; i < element.children.length; i++) {
    res.push(element.children[i]);
  }
  res.push('</', element.tag, '>');
  return res.join('');
}
