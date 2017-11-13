const d3 = require('d3');
const SkillsBarChart = require('../../../../');
const chart = new SkillsBarChart();
const skillTypesControl = document.querySelectorAll('input[type=radio][name="skillTypes"]');

let origData;


chart
  .target('#target')


d3.json('/demo/data.json', (data) => {
  if (data) {
    origData = data;
    updateChart();
  }
});

skillTypesControl.forEach((c) => {
  c.addEventListener('change', () => {
    updateChart();
  });
});

window.updateChart = function() {

  const data = origData.map((category) => {
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
          data = data.filter((d) => {
            d.entries = d.entries.filter((entry) => {
              return entry.types.some((type) => {
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
