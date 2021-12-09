import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { defaultIfEmpty, mergeMap, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

export interface IPostalCode {
  countryCode: string
  postalCode: string
  placeName: string
  lng: number
  lat: number
}

export const defaultPostalCode: IPostalCode = {
  countryCode: '--',
  postalCode: '--',
  placeName: '--',
  lng: 0,
  lat: 0,
}

export interface IPostalCodeData {
  postalCodes: [IPostalCode]
}

export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode>
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  constructor(private httpClient: HttpClient) {}

  resolvePostalCode(postalCode: string): Observable<IPostalCode> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.GEONAMES_USERNAME)
      .set('postalcode', postalCode)

    return this.httpClient
      .get<IPostalCodeData>(
        `${environment.BASE_URL}${environment.GEONAMES_API}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        mergeMap((data) => data.postalCodes),
        defaultIfEmpty(defaultPostalCode)
      )
  }
}
