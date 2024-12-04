import { AllMarks } from "../components/AllMarks";

export const Marks = ({id}: {id?: number}) => {
    return (
        <div className="grow flex px-[18px] overflow-y-auto">
            <div className="w-full py-6 pr-[30px]">
                <h2 className="flex items-center justify-center text-[36px] mb-[25px]">
                    Текущая успеваемость
                </h2>
                <AllMarks id={id} />
            </div>
        </div>
    )
}