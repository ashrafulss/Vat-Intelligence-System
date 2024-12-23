import { HttpHeaders } from '@angular/common/http';
// import { environment } from '@src/environments/environment';
import { v4 as uuid } from 'uuid';

export const CONTENT_TYPE = 'application/json';
export const REQUEST_TIMEOUT_IN_SECONDS = '30';



export function getHttpHeaders(): HttpHeaders {
    return new HttpHeaders()
        .set('content-type', CONTENT_TYPE)
        .set('request-id', uuid())
        .set('request-time', new Date().toISOString())
        .set('request-timeout-in-seconds', REQUEST_TIMEOUT_IN_SECONDS);
}

