export function randomSelect<T>(list: Array<T>) {
    const pos = Math.floor(Math.random() * list.length);

    let item = list[pos];

    if (item == undefined) {
        return list[0];
    } else {
        return item;
    }
};
