// eslint-disable-next-line @nx/enforce-module-boundaries
import { ICycleRoute, IUser } from "@cycle-gram-web-main/shared/api";

export class CycleEvent {
    id: string;
    date: string;
    title: string;
    description: string;
    location: string;
    maxParticipants: number;
    participants: IUser[];
    createdById: string;
    routes: ICycleRoute[];

    constructor(cycleevent: CycleEvent) {
        this.id = cycleevent.id;
        this.date = cycleevent.date;
        this.title = cycleevent.title;
        this.description = cycleevent.description;
        this.location = cycleevent.location;
        this.maxParticipants = cycleevent.maxParticipants;
        this.participants = cycleevent.participants;
        this.createdById = cycleevent.createdById;
        this.routes = cycleevent.routes;
    }
}