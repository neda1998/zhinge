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
                    {idx !== items.length - 1 ? (
                        <Link
                            to={item.route || "#"}
                            className={`lg:text-[14px] text-[11px] whitespace-nowrap text-gray-400 cursor-pointer`}
                        >
                            {item.item}
                        </Link>
                    ) : (
                        <span className="lg:text-[14px] text-[11px] whitespace-nowrap text-main-color">
                            {item.item}
                        </span>
                    )}
                    {idx !== items.length - 1 && <HiMiniChevronDoubleLeft color="#9ca3af" />}
                </div>
            ))}
        </div>
    );
};

export default RouteChevron;
