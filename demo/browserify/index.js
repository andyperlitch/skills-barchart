var d3 = require('d3');
var SkillsBarChart = require('../../');
var chart = new SkillsBarChart();
var origData;
var skillTypesControl = document.querySelectorAll('input[type=radio][name="skillTypes"]');

chart
  .target('#target')

// Get the data
// var oReq = new XMLHttpRequest();
// oReq.addEventListener('load', function(raw) {
//   console.log(raw.responseText);
// });
// oReq.open('GET', '/demo/data.json');
// oReq.send();

d3.json('/demo/data.json', function (data) {
  if (data) {
    origData = data;
    updateChart();
  }
});

skillTypesControl.forEach(function (c) {
  c.addEventListener('change', function () {
    updateChart();
  });
});

window.updateChart = function() {

  var data = origData.map(function (category) {
    return Object.assign({}, category);
  });

  for (const ctrl of skillTypesControl) {
    if (ctrl.checked) {
      switch (ctrl.value) {
        case 'ALL':
          chart
            .data(data)
            .render();
          break;
        default:
          data = data.filter(function (d) {
            d.entries = d.entries.filter(function (entry) {
              return entry.types.some(function (type) {
                return type === ctrl.value;
              });
            });
            return d.entries.length > 0;
          });
          chart
            .data(data)
            .render();
          break;

      }
    }
  }
}
