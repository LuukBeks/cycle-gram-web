// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserSort } from 'libs/cycle-gram/features/src/lib/user/user.model';
import { IBicycle } from './bicycle.interface';
// import { ICycleRoute } from './cycleroute.interface';
import { Id } from './id.type';

export interface IUser { // Updated interface name
    id: Id;
    name: string;
    dob: Date;
    email: string;
    phoneNumber: string;
    password: string;
    image: string;
    sort: UserSort; // Updated sort property
    token?: string;
    bicycles?: IBicycle[];
    // cycleRoutes?: ICycleRoute[];
}

export type ICreateUser = Pick<
    IUser,
    'name' | 'dob' | 'email' | 'phoneNumber' | 'password' | 'image' | 'sort' // Updated properties
>;

export type IUpdateUser = Partial<Omit<IUser, 'id'>>;

export type IUpsertUser = IUser; // Updated type

