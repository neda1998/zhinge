import { useMemo } from 'react';

const useClassNames = (...args: any) => {
    return useMemo(() => {
        const classes: string[] = [];

        args.forEach((arg: any) => {
            if (typeof arg === 'string') {
                classes.push(arg);
            } else if (Array.isArray(arg)) {
                classes.push(...arg);
            } else if (typeof arg === 'object' && arg !== null) {
                Object.keys(arg).forEach(key => {
                    if (arg[key]) {
                        classes.push(key);
                    }
                });
            }
        });

        return classes.join(' ');
    }, [args]);
};

export default useClassNames;
