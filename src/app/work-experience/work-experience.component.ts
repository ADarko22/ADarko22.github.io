import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ResumeParserService } from '../resume-service/resume-parser.service';
import { WorkExperience } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-work-experience',
  imports: [CommonModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss'
})
export class WorkExperienceComponent {
    workExperiences: WorkExperience[] | null = null;

    constructor(private resumeParserService: ResumeParserService, private sanitizer: HtmlSanitizerService) { }

    ngOnInit(): void {
        this.resumeParserService.getResume().subscribe(data => {
          this.workExperiences = data?.work_experience ?? null;
      });
    }

    // TODO:  provide the sanitized elements specifically for the Work Experience
    // TODO:  change the HTML to have expandable sections for more details
    // TODO:  organize the tech stack in an easy way

    sanitizeHtml(html: string | undefined): SafeHtml {
        return this.sanitizer.sanitizeHtml(html)
    }
}
