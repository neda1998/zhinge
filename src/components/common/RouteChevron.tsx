
import { Link } from "react-router-dom";
import { HiMiniChevronDoubleLeft } from "react-icons/hi2";

interface RouteItem {
    id: string | number,
    route?: string,
    item: string
}

interface PropsRoute {
    items: RouteItem[],
    className?: string,
}

const RouteChevron = ({ items, className = "" }: PropsRoute) => {
    return (
        <div className={`flex gap-1 items-center justify-end ${className}`}>
            {items.map((item: any, idx: number) => (
                <div className="flex items-center gap-1 text-color-gray" key={item.id}>
                        <Link
                            to={item.route && item.route}
                            className={`lg:text-[14px] text-[11px] whitespace-nowrap ${idx === 0 ? "text-main-color" : "text-gray-400"}`}
                        >
                            {item.item}
                        </Link>
                    {idx === items.length - 1 ? null : <HiMiniChevronDoubleLeft color="#9ca3af" />}
                </div>
            ))}
        </div>
    );
};

export default RouteChevron;
