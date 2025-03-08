import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metadata {
  title: string;
  logo: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private metadataUrl = 'assets/data/metadata.json';
  private metadata$: Observable<Metadata>;

  constructor(private http: HttpClient) {
    this.metadata$ = this.http.get<Metadata>(this.metadataUrl);
  }

  getMetadata(): Observable<Metadata> {
    return this.metadata$;
  }
}