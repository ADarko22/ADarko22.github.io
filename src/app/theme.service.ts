import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.isDarkMode = storedTheme === 'dark';
      this.applyThemeClass();
    } else {
      this.applyThemeClass();
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyThemeClass();
  }

  private applyThemeClass() {
    const body = document.querySelector('body');
    if (body) {
      if (this.isDarkMode) {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
      } else {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
      }
    }
  }

  isDarkTheme(): boolean {
    return this.isDarkMode;
  }
}