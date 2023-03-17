export interface IEmployees {
    id: number;
    name : string;
    jobTitle : string;
    email: string;
    phoneNumber : number;
    employmentType: string;
    location : string;
    salary: number;
    department : IDepartments
}
export interface IDepartments {
    id : number,
    name : string,
    location : string,
    employees : IEmployees[]
}

export enum PageEnum {
    list,
    add,
    edit,
}
