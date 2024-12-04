//auth
export type userLogin = {
    accessToken: string;
    refreshToken: string;
    email: string;
    role: string;
    verified: boolean;
}
//shedule
export interface ISheduleStudent {
    id: number
    name: string
    surname: string
    patronymic: string
    responseSchoolClassWithScheduleDto: ISchoolClassWithSchedule
}

export interface ISchoolClassWithSchedule {
    id: number
    responseDailySchedulesDto: IDailySchedules[]
}

export interface IDailySchedules {
    id: number
    responseLessonDto: ILesson[]
    dayOfWeek: string
}

export interface ILesson {
    id: number
    responseMarkWithSubjectDto: IMarkWithSubject[]
    responseSubjectDto: ISubject
    responseHomeworkDto: IHomework[]
    lessonNumber: number
}

export interface IMarkWithSubject {
    id: number
    mark: number
    gradeDate: string
    responseSubjectDto: ISubject
}

export interface ISubject {
    id: number
    name: string
}

export interface IHomework {
    id: number
    description: string
}

export interface IMarks {
    id: number
    responseMarkWithSubjectDto: IMarkWithSubject[]
}

//user
export interface IStudentInfo {
    id: number
    name: string
    surname: string
    patronymic: string
    dateOfBirth: string
    parentContact: string
    phoneNumber: string
    responseSchoolClassDto: ISchoolClass
}

export interface ISchoolClass {
    id: number
    className: string
}