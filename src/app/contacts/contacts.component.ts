import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Contacts } from '../resume-service/resume.model';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contacts: Contacts | null = null;

  constructor(private resumeParserService: ResumeParserService) { }

  ngOnInit(): void {
      this.resumeParserService.getResume().subscribe(data => {
        this.contacts = data?.contacts ?? null;
    });
  }
}
