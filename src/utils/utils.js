// 数组去重
// unit([1, 2, 3, 1])
export const unit = (arr) => arr.reduce((result, current) => {
    if (!result.includes(current)) {
        result.push(current);
    }

    return result;
}, []);