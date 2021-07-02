import StringHelper from './../../../../../utils/string-helper';
import JsonHelper from './../../../../../utils/json-helper';

const delimiterString = '~·-||jeker||-·~';

const delimiterBase64 = StringHelper.stringEncodeBase64(delimiterString);

export const notesDataToContentInputList = notes => notes
    .split(delimiterBase64)
    .map(
        base64 => {
            const jsonString = StringHelper.base64DecodeString(base64);
            const json = JsonHelper.stringToJson(jsonString);

            return {
                type: json.type || 'normal',
                id: StringHelper.createRandomStr({ length: 16 }),
                value: json.value || ''
            }
        }
    );

export const contentInputListToNotesData = list => list
    .map(
        ({ type, value }) => {
            const string = JsonHelper.josnToString({ type, value });

            return StringHelper.stringEncodeBase64(string)
        }
    )
    .join(delimiterBase64);