import { ElementType, HTMLAttributes, RefCallback, RefObject, useContext } from 'react';
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';

import { IIconSettings, IconSettingsContext } from '../IconSettings';

import { addSpriteSymbol } from '../../utils';
import { useIsomorphicLayoutEffect } from '../../hooks';

export interface IconProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Icon width
     */
    width?: number;
    /**
     * Icon height
     */
    height?: number;
    /**
     * Icon view box
     */
    viewBox?: string;
    /**
     * Icon fill color
     */
    fill?: string;
    /**
     * Ref
     */
    getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
    /**
     * Root component
     */
    Component?: ElementType;
}

export function Icon({ width, height, viewBox, id, className = '', style, fill, getRootRef, Component = 'div', ...restProps }: IconProps): JSX.Element {
    const size = Math.max(width, height);

    const iconSettings = useContext(IconSettingsContext);

    const iconClassName = classNameBuilder(['Icon', `Icon--${size}`, `Icon--w-${width}`, `Icon--h-${height}`, `Icon--${id}`], iconSettings);

    return (
        <Component
            role='presentation'
            {...restProps}
            ref={getRootRef}
            className={`${iconClassName} ${className}`}
            style={{
                ...style,
                width,
                height
            }}
        >
            <svg
                viewBox={viewBox}
                width={width}
                height={height}
                style={{
                    display: 'block'
                }}
            >
                <use
                    xlinkHref={`#${id}`}
                    style={{
                        fill: 'currentColor',
                        color: fill
                    }}
                />
            </svg>
        </Component>
    );
}

export function createIconRoot<P extends IconProps = IconProps>(
    componentName: string,
    id: string,
    viewBox: string,
    content: string,
    width: number,
    height: number
): (props: P) => JSX.Element {
    let isMounted = false;

    const mountIcon = () => {
        if (isMounted) {
            return;
        }

        addSpriteSymbol(
            new BrowserSymbol({
                id,
                viewBox,
                content
            })
        );

        isMounted = true;
    }

    function IconWrapper<P extends IconProps = IconProps>(props: P): JSX.Element {
        useIsomorphicLayoutEffect(mountIcon, []);

        return (
            <Icon
                {...props}
                viewBox={viewBox}
                id={id}
                width={!isNaN(props.width) ? +props.width : width}
                height={!isNaN(props.height) ? +props.height : height}
            />
        );
    }

    IconWrapper.mountIcon = mountIcon;
    IconWrapper.displayName = componentName;

    return IconWrapper;
}

function classNameBuilder(fragments: string[], { classPrefix, globalClasses }: IIconSettings) {
    return fragments.map((fragment) => (
        `${classPrefix}${classPrefix || globalClasses ? fragment : ''}`
    ))
        .join(' ');
}
