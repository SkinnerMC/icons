import BrowserSprite from 'svg-baker-runtime';
import BrowserSpriteSymbol from 'svg-baker-runtime/src/browser-symbol';

import { canUseDOM } from "./canUseDOM";

let browserSprite: BrowserSprite | null;

if (canUseDOM) {
    const spriteId = '__SVG_SPRITE_NODE__';

    browserSprite = new BrowserSprite({
        attrs: {
            // @ts-ignore
            id: spriteId
        }
    });

    const mountSptite = () => {
        document.removeEventListener('DOMContentLoaded', mountSptite);
        
        const spriteNode = document.getElementById(spriteId);

        if (spriteNode) {
            browserSprite.attach(spriteNode);

            return;
        }

        browserSprite.mount();
    };

    if (document.querySelector('body')) {
        mountSptite();
    } else {
        document.addEventListener('DOMContentLoaded', mountSptite);
    }
} else {
    browserSprite = null;
}

export function addSpriteSymbol(symbol: BrowserSpriteSymbol) {
    if (!browserSprite) {
        return;
    }

    browserSprite.add(symbol);
}
