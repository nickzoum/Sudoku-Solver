import {
    Block,
    BlockColumnIndex,
    BlockRowIndex,
    Grid,
    GridColumnIndex,
    GridRowIndex,
    PossibleBlockIndexList,
} from "../../types";
import { getCellValue } from "./getCellValue";

/**
 * Gets a copy of a block of a grid
 * @param grid complete sudoku grid
 * @param rowIndex vertical index of block `0 - 2`
 * @param columnIndex horizontal index of block `0 - 2`
 * @returns copy of block at specified coordinates 
 */
export function getBlock(
    grid: Grid,
    blockRowIndex: BlockRowIndex,
    blockColumnIndex: BlockColumnIndex,
): Block {

    return PossibleBlockIndexList.map((rowIndex) => {

        return PossibleBlockIndexList.map((columnIndex) => {
            const cellRowIndex = blockRowIndex * 3 + rowIndex;
            const cellColumnIndex = blockColumnIndex * 3 + columnIndex;

            return getCellValue(
                grid,
                cellRowIndex as GridRowIndex,
                cellColumnIndex as GridColumnIndex,
            );
        });
    });
}