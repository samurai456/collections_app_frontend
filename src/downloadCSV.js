function downloadCSV(customFields, items){
    const fields = customFields.map(i=>i.name)
    const header = ['name', ...fields]
        .map(i=>`<${i}>`)
        .join(',');
    const rows = items
        .map(i=>{
            const row = fields
                .map(x=>(x.type==='checkbox'&& i.hasOwnProperty('__'+x))?
                    `"${i['__'+x]?'yes':'no'}"` :
                    `"${i['__'+x]||''}"`
                )
            return [`"${i.name}"`, ...row].join(',')
        })
    const body = rows.join('\n')
    const fullCSV = 'data:text/csv;charset=utf-8,' + header + '\n' + body;
    const csvObj = encodeURI(fullCSV);
    window.open(csvObj);
}
export {downloadCSV}