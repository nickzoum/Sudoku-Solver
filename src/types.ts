export const PossibleGridIndexList = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;
export const PossibleBlockIndexList = [0, 1, 2] as const;
export const PossibleCellValueList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export type GridColumnIndex = typeof PossibleGridIndexList[number];
export type GridRowIndex = typeof PossibleGridIndexList[number];
export type BlockColumnIndex = typeof PossibleBlockIndexList[number];
export type BlockRowIndex = typeof PossibleBlockIndexList[number];
export type CompletedCellValue = typeof PossibleCellValueList[number];
export type CellValue = CompletedCellValue | null;

export type GridColumn = Array<CellValue>;
export type GridRow = Array<CellValue>;
export type Grid = Array<GridRow>;

export type BlockColumn = Array<CellValue>;
export type BlockRow = Array<CellValue>;
export type Block = Array<BlockRow>;