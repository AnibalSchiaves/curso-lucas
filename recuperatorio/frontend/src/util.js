
export function formatHumanDate(origin) {
    let anio = origin.substring(0,4);
    let mes  = origin.substring(5,7);
    let dia  = origin.substring(8,10);
    return dia+"/"+mes+"/"+anio;
}