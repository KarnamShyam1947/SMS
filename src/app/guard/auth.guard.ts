import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let user = localStorage.getItem('user');
  let r = inject(Router);
  let t = inject(ToastrService);

  if(user == null) {
    t.warning('You need to login to access this page', 'Warning');
    r.navigate(['']);
    return false;
  }
  return true;
};
