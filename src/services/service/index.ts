import formatUnicorn from "format-unicorn/safe";
import { generateQueries } from "../query";
import { inDevEnvironment } from "../../helpers/variable/env-variables";

interface LogRequestParams {
    baseURL?: string;
    method?: string;
    url: string;
}

export const logRequestedUrl = ({ baseURL, method, url }: LogRequestParams): void => {
    if (baseURL && inDevEnvironment) {
        const fullUrl = baseURL + url;
        const str = `${method?.toUpperCase()} ${fullUrl}`;
        if (false) {
            console.log("\x1b[36m%s\x1b[0m", str);
        } else {
            console.log(`%c${str}`, "color: #16ffff");
        }
    }
};

export const generateFormData = (obj: Record<string, any>): { data: FormData; headers: Record<string, string> } => {
    const data = new FormData();
    Object.entries(obj).forEach(([key, value]) => {
        if (value) {
            data.append(key, value);
        }
    });
    return { data, headers: { "Content-Type": "multipart/form-data" } };
};

export const generateFormDataList = (obj: Record<string, any>[]): { data: FormData; headers: Record<string, string> } => {
    const data = new FormData();
    obj.forEach((item) =>
        Object.entries(item).forEach(([key, value]) => {
            data.append(key, value);
        })
    );
    return { data, headers: { "Content-Type": "multipart/form-data" } };
};

interface GetRouteParams {
    route: string;
    query?: Record<string, any>;
    [key: string]: any;
}

export const getRoute = ({ route, query, ...rest }: GetRouteParams): string => {
    let url = route;

    if (Object.keys({ ...rest }).length) {
        url = formatUnicorn(route, { ...rest });
    }

    if (query) {
        const queries = generateQueries(query);
        url = url + queries;
    }

    return url;
};
