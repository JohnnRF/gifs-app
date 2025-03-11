import {  Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-side-menu-header',
  standalone: true,
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent { 
  envs = environment;
}
