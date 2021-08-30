var postcss = require('postcss');
var selectorParser = require('postcss-selector-parser');

var addPrefix = function addPrefix(prefix) {
  return function (selectors) {
    selectors.each(function (selector) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = selector.nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          if (node.type === 'class' && typeof node.parent.nodes[0] !== 'string') {
            node.replaceWith('' + node.spaces.before + prefix + ' .' + node.value);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
  };
};

module.exports = function (css) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.scoped';

  var ast = postcss.parse(css);
  ast.walkRules(function (rule) {
    rule.selector = selectorParser(addPrefix(prefix)).process(rule.selector).result;
  });

  return ast.toString();
};
