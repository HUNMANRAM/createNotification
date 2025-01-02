import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Description } from './models';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Description[] = [
    {
      name: 'Pump Float',
      components: [
        {
          name: 'Electrical and Electronics',
          deficiencies: [
            {
              name: 'Fluctuations',
              rootCauses: [
                { name: '0-Unknown' },
                { name: 'Wiring Issue' },
                { name: 'Electrical Noise' },
              ],
            },
            {
              name: 'High Battery Voltage',
              rootCauses: [{ name: 'Overcharging' }, { name: 'Faulty Regulator' }],
            },
          ],
        },
        {
          name: 'Engine',
          deficiencies: [
            {
              name: 'Coolant Temp Fluctuating',
              rootCauses: [{ name: 'AIR INTAKE SYSTEM' }],
            },
          ],
        },
      ],
    },
  ];

  // Get the data as an observable
  getData(): Observable<Description[]> {
    return of(this.data);
  }
}
