import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoSlideshowComponent } from '../photo-slideshow/photo-slideshow.component';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Intro, Language } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'intro',
  imports: [CommonModule, PhotoSlideshowComponent, MatChipsModule, MatIconModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements OnInit {
  intro: Intro | null = null;
  photoUrls: string[] = [];

  constructor(
    readonly resumeParserService: ResumeParserService,
    readonly sanitizer: HtmlSanitizerService
  ) {}

  ngOnInit(): void {
    this.resumeParserService.getResume().subscribe((data) => {
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

  trackByLanguage(index: number, language: Language): string {
    return language.name;
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.sanitizeHtml(html);
  }

  getProficiencyClass(proficiency: string): string {
    switch (proficiency) {
      case 'Native':
        return 'native';
      case 'Full Professional':
        return 'full-professional';
      case 'Professional Working':
        return 'professional-working';
      case 'Limited Working':
        return 'limited-working';
      case 'Elementary':
        return 'elementary';
      default:
        return '';
    }
  }

  getLanguageIcon(languageName: string): string {
    switch (languageName.toLowerCase()) {
      case 'italian':
        return 'assets/country-flags/flag_italy.webp';
      case 'english':
        return 'assets/country-flags/flag_uk.webp';
      case 'french':
        return 'assets/country-flags/flag_france.webp';
      case 'spanish':
        return 'assets/country-flags/flag_spain.webp';
      case 'romanian':
        return 'assets/country-flags/flag_romania.webp';
      case 'german':
        return 'assets/country-flags/flag_germany.webp';
      case 'portuguese':
        return 'assets/country-flags/flag_portugal.webp';
      case 'chinese':
        return 'assets/country-flags/flag_china.webp';
      case 'japanese':
        return 'assets/country-flags/flag_japan.webp';
      default:
        return 'assets/country-flags/flag_default.webp'; 
    }
  }
}