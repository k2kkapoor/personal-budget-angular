import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';
import * as d3 from 'd3';

@Component({
  selector: 'pb-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  public dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
          '#FF8A33',
          '#33BEFF',
          '#33FF8D',
          '#3390FF',
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [],
  };

  //Data for D3JS
  public data3J = [];

  private svg;
  private margin = 10;
  private width = 500;
  private height = 500;

  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createSvg(): void {
    this.svg = d3
      .select('figure#d3jsPie')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(): void {
    this.colors = d3
      .scaleOrdinal()
      .domain(this.data3J.map((d) => d.budget.toString()))
      .range([
        '#ffcd56',
        '#ff6384',
        '#36a2eb',
        '#fd6b19',
        '#FF8A33',
        '#33BEFF',
        '#33FF8D',
        '#3390FF',
      ]);
  }

  private drawChart(): void {
    //Positioning of the pies in the chart.
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    // Pie chart construct
    this.svg
      .selectAll('pieces')
      .data(pie(this.data3J))
      .enter()
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Labels for the chart
    const labelLocation = d3.arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data3J))
      .enter()
      .append('text')
      .text((d) => d.data.title)
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 12);
  }

  constructor(public dataService: DataService) {}

  createChart() {
    var ctx = document.getElementById('myChart');
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }

  ngOnInit(): void {
    //call for data from the data service.
    this.dataService.getData().subscribe((res) => {
      console.log(res);
      this.data3J = res.myBudget;
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i] = res.myBudget[i].title;
      }

      //calls to functions to create charts
      this.createChart();
      this.createSvg();
      this.createColors();
      this.drawChart();
    });
  }
}
