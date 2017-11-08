var SkillsBarChart = (function () {
    function SkillsBarChart(options) {
        this._margin = { left: 10, right: 10, top: 10, bottom: 30 };
        this._lineHeight = 45;
        this._labelWidth = 75;
        this._animDuration = 1000;
        this._scale = d3.scaleLinear().domain([0, 100]);
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
        this._guidesGrp = svg
            .append('g')
            .classed('skills-barchart-guides', true);
        return this;
    };
    SkillsBarChart.prototype.render = function () {
        var _this = this;
        var lines = 0;
        var lastYOffset = 0;
        this._data.forEach(function (c) {
            lines++;
            lines += c.entries.length;
            c.yOffset = lastYOffset;
            lastYOffset = lastYOffset + (c.entries.length + 1) * _this._lineHeight;
        });
        var height = lines * this._lineHeight;
        var width = 600;
        var innerWidth = width - this._margin.left - this._margin.right;
        var scale = this._scale;
        scale.range([0, innerWidth - this._labelWidth]);
        var svg = this._svg;
        var ctx = this._inner;
        svg
            .transition()
            .duration(this._animDuration)
            .attr('height', height + this._margin.top + this._margin.bottom)
            .attr('width', width);
        var category = ctx.selectAll('g.skill-category')
            .data(this._data, function (d) { return d.name; });
        var newCategory = category.enter()
            .append('g')
            .classed('skill-category', true)
            .attr('transform', 'translate(0,0)');
        newCategory
            .append('text')
            .classed('skill-category-title', true)
            .style('font-size', '120%')
            .attr('dy', '1em')
            .text(function (c) { return c.name; })
            .attr('text-anchor', 'middle')
            .attr('transform', "translate(" + innerWidth / 2 + ", 0)");
        category = newCategory
            .merge(category);
        category
            .transition()
            .duration(this._animDuration)
            .attr('transform', function (c) { return "translate(0, " + c.yOffset + ")"; });
        var skill = category
            .selectAll('g.skill-group')
            .data(function (c) { return c.entries; }, function (e) { return e.name; });
        var newSkill = skill.enter()
            .append('g')
            .classed('skill-group', true)
            .attr('transform', "translate(" + this._labelWidth + ",0)");
        newSkill
            .append('text')
            .classed('skill-name', true)
            .text(function (s) { return s.name; })
            .attr('transform', 'translate(-5,0)')
            .attr('dy', '1em')
            .attr('text-anchor', 'end');
        newSkill
            .append('rect')
            .classed('skill-level', true)
            .attr('width', 0)
            .attr('height', 20)
            .attr('fill', function () {
            var cat = d3.select(this.parentNode.parentNode).datum();
            return cat.color;
        });
        skill = newSkill
            .merge(skill);
        skill
            .transition()
            .duration(this._animDuration)
            .attr('transform', function (d, i) { return "translate(" + _this._labelWidth + ", " + (i + 1) * _this._lineHeight + ")"; });
        skill.select('rect.skill-level')
            .transition()
            .duration(this._animDuration)
            .attr('width', function (s) { return scale(s.score); });
    };
    return SkillsBarChart;
}());
;
//# sourceMappingURL=index.js.map