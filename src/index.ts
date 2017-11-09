/// <reference types="d3" />

class SkillsBarChart {
  
  private _data: ICategoryData[];
  private _margin = { left: 30, right: 30, top: 30, bottom: 30 };
  private _el: d3.Selection<any, any, any, any>;
  private _svg: d3.Selection<any, any, any, any>;
  private _inner: d3.Selection<any, any, any, any>;
  private _lineHeight: number = 30;
  private _animDuration: number = 1700;
  private _guidesGrp: d3.Selection<any, any, any, any>;
  private _scale = d3.scaleLinear().domain([0, 100]);
  private _guideData: IGuideData[] = [
    { label: 'Novice', value: 0, anchor: 'start' },
    { label: 'Proficient', value: 33, anchor: 'middle' },
    { label: 'Advanced', value: 66, anchor: 'middle' },
    { label: 'Expert', value: 100, anchor: 'end' }
  ];
  
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

    this._guidesGrp = inner
      .append('g')
      .classed('skills-barchart-guides', true);
    
    return this;
  }

  render() {
    // determine new height needed
    let lines = 0;
    let lastYOffset = 0;
    this._data.forEach(c => {
      // one for each category entry
      lines += c.entries.length;
      // set the y-offset for this and the next category
      c.yOffset = lastYOffset;
      c.height = c.entries.length * this._lineHeight;
      lastYOffset = lastYOffset + c.height;
    });
    let height = lines * this._lineHeight;
    let width = 600;
    let innerWidth = width - this._margin.left - this._margin.right;

    // Update the scale's range
    let scale = this._scale;
    scale.range([0, innerWidth]);

    // References to svg and inner <g> (called ctx)
    let svg = this._svg;
    let ctx = this._inner;

    // Update the height of the svg
    svg
    .transition()
    .duration(this._animDuration)
    .attr('height', height + this._margin.top + this._margin.bottom)
    .attr('width', width);

    this._guidesGrp
      .attr('transform', `translate(0, -10)`);

    // JOIN (guides)
    let guide = this._guidesGrp.selectAll('g.skill-level-guide')
      .data(this._guideData, (g: IGuideData) => g.label);
    
    // EXIT (guides)
    guide.exit().remove();

    // ENTER (guides)
    let newGuide = guide.enter()
      .append('g')
      .classed('skill-level-guide', true)
      .attr('transform', g => `translate(${scale(g.value)}, 0)`);
    newGuide
      .append('text')
      .classed('skill-level-guide-label', true)
      .attr('text-anchor', g => g.anchor)
      .attr('fill', '#CCC')
      .attr('dy', '-0.4em')
      .text(g => g.label);
    newGuide
      .append('line')
      .classed('skill-level-guide-line', true)
      .attr('stroke', '#CCC')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 0)

    // MERGE (guides)
    guide = newGuide.merge(guide);

    // ENTER+UPDATE (guides)
    guide
      .select('line.skill-level-guide-line')
      .transition()
      .duration(this._animDuration)
      .attr('y2', height)

    // JOIN (categories)
    let category = ctx.selectAll('g.skill-category')
      .data(this._data, (d: ICategoryData) => d.name);

    // EXIT (categories)
    category.exit()
      .transition()
      .duration(this._animDuration)
      .style('opacity', 0)
      .remove();
    
    // ENTER (categories)
    let newCategory = category.enter()
      .append('g')
      .classed('skill-category', true)
      .attr('transform', 'translate(0,0)'); // start at zero

    // add category background
    newCategory
      .append('rect')
      .classed('skill-category-title-bg', true)
      .attr('fill', '#DEDEDE')
      .attr('x', innerWidth + 3)
      .attr('y', 0)
      .attr('width', this._lineHeight - 3)
      .attr('height', c => c.height - 5);

    // add the category title
    newCategory
      .append('text')
      .classed('skill-category-title', true)
      .style('font-size', '120%')
      .attr('dx', '0.4em')
      .attr('dy', '-0.6em')
      .text(c => c.name)
      .attr('transform', c => `translate(${innerWidth}, 0) rotate(90)`);

    // MERGE (categories)
    category = newCategory
      .merge(category);

    // ENTER+UPDATE (categories)
    category
      .transition()
      .duration(this._animDuration)
      .attr('transform', (c: ICategoryData) => `translate(0, ${c.yOffset})`);
    
    // ENTER+UPDATE (skill category title backgrounds)
    category
      .select('rect.skill-category-title-bg')
      .attr('x', innerWidth + 3)
      .attr('height', c => c.height - 5);

    // JOIN (skills)
    let skill = category
    .selectAll('g.skill-group')
    .data(c => c.entries, (e: ISkillEntry) => e.name);

    // ENTER (skills)
    let newSkill = skill.enter()
      .append('g')
      .classed('skill-group', true);
    
    // EXIT (skills)
    skill.exit()
      .transition()
      .duration(this._animDuration)
      .style('opacity', 0)
      .remove();
    
    // add skill level
    newSkill
      .append('rect')
      .classed('skill-level', true)
      .attr('width', 0)
      .attr('height', 25)
      .style('opacity', 0.8)
      .attr('fill', function() {
        let cat: ICategoryData = d3.select((this as any).parentNode.parentNode).datum() as ICategoryData;
        return cat.color;
      });

    // add skill name
    newSkill
      .append('text')
      .classed('skill-name', true)
      .text(s => s.name)
      .attr('transform', 'translate(5,0)')
      .attr('font-size', 16)
      .attr('fill', 'white')
      .attr('dy', '1em');

    // MERGE (skills)
    skill = newSkill
      .merge(skill);

    // ENTER+UPDATE (skills)
    skill
      .transition()
      .duration(this._animDuration)
      .attr('transform', (d, i) => `translate(0, ${i * this._lineHeight})`);
      
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
  height?: number; // added by this library
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

interface IGuideData {
  label: string;
  value: number;
  anchor: 'start' | 'middle' | 'end';
}
