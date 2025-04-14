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
      padding: 4px 8px;
      margin: 0 4px;
      cursor: pointer;
      color: var(--primary-bg-color);
      border-radius: 4px;
    }
    button.active {
      background-color: var(--secondary-bg-color);
    }
  `,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}