var ConstHandle = {
    /**
     * 作用: 通过CONST值找到值
     */
    findValueByValue: function findValueByValue({
        CONST,
        supportKey,
        supportValue,
        targetKey
    }) {
        var targetValue = null

        Object.keys(CONST).forEach(function (thisKey) {
            var obj = CONST[thisKey]

            if (obj[supportKey] === supportValue) {
                targetValue = obj[targetKey]
            }
        })

        return targetValue
    }
}