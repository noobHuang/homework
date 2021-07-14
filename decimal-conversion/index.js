const keysArr = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ-~'.split('')
const btn = document.getElementsByClassName('confirm-btn')[0]
btn.addEventListener('click', () => {
    const input_val = document.getElementsByClassName('input-box')[0]?.value
    const result_span = document.getElementsByClassName('result-span')[0]
    !input_val && alert('请输入')
    const res = input_val && calc(input_val)
    result_span.innerText = res
})

function calc(val) {
    const isInt = Number.isInteger(val-0)
    const isFloat = !isInt && Number.isFinite(val-0)
    let calc_res = ''
    if(isInt) {
        calc_res = IntPart(val)
    } else {
        const arr = intercept(val)
        calc_res = IntPart(arr[0]) + '.' + FractPart(arr[1])
    }
    return calc_res
}

function intercept(val) {
    let temp = val.toString().split('.')
    return [Number(temp[0]), temp[1] != '0' ? Number(0+'.'+temp[1]) : 0]
}

function IntPart(val) {
    let arr = [], mod = ''
    do {
        mod = val % 64
        val = (val - mod) / 64
        arr.unshift(keysArr[mod]) 
    } while(val)
    return arr.join('')
}
// 最多64位
function FractPart(val) {
    let len = 0
    let arr = [], int_num = ''
    do {
        int_num = intercept(val * 64) 
        val = int_num[1]
        arr.push(keysArr[int_num[0]])
        len++
    }
    while(val && len <= 64)
    return arr.join('')
}