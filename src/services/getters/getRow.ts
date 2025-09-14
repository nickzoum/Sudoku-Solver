import { Grid, GridRow, GridRowIndex, PossibleGridIndexList } from "../../types";
import { getCellValue } from "./getCellValue";

/**
 * Gets a copy of a row
 * @param grid complete sudoku grid
 * @param rowIndex vertical index of row `0 - 8`
 * @returns copy of row at specified index
 */
export function getRow(grid: Grid, rowIndex: GridRowIndex): GridRow {
    return PossibleGridIndexList.map((columnIndex) => {
        return getCellValue(grid, rowIndex, columnIndex);
    });
}