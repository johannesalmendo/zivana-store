export const truncateText = (str : string | undefined ) => {
    if(!str || str.length < 25)
    return str

    return str.substring(0, 25) + "..."
}