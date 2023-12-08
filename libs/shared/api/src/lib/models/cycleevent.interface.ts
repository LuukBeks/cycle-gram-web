import { Id } from './id.type';
import { IUser } from './user.interface';

export interface ICycleEvent { // Updated interface name
    id: Id;
    date: string;
    title: string;
    description: string;
    location: string;
    maxParticipants: number;
    participants?: IUser[];
    createdById: string;
    routes: string;
}

export type ICreateCycleEvent = Pick<
    ICycleEvent,
    'date' | 'title' | 'description' | 'location' | 'maxParticipants' | 'participants' | 'createdById' | 'routes'
>;

export type IUpdateCycleEvent = Partial<Omit<ICycleEvent, 'id'>>;

export type IUpsertCycleEvent = ICycleEvent;
