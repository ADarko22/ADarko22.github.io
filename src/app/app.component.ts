import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { ResumeParserService } from '../resume-parser/resume-parser.service';
import { Resume } from '../resume-parser/resume.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'Angelo Buono\'s Home';
  resume: Resume | null = null;

  constructor(private resumeParserService: ResumeParserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.resumeParserService.loadAndParseResume().subscribe(
      (data) => {
        this.resume = data;
        console.log(this.resume);
      },
      (error) => {
        console.error('Error loading resume:', error);
      }
    );
  }

  // TODO: extract in a ResumeComponent all the logic for sanitizing the HTML
  sanitizeHtml(html: string | undefined): SafeHtml {
    if (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return ""; 
  }
}
