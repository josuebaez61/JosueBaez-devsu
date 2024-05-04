import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-full',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss',
})
export class FullComponent {}
