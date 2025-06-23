declare module "ascii-histogram" {
  interface HistogramOptions {
    bar?: string;
    width?: number;
  }
  function histogram(values: Record<string, number>, opts?: HistogramOptions): string;
  export default histogram;
}
