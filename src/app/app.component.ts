import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from './theme.service';
import { Metadata, MetadataService } from './metadata.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterOutlet,
    RouterModule,
    MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  metadata: Metadata | undefined;

  constructor(
    public themeService: ThemeService, 
    private metadataService: MetadataService,
    private titleService: Title) {}

  ngOnInit() {
    this.metadataService.getMetadata()
    .subscribe((metadata) => {
      this.metadata = metadata
      this.titleService.setTitle(metadata.title); 
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  get isDarkMode() {
    return this.themeService.isDarkTheme();
  }
}