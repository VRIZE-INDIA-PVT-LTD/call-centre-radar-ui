import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly navItems = [
    { label: 'Overview', path: '/dashboard' },
    { label: 'Upload', path: '/upload' },
    { label: "Manager's Attention", path: '/attention' },
    { label: 'Customer Directory', path: '/customers' },
    { label: 'Agent Performance', path: '/agents' },
  ];
}
