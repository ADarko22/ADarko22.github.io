import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { AchievementCategory, Achievement } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { PhotoSlideshowComponent } from '../photo-slideshow/photo-slideshow.component';
import { SafeHtml } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

@Component({
  selector: 'hall-of-fame',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    CommonModule,
    PhotoSlideshowComponent,
    MatExpansionModule,
    MatIconModule, // Add MatIconModule to imports
  ],
  templateUrl: './hall-of-fame.component.html',
  styleUrl: './hall-of-fame.component.scss',
})
export class HallOfFameComponent implements OnInit {
  hallOfFame: AchievementCategory[] | null = null;

  constructor(
    readonly resumeParserService: ResumeParserService,
    readonly sanitizer: HtmlSanitizerService
  ) {}

  ngOnInit(): void {
    this.resumeParserService.getResume().subscribe((data) => {
      this.hallOfFame = data?.hall_of_fame ?? null;
    });
  }

  trackByAchievementCategory(
    index: number,
    achievementCategory: AchievementCategory
  ): string {
    return achievementCategory.category;
  }

  trackByAchievement(index: number, achievement: Achievement): string {
    return achievement.title;
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.sanitizeHtml(html);
  }

  getCategoryIcon(category: string): string {
    switch (category.toLowerCase()) {
      case 'coding achievements':
        return 'code';
      case 'sw projects':
        return 'developer_board';
      case 'personal achievements':
        return 'emoji_events';
      default:
        return 'star';
    }
  }

  getAchievementIcon(achievementTitle: string): string {
    // Add logic to map achievement titles to icons if needed
    return 'military_tech';
  }
}