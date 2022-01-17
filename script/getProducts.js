const getProducts = async (endPoint) => {
    const busq = await fetch(endPoint)
    const data = await busq.json()

    return data
}

export default getProducts