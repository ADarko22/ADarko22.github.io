import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ResumeParserService } from '../resume-service/resume-parser.service';
import { Contacts } from '../resume-service/resume.model';
import { IconService } from '../icon-service';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, MatIconModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contacts: Contacts | null = null;

  constructor(readonly resumeParserService: ResumeParserService, private iconService: IconService) {}

  ngOnInit(): void {
      this.resumeParserService.getResume().subscribe(data => {
        this.contacts = data?.contacts ?? null;
    });
    this.iconService.registerIcons()
  }
}
