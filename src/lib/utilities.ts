export function addIdField(data: any[]) {
    data.forEach((d: any,i: number) => d.id = i)
    return data
}

export function serialize(data: any) {
    return JSON.parse(JSON.stringify(data));
}