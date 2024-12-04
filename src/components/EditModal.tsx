import CloseSvg from "../img/xmark-solid.svg?react"
import { useState } from "react";
import { formatPhoneNumber } from "../utils/phoneUtils";
import { IStudentInfo } from "../app/services/types";
import { useUpdateStudentInfoMutation } from "../app/services/user";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useChangePasswordMutation } from "../app/services/auth";

interface IEditModal {
    type: string;
    childrenInfo: IStudentInfo;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditModal = ({type, childrenInfo, setIsModalOpen}: IEditModal) => {
    const email = useSelector((state: RootState) => state.auth.email)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [childrenPhone, setChildrenPhone] = useState(childrenInfo?.phoneNumber)
    const [parentPhone, setParentPhone] = useState(childrenInfo?.parentContact)
    const [name, setName] = useState(childrenInfo?.name)
    const [patronymic, setPatronymic] = useState(childrenInfo?.patronymic)
    const [surname, setSurname] = useState(childrenInfo?.surname)
    const [birthday, setBirthday] = useState(childrenInfo?.dateOfBirth)

    const [updateStudentInfo] = useUpdateStudentInfoMutation();
    const [changePassword] = useChangePasswordMutation()

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    const isSaveDisabled =
        type === "edit"
            ? [childrenPhone, parentPhone, name, patronymic, surname, birthday].some(
                  (field) => !field.trim()
              )
            : !password.trim() || !confirmPassword.trim() || !passwordRegex.test(password);

    // Обработчик изменения номера телефона с форматированием
    const handlePhoneChange = (newValue: string, setPhone: React.Dispatch<React.SetStateAction<string>>) => {
        const formattedValue = formatPhoneNumber(newValue);
        setPhone(formattedValue);
    };

    // Смена пароля
    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        }
    
        try {
            console.log({ email, password, confirmPassword }); // Проверить перед отправкой
            await changePassword({
                email,
                password,
                confirmPassword,
            }).unwrap();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Ошибка при смене пароля:", error);
        }
    };

    // Обработчик сохранения данных пользователя
    const handleSaveStudentInfo = async () => {
        try {
        await updateStudentInfo({
            id: childrenInfo.id,
            body: {
            name,
            surname,
            patronymic,
            dateOfBirth: birthday,
            parentContact: parentPhone,
            phoneNumber: childrenPhone,
            },
        }).unwrap();
        setIsModalOpen(false);
        } catch (error) {
        console.error('Ошибка при обновлении данных:', error);
        }
    };


    return (
        <div className="fixed right-0 top-0 px-2 py-4 bg-[#00000080]
                        z-50 left-0 bottom-0 justify-center
                        items-center flex">
            <div className="bg-white max-w-md mx-auto my-auto w-full px-8 py-8
            rounded-xl">
                <div className="flex items-center mb-5">
                    <h3 className="mr-auto text-[24px] font-medium">
                        {type === "edit" ? 'Редактировать' : 'Смена пароля'}
                    </h3>
                    <CloseSvg onClick={() => setIsModalOpen(false)}
                    className="w-6 h-6 cursor-pointer" />
                </div>
                {type === "edit" ? (
                    <>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Телефон</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="text" placeholder="Введите телефон"
                                value={childrenPhone} 
                                onChange={(event) => handlePhoneChange(event.target.value, setChildrenPhone)} />
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Телефон родителя</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="text" placeholder="Введите телефон родителя"
                                value={parentPhone} 
                                onChange={(event) => handlePhoneChange(event.target.value, setParentPhone)} />
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Имя</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="text" placeholder="Введите имя"
                                value={name} 
                                onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Фамилия</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="text" placeholder="Введите фамилию"
                                value={surname} 
                                onChange={(event) => setSurname(event.target.value)} />
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Отчество</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="text" placeholder="Введите отчество"
                                value={patronymic} 
                                onChange={(event) => setPatronymic(event.target.value)} />
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-500">День рождения</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="date" placeholder="Введите день рождения"
                                value={birthday} 
                                onChange={(event) => setBirthday(event.target.value)} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Пароль</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="password" placeholder="Введите пароль"
                                value={password} 
                                onChange={(event) => setPassword(event.target.value)} />
                            {!passwordRegex.test(password) && password && (
                                <p className="text-red-500 text-sm mt-1">
                                    Пароль должен быть не менее 8 символов, содержать заглавную
                                    букву, строчную букву и цифру
                                </p>
                            )}
                        </div>
                        <div className="mb-5">
                            <h4 className="text-gray-500">Подтвердите пароль</h4>
                            <input className="px-4 py-2 rounded-md 
                                text-[20px] border border-gray-600 w-full"
                                type="password" placeholder="Подтвердите пароль"
                                value={confirmPassword} 
                                onChange={(event) => setConfirmPassword(event.target.value)} />
                        </div>
                    </>
                )}
                
                <button className={`py-1 px-2 rounded-[10px] bg-[#033C59] text-white text-[20px] transition delay-100 ease-in-out 
                ${isSaveDisabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:-translate-y-1 hover:scale-110'
                }`}
                onClick={type === 'edit' ? handleSaveStudentInfo : handleChangePassword}
                disabled={isSaveDisabled}>
                    Сохранить
                </button>
            </div>
        </div>
    )
}