import { Link } from "react-router-dom"
import ProfileSvg from "../img/profile.svg?react"
import LogoutSvg from "../img/logout.svg?react"
import { useNavigate } from "react-router-dom"
import { clearTokens } from "../app/slices/authSlice"
import { useDispatch } from "react-redux"
import { useStudentInfoQuery } from "../app/services/user"

export const Header = ({id}: {id: number}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(clearTokens()); 
        navigate('/login'); 
    };
    
    const {data: studentInfo} = useStudentInfoQuery(id)

    return (
        <header className="px-[30px] py-9 flex text-[20px] font-medium
        items-center bg-[#033C59] text-white sticky top-0 z-10">
            <div className="mr-auto">
                Финальный проект “Электронный дневник начальных классов”
            </div>
            <div className="flex items-center gap-[83px] mr-11">
                <Link to="/" 
                className="hover:text-red-500 transition ease-in-out delay-100">
                    Расписание
                </Link>
                <Link to="/marks" 
                className="hover:text-red-500 transition ease-in-out delay-100">
                    Оценки
                </Link>
                <Link className="px-[15px] py-2 
                bg-[#D9D9D9] flex items-center text-black rounded-md
                transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110" 
                to="/profile">
                    <ProfileSvg className="mr-3" />
                    {studentInfo?.surname}
                </Link>
            </div>
            <button onClick={handleLogout} 
            className="py-[9px] px-2.5 bg-[#D9D9D9] rounded-md
            transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110">
                <LogoutSvg />
            </button>
        </header>
    )
}