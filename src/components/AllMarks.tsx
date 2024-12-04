import { useGetMarksQuery } from "../app/services/shedule"

export const AllMarks = ({id}: {id?: number}) => {
    const {data} = useGetMarksQuery(id)

    const transformResponseData = (response: any) => {
        if (!response?.responseMarkWithSubjectDto) return [];
    
        const subjectsMap: Record<string, { grades: number[]; averageGrade: number }> = {};
    
        response.responseMarkWithSubjectDto.forEach((item: any) => {
            const subjectName = item.responseSubjectDto?.name;
            const mark = item.mark;
    
            if (subjectName) {
                if (!subjectsMap[subjectName]) {
                    subjectsMap[subjectName] = { grades: [], averageGrade: 0 };
                }
                subjectsMap[subjectName].grades.push(mark);
            }
        });
    
        // Вычисляем среднюю оценку для каждого предмета
        Object.keys(subjectsMap).forEach((subject) => {
            const grades = subjectsMap[subject].grades;
            subjectsMap[subject].averageGrade =
                grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
        });
    
        // Преобразуем объект в массив
        return Object.entries(subjectsMap).map(([subject, data]) => ({
            subject,
            grades: data.grades,
            averageGrade: parseFloat(data.averageGrade.toFixed(2)), // Округление до двух знаков
        }));
    }

    const marks = transformResponseData(data)

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="text-center font-medium py-3 
                    border border-black w-[24%]">
                        Предмет
                    </th>
                    <th className="text-center font-medium py-3
                    border border-black w-[62%]">
                        Оценки
                    </th>
                    <th className="text-center font-medium py-3
                    border border-black w-[14%]">
                        Средний балл
                    </th>
                </tr>
            </thead>
            <tbody>
                {marks?.map((subject) => (
                    <tr>
                        <td className="font-medium py-3 border 
                        border-black w-[24%] px-3 break-all">
                            {subject.subject}
                        </td>
                        <td className="font-medium py-3 border 
                        border-black w-[62%] px-3 break-all font-['Montagu_Slab']">
                            {subject.grades.map((mark) => (
                                <>{mark} </>
                            ))}
                        </td>
                        <td className="font-medium py-3 border 
                        border-black w-[14%] font-['Montagu_Slab'] text-center">
                            {subject.averageGrade}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}