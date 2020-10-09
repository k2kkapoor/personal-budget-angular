import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      console.log(data);
    });
  }
}
