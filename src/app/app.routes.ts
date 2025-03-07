import { Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { EducationComponent } from './education/education.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

export const routes: Routes = [
    { path: 'intro', component: IntroComponent },
    { path: 'work-experience', component: WorkExperienceComponent },
    { path: 'education', component: EducationComponent },
    { path: 'hobbies', component: HobbiesComponent },
    { path: 'contacts', component: ContactsComponent }
];