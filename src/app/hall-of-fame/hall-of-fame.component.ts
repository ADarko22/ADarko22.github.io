import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { HallOfFame, Achievement } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { PhotoSlideshowComponent } from '../photo-slideshow/photo-slideshow.component';
import { SafeHtml } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './hall-of-fame.component.html',
  styleUrl: './hall-of-fame.component.scss',
})
export class HallOfFameComponent implements OnInit {
  hallOfFames: HallOfFame[] | null = null;
  selectedAchievement: Achievement | null = null;
  menuMinimized: boolean = false;
  expandedHallOfFames: boolean[] = [];

  constructor(
    readonly resumeParserService: ResumeParserService,
    readonly sanitizer: HtmlSanitizerService
  ) {}

  ngOnInit(): void {
    this.resumeParserService.getResume().subscribe((data) => {
      this.hallOfFames = data?.hall_of_fame ?? null;
      this.expandedHallOfFames = this.hallOfFames?.map((_, i) => true) ?? [];
      if (this.hallOfFames && this.hallOfFames.length > 0 && this.hallOfFames[0].achievements && this.hallOfFames[0].achievements.length > 0) {
        this.selectedAchievement = this.hallOfFames[0].achievements[0];
      }
    });
  }

  trackByAchievementCategory(index: number, hallOfFame: HallOfFame): string {
    return hallOfFame.category;
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
      case 'work achievements':
        return 'developer_board';
      case 'personal achievements':
        return 'emoji_events';
      default:
        return 'star';
    }
  }

  getAchievementIcon(achievementTitle: string): string {
    return 'military_tech';
  }

  selectAchievement(achievement: Achievement): void {
    this.selectedAchievement = achievement;
  }

  toggleMenu(): void {
    this.menuMinimized = !this.menuMinimized;
  }

  setExpanded(index: number, expanded: boolean): void {
    this.expandedHallOfFames[index] = expanded;
  }

  trackByLink(index: number, link: string): string {
    return link;
  }
}