import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
      <button 
        [class.active]="!themeService.isDarkTheme()" 
        [disabled]="!themeService.isDarkTheme()" 
        (click)="themeService.toggleTheme()">
        <span class="material-symbols-outlined">wb_sunny</span>
      </button>
      <button 
        [class.active]="themeService.isDarkTheme()" 
        [disabled]="themeService.isDarkTheme()" 
        (click)="themeService.toggleTheme()">
        <span class="material-symbols-outlined">dark_mode</span>
      </button>
  `,
  styles: `
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-bg-color);
      border-radius: 6px;
      font-size: 0.7em; 
      padding: 0.3em 0.5em;
      flex-shrink: 0;

      span.material-symbols-outlined {
        font-size: 1em;
      }
    }

    button.active {
      background-color: var(--secondary-bg-color);
    }
  `,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}