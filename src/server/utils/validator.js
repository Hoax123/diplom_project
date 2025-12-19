export const validateProduct = (product) => {
    const errors = []

    if (!product.name || product.name.length < 2) {
        errors.push("название должно быть минимум два символа")
    }

    const validCategories = ['верхняя одежда', 'штаны', 'рубашка']
    if (!validCategories.includes(product.category)) {
        errors.push("выбрана неверная категория")
    }

    if (typeof product.price !== 'number' || product.price < 0) {
        errors.push("Цена должна быть положительным числом")
    }

    if (!product.image) {
        errors.push("Ссылка для картинки обязательна!")
    }

    return errors
}