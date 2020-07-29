import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>(); // EventEmitter payload is void

  constructor() { }

  ngOnInit(): void { }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }
}
