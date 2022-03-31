import valuesStructuresVerify from './../../utils/values-structures-verify'
import _ from 'lodash'

const saveQueryHandle = (query) => {
    const title = _.get(query, 'title', '')
    const titleVerify = valuesStructuresVerify.isStringNil(title, 'title')
    if (titleVerify instanceof Error) return new Error(titleVerify.message)

    const content = _.get(query, 'content', '')
    const contentVerify = valuesStructuresVerify.isStringNil(content, 'content')
    if (contentVerify instanceof Error) return new Error(contentVerify.message)

    return {
        title,
        content
    }
}

const verify = {
    saveQueryHandle
}

export default verify