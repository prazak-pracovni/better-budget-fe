export interface IActionButton {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}