import AsyncFetch from './../components/async-fetch'

export const getTags = async () => {
    const query = {}
    const fetchInstance = await AsyncFetch.get({
        url: 'task/list/tags',
        query
    })

    if (fetchInstance.result !== 1) return new Error(fetchInstance.message);

    return fetchInstance.data;
}
