/// <reference types="d3" />

class SkillsBarChart {
  
  private _data: ICategoryData[];
  private _margin = { left: 10, right: 10, top: 10, bottom: 30 };
  private _el: d3.Selection<any, any, any, any>;
  private _svg: d3.Selection<any, any, any, any>;
  private _inner: d3.Selection<any, any, any, any>;
  private _lineHeight: number = 45;
  private _labelWidth: number = 75;
  private _animDuration: number = 1700;
  private _guidesGrp: d3.Selection<any, any, any, any>;
  private _scale = d3.scaleLinear().domain([0, 100]);
  
  constructor(options?: ISkillsBarChartOptions) {

    if (options.data) {
      this.data(options.data);
    }

    if (options.target) {
      this.target(options.target);
    }

    if (options.lineHeight) {
      this._lineHeight = options.lineHeight;
    }

  }

  data(data: ICategoryData[]): SkillsBarChart {
    this._data = data;
    return this;
  }

  target(el: any): SkillsBarChart {
    this._el = d3.select(el);
    let svg = this._svg = this._el
      .append('svg')
      .style('display', 'block');

    let inner = this._inner = svg
      .append('g')
      .classed('skills-barchart-inner', true)
      .attr('transform', `translate(${this._margin.left}, ${this._margin.top})`);
    

    this._guidesGrp = svg
      .append('g')
      .classed('skills-barchart-guides', true);
    return this;
  }

  render() {
    // determine new height needed
    let lines = 0;
    let lastYOffset = 0;
    this._data.forEach(c => {
      // one for the category name
      lines++;
      // one for each category entry
      lines += c.entries.length;
      // set the y-offset for this and the next category
      c.yOffset = lastYOffset;
      lastYOffset = lastYOffset + (c.entries.length + 1) * this._lineHeight;
    });
    let height = lines * this._lineHeight;
    let width = 600;
    let innerWidth = width - this._margin.left - this._margin.right;

    // Update the scale's range
    let scale = this._scale;
    scale.range([0, innerWidth - this._labelWidth]);

    // References to svg and inner <g> (called ctx)
    let svg = this._svg;
    let ctx = this._inner;

    // Update the height of the svg
    svg
    .transition()
    .duration(this._animDuration)
    .attr('height', height + this._margin.top + this._margin.bottom)
    .attr('width', width);


    // JOIN (skill categories)
    let category = ctx.selectAll('g.skill-category')
      .data(this._data, (d: ICategoryData) => d.name);
    
    // ENTER (skill categories)
    let newCategory = category.enter()
      .append('g')
      .classed('skill-category', true)
      .attr('transform', 'translate(0,0)'); // start at zero

    // add the category title
    newCategory
      .append('text')
      .classed('skill-category-title', true)
      .style('font-size', '120%')
      .attr('dy', '1em')
      .text(c => c.name)
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${innerWidth / 2}, 0)`)

    // MERGE (skill categories)
    category = newCategory
      .merge(category);
    

    // ENTER+UPDATE (skill categories)
    category
      .transition()
      .duration(this._animDuration)
      .attr('transform', (c: ICategoryData) => `translate(0, ${c.yOffset})`);
    

    // JOIN (skills)
    let skill = category
    .selectAll('g.skill-group')
    .data(c => c.entries, (e: ISkillEntry) => e.name);

    // ENTER (skills)
    let newSkill = skill.enter()
      .append('g')
      .classed('skill-group', true)
      .attr('transform', `translate(${this._labelWidth},0)`);

    // add skill name
    newSkill
      .append('text')
      .classed('skill-name', true)
      .text(s => s.name)
      .attr('transform', 'translate(-5,0)')
      .attr('dy', '1em')
      .attr('text-anchor', 'end');
    
    // add skill level
    newSkill
      .append('rect')
      .classed('skill-level', true)
      .attr('width', 0)
      .attr('height', 20)
      .attr('fill', function() {
        let cat: ICategoryData = d3.select((this as any).parentNode.parentNode).datum() as ICategoryData;
        return cat.color;
      });


    // MERGE (skills)
    skill = newSkill
      .merge(skill);

    // ENTER+UPDATE (skills)
    skill
      .transition()
      .duration(this._animDuration)
      .attr('transform', (d, i) => `translate(${this._labelWidth}, ${(i + 1) * this._lineHeight})`);
      
    skill.select('rect.skill-level')
      .transition()
      .duration(this._animDuration)
      .attr('width', (s: ISkillEntry) => scale(s.score));


  }

}

interface ICategoryData<T = string> {
  name: string;
  color: string;
  yOffset?: number; // added by this library
  entries: ISkillEntry<T>[]
}

interface ISkillEntry<T = string> {
  name: string;
  score: number;
  types?: T[];
};

interface ISkillsBarChartOptions {
  data: ICategoryData[];
  target?: any;
  lineHeight?: number;
}
