import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MainMenuComponent } from './main-menu/main-menu.component'
import { ForksComponent } from './forks/forks.component'

const routes: Routes = [
    {
        path: '',
        component: MainMenuComponent,
    },
    {
        path: ':user/:repository',
        component: ForksComponent
      },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
