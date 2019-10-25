import React, { Fragment, useEffect, useState } from 'react'

export default function tableBodyCell({ data = {}, component = {}, columns = [] }) {
    const [cells, setCells] = useState([])
    const [rowData,setRowdata] = useState(data)
    if(data !== rowData)  setRowdata(data)
    const renderCell = (text,record,renderFunc) => {
        let node = typeof renderFunc  === 'function' ? renderFunc(text,record) : null
        return node || <span>{text}</span>
    }

    const getHandlers = (handlerFunc,text,record) => {
        let handlers = {}
        if(typeof handlerFunc === 'function') handlers = handlerFunc(text,record)

        for (let key in handlers){
            if(handlers[key]){
                let functionTemp = handlers[key]
                handlers[key] = (e) => {
                    e.stopPropagation();
                   functionTemp(e)
                }
            }
        }
        return {...handlers}
    }

    useEffect(() => {
        let temp = columns.map((item, index) => {
            return (
                <component.cell {...getHandlers(item.onCell,rowData[item.dataIndex],rowData)}
                    key={`table-cell-${index}`}
                    style={{ textAlign: item.align, width: item.width }}
                    key={`table-header-${item.index}`}>
                    {renderCell(rowData[item.dataIndex],rowData,item.render)}
                </component.cell>
            )
        })
        setCells(temp)
    }, [rowData])
    return (
        <Fragment>
            {cells}
        </Fragment>
    )
}
