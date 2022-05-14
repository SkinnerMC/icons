import { createContext, useMemo, PropsWithChildren } from 'react';

export interface IIconSettings {
    classPrefix?: string;
    globalClasses?: boolean;
}

export const IconSettingsContext = createContext<IIconSettings>({
    classPrefix: '',
    globalClasses: true
});

export function IconSettings({ children, ...settings }: PropsWithChildren<IIconSettings>): JSX.Element {
    const { classPrefix, globalClasses } = settings;

    const context = useMemo(() => (
        settings
    ), [classPrefix, globalClasses]);

    return (
        <IconSettingsContext.Provider value={context}>
            {children}
        </IconSettingsContext.Provider>
    );
}
