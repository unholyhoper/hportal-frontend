import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 'ROLE_ADMIN': {
        return 'Admin';
      }
      case 'ROLE_DOCTOR': {
        return 'Doctor';
      }
      case 'ROLE_USER': {
        return 'User';
      }
    }
  }
}
