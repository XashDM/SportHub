const articleCanBeSaved = (tabData, selectedImage, alt) => {
    let filled = true
    for (let i = 0; i < tabData.length; i++) {
        if (tabData[i]?.headline.length === 0 || tabData[i]?.caption.length === 0 || tabData[i]?.content.length === 0) {
            filled = false
            break
        }
    }
    if (selectedImage === null || alt === "") {
        filled = false
    }
    return filled
}

export default articleCanBeSaved
