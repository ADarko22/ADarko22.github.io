import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoSlideshowComponent } from '../photo-slideshow/photo-slideshow.component';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Intro } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'intro',
  imports: [CommonModule, PhotoSlideshowComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {
  intro: Intro | null = null;
  photoUrls: string[] = []; 

  constructor(private resumeParserService: ResumeParserService, private sanitizer: HtmlSanitizerService) { }

  ngOnInit(): void {
    this.resumeParserService.getResume().subscribe(data => {
      if (data && data.intro) {
        this.intro = data.intro;
        if (this.intro.photos) {
          this.photoUrls = this.intro.photos;
        } else {
          this.photoUrls = [];
        }
      } else {
        this.intro = null;
        this.photoUrls = [];
      }
    });
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.sanitizeHtml(html);
  }
}