import { describe, expect, it } from "@jest/globals";
import { Block, BlockColumnIndex, BlockRowIndex, CellValue } from "../../types";
import { getBlockCellValue } from "./getBlockCellValue";

const ___ = null;

describe(getBlockCellValue.name, () => {

    it.each<[Block, BlockRowIndex, BlockColumnIndex, CellValue]>([
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 0, 0, "1"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 0, 1, "2"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 0, 2, "3"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 1, 0, "4"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 1, 1, "5"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 1, 2, "6"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 2, 0, "7"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 2, 1, "8"],
        [[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 2, 2, "9"],
        [[[___, "2", "3"], ["4", "5", "6"], ["7", "8", "9"],], 0, 0, ___],
    ])("when supplied with the block %o should get the value at [%s, %s] (%s)",
        (block, blockRowIndex, blockColumnIndex, expectedValue) => {
            const actualValue = getBlockCellValue(block, blockRowIndex, blockColumnIndex);

            expect(actualValue).toEqual(expectedValue);
        });
});