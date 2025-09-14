import { describe, expect, it } from "@jest/globals";
import { completeInput, easyInput } from "../../../samples";
import { CellValue, Grid, GridColumnIndex, GridRowIndex } from "../../types";
import { getCellValue } from "./getCellValue";

const ___ = null;

describe(getCellValue.name, () => {

    it.each<[Grid, GridRowIndex, GridColumnIndex, CellValue]>([
        [completeInput, 0, 0, "1"],
        [completeInput, 0, 1, "2"],
        [completeInput, 0, 8, "9"],
        [completeInput, 1, 0, "4"],
        [completeInput, 1, 1, "5"],
        [completeInput, 1, 8, "3"],
        [completeInput, 8, 0, "9"],
        [completeInput, 8, 1, "1"],
        [completeInput, 8, 8, "8"],

        [easyInput, 0, 0, ___],
        [easyInput, 0, 1, "8"],
        [easyInput, 0, 8, "4"],
        [easyInput, 1, 0, "6"],
        [easyInput, 1, 1, "7"],
        [easyInput, 1, 8, "1"],
        [easyInput, 8, 0, "9"],
        [easyInput, 8, 1, "1"],
        [easyInput, 8, 8, "8"],
    ])("when supplied with the grid %o should get the value at [%s, %s] (%s)",
        (grid, rowIndex, columnIndex, expectedValue) => {
            const actualValue = getCellValue(grid, rowIndex, columnIndex);

            expect(actualValue).toEqual(expectedValue);
        });
});