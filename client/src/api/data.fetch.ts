const urlData = import.meta.env.VITE_API_URL_DATA

export const createData = async (formData: FormData) => {
    try {
        const response = await fetch(`${urlData}/logo`, {
            method: "POST",
            body: formData
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}