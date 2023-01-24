export function sort(list: any[], key: string, options?: { alphabetKeys?: boolean, desc?: boolean, number?: boolean }) {

    return list.sort((a: { [key: string]: any }, b: { [key: string]: any }) => {

        if (!a[key]) return options?.desc ? 1 : -1;
        if (!b[key]) return options?.desc ? -1 : 1;

        if (options?.alphabetKeys) {

            if (a[key].localeCompare(b[key])) return options?.desc ? -1 : 1;

            if (b[key].localeCompare(a[key])) return options?.desc ? 1 : -1;

            return 0;
        }

        if (options?.number) {

            if (parseFloat(a[key]) > parseFloat(b[key])) return options?.desc ? -1 : 1;

            if (parseFloat(b[key]) > parseFloat(a[key])) return options?.desc ? 1 : -1;

            return 0;
        }

        if (a[key].toString() > b[key].toString()) return options?.desc ? -1 : 1;

        if (b[key].toString() > a[key].toString()) return options?.desc ? 1 : -1;

        return 0;
    })
}