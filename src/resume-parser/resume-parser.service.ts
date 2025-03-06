import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Resume } from './resume.model';

@Injectable({
    providedIn: 'root',
})
export class ResumeParserService {
    private ajv: Ajv;

    constructor(private http: HttpClient) {
        this.ajv = new Ajv();
        addFormats(this.ajv);
    }

    loadAndParseResume(): Observable<Resume> { // Change return type to Observable<Resume>
        return forkJoin({
            schema: this.http.get<JSON>('assets/data/resume-schema.json'),
            resume: this.http.get<JSON>('assets/data/resume.json'),
        }).pipe(
            map(({ schema, resume }) => {
                const validate = this.ajv.compile(schema);
                const valid = validate(resume);

                if (!valid) {
                    console.error('Resume validation failed:', validate.errors);
                    throw new Error('Resume validation failed.');
                }

                return resume as unknown as Resume; // Type assertion here
            }),
            catchError((error) => {
                console.error('Error loading or parsing resume:', error);
                return of({ error: error.message } as unknown as Resume); // Type assertion for error case
            })
        );
    }
}