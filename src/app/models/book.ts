export interface Book {
  id: string;
  title: string;
  author: string;
  width: number;
  position?: Position;
}

interface Position {
  x: number;
  y: number;
}
