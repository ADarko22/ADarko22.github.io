import { ThemeToggleComponent } from './theme-toggle.component';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
    ThemeToggleComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  metadata: Metadata | undefined;

  constructor(
    private metadataService: MetadataService,
    private titleService: Title) {}

  ngOnInit() {
    this.metadataService.getMetadata()
    .subscribe((metadata) => {
      this.metadata = metadata
      this.titleService.setTitle(metadata.title); 
    });
  }
}