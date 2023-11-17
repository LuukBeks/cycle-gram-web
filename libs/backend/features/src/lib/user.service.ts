import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, UserSort } from '@cycle-gram-web-main/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'UserService';

    private users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            name: 'John Doe',
            dob: new Date('1990-01-01'),
            email: 'john.doe@example.com',
            phoneNumber: '123-456-7890',
            password: 'password123',
            image: 'https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg',
            sort: UserSort.Admin,
        },
        {
            id: '1',
            name: 'Jane Doe',
            dob: new Date('1985-05-15'),
            email: 'jane.doe@example.com',
            phoneNumber: '987-654-3210',
            password: 'securepassword',
            image: 'https://thumbs.dreamstime.com/z/happy-man-okay-sign-portrait-white-background-showing-31418338.jpg',
            sort: UserSort.Guest,
        }
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.users$.value;
    }

    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const user = this.users$.value.find((user) => user.id === id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(user: Pick<IUser, 'name' | 'image'>): IUser {
        Logger.log('create', this.TAG);
        const current = this.users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newUser: IUser = {
            ...user,
            id: `user-${Math.floor(Math.random() * 10000)}`,
            isVega: false,
            dateServed: new Date(),
        } as unknown as IUser;
        this.users$.next([...current, newUser]);
        return newUser;
    }
}
