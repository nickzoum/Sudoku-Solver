import { CellValue, Grid, GridColumnIndex, GridRowIndex } from "../../types";

/**
 * Gets the cell value of a grid at the specified coordinates
 * @param grid complete sudoku grid
 * @param rowIndex vertical index of block `0 - 8`
 * @param columnIndex horizontal index of block `0 - 8`
 * @returns block at that index
 */
export function getCellValue(
    grid: Grid,
    rowIndex: GridRowIndex,
    columnIndex: GridColumnIndex
): CellValue {

    return grid[rowIndex][columnIndex];
}