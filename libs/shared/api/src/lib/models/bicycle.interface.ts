// eslint-disable-next-line @nx/enforce-module-boundaries
import { BicycleType } from 'libs/cycle-gram/features/src/lib/bicycle/bicycle.model';
import { Id } from './id.type';

export interface IBicycle { // Updated interface name
    id: Id;
    bicycleName: string;
    Brand: string;
    weight: string;
    groupset: string;
    kleur: string;
    image: string;
    sort: BicycleType;
    ownerId?: Id;
}

export type ICreateBicycle = Pick<
    IBicycle,
    'bicycleName' | 'Brand' | 'weight' | 'groupset' | 'kleur' | 'image' | 'sort'
>;

export type IUpdateBicycle = Partial<Omit<IBicycle, 'id'>>;

export type IUpsertBicycle = IBicycle;
