const getQuery = (value: string | number | undefined, key: string): string | undefined => {
    if (typeof value !== "undefined" && key) {
        return `${key}=${value}`;
    }
    return undefined;
};

interface Queries {
    page?: string | number;
    limit?: string | number;
    order?: string;
    sort?: string;
    q?: string;
    [key: string]: any;
}

export const generateQueries = (queries: Queries = {}): string => {
    const { page, limit, order, sort, q, ...other } = queries;
    const formattedQueries = {
        page: getQuery(page, "page"),
        limit: getQuery(limit, "per_page"),
        order: getQuery(order, "order"),
        sort: getQuery(sort, "sort"),
        q: getQuery(q, "q"),
    };
    return generateQueryString(formattedQueries, other);
};

interface FormattedQueries {
    [key: string]: string | undefined;
}

const generateQueryString = (queries: FormattedQueries, other: Record<string, any>): string => {
    let query = "?";

    const arrayQueries: string[] = [];

    Object.values(queries).forEach((value, i) => {
        const joiner = i > 0 ? "&" : "";
        if (typeof value !== "undefined") {
            query = query + joiner + value;
        }
    });

    Object.entries({ ...other }).forEach(([key, value]) => {
        const val = value.toString();
        const isArray = Boolean(arrayQueries.find((query) => query === key));
        if (!isArray && Boolean(val)) {
            query = query + `&${key}=${value}`;
        } else if (isArray && Boolean(value)) {
            const generated = generateArrayQuery(key, value);
            query = query + generated;
        }
    });

    return query;
};

const generateArrayQuery = (key: string, value: string | number[]): string => {
    let query = "";
    const splitted = value.toString().split(",");
    splitted.forEach((val, i) => {
        query = query + `&${key}[${i}]=${val}`;
    });
    return query;
};

export const generateArrayQueryObject = (queries: Record<string, any>): Record<string, any> => {
    let data: Record<string, any> = {};
    Object.entries(queries).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                data = {
                    ...data,
                    [`${key}[${index}]`]: item,
                };
            });
        } else {
            data = {
                ...data,
                [key]: value,
            };
        }
    });

    return data;
};
