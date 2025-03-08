import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Resume } from './resume.model';

@Injectable({
    providedIn: 'root',
})
export class ResumeParserService {
    readonly ajv: Ajv;
    readonly resumeSubject = new BehaviorSubject<Resume | null>(null);
    readonly resume$: Observable<Resume | null>; 

    constructor(readonly http: HttpClient) {
        this.ajv = new Ajv();
        addFormats(this.ajv);
        this.resume$ = this.loadAndParseResume().pipe(
            shareReplay(1),
            catchError(error => {
                console.error('Error loading resume:', error);
                return of(null);
            })
        );
        this.loadResume();
    }

    getResume(): Observable<Resume | null> {
        return this.resumeSubject.asObservable();
    }

    private loadResume(): void {
        this.resume$.pipe(
            tap(data => this.resumeSubject.next(data))
        ).subscribe();
    }

    private loadAndParseResume(): Observable<Resume> {
        return forkJoin({
            schema: this.http.get<JSON>('assets/data/resume-schema.json'),
            resume: this.http.get<JSON>('assets/data/resume.json'),
        }).pipe(
            map(({ schema, resume }) => {
                console.log("Resume loaded")
                const validate = this.ajv.compile(schema);
                const valid = validate(resume);

                if (!valid) {
                    console.error('Resume validation failed:', validate.errors);
                    throw new Error('Resume validation failed.');
                }
                console.log("Resume validated")

                return resume as unknown as Resume;
            })
        );
    }
}