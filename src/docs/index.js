import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import * as icons from '../../dist/esm';

const iconsList = {};

window.ICONS.forEach(({ id, componentName }) => {
    iconsList[id] = {
        Icon: icons[componentName],
        componentName
    };
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<App/>);

function App() {
    const [query, setQuery] = useState('');

    return (
        <div>
            {
                Object.entries(iconsList)
                    .filter(([iconName]) => iconName.indexOf(query) !== -1)
                    .map(([iconName, { Icon, componentName }]) => (
                        <a
                            key={iconName}
                            href={`#${iconName}`}
                        >
                            <Icon />
                            <div className='icon-name'>
                                {iconName}
                            </div>
                        </a>
                    ))
            }
        </div>
    );
}
