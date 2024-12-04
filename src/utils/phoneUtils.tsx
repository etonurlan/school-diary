export const formatPhoneNumber = (inputValue: string) => {
    if (inputValue === "") return "";

    // Удаляем все символы, кроме цифр, оставляя `+7` в начале
    const cleaned = inputValue.replace(/\D/g, "");

    // Проверка на очистку `+7` — если только `+7`, можно очистить
    if (cleaned === "7") return "";

    // Формируем номер с +7
    let formatted = "+7";

    // Оставляем только 10 цифр после +7
    const restOfNumber = cleaned.slice(1, 11);
    
    // Формируем формат +7 (XXX) XXX-XX-XX по мере ввода
    if (restOfNumber.length > 0) formatted += restOfNumber.slice(0, 3);
    if (restOfNumber.length > 3) formatted += restOfNumber.slice(3, 6);
    if (restOfNumber.length > 6) formatted += restOfNumber.slice(6, 8);
    if (restOfNumber.length > 8) formatted += restOfNumber.slice(8, 10);
    
    return formatted;
};