import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { materialImports } from '../../material';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, materialImports],
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent { }
