import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Education } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
    educations: Education[] | null = null;

    constructor(readonly resumeParserService: ResumeParserService, private sanitizer: HtmlSanitizerService) { }

    ngOnInit(): void {
        this.resumeParserService.getResume().subscribe(data => {
          this.educations = data?.education ?? null
      });
    }

    // TODO:  provide the sanitized elements specifically for the Intro
    // TODO:  implement a way to load all the photos from the assets/intro-photos folder and remove the field from the json!

    sanitizeHtml(html: string | undefined): SafeHtml {
        return this.sanitizer.sanitizeHtml(html)
    }
}
