import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { materialImports } from '../../material';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, ...materialImports],
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
    isDark = false;

    ngOnInit(): void {
        const storedTheme = localStorage.getItem('theme');
        this.isDark = storedTheme === 'dark';
        this.applyTheme();
    }

    toggleTheme(): void {
        this.isDark = !this.isDark;
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
        this.applyTheme();
    }

    private applyTheme(): void {
        document.body.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    }
}
