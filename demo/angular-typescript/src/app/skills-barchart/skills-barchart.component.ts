import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  Input,
  ElementRef
} from '@angular/core';
import * as SkillsBarChart from '../../../../..';
import { ICategoryData } from '../../../../..';


// Values of the "type" field for filtering skills based on types listed under each skill
export type FilterKeyword = 'ALL' | string;

@Component({
  selector: 'skills-barchart',
  template: '',
  encapsulation: ViewEncapsulation.None
})
export class SkillsBarchartComponent implements OnChanges {

  /**
   * The data to be rendered
   */
  @Input()
  data: ICategoryData[];

  /**
   * Filter the skills which have this type listed. 'ALL' means no filtering.
   */
  @Input()
  filterByType: FilterKeyword = 'ALL';

  /**
   * Internal reference to SkillsBarChart instance
   */
  private chart: SkillsBarChart;


  constructor(private el: ElementRef) {
    this.chart = new SkillsBarChart();
    this.chart
      .target(this.el.nativeElement);
  }

  ngOnChanges() {
    this.render();
  }

  render() {

    if (!this.data) {
      return;
    }

    this.chart
      .data(this.filterData(this.data))
      .render();
  }

  /**
   * Filters the data based on the value of this.filterKeyword
   * @param originalData The original data set, before any filtering
   */
  private filterData(originalData: ICategoryData[]): ICategoryData[] {
    switch (this.filterByType) {
      case 'ALL':
        return originalData;
      default:
        const copies = originalData.map(d => Object.assign({}, d));
        return copies.filter(d => {
          d.entries = d.entries.filter(entry => {
            return entry.types.some(type => {
              return type === this.filterByType;
            });
          });
          return d.entries.length > 0;
        });
    }
  }

}

