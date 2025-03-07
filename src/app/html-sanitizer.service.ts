// html-sanitizer.service.ts
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify';

@Injectable({
    providedIn: 'root',
})
export class HtmlSanitizerService {
    constructor(private sanitizer: DomSanitizer) {}

    sanitizeHtml(html: string | undefined): SafeHtml {
        if (html) {
            return this.sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(html));
        }
        return '';
    }
}