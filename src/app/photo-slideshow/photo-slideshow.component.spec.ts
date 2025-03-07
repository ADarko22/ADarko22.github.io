import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoSlideshowComponent } from './photo-slideshow.component';

describe('PhotoSlideshowComponent', () => {
  let component: PhotoSlideshowComponent;
  let fixture: ComponentFixture<PhotoSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoSlideshowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
