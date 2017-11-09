var SkillsBarChart = (function () {
    function SkillsBarChart(options) {
        this._margin = { left: 30, right: 30, top: 30, bottom: 30 };
        this._lineHeight = 30;
        this._animDuration = 1700;
        this._scale = d3.scaleLinear().domain([0, 100]);
        this._guideData = [
            { label: 'Novice', value: 0, anchor: 'start' },
            { label: 'Proficient', value: 33, anchor: 'middle' },
            { label: 'Advanced', value: 66, anchor: 'middle' },
            { label: 'Expert', value: 100, anchor: 'end' }
        ];
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
    SkillsBarChart.prototype.data = function (data) {
        this._data = data;
        return this;
    };
    SkillsBarChart.prototype.target = function (el) {
        this._el = d3.select(el);
        var svg = this._svg = this._el
            .append('svg')
            .style('display', 'block');
        var inner = this._inner = svg
            .append('g')
            .classed('skills-barchart-inner', true)
            .attr('transform', "translate(" + this._margin.left + ", " + this._margin.top + ")");
        this._guidesGrp = inner
            .append('g')
            .classed('skills-barchart-guides', true);
        return this;
    };
    SkillsBarChart.prototype.render = function () {
        var _this = this;
        var lines = 0;
        var lastYOffset = 0;
        this._data.forEach(function (c) {
            lines += c.entries.length;
            c.yOffset = lastYOffset;
            c.height = c.entries.length * _this._lineHeight;
            lastYOffset = lastYOffset + c.height;
        });
        var height = lines * this._lineHeight;
        var width = 600;
        var innerWidth = width - this._margin.left - this._margin.right;
        var scale = this._scale;
        scale.range([0, innerWidth]);
        var svg = this._svg;
        var ctx = this._inner;
        svg
            .transition()
            .duration(this._animDuration)
            .attr('height', height + this._margin.top + this._margin.bottom)
            .attr('width', width);
        this._guidesGrp
            .attr('transform', "translate(0, -10)");
        var guide = this._guidesGrp.selectAll('g.skill-level-guide')
            .data(this._guideData, function (g) { return g.label; });
        guide.exit().remove();
        var newGuide = guide.enter()
            .append('g')
            .classed('skill-level-guide', true)
            .attr('transform', function (g) { return "translate(" + scale(g.value) + ", 0)"; });
        newGuide
            .append('text')
            .classed('skill-level-guide-label', true)
            .attr('text-anchor', function (g) { return g.anchor; })
            .attr('fill', '#CCC')
            .attr('dy', '-0.4em')
            .text(function (g) { return g.label; });
        newGuide
            .append('line')
            .classed('skill-level-guide-line', true)
            .attr('stroke', '#CCC')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 0);
        guide = newGuide.merge(guide);
        guide
            .select('line.skill-level-guide-line')
            .transition()
            .duration(this._animDuration)
            .attr('y2', height);
        var category = ctx.selectAll('g.skill-category')
            .data(this._data, function (d) { return d.name; });
        category.exit()
            .transition()
            .duration(this._animDuration)
            .style('opacity', 0)
            .remove();
        var newCategory = category.enter()
            .append('g')
            .classed('skill-category', true)
            .attr('transform', 'translate(0,0)');
        newCategory
            .append('rect')
            .classed('skill-category-title-bg', true)
            .attr('fill', '#DEDEDE')
            .attr('x', innerWidth + 3)
            .attr('y', 0)
            .attr('width', this._lineHeight - 3)
            .attr('height', function (c) { return c.height - 5; });
        newCategory
            .append('text')
            .classed('skill-category-title', true)
            .style('font-size', '120%')
            .attr('dx', '0.4em')
            .attr('dy', '-0.6em')
            .text(function (c) { return c.name; })
            .attr('transform', function (c) { return "translate(" + innerWidth + ", 0) rotate(90)"; });
        category = newCategory
            .merge(category);
        category
            .transition()
            .duration(this._animDuration)
            .attr('transform', function (c) { return "translate(0, " + c.yOffset + ")"; });
        category
            .select('rect.skill-category-title-bg')
            .attr('x', innerWidth + 3)
            .attr('height', function (c) { return c.height - 5; });
        var skill = category
            .selectAll('g.skill-group')
            .data(function (c) { return c.entries; }, function (e) { return e.name; });
        var newSkill = skill.enter()
            .append('g')
            .classed('skill-group', true);
        skill.exit()
            .transition()
            .duration(this._animDuration)
            .style('opacity', 0)
            .remove();
        newSkill
            .append('rect')
            .classed('skill-level', true)
            .attr('width', 0)
            .attr('height', 25)
            .style('opacity', 0.8)
            .attr('fill', function () {
            var cat = d3.select(this.parentNode.parentNode).datum();
            return cat.color;
        });
        newSkill
            .append('text')
            .classed('skill-name', true)
            .text(function (s) { return s.name; })
            .attr('transform', 'translate(5,0)')
            .attr('font-size', 16)
            .attr('fill', 'white')
            .attr('dy', '1em');
        skill = newSkill
            .merge(skill);
        skill
            .transition()
            .duration(this._animDuration)
            .attr('transform', function (d, i) { return "translate(0, " + i * _this._lineHeight + ")"; });
        skill.select('rect.skill-level')
            .transition()
            .duration(this._animDuration)
            .attr('width', function (s) { return scale(s.score); });
    };
    return SkillsBarChart;
}());
;
//# sourceMappingURL=index.js.map