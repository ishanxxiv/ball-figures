import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Player} from '../player';
import {Players} from '../mock.top-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  players=Players;
  ngOnInit() {

  }

  navigateCompare() {
    this.router.navigate(['compare']);
  }

}
