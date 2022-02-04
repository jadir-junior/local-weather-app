import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { IPostalCode, PostalCodeService } from './postal-code.service'

import { TestBed } from '@angular/core/testing'

const postalCode = 'jundiai'
const expectedUrl =
  'http://api.geonames.org/postalCodeSearchJSON?maxRows=1&username=localcast&postalcode=jundiai'

describe('PostalCodeService', () => {
  let service: PostalCodeService
  let controller: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })

    service = TestBed.inject(PostalCodeService)
    controller = TestBed.inject(HttpTestingController)
  })

  it('search for a postal code', () => {
    let actualPostalCodes: IPostalCode | undefined
    service.resolvePostalCode(postalCode).subscribe((otherPostalCodes) => {
      actualPostalCodes = otherPostalCodes
    })

    const request = controller.expectOne(expectedUrl)

    request.flush({
      postalCodes: [
        {
          countryCode: '12',
          postalCode: 'jundiai',
          placeName: 'string',
          lng: 10,
          lat: 20,
        },
      ],
    })
    controller.verify()

    expect(actualPostalCodes).toEqual({
      countryCode: '12',
      postalCode: 'jundiai',
      placeName: 'string',
      lng: 10,
      lat: 20,
    })
  })
})
