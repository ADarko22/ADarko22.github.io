import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { AchievementCategory, Achievement } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { PhotoSlideshowComponent } from "../photo-slideshow/photo-slideshow.component";
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'hall-of-fame',
  imports: [MatCardModule, MatChipsModule, MatGridListModule, CommonModule, PhotoSlideshowComponent],
  templateUrl: './hall-of-fame.component.html',
  styleUrl: './hall-of-fame.component.scss'
})
export class HallOfFameComponent {
  hallOfFame: AchievementCategory[] | null = null;

    constructor(readonly resumeParserService: ResumeParserService, readonly sanitizer: HtmlSanitizerService) { }

    ngOnInit(): void {
        this.resumeParserService.getResume().subscribe(data => {
          this.hallOfFame = data?.hall_of_fame ?? null
      });
    }

  trackByAchievementCategory(index: number, achievementCategory: AchievementCategory): string {
    return achievementCategory.category;
  }
  
  trackByAchievement(index: number, achievement: Achievement): string {
    return achievement.title;
  }  
  
  sanitizeHtml(html: string | undefined): SafeHtml {
      return this.sanitizer.sanitizeHtml(html);
    }
}