import { useGetDaySheduleQuery } from "../app/services/shedule";

interface IDate {
    shortFormat: string;
    fullFormat: string;
}
interface IWeekDay {
    day: string;
    date: IDate;
    styles?: string;
    id?: number
}

export const WeekDay = ({day, date, styles, id}: IWeekDay) => {
    const {data: dayShedule} = useGetDaySheduleQuery({id: id, date: date.fullFormat})

    const lessons = dayShedule?.responseSchoolClassWithScheduleDto?.responseDailySchedulesDto[0]?.responseLessonDto || [];
    const fullLessons = Array.from({ length: 8 }, (_, index) => lessons[index] || {});
    
    return (
        <div className={`w-full flex ${styles}`}>
            <div className="grid text-[20px] font-medium">
                <div className="rotate-text text-gray-300">
                    {date.shortFormat}
                </div>
                <div className="rotate-text">
                    {day}
                </div>
            </div>
            <table className="w-full">
                <thead>
                    {(day === 'Понедельник' || day === 'Четверг') && (
                        <tr>
                            <th className="py-1 text-center font-medium text-gray-500 w-[6%]">
                                №
                            </th>
                            <th className="py-1 text-center font-medium text-gray-500 w-[24%]">
                                Предмет
                            </th>
                            <th className="py-1 text-center font-medium text-gray-500 w-[58%]">
                                Что задано
                            </th>
                            <th className="py-1 text-center font-medium text-gray-500 min-w-[97px]">
                                Оценка
                            </th>
                        </tr>
                    )}
                    
                </thead>
                <tbody>
                    {fullLessons?.map((sheduleDay, index) => (
                        <tr key={index}>
                            <td className="py-1 text-center font-medium font-['Montagu_Slab']
                            border border-black min-w-[73px] w-[6%]">
                                {index+1}
                            </td>
                            <td className="px-4 py-1 text-left border border-black w-[24%] break-all">
                                {sheduleDay?.responseSubjectDto?.name || ''}
                            </td>
                            <td className="px-4 py-1 text-left border border-black w-[58%] break-all">
                                {(Array.isArray(sheduleDay.responseHomeworkDto) && sheduleDay.responseHomeworkDto[0]?.description) || ''}
                            </td>
                            <td className="py-1 text-center font-medium border border-black min-w-[97px]">
                                {(Array.isArray(sheduleDay.responseMarkWithSubjectDto) && sheduleDay.responseMarkWithSubjectDto[0]?.mark) || ''}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}