export interface ButtonProps {
  children: string;
  action: () => void;
  grow?: boolean;
  rounded?: boolean;
  size?: "large" | "small";
  type?: "primary" | "secondary";
  disabled?: boolean;
}
