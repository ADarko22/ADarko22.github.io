// theme-toggle.component.ts
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
      color: var(--mdc-theme-on-primary);
      border-radius: 4px;
    }
    button.active {
      background-color: rgba(255, 255, 255, 0.2);
    }
    .theme-light button.active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    button:disabled {
        cursor: default;
    }
  `,
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}