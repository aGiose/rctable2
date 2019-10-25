import React, { useState, useEffect } from 'react'
import Header from './tableHeaderCell'

export default function ({ columns = [], component = {}, sortHandler }) {
    // const [row, setRow] = useState([])

    // useEffect(() => {
    //     let items = columns.map(item => <component.cell style={{ textAlign: item.align, width: item.width }} key={`table-header-${item.index}`}>{item.title}</component.cell>)
    //     setRow(items)
    // }, [])
    return (
        <component.container>
            <component.row>
                <Header columns= {columns} component = {component} sortHandler = {sortHandler} />
            </component.row>
        </component.container>

    )
}
