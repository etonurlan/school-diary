import KeySvg from "../img/key.svg?react"
import EditSvg from "../img/mode_edit.svg?react"
import { EditModal } from "../components/EditModal";
import { useState } from "react";
import { useStudentInfoQuery } from "../app/services/user";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const Profile = ({id}: {id: number}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [typeModal, setTypeModal] = useState('')

    const {data: studentInfo} = useStudentInfoQuery(id)
    const email = useSelector((state: RootState) => state.auth.email)

    return (
        <div className="p-[50px] w-[40%]">
            <div className="p-2.5 text-[38px] mb-[55px]">
                Ученик: {studentInfo?.surname} {studentInfo?.name} {studentInfo?.patronymic}
            </div>
            <div className="mb-10">
                <span className="text-[24px] mb-0.5">
                    Общие сведения
                </span>
                <div className="border border-black rounded-[10px] 
                text-[20px] py-2.5 px-[30px]">
                    <div className="mb-2">
                        Фамилия: {studentInfo?.surname}
                    </div>
                    <div className="mb-2">
                        Имя: {studentInfo?.name}
                    </div>
                    <div className="mb-2">
                        Отчество: {studentInfo?.patronymic}
                    </div>
                    <div className="mb-2">
                        Класс: {studentInfo?.responseSchoolClassDto?.className}
                    </div>
                    <div>
                        Дата рождения: {studentInfo?.dateOfBirth}
                    </div>
                </div> 
            </div>
            <div className="mb-10">
                <span className="text-[24px] mb-0.5">Общие сведения</span>
                <div className="border border-black rounded-[10px] 
                text-[20px] py-2.5 px-[30px]">
                    <div className="mb-2">
                        Email: {email}
                    </div>
                    <div className="mb-2">
                        Номер телефона: {studentInfo?.phoneNumber}
                    </div>
                    <div>
                        Номер телефона родителя: {studentInfo?.parentContact}
                    </div>
                </div> 
            </div>
            <div className="flex items-center">
                <button className="mr-[50px] py-1 px-2 rounded-[10px] bg-[#033C59]
                flex items-center text-white text-[20px]
                transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                    setTypeModal('edit')
                    setIsModalOpen(true)
                }}>
                    <EditSvg className="mr-1.5" />
                    Редактировать
                </button>
                <button className="py-1 px-2 rounded-[10px] bg-[#033C59]
                flex items-center text-white text-[20px]
                transition delay-100 ease-in-out hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                    setTypeModal('password')
                    setIsModalOpen(true)
                }}>
                    <KeySvg className="mr-1.5" />
                    Сменить пароль
                </button>
            </div>
            {isModalOpen && <EditModal type={typeModal} 
            setIsModalOpen={setIsModalOpen} childrenInfo={studentInfo} />}
        </div>
    )
}