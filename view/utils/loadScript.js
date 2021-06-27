import consequencer from './../../utils/consequencer'
import toast from './../components/toast'

/**
 * 本机JavaScript中的jQuery.getScript替代方案
 * jQuery.getScript alternative in native JavaScript: https://www.codenong.com/16839698/
 * @param {*} source 
 * @param {*} beforeEl 
 * @param {*} async 
 * @param {*} defer 
 */
const loadScript = (source, beforeEl, async = true, defer = true) => new Promise((resolve, reject) => {
    toast.show()
    let script = document.createElement('script');
    const prior = beforeEl || document.getElementsByTagName('script')[0];

    script.async = async;
    script.defer = defer;

    function onloadHander(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;

            toast.destroy()
            if (isAbort) return reject(consequencer.error(`${source} is abort: ${script.readyState}`, 500))
            resolve(consequencer.success())
        }
    }

    script.onload = onloadHander;
    script.onreadystatechange = onloadHander;

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
}).catch(error => error);

export default loadScript