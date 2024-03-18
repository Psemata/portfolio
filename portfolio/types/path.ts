// Type for the timeline path
export interface TimeEventProp {
  order: number;
  title: string;
  subtitle: string;
  content: string;
  current: number;
  changePathText: (newPathSubtitle: string, newPathText: string, order: number) => void;
}
