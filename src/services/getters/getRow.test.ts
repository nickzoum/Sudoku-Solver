import { describe, expect, it } from "@jest/globals";
import { getRow } from "./getRow";
import { completeInput, easyInput } from "../../../samples";
import { Grid, GridRow, GridRowIndex } from "../../types";

const ___ = null;

describe(getRow.name, () => {

    it.each<[Grid, GridRowIndex, GridRow]>([
        [completeInput, 0, ["1", "2", "3", "4", "5", "6", "7", "8", "9",]],
        [completeInput, 1, ["4", "5", "6", "7", "8", "9", "1", "2", "3",]],
        [completeInput, 8, ["9", "1", "2", "3", "4", "5", "6", "7", "8",]],
        [easyInput, 0, [___, "8", "2", "7", ___, "1", "6", ___, "4",]],
        [easyInput, 1, ["6", "7", "9", ___, "3", "4", "2", "5", "1",]],
        [easyInput, 8, ["9", "1", "7", ___, "5", "6", "4", "2", "8",]],
    ])("when supplied with the grid %o should get a copy of the row [%s] (%o)",
        (grid, rowIndex, expectedRow) => {
            const actualRow = getRow(grid, rowIndex);

            expect(actualRow).toEqual(expectedRow);
        });

    it("should always return a new row reference", () => {
        const grid = completeInput;
        const rowIndex = 0;
        const expectedRow = getRow(grid, rowIndex);

        const actualRow = getRow(grid, rowIndex);

        expect(actualRow).not.toBe(expectedRow);
    });
});