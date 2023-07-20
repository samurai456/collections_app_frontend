const colors =  [
    'aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
    'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 
    'silver', 'teal', 'white', 'yellow'
];

const modules = {toolbar:[
    [{'header':[1, 2, false]}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
        {'color': colors},
        {'background': colors}
    ],
    [{list: 'ordered'}, {list: 'bullet'}],
    ['link'],
    ['clean']
]};

const formats=[
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link',
    'color', 'background'
]

export {modules, formats}