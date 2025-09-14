import { Grid, GridColumnIndex, GridColumn, PossibleGridIndexList } from "../../types";
import { getCellValue } from "./getCellValue";

/**
 * Gets a copy of a column
 * @param grid complete sudoku grid
 * @param columnIndex horizontal index of column `0 - 8`
 * @returns copy of column at specified index
 */
export function getColumn(grid: Grid, columnIndex: GridColumnIndex): GridColumn {
    return PossibleGridIndexList.map((rowIndex) => {
        return getCellValue(grid, rowIndex, columnIndex);
    });
}