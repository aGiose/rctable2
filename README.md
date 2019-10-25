### rctable2
react table ui


### install 
npm install rctable2 --save

### Usage

```javascript
import {Table} from 'rctable2'

const columns = [
  {
    title:'Name',
    dataIndex:'name',
    index:'name',
    align:'center',
    width:100,
    onCell : (record) => {
      return {
        onClick:(e) => {
          console.log(e,record);
        }
      }
    },
  },{
    title:<div>Major</div>,
    dataIndex:'major',
    index:'major',
    align:'center',
    width:200,
    onCell : (text,record) => {
      return {
        onClick:(e) => {
          console.log(e);
        }
      }
    },
  },{
    title:'Class',
    dataIndex:'class',
    index:'class',
    align:'center',
    width:100,
    onCell : (record) => {
      return {
        onClick:(e) => {
          console.log(e);
          
        }
      }
    },
    sort:(a,b) => a - b,

  },{
    title:'Id',
    dataIndex:'id',
    index:'id',
    align:'center',
    width:100,
    sort:(a,b) => a.id - b.id,
  }
]
```


