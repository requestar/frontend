export class Color {
    header = 'red';
    param = 'blue'
    formBody = 'green'
}

export const Condition = {
    header: {
        type: 'header',
        color: 'red',
        shortText: 'h',
        next: 'param'
    },
    param: {
        type: 'param',
        color: 'blue',
        shortText: 'p',
        next: 'formBody'
    },
    formBody: {
        type: 'formBody',
        color: 'green',
        shortText: 'fb',
        next: 'header'
    }
}

export const conditionChecks = [
    { value: '1', text: 'is_present' },
    { value: '2', text: 'is_absent' },
    { value: '3', text: '==' },
    { value: '4', text: '!=' },
    { value: '5', text: '>' },
    { value: '6', text: '>=' },
    { value: '7', text: '<' },
    { value: '8', text: '<=' },
    { value: '9', text: 'regex' },
    { value: '10', text: 'is_file' },
    { value: '11', text: 'is_not_file' },
    { value: '12', text: 'in' },
    { value: '13', text: 'not in' }
]