// eslint-disable-next-line @nx/enforce-module-boundaries
import { CycleRouteSort } from 'libs/cycle-gram/features/src/lib/cycleroute/cycleroute.model';
import { Id } from './id.type';

export interface ICycleRoute { // Updated interface name
    id: Id;
    routeName: string;
    distance: string;
    image: string;
    gpx: string;
    startAdres: string;
    sort: CycleRouteSort;
    ownerId?: Id;
}

export type ICreateCycleRoute = Pick<
    ICycleRoute,
    'routeName' | 'distance' | 'image' | 'gpx' | 'startAdres' | 'sort'
>;

export type IUpdateCycleRoute = Partial<Omit<ICycleRoute, 'id'>>;

export type IUpsertCycleRoute = ICycleRoute;    
