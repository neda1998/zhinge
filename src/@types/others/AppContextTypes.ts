import { inherits } from "util";

type DispatchType<T> = {
    type: string;
    value: T
}
export type AppAction<T> = {
    type: string | any;
    value: T | any;
};
export interface AppDispatch<T> extends React.Dispatch<DispatchType<T>> { }