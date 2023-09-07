export const addThousandsSeparator = (number: number) => {
    // Convierte el número a una cadena y divide en partes entera y decimal (si existe)
    const parts = number.toString().split(".");

    // Agrega un punto como separador de miles a la parte entera
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // Vuelve a unir las partes (incluyendo el punto si había decimal)
    return parts.join(".");
};
