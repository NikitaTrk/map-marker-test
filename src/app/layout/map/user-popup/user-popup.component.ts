import { Component, Input } from '@angular/core';
import { User } from '../user';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'user-popup',
  templateUrl: './user-popup.component.html',
  //
  standalone: true,
  imports: [NgIf, MatFormFieldModule, MatInputModule],
})
export class UserPopupComponent {
  @Input({ required: true }) user!: User;
}
