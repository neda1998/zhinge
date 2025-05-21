import { Link, useLocation } from "react-router-dom";
import NavItem from "../../atoms/NavItem";

export default function NavList({ items }: any) {
    const { pathname } = useLocation();

    return (
        <ul className='flex justify-around'>
            {items.map((item: any, index: number) => (
                <li key={index}>
                    <Link
                        to={`${item.url}`}
                        className={`${pathname === item.url ? 'text-[#09A380]' : ''}`}
                    >
                        <NavItem text={item.text} url={item.url} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
