import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { WorkExperience } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';
import { map, catchError, of } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-work-experience',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkExperienceComponent implements OnInit {
  workExperiences: WorkExperience[] | null = null;
  isLoading = true;

  constructor(
    readonly resumeParserService: ResumeParserService,
    readonly sanitizer: HtmlSanitizerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resumeParserService
      .getResume()
      .pipe(
        map((data) => data?.work_experience ?? null),
        catchError((error) => {
          console.error('Error fetching resume:', error);
          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((workExperiences) => {
        console.log('Work Experiences Data:', workExperiences);
        this.workExperiences = workExperiences;
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.sanitizeHtml(html);
  }

  formatDate(dateString: string | null | undefined): string | null {
    if (!dateString) return null;
    const date = new Date(dateString);
    return formatDate(date, 'MMM yyyy', 'en-US');
  }

  trackByWorkExperience(index: number, work: WorkExperience): string {
    if (!work) {
      return "";
    }
    return work.company + work.job_title;
  }

  trackByResponsibility(index: number, responsibility: string): string {
    return responsibility;
  }
}