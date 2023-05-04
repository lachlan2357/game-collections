export const encode = (array: number[]) => array.map(num => num.toString(36)).join("-");
export const decode = (string: string) => string.split("-").map(base36 => parseInt(base36, 36));
