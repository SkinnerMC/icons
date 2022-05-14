import React, { PropsWithChildren } from 'react';

export interface IIconSettings {
    classPrefix?: string;
    globalClasses?: boolean;
}

export const IconSettingsContext = React.createContext<IIconSettings>({
    classPrefix: '',
    globalClasses: true
});

export function IconSettings({ children, ...settings }: PropsWithChildren<IIconSettings>): JSX.Element {
    const { classPrefix, globalClasses } = settings;

    const context = React.useMemo(() => (
        settings
    ), [classPrefix, globalClasses]);

    return (
        <IconSettingsContext.Provider value={context}>
            {children}
        </IconSettingsContext.Provider>
    );
}
