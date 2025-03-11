import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { WorkExperience } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { MatExpansionModule } from '@angular/material/expansion'; // Import expansion panel
import { MatIconModule } from '@angular/material/icon'; // Import icons
import { MatTableModule } from '@angular/material/table'; // Import table module
import { MatDividerModule } from '@angular/material/divider'; // Import divider module
import { MatCardModule } from '@angular/material/card'; // Import card module
import { MatListModule } from '@angular/material/list'; // Import list module

@Component({
  selector: 'app-work-experience',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent implements OnInit {
  workExperiences: WorkExperience[] | null = null;
  expandedIndices: number[] = [];

  constructor(readonly resumeParserService: ResumeParserService, readonly sanitizer: HtmlSanitizerService) { }

  ngOnInit(): void {
    this.resumeParserService.getResume().pipe(
      map(data => data?.work_experience ?? null)
    ).subscribe(workExperiences => {
      this.workExperiences = workExperiences;
    });
  }

  toggleExpanded(index: number): void {
    const expandedIndex = this.expandedIndices.indexOf(index);
    if (expandedIndex > -1) {
      this.expandedIndices.splice(expandedIndex, 1);
    } else {
      this.expandedIndices.push(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedIndices.indexOf(index) > -1;
  }

  getTechStackRows(techStack: string[]): string[][] {
    const rows: string[][] = [];
    for (let i = 0; i < techStack.length; i += 4) {
      rows.push(techStack.slice(i, i + 4));
    }
    return rows;
  }

  sanitizeHtml(html: string | undefined): SafeHtml {
    return this.sanitizer.sanitizeHtml(html);
  }
}