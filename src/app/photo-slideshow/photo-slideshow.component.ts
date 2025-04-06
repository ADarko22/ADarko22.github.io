import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'photo-slideshow',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './photo-slideshow.component.html',
  styleUrls: ['./photo-slideshow.component.scss'],
})
export class PhotoSlideshowComponent implements OnInit, OnDestroy {
  @Input() photoUrls: string[] = [];
  currentPhotoIndex: number = 0;
  currentPhoto: string | null = null;
  prevPhotoUrl: string | null = null;
  nextPhotoUrl: string | null = null;
  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  isFullscreen: boolean = false;

  ngOnInit(): void {
    this.updatePhoto();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updatePhoto(): void {
    if (this.photoUrls && this.photoUrls.length > 0) {
      this.currentPhoto = this.photoUrls[this.currentPhotoIndex];

      if (this.photoUrls.length > 1) {
        const prevIndex = (this.currentPhotoIndex - 1 + this.photoUrls.length) % this.photoUrls.length;
        const nextIndex = (this.currentPhotoIndex + 1) % this.photoUrls.length;

        this.prevPhotoUrl = this.photoUrls[prevIndex];
        this.nextPhotoUrl = this.photoUrls[nextIndex];
      } else {
        this.prevPhotoUrl = null;
        this.nextPhotoUrl = null;
      }
    } else {
      this.currentPhoto = null;
      this.prevPhotoUrl = null;
      this.nextPhotoUrl = null;
    }
  }

  nextPhoto(): void {
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photoUrls.length;
    this.updatePhoto();
  }

  prevPhoto(): void {
    this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photoUrls.length) % this.photoUrls.length;
    this.updatePhoto();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isFullscreen && event.key === 'Escape') {
      this.closeFullscreen();
    }
    if (this.photoUrls && this.photoUrls.length > 1) {
      if (event.key === 'ArrowRight') {
        this.nextPhoto();
      } else if (event.key === 'ArrowLeft') {
        this.prevPhoto();
      }
    }
  }

  openFullscreen(): void {
    this.isFullscreen = true;
  }

  closeFullscreen(): void {
    this.isFullscreen = false;
  }
}