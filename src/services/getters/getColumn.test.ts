import { describe, expect, it } from "@jest/globals";
import { completeInput, easyInput } from "../../../samples";
import { Grid, GridColumnIndex, GridColumn } from "../../types";
import { getColumn } from "./getColumn";

const ___ = null;

describe(getColumn.name, () => {

    it.each<[Grid, GridColumnIndex, GridColumn]>([
        [completeInput, 0, ["1", "4", "7", "2", "5", "8", "3", "6", "9",]],
        [completeInput, 1, ["2", "5", "8", "3", "6", "9", "4", "7", "1",]],
        [completeInput, 8, ["9", "3", "6", "1", "4", "7", "2", "5", "8",]],
        [easyInput, 0, [___, "6", "1", "8", "7", "2", "4", ___, "9",]],
        [easyInput, 1, ["8", "7", "3", ___, ___, ___, "6", "2", "1"]],
        [easyInput, 8, ["4", "1", "9", "2", "3", "6", ___, ___, "8",]],
    ])("when supplied with the grid %o should get a copy of the column [%s] (%o)",
        (grid, columnIndex, expectedColumn) => {
            const actualColumn = getColumn(grid, columnIndex);

            expect(actualColumn).toEqual(expectedColumn);
        });

    it("should always return a new column reference", () => {
        const grid = completeInput;
        const columnIndex = 0;
        const expectedColumn = getColumn(grid, columnIndex);

        const actualColumn = getColumn(grid, columnIndex);

        expect(actualColumn).not.toBe(expectedColumn);
    });
});