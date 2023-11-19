export enum UserSort {
    Admin = 'Admin',
    Guest = 'Guest',
    Other = 'Other'
}

export class User {
    id: string;
    name: string;
    dob: Date;
    email: string;
    phoneNumber: string;
    password: string;
    image: string;
    sort: UserSort;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.dob = user.dob;
        this.email = user.email;
        this.phoneNumber = user.phoneNumber;
        this.password = user.password;
        this.image = user.image;
        this.sort = user.sort;
    }
}