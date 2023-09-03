export function addIdField(data: any[]) {
    data.forEach((d: any,i: number) => d.id = i)
    return data
}