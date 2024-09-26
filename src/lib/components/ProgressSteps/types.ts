interface Step {
  id: number;
  Icon: React.FC<React.SVGProps<SVGElement>>;
  title: string;
  description?: string;
}

export type { Step };
