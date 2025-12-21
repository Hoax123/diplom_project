export const handleHttpError = async (response) => {
    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('user');
        }
        throw new Error(data.error || `${response.status}`);
    }

    return data
}