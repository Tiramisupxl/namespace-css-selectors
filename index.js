const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');

const addPrefix = (prefix) => {
  return (selectors) => {
    selectors.each((selector) => {
      for (let node of selector.nodes) {
        if(node.type === 'class' &&  typeof node.parent.nodes[0] !== 'string') {
          node.replaceWith(
            `${node.spaces.before}${prefix} .${node.value}`
          );
        }
      }
    });
  };
};

module.exports = (css, prefix = '.scoped') => {
  const ast = postcss.parse(css);
  ast.walkRules((rule) => {
    rule.selector = selectorParser(addPrefix(prefix)).process(rule.selector).result;
  });

  return ast.toString();
};
