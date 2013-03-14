# DOMinate
[![Build Status](https://travis-ci.org/ForbesLindesay/DOMinate-Server.png)](https://travis-ci.org/ForbesLindesay/DOMinate-Server)
[![Dependency Status](https://gemnasium.com/ForbesLindesay/DOMinate.png)](https://gemnasium.com/ForbesLindesay/DOMinate)

  Generate html from a simple array based JavaScript representation

## Installation

    $ npm install dominate

## Example

```javascript
var DOMinate = require('dominate');
DOMinate(
    ['div',
      ['h1#logo', 'Static Example', {style:'color:blue'}],
      ['p','some example text'],
      ['ul', {id:'list', class:'bullets'},
        ['li', 'item1'],
        ['li.active', 'item2'],
        ['li',
          ['a', 'item3', {href: '#'}]
        ]
      ]
    ]
  );
```

On the server side this returns the string:

```html
<div><h1 id="logo" style="color:blue">Static Example</h1><p>some example text</p><ul id="list" class="bullets"><li>item1</li><li class="active">item2</li><li><a href="#">item3</a></li></ul></div>
```

On the client side it returns the DOM element

```html
<div>
  <h1 id="logo" style="color:blue">Static Example</h1>
  <p>some example text</p>
  <ul id="list" class="bullets">
    <li>item1</li>
    <li class="active">item2</li>
    <li><a href="#">item3</a></li>
  </ul>
</div>
```

## License

  MIT