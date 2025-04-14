import { ThemeToggleComponent } from './theme-toggle.component';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Metadata, MetadataService } from './metadata.service';
import { Meta, Title } from '@angular/platform-browser';
import { IconService } from './icon-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterOutlet,
    RouterModule,
    MatSlideToggleModule,
    ThemeToggleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  metadata: Metadata | undefined;

  constructor(
    private metadataService: MetadataService,
    private titleService: Title,
    private meta: Meta,
    private iconService: IconService
  ) {}

  ngOnInit() {
    this.metadataService.getMetadata()
    .subscribe((metadata) => {
      this.metadata = metadata
      this.titleService.setTitle(metadata.title); 
      this.iconService.registerIcons()

    // Set Meta Tags
    this.meta.addTags([
      { name: 'author', content: metadata.author },
      { name: 'description', content: metadata.description },
      { name: 'keywords', content: metadata.keywords },
      { property: 'og:title', content: metadata.title },
      { property: 'og:description', content: metadata.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: metadata.title },
    ]);
    });
  }
}