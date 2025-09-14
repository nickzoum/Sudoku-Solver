export function print(list: Array<Array<number>>) {
  if (list.length !== 9) throw Error("Invalid Input");
  list.forEach(function (subList, index) {
    if (subList.length !== 9) throw Error("Invalid Input");
    if (index && !(index % 3))
      console.log("─".repeat(9) + "┼" + "─".repeat(9) + "┼" + "─".repeat(9));
    var row = "";
    subList.forEach(function (value, index) {
      if (index && !(index % 3)) row += "|";
      row += " " + (value || " ") + " ";
    });
    console.log(row);
  });
}
