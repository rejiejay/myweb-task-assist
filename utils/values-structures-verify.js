import consequencer from './consequencer';

const MAX_INT = 2147483647

const isId = id => {
    const data = +id
    if (data === 0) return consequencer.error('id can`t 0', 2317)
    if (!data) return consequencer.error('id is NaN, Not String', 6439)

    if (data < 0 && data > MAX_INT) return consequencer.error('id is out of max range', 5372)
    return consequencer.success()
}

const valuesStructuresVerify = {
    isId
}

export default valuesStructuresVerify
