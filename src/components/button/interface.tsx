export interface ButtonProps {
  children: string;
  action: () => void;
  grow?: boolean;
  rounded?: boolean;
  size?: "large" | "small";
  type?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  append?: React.ReactElement;
}
