import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'

@NgModule({
  declarations: [AppComponent, CurrentWeatherComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
