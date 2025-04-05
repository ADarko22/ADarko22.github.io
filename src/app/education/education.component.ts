import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Education } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../resume-service/html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-education',
  imports: [
        CommonModule,
        MatExpansionModule,
        MatListModule,
        MatIconModule,
        MatGridListModule
  ],
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
    
    sanitizeHtml(html: string | undefined): SafeHtml {
        return this.sanitizer.sanitizeHtml(html)
    }

    trackByEducation(index: number, education: any): any {
      return education.id;
    }
  
    trackByPublication(index: number, publication: any): any {
      return publication; 
    }
}
