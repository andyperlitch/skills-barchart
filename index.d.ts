export function skillsBarChart(options: {
  target: any;
  data: ICategoryData[];
}): ISkillsBarChart;

export interface ISkillsBarChart {
  data(data: ICategoryData[]): ISkillsBarChart;
  target(el: any): ISkillsBarChart;
  render(): ISkillsBarChart;
}

interface ICategoryData<T = string> {
  name: string;
  color: string;
  entries: {
    name: string;
    score: number;
    types: T[];
  }
}