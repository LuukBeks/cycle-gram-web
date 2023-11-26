export enum BicycleType {
    RACE = 'Race',
    MTB = 'Mountain Bike',
    GRAVEL = 'Gravel'
}

export class Bicycle {
    id: string;
    bicycleName: string;
    Brand: string;
    weight: string;
    groupset: string;
    kleur: string;
    image: string;
    sort: BicycleType;

    constructor(bicycle: Bicycle) {
        this.id = bicycle.id;
        this.bicycleName = bicycle.bicycleName;
        this.Brand = bicycle.Brand;
        this.weight = bicycle.weight;
        this.groupset = bicycle.groupset;
        this.kleur = bicycle.kleur;
        this.image = bicycle.image;
        this.sort = bicycle.sort;
    }
}