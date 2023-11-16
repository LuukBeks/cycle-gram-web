import { Id } from './id.type';

export enum UserSort { // Updated enum name
    Breakfast = 'Breakfast',
    Lunch = 'Lunch',
    Dinner = 'Dinner',
    Other = 'Other'
}

export interface IUser { // Updated interface name
    id: Id;
    name: string;
    dob: Date;
    email: string;
    phoneNumber: string;
    password: string;
    image: string;
    sort: UserSort; // Updated sort property
}

export type ICreateUser = Pick<
    IUser,
    'name' | 'dob' | 'email' | 'phoneNumber' | 'password' | 'image' | 'sort' // Updated properties
>;

export type IUpdateUser = Partial<Omit<IUser, 'id'>>;

export type IUpsertUser = IUser; // Updated type

