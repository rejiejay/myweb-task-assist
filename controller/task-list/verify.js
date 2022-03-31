import valuesStructuresVerify from './../../utils/values-structures-verify'
import _ from 'lodash'

const filterParameter = (query) => {
    let pageNo = _.get(query, 'pageNo', '1');
    let pageSize = _.get(query, 'pageSize', '8');

    const pageNoVerify = valuesStructuresVerify.isIntNumString(pageNo, 'pageNo')
    if (pageNoVerify instanceof Error) return pageNoVerify
    pageNo = +pageNo

    const pageSizeVerify = valuesStructuresVerify.isIntNumString(pageSize, 'pageSize')
    if (pageSizeVerify instanceof Error) return pageSizeVerify
    pageSize = +pageSize

    const tag = _.get(query, 'tag', '');
    const progress = _.get(query, 'progress', '');
    const priority = _.get(query, 'priority', '');

    return {
        pageNo,
        tag,
        progress,
        priority,
        pageSize,
    }
}

const verify = {
    filterParameter
}

export default verify