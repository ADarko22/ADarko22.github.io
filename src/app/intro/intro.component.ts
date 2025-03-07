import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Intro } from '../resume-service/resume.model';
import { HtmlSanitizerService } from '../html-sanitizer.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-intro',
  imports: [CommonModule],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
    intro: Intro | null = null;

    constructor(private resumeParserService: ResumeParserService, private sanitizer: HtmlSanitizerService) { }

    ngOnInit(): void {
        this.resumeParserService.getResume().subscribe(data => {
          this.intro = data?.intro ?? null;
      });
    }

    // TODO:  provide the sanitized elements specifically for the Intro
    // TODO:  implement a way to load all the photos from the assets/intro-photos folder and remove the field from the json!

    sanitizeHtml(html: string | undefined): SafeHtml {
        return this.sanitizer.sanitizeHtml(html)
    }
}
