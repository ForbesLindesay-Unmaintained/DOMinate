var expect = require('expect.js');
var DOMinate = require('./');

describe('DOMinate(fragment)', function () {
  it('attaches to the first element', function () {
    var res = DOMinate(['div', ['div']]);
    expect(res).to.be('<div><div></div></div>');
  });

  it('recursively builds a DOM', function () {
    var res = DOMinate(
      ['div',
        ['p', 'test',
          ['a', '2']
        ]
      ]
    );
    expect(res).to.be('<div><p>test<a>2</a></p></div>');
  });

  it('sets properties when given an object', function () {
    var res = DOMinate(
      ['div', {
        id: 'important',
        class: 'test', // class is restricted word
        'data-info': 'none' // attribute with dash
      }]
    );
    expect(res).to.be('<div id="important" class="test" data-info="none"></div>')
  });

  it('supports id syntax-sugar', function () {
    var res = DOMinate(['div#test']);
    expect(res).to.be('<div id="test"></div>');
  });

  describe('syntax-sugar class', function () {

    it('works with just a class', function () {
      var res = DOMinate(['a.new']);
      expect(res).to.be('<a class="new"></a>');
    });

    it('works with a class and an id', function () {
      var res = DOMinate(['a#b.new']);
      expect(res).to.be('<a id="b" class="new"></a>');
    });

    it('works with class and id reversed', function () {
      var res = DOMinate(['a.new#b']);
      expect(res).to.be('<a id="b" class="new"></a>');
    });
  });
});
