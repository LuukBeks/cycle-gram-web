export enum CycleRouteSort {
    RACE = 'Race',
    MTB = 'Mountain Bike',
    GRAVEL = 'Gravel'
}

export class CycleRoute {
    id: string;
    routeName: string;
    distance: string;
    image: string;
    gpx: string;
    startAdres: string;
    sort: CycleRouteSort;

    constructor(cycleroute: CycleRoute) {
        this.id = cycleroute.id;
        this.routeName = cycleroute.routeName;
        this.distance = cycleroute.distance;
        this.image = cycleroute.image;
        this.startAdres = cycleroute.startAdres;
        this.gpx = cycleroute.gpx;
        this.sort = cycleroute.sort;
    }
}