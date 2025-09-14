import { Box } from "./globals";

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
module.exports = solve;

/**
 * @param {Array<Array<number>>} list
 * @returns {Array<Array<number>>}
 */
export function solve(list) {
    var grid = createGrid(list);
    let previousGrid;

    while (fixBlocks(grid) && serializeGrid(grid) !== previousGrid) {
        previousGrid = serializeGrid(grid);
        singleHints(grid);
        singleLines(grid);
    }

    return grid.rows.map(function (subList) {
        return subList.map(function (block) {
            return block.value || null;
        });
    });
}

/**
 *
 * @param {JSDoc.Grid} grid
 */
function serializeGrid(grid) {
    return JSON.stringify(grid, (key, value) => {
        if (key === "row" || key === "block" || key === "column") {
            return undefined;
        } else {
            return value;
        }
    });
}

/**
 *
 * @param {Array<Array<number>>} list
 * @returns {JSDoc.Grid}
 */
function createGrid(list) {
    /** @type {JSDoc.Grid} */
    var grid = { blocks: [[], [], []], columns: [], rows: [] };
    if (list.length !== 9) throw Error("Invalid Input");
    list.forEach(function (subList, yIndex) {
        if (subList.length !== 9) throw Error("Invalid Input");
        var row = [];
        grid.rows.push(row);
        subList.forEach(function (value, xIndex) {
            var x = Math.floor(xIndex / 3),
                y = Math.floor(yIndex / 3);
            var block = grid.blocks[y][x],
                column = grid.columns[xIndex];
            if (!block) {
                block = { filled: {}, boxes: [[], [], []], list: [] };
                grid.blocks[y][x] = block;
            }
            if (!column) {
                column = [];
                grid.columns[xIndex] = column;
            }
            var box = {
                hints: {},
                value: typeof value === "number" ? value || null : null,
                column: column,
                block: block,
                row: row,
            };
            if (box.value) block.filled[box.value] = true;
            block.boxes[yIndex % 3][xIndex % 3] = box;
            block.list.push(box);
            column[yIndex] = box;
            row.push(box);
        });
    });
    return grid;
}

/**
 *
 * @param {JSDoc.Grid} grid
 * @returns {boolean}
 */
function fixBlocks(grid) {
    var madeChanges = false;
    grid.blocks.forEach(function (blocks) {
        blocks.forEach(function (block) {
            removeExtraBlockHints(block);
            numberList.forEach(function (number) {
                if (fixBlock(block, number)) madeChanges = true;
            });
        });
    });
    return madeChanges;
}

/**
 *
 * @param {JSDoc.Block} block
 * @param {1|2|3|4|5|6|7|8|9} number
 * @returns {boolean}
 */
function fixBlock(block, number) {
    /** @type {JSDoc.Box} */
    var lastAllowed;
    var countAllowed = 0;
    var madeChanges = false;

    if (block.filled[number]) return false;

    block.boxes.forEach(function (boxes) {
        boxes.forEach(function (box) {
            if (box.value) return;
            if (block.filled[number]) return;
            var row = box.row,
                column = box.column;
            var forbidden =
                row.some(function (otherBox) {
                    if (otherBox.block === block) return false;
                    if (otherBox.value === number) return true;
                    if (otherBox.value) return false;
                    if (!otherBox.hints[number]) return false;
                    var hasOtherRow = otherBox.block.list.some(function (box) {
                        if (box.row === row) return false;
                        return box.hints[number];
                    });
                    if (!hasOtherRow) return true;
                }) ||
                column.some(function (otherBox) {
                    if (otherBox.block === block) return false;
                    if (otherBox.value === number) return true;
                    if (otherBox.value) return false;
                    if (!otherBox.hints[number]) return false;
                    var hasOtherColumn = otherBox.block.list.some(function (box) {
                        if (box.column === column) return false;
                        return box.hints[number];
                    });
                    if (!hasOtherColumn) return true;
                });
            if (forbidden) {
                if (box.hints[number]) madeChanges = true;
                box.hints[number] = false;
            } else {
                if (!box.hints[number]) madeChanges = true;
                box.hints[number] = true;
                lastAllowed = box;
                countAllowed += 1;
            }
        });
    });

    if (countAllowed === 1) {
        lastAllowed.block.filled[number] = true;
        lastAllowed.value = number;
        lastAllowed.hints = {};
        lastAllowed.block.list.forEach(function (box) {
            if (box.hints[number]) box.hints[number] = false;
        });
        return true;
    }

    return madeChanges;
}

/**
 *
 * @param {JSDoc.Grid} grid
 */
function singleHints(grid) {
    grid.rows.forEach(function (row) {
        row.forEach(function (box) {
            if (box.value) return;
            var hints = Object.entries(box.hints).filter(function ([, value]) {
                return value;
            });
            if (hints.length === 1) {
                var value = +hints[0][0];
                box.block.filled[value] = true;
                box.value = value;
                box.hints = {};
                box.block.list.forEach(function (box) {
                    if (box.hints[value]) box.hints[value] = false;
                });
            }
        });
    });
}

/**
 *
 * @param {JSDoc.Grid} grid
 */
function singleLines(grid) {
    grid.rows.forEach(function (row) {
        var rowList = numberList.reduce(function (result, value) {
            result[value] = false;
            return result;
        }, {});
        row.forEach(function (box) {
            if (box.value in rowList) rowList[box.value] = true;
        });
        var missing = Object.entries(rowList)
            .filter(function ([, value]) {
                return !value;
            })
            .map(function ([key]) {
                return key;
            });
        if (missing.length === 1) {
            var value = +missing[0];
            row.some(function (box) {
                if (box.value !== value) return;
                box.block.filled[value] = true;
                box.value = value;
                box.hints = {};
                box.block.list.forEach(function (box) {
                    if (box.hints[value]) box.hints[value] = false;
                });
                return true;
            });
        }
    });
}

/**
 * @param {JSDoc.Grid} grid
 */
function removeExtraHints(grid) {
    return;
    grid.blocks.forEach(function (blocks) {
        blocks.forEach(removeExtraBlockHints);
    });
}

/**
 * @param {JSDoc.Block} block
 */
function removeExtraBlockHints(block) {
    var maxLength = 0;
    /** @type {Array<Array<JSDoc.Box>>} */
    var places = numberList.map(function (number) {
        if (block.filled[number]) return;
        var list = block.list.filter(function (box) {
            return box.hints[number];
        });
        maxLength = Math.max(maxLength, list.length);
        return list.sort();
    }, {});
    maxLength = Math.min(maxLength, places.filter(Boolean).length);
    block.list.forEach(function (box) {
        if (box.value) return;
        var hints = Object.entries(box.hints)
            .filter(function ([, value]) {
                return value;
            })
            .map(function ([key]) {
                return key;
            });
        if (hints.length < 2 || hints.length >= maxLength) return;
        var sameBlocks = block.list.filter(checkHints.bind(box));
        if (hints.length !== sameBlocks.length) return;
        hints.forEach(function (hint) {
            places[hint - 1].forEach(function (box) {
                if (sameBlocks.includes(box)) return;
                box.hints[hint] = false;
            });
        });
    });
    places.forEach(function (list, number) {
        if (!list) return;
        if (list.length === 2) {
            var otherNumbers = places
                .map(function (otherList, number) {
                    if (!otherList) return;
                    if (otherList === list) return number;
                    if (otherList.length !== list.length) return;
                    for (var index = 0; index < list.length; index++) if (list[index] !== otherList[index]) return;
                    return number;
                })
                .filter(Boolean);
            if (otherNumbers.length !== list.length) return;
            places[number].forEach(function (box) {
                for (var hint in box.hints) box.hints[hint] = false;
                otherNumbers.forEach(function (number) {
                    box.hints[number] = true;
                });
            });
        }
    });
}

function checkHints(boxA: Box, boxB: Box): boolean {
    if (boxA === boxB) return true;
    for (var hint in boxA) if (boxA[hint] && !boxB[hint]) return false;
    for (hint in boxB) if (boxB[hint] && !boxA[hint]) return false;
    return true;
}