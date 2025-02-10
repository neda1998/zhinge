import { useAppContext } from "../../contexts/appContext";
import { BsFillMoonFill } from "react-icons/bs";
import { GiUbisoftSun } from "react-icons/gi";

const ChangeTheme = () => {
    const { theme, changeTheme } = useAppContext();
    const changeThemeHandler = () => {
        changeTheme(theme === "light" ? "dark" : "light")
    }
    return (
        <button data-theme={theme} onClick={changeThemeHandler}>
            {
                theme === "light" ? (
                    <BsFillMoonFill size={30} color="#11a97f" />
                ) :
                    (
                        <GiUbisoftSun size={30} color="#11a97f" />
                    )
            }
        </button>
    )
}

export default ChangeTheme
