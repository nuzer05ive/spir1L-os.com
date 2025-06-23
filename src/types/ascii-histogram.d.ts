declare module "ascii-histogram" {
  export interface HistogramOptions {
    bar?: string;
    width?: number;
  }
  function histogram(
    data: number[] | Record<string, number>,
    options?: HistogramOptions
  ): string;
  export default histogram;
}
