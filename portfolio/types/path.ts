// Type for the timeline path
export interface TimeEventProp {
  order: number;
  title: string;
  content: string;
  current: number;
  changePathText: (newPathText: string, order: number) => void;
}
