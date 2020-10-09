import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from 'd3';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterContentInit {
  constructor(private http: HttpClient) {}

  ngAfterContentInit(): void {}
}
