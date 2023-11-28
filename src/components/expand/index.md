---
nav: 组件
group: 组件
title: Expand 可展开折叠容器
toc: component
---

# Expand
可展开折叠容器

## 代码演示

#### 显示更多 的位置
位置有三个方向：left、center、right

```jsx
import React from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App: React.FC = () => {
  
  const { useMoreData } = Expand;
  const { Column } = Table;

  return (
    <div>
      <h4>靠左显示</h4>
      <Expand type="text" align="left" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table pagination={false} dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)} columns={columns}/>
        )}
      </Expand>

      <br />
      <h4>居中显示</h4>
      <Expand type="text" align="center" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table pagination={false} dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)} columns={columns} />
        )}
      </Expand>

      <br />
      <h4>靠右显示</h4>
      <Expand type="text"  align="right" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table pagination={false} dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)} columns={columns}/>
        )}
      </Expand>
    </div>
  );
};

export default App;
```


#### 显示更多 的三种模式

```jsx
import React from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App: React.FC = () => {
  const { useMoreData } = Expand;
  const { Column } = Table;

  return (
    <div>
      <h4>normal</h4>
      <Expand type="normal" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>

      <br />
      <h4>embed</h4>
      <Expand type="embed" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>

      <br />
      <h4>text</h4>
      <Expand type="text" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>
    </div>
  );
};

export default App;
```

#### 显示更多 按钮的大小

```jsx
import React from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App: React.FC = () => {
  const { useMoreData } = Expand;
  const { Column } = Table;

  return (
    <div>
      <h4>small</h4>
      <Expand type="embed" buttonSize="small" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>

      <br />
      <h4>middle</h4>
      <Expand type="embed" buttonSize="middle" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>

      <br />
      <h4>large</h4>
      <Expand type="embed" buttonSize="large" style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>
    </div>
  );
};

export default App;
```


#### 数据传递方式
数据传递有两种方式，一种是传递给 Expand 组件，由 Expand 组件处理后返回给业务组件，一种是直接由业务组件来处理

```jsx
import React from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App: React.FC = () => {
  const { useMoreData } = Expand;
  const { Column } = Table;

  return (
    <div>
      <h4>展示的数据由 Expand 组件处理后返回</h4>
      <Expand dataSource={dataSource} limitLength={2}>
        {(expanded, innerDataSource) => (
          <Table pagination={false} dataSource={innerDataSource} columns={columns} />
        )}
      </Expand>

      <br />
      <h4>展示的数据由业务组件处理</h4>
      <Expand style={{ marginBottom: '30px' }}>
        {(expanded) => (
          <Table pagination={false} dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)} columns={columns}/>
        )}
      </Expand>
    </div>
  );
};

export default App;
```


#### 显示更多按钮保持显示

```jsx
import React from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 6; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App: React.FC = () => {
  const { useMoreData } = Expand;
  const { Column } = Table;

  return (
    <div>
       <Expand keepButton={true}>
        {(expanded) => (
          <Table
            pagination={false}
            dataSource={dataSource.slice(0, expanded ? dataSource.length : 2)}
            columns={columns}
          />
        )}
      </Expand>
    </div>
  );
};

export default App;
```

#### 隐藏 Form 表单

```jsx
import React from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Form, Select, Input, Button } from 'antd';

const App: React.FC = () => {

  return (
    <div>
      <Expand keepButton={true}>
        {(expanded) => (
          <Form>
            <Form.Item>
              <Input placeholder="订单ID" />
            </Form.Item>
            <Button type="primary">提交</Button>
            <h4 style={{ margin: '12px 0' }}>退回原因</h4>
            <Form.Item hidden={!expanded}>
              <Select
                placeholder="请选择退回原因"
                options={[
                  { label: '包裹丢失', value: 'lost' },
                  { label: '包裹损坏', value: 'damaged' },
                  { label: '其它原因', value: 'other' },
                ]}
              />
            </Form.Item>
            <Form.Item hidden={!expanded}>
              <Input.TextArea placeholder="请输入内容..." />
            </Form.Item>
          </Form>
        )}
      </Expand>
    </div>

  );
};

export default App;
```

#### 异步请求数据

```jsx
import React, {useState} from 'react';
import { Expand } from 'MO-UI';
import type { MenuProps } from 'antd';
import { Table } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const dataSource: DataType[] = [];
for (let i = 0; i < 3; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const App: React.FC = () => {
  const { useMoreData } = Expand;

  const fetchRemoteData = () => {
    return new Promise<typeof dataSource>((resolve) => {
      setTimeout(() => {
        const remoteData = [...dataSource, ...dataSource];
        resolve(remoteData);
      }, 1500);
    });
  }

  const AsyncExpand = (props) => {
    const initData = dataSource;
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [viewData, setViewData] = useState(initData);

    const expandedChangeHandle = (willExpand) => {
      if (willExpand) {
        setLoading(true);
        fetchRemoteData()
          .then((data) => {
            setViewData(data);
            setExpanded(willExpand);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setViewData(initData);
        setExpanded(willExpand);
      }
    };

    return (
      <Expand loading={loading} expanded={expanded} onExpandedChange={expandedChangeHandle} {...props}>
        <Table pagination={false} dataSource={viewData} columns={columns} />
      </Expand>
    );
  }

  const AsyncHookExpand = (props) => {
    const { data, containerProps } = useMoreData(fetchRemoteData, { initialData: dataSource });

    return (
      <Expand {...containerProps} {...props}>
        <Table pagination={false} dataSource={data} columns={columns} />
      </Expand>
    );
  }


  return (
    <div>
      <AsyncExpand />
      
      <h5>使用 hook 请求异步数据</h5>
      <AsyncHookExpand />
    </div>
  );
};

export default App;
```





## API

属性说明如下：

| 参数      | 说明                 | 类型                                                                      | 默认值 |
| --------- | -------------------- | ------------------------------------------------------------------------- | ------ |
| dataSource      | 要展示的数据     |   any[ ]        | -      |
| loading | 按钮的加载状态         |  boolean                                                             | false      |
| buttonSize   | 按钮的大小 |  "small" \| "middle" \| "large"                             | small     |
| buttonProps     | 按钮的属性           | [ButtonProps](https://ant-design.antgroup.com/components/button-cn#api) | -      |
| keepButton | 按钮是否保持显示 |  boolean | false | 
| showButton | 是否显示按钮 |  boolean | false |
| align | 按钮的位置 |  "left" \| "center" \| "right" | center |
| type | 按钮的模式 |  "text" \| "normal" \| "embed" | text |
| defaultExpanded |  设置是否默认展开 | boolean | false |
| expended | 设置是否展开 |  boolean | - |
| expandRender | 显示更多按钮的自定义渲染 |  ({ icon: React.ReactNode; trigger: () => void; isExpanded: boolean; }) => ReactNode| - |
| onExpandedChange | 展开折叠时的事件 |  (expanded: boolean) => void | - |
| limitLength | 默认要显示的数据 |  number | - |
| locale | 国际化 |  { more?: string; less?: string } | - |
| children | Expand 组件的子组件 |  ReactNode \| (expanded: boolean \| undefined, dataSource: any[] \| undefined) => ReactNode | - |




