
// 초를 받아 분 초로 제공
const toTimeStr = (second) => {
    const addZero = (num) => {
        let number = parseInt(num);
        // 10이하 0붙이기
        return number < 10 ? "0" + number : number;
    }
    let minutes = Math.floor(second / 60);
    let seconds = Math.floor(second - minutes * 60);
    return (addZero(minutes)) + ":" + (addZero(seconds))
}

export default toTimeStr;