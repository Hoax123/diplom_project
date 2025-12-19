export const handleHttpError = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `${response.status}`);
    }

    return data
}