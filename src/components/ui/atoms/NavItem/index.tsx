import Text from "../Text";
import NavItemsProps from "./type";

export default function NavItem(props: NavItemsProps) {
    const { text } = props;

    return (
        <Text className={`font-medium text-[15px] leading-[21.88px] cursor-pointer`}>
            {text}
        </Text>
    );
}