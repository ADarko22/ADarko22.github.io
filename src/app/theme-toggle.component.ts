import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
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
    </div>
  `,
  styles: `
    div {
        display: flex;
      }

      button {
        background: none;
        border: none;
        padding: 6px 10px; /* Slightly larger padding for touch */
        margin: 0 6px; /* Slightly larger margin */
        cursor: pointer;
        color: var(--primary-bg-color);
        border-radius: 6px; /* Slightly larger border-radius */
        font-size: 1.1em; /* Slightly larger icon size */

        span.material-symbols-outlined {
          font-size: 1.1em;
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