import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild,
  HostListener,
  AfterViewInit,
} from '@angular/core';
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
export class PhotoSlideshowComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() photoUrls: string[] = [];
  currentPhotoIndex: number = 0;
  currentPhoto: string | null = null;
  prevPhotoUrl: string | null = null;
  nextPhotoUrl: string | null = null;
  private destroy$ = new Subject<void>();
  isLoading: boolean = false;
  isFullscreen: boolean = false;
  private preloadedImages: { [url: string]: boolean } = {};

  @ViewChild('fullscreenOverlay') fullscreenOverlay: ElementRef | undefined;
  private touchStartX = 0;

  ngOnInit(): void {
    this.updatePhoto();
  }

  ngAfterViewInit(): void {
    // Ensure the fullscreen overlay element is available after the view is initialized.
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['photoUrls']) {
      this.currentPhotoIndex = 0;
      this.preloadImages(changes['photoUrls'].currentValue);
      this.updatePhoto();
    }
  }

  ngOnDestroy(): void {
    this.removeTouchListeners();
    this.destroy$.next();
    this.destroy$.complete();
  }

  preloadImages(urls: string[]): void {
    urls.forEach(url => {
      if (!this.preloadedImages[url]) {
        const img = new Image();
        img.onload = () => {
          this.preloadedImages[url] = true;
        };
        img.src = url;
      }
    });
  }

  updatePhoto(): void {
    this.isLoading = true;
    this.currentPhoto = null;

    if (this.photoUrls && this.photoUrls.length > 0) {
      this.loadImage(this.photoUrls[this.currentPhotoIndex]).then(() => {
        this.currentPhoto = this.photoUrls[this.currentPhotoIndex];
        this.isLoading = false;
        this.updatePrevNext();
      });
    } else {
      this.isLoading = false;
      this.updatePrevNext();
    }
  }

  loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }

  updatePrevNext(): void {
    if (this.photoUrls && this.photoUrls.length > 1) {
      const prevIndex = (this.currentPhotoIndex - 1 + this.photoUrls.length) % this.photoUrls.length;
      const nextIndex = (this.currentPhotoIndex + 1) % this.photoUrls.length;
      this.preloadImage(this.photoUrls[prevIndex]);
      this.preloadImage(this.photoUrls[nextIndex]);
      this.prevPhotoUrl = this.photoUrls[prevIndex];
      this.nextPhotoUrl = this.photoUrls[nextIndex];
    } else {
      this.prevPhotoUrl = null;
      this.nextPhotoUrl = null;
    }
  }

  preloadImage(url: string | null): void {
    if (url && !this.preloadedImages[url]) {
      const img = new Image();
      img.onload = () => {
        this.preloadedImages[url] = true;
      };
      img.src = url;
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

  handleTouchStart = (event: TouchEvent) => {
    this.touchStartX = event.touches[0].clientX;
  };

  handleTouchEnd = (event: TouchEvent) => {
    if (!this.touchStartX || !event.changedTouches[0]) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - this.touchStartX;
    const sensitivity = 50;

    if (deltaX > sensitivity) {
      this.prevPhoto();
    } else if (deltaX < -sensitivity) {
      this.nextPhoto();
    }

    this.touchStartX = 0;
  };

  private addTouchListeners(): void {
    if (this.fullscreenOverlay) {
      this.fullscreenOverlay.nativeElement.addEventListener('touchstart', this.handleTouchStart);
      this.fullscreenOverlay.nativeElement.addEventListener('touchend', this.handleTouchEnd);
    }
  }

  private removeTouchListeners(): void {
    if (this.fullscreenOverlay) {
      this.fullscreenOverlay.nativeElement.removeEventListener('touchstart', this.handleTouchStart);
      this.fullscreenOverlay.nativeElement.removeEventListener('touchend', this.handleTouchEnd);
    }
  }

  openFullscreen(): void {
    this.isFullscreen = true;
    // Add listeners immediately when opening fullscreen
    setTimeout(() => {
      this.addTouchListeners();
    }, 0);
  }

  closeFullscreen(): void {
    this.isFullscreen = false;
    this.removeTouchListeners();
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
}