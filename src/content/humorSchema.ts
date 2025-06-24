export type ToneID = 0 | 1 | 2 | 3 | 4 | 5;
export type GeometryID = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type ScenarioID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface HumorTag {
  tone_id: ToneID;
  geometry_id: GeometryID;
  scenario_id: ScenarioID;
}
