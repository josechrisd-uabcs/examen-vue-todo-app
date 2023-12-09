export const loadData = <T> (key: string, default_value: T): T => {
    const data = localStorage.getItem(key);
    if(data){
        try {
            return JSON.parse(data)
        } catch (error) {
            return default_value;
        }
    }
    return default_value;
}

export const saveData = <T> (key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
}