/**
 * 概念: 函数防抖（debounce），就是指触发事件后，在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。
 * 举个栗子: 坐电梯的时候，如果电梯检测到有人进来（触发事件），就会多等待 10 秒，此时如果又有人进来（10秒之内重复触发事件），那么电梯就会再多等待 10 秒。在上述例子中，电梯在检测到有人进入 10 秒钟之后，才会关闭电梯门开始运行，因此，“函数防抖”的关键在于，在 一个事件 发生 一定时间 之后，才执行 特定动作。
 * 举个栗子: A和B说话，A一直bbbbbb，当A持续说了一段时间的话后停止讲话，过了10秒之后，我们判定A讲完了，B开始回答A的话；如果10秒内A又继续讲话，那么我们判定A没讲完，B不响应，等A再次停止后，我们再次计算停止的时间，如果超过10秒B响应，如果没有则B不响应。
 * 区别: 节流与防抖的前提都是某个行为持续地触发，函数防抖 只执行一次
 */
const debounce = (cabllback, wait = 3000) => {
    let timer = null;
    const handle = () => {
        if (timer !== null) clearTimeout(timer);
        timer = setTimeout(cabllback, wait);
    }
    return handle
}

/**
 * _.throttle
 * 概念: 函数防抖（debounce） 如果一个函数持续的，频繁的触发，那么就让他在一定的时间间隔后触发。
 * 举个栗子: 比如一个持续流水的水龙头，水龙头开到最大的时候很浪费水资源，将水龙头开得小一点，让他每隔200毫秒流出一滴水，这样能源源不断的流出水而又不浪费。而节流就是每隔n的时间调用一次函数，而不是一触发事件就调用一次，这样就会减少资源浪费。
 * 区别: 节流与防抖的前提都是某个行为持续地触发，函数防抖 要优化到减少它的执行次数
 */
const throttle = function (fn, wait) {
    let pre = Date.now();
    return function () {
        const context = this;
        const args = arguments;
        const now = Date.now();
        if (now - pre >= wait) {
            fn.apply(context, args);
            pre = Date.now();
        }
    }
}

const FunctionHelper = {
    debounce,
    throttle
}

export default FunctionHelper
