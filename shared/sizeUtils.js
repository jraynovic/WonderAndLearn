
export const percentToSize = (windowDimension,sizeInPercent)=>{
    const height = windowDimension.height /100 * sizeInPercent

    return(
        height
    )

}

export const widthPercentToSize  = (windowDimension,sizeInPercent)=>{
    const width = windowDimension.width /100 * sizeInPercent

    return(
         width
    )

}