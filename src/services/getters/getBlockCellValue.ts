import { Block, BlockColumnIndex, BlockRowIndex, CellValue } from "../../types";

/**
 * Gets the cell value of a block at the specified coordinates
 * @param block part of a sudoku block
 * @param rowIndex vertical index of block `0 - 2`
 * @param columnIndex horizontal index of block `0 - 2`
 * @returns cell value at the specified coordinates
 */
export function getBlockCellValue(
    block: Block,
    rowIndex: BlockRowIndex,
    columnIndex: BlockColumnIndex
): CellValue {

    return block[rowIndex][columnIndex];
}