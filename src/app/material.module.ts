import { NgModule } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'

const modules = [MatToolbarModule, MatCardModule]

@NgModule({
  exports: modules,
})
export class MaterialModule {}
