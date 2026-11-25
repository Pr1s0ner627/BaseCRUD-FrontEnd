import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

export interface AuthEntryResponse {
    message: string;
    token: string;
    userID: number;
    email: string;
    displayName: string;
    redirectURL: string;
}

export interface LoginRequest   {
    email: string;
    password: string
}

@Injectable({
    providedIn: 'root'
})

export class AuthEntry {
    private http = inject(HttpClient);
    private apiURL = `${environment.apiUrl}/Employee/AuthEntry`;

    enter(request: LoginRequest): Observable<AuthEntryResponse>  {
        return this.http.post<AuthEntryResponse>(
            `${this.apiURL}`, request, { withCredentials: true }
        );
    }
}
