import { administrativeAptitude } from './administrative-aptitude';
import { essay } from './essay';

const getTagNameById = id => {
    const list = [...administrativeAptitude, ...essay];
    const data = list.find(mind => mind.id === id);
    if (!data) return '';
    return data.topic;
}

const utils = {
    getTagNameById
}

export default utils;
