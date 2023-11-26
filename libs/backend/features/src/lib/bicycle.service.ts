import { Injectable, NotFoundException } from '@nestjs/common';
import { IBicycle } from '@cycle-gram-web-main/shared/api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { BicycleType } from 'libs/cycle-gram/features/src/lib/bicycle/bicycle.model';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class BicycleService {
    TAG = 'BicycleService';

    private bicycles$ = new BehaviorSubject<IBicycle[]>([
        {
            id: '0',
            bicycleName: 'Giant Trance 29 3',
            Brand: 'Giant',
            weight: '13.5 kg',
            groupset: 'Shimano Deore 1x12',
            kleur: 'Black',
            image: 'https://images2.giant-bicycles.com/b_white,c_pad,h_600,q_80,w_800/bucpyvqgvrqfdanbj7wg/MY21TRANCE_29_3_ColorABlackTi.jpg',
            sort: BicycleType.MTB,
          },
          {
            id: '1',
            bicycleName: 'Wilier Zero SLR',
            Brand: 'Wilier',
            weight: '6.5 kg',
            groupset: 'Shimano Dura Ace Di2',
            kleur: 'Red',
            image: 'https://www.rullensfietsen.nl/media/64/00/6d/1684926480/Wilier-Zero-SLR-disc-velvet-red.jpg',
            sort: BicycleType.RACE,
          },
          {
            id: '2',
            bicycleName: 'Cannondale Topstone 4',
            Brand: 'Cannondale',
            weight: '10.5 kg',
            groupset: 'Shimano GRX 1x11',
            kleur: 'Black',
            image: 'https://embed.widencdn.net/img/dorelrl/7vurcowofz/2000px@1x/C22_C15402U_Topstone_Crb_4_SBK_PD.png',
            sort: BicycleType.GRAVEL,
          },
    ]);

    getAll(): IBicycle[] {
        Logger.log('getAll', this.TAG) ;
        return this.bicycles$.value;
    }

    getOne(id: string): IBicycle {
        Logger.log(`getOne(${id})`, this.TAG);
        const bicycle = this.bicycles$.value.find((bicycle) => bicycle.id === id);
        if (!bicycle) {
            throw new NotFoundException(`Bicycle could not be found!`);
        }
        return bicycle;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(bicycle: Pick<IBicycle, 'bicycleName' | 'image'>): IBicycle {
        Logger.log('create', this.TAG);
        const current = this.bicycles$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newBicycle: IBicycle = {
            ...bicycle,
            id: `bicycle-${Math.floor(Math.random() * 10000)}`,
            isVega: false,
            dateServed: new Date(),
        } as unknown as IBicycle;
        this.bicycles$.next([...current, newBicycle]);
        return newBicycle;
    }

    update(id: string, bicycle: IBicycle): IBicycle {
        Logger.log(`update(${id})`, this.TAG);
        const current = this.bicycles$.value;
        const index = current.findIndex((bicycle) => bicycle.id === id);
        if (index === -1) {
            throw new NotFoundException(`Bicycle could not be found!`);
        }
        const updatedBicycle = {
            ...current[index],
            ...bicycle,
        };
        current[index] = updatedBicycle;
        this.bicycles$.next(current);
        return updatedBicycle;
    }

    deleteBicycle(id: string): void {
        const index = this.bicycles$.value.findIndex((bicycle) => bicycle.id == id);
        if (index == -1) {
          throw new Error(`Could not find bicycle with id ${id}`);
        }
    
        this.bicycles$.next([
          ...this.bicycles$.value.slice(0, index),
          ...this.bicycles$.value.slice(index + 1),
        ]);
      }
}
