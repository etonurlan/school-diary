import ArrowSvg from "../img/arrow.svg?react"
import { WeekDay } from "../components/WeekDay"
import { format, addWeeks, subWeeks, startOfWeek, addDays } from 'date-fns'
import { useState } from "react";

export const Shedule = ({id}: {id?: number}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getWeekDates = (date: Date) => {
        const startOfMonday = startOfWeek(date, { weekStartsOn: 1 }); 
        const weekDates = [];
        
        for (let i = 0; i < 6; i++) {
            const currentDate = addDays(startOfMonday, i);
            weekDates.push({
                shortFormat: format(currentDate, 'dd.MM'),
                fullFormat: format(currentDate, 'yyyy-MM-dd')
            });
        }
    
        return weekDates;
    };
    
    const weekDates = getWeekDates(currentDate);
    
    const goToPreviousWeek = () => {
        setCurrentDate(prevDate => subWeeks(prevDate, 1));
    }
    const goToNextWeek = () => {
        setCurrentDate(prevDate => addWeeks(prevDate, 1));
    }

    return (
        <div className="grow flex px-[18px] overflow-y-auto">
            <div className="w-1/2 py-6 pr-[30px]">
                <button onClick={() => goToPreviousWeek()} 
                className="flex items-center pl-[30px] mb-2.5
                hover:text-red-500 transition ease-in-out delay-100">
                    <ArrowSvg className="mr-2.5" />
                    Предыдущая неделя
                </button>
                <WeekDay id={id} day="Понедельник" date={weekDates[0]}
                styles="mb-9" />
                <WeekDay id={id} day="Вторник" date={weekDates[1]}
                styles="mb-9" />
                <WeekDay id={id} day="Среда" date={weekDates[2]} />
            </div>
            <div className="w-[1px]  bg-black"></div>
            <div className="w-1/2 py-6 pl-[30px]">
                <button onClick={() => goToNextWeek()} 
                className="flex items-center justify-end w-full  mb-2.5
                hover:text-red-500 transition ease-in-out delay-100">
                    Следующая неделя
                    <ArrowSvg className="ml-2.5 rotate-180" />
                </button>
                <WeekDay id={id} day="Четверг" date={weekDates[3]}
                styles="mb-9" />
                <WeekDay id={id} day="Пятница" date={weekDates[4]}
                styles="mb-9" />
                <WeekDay id={id} day="Суббота" date={weekDates[5]} />
            </div>
        </div>
    )
}