import { describe, expect, it } from "@jest/globals";
import { completeInput, easyInput } from "../../../samples";
import { Block, BlockColumnIndex, BlockRowIndex, Grid, } from "../../types";
import { getBlock } from "./getBlock";

const ___ = null;

describe(getBlock.name, () => {

    it.each<[Grid, BlockRowIndex, BlockColumnIndex, Block]>([
        [completeInput, 0, 0, [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"],]],
        [completeInput, 0, 1, [["4", "5", "6"], ["7", "8", "9"], ["1", "2", "3"],]],
        [completeInput, 0, 2, [["7", "8", "9"], ["1", "2", "3"], ["4", "5", "6"],]],

        [completeInput, 1, 0, [["2", "3", "4"], ["5", "6", "7"], ["8", "9", "1"],]],
        [completeInput, 1, 1, [["5", "6", "7"], ["8", "9", "1"], ["2", "3", "4"],]],
        [completeInput, 1, 2, [["8", "9", "1"], ["2", "3", "4"], ["5", "6", "7"],]],

        [completeInput, 2, 0, [["3", "4", "5"], ["6", "7", "8"], ["9", "1", "2"],]],
        [completeInput, 2, 1, [["6", "7", "8"], ["9", "1", "2"], ["3", "4", "5"],]],
        [completeInput, 2, 2, [["9", "1", "2"], ["3", "4", "5"], ["6", "7", "8"],]],

        [easyInput, 0, 0, [[___, "8", "2"], ["6", "7", "9"], ["1", "3", ___],]],
        [easyInput, 0, 1, [["7", ___, "1"], [___, "3", "4"], ["5", ___, "2"],]],
        [easyInput, 0, 2, [["6", ___, "4"], ["2", "5", "1"], ["8", "7", "9"],]],
    ])("when supplied with the grid %o should get a copy of the block [%s, %s] (%o)",
        (grid, blockRowIndex, blockColumnIndex, expectedBlock) => {
            const actualBlock = getBlock(grid, blockRowIndex, blockColumnIndex);

            expect(actualBlock).toEqual(expectedBlock);
        });

    it("should always return a new block reference", () => {
        const grid = completeInput;
        const columnIndex = 0;
        const rowIndex = 0;
        const expectedRow = getBlock(grid, columnIndex, rowIndex);

        const actualRow = getBlock(grid, columnIndex, rowIndex);

        expect(actualRow).not.toBe(expectedRow);
    });
});