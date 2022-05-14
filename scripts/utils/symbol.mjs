import Compiler from 'svg-baker';

const compiler = new Compiler();

const createReactComponent = (symbol, componentName) => {
  const [,, width, height] = symbol.viewBox.split(' ');

  return `import { HTMLAttributes, RefCallback, RefObject } from 'react';
import { createIconRoot } from '../../components';

export interface ${componentName}Props extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
}

export default createIconRoot<${componentName}Props>(
  '${componentName}',
  '${symbol.id}',
  '${symbol.viewBox}',
  '${symbol.render()}',
  ${width},
  ${height}
);
`;
};

export function symbol({ content, id, componentName }) {
  return compiler.addSymbol({
    content,
    id,
    path: ''
  })
      .then((symbol) => (
          createReactComponent(symbol, componentName)
      ));
}
