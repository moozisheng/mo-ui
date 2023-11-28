import { generateId } from '@/utils/util';
import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useMemoizedFn } from 'ahooks';
import { Button, Form, Popconfirm, Table } from 'antd';
import clonedeep from 'lodash/clonedeep';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import './index.scss';
import { IProps, IRecordCreatorProps } from './interface';
import EditableCell, { EditTableItemProps } from './table-cell';
import Row from './table-row';

const style = {
  // color: '#1A71FF',
  border: '1px solid #f0f0f0',
  borderStyle: 'solid',
  borderColor: '#f0f0f0',
  marginTop: -1,
  borderTopLeftRadius: 'unset',
  borderTopRightRadius: 'unset',
  boxShadow: 'none',
};

const DragEditableTable = forwardRef(
  (
    {
      editableProps,
      maxLength,
      sortPosition = 'right',
      allRowsEditable = true,
      errorTip = '',
      dataSource: originData,
      columns,
      recordCreatorProps = {
        position: 'bottom',
        text: '新增一行',
        icon: <PlusOutlined />,
        style: { ...style },
      },
    }: IProps,
    ref: React.ForwardedRef<any>,
  ) => {
    const [form] = Form.useForm();

    const [recordField, setRecordField] = useState<string[]>([]);

    // 可编辑表格的列表数据
    const [dataSource, setDataSource] = useState<EditTableItemProps[]>([]);

    // 当前可编辑行的 key
    const [editingKey, setEditingKey] = useState<string | number>('');

    const [errorTipVisible, setErrorTipVisible] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('请填写完整');

    const setErrorTipToShow = useMemoizedFn(() => {
      setErrorTipVisible(true);
    });

    // 向父组件暴露内部的属性或方法
    useImperativeHandle(
      ref,
      () => ({ addRow, setErrorTipToShow, dataSource }),
      [dataSource],
    );

    useEffect(() => {
      const fields = columns
        .filter((item) => item.dataIndex !== undefined)
        .map((item) => item.dataIndex);

      setRecordField(fields);
    }, []);

    // 设置表单值
    useEffect(() => {
      const cloneData = clonedeep(originData);

      // 所有行可编辑时，通过 form 设置每列的值
      if (allRowsEditable && cloneData?.length) {
        // 获取每一列的的Form.Item 的 field
        const keys = Object.keys(cloneData?.[0]).filter(
          (key) => key !== 'key' && key !== 'dataSource',
        );

        const formValue: { [key: string]: any } = {};
        cloneData.forEach((itemData) => {
          keys.forEach((key) => {
            formValue[key + '_' + itemData.key] = itemData[key] ?? '';
          });
        });

        form.setFieldsValue(formValue);
      }

      form.setFieldValue('dataSource', cloneData);
      setDataSource(cloneData);

      // checkFormValuesIsEmpty();
    }, [originData]);

    useEffect(() => {
      if (errorTip) {
        setErrorMessage(errorTip as string);
        setErrorTipVisible(true);
      }
    }, [errorTip]);

    // 设置行是否可编辑，如果所有行可编辑，则返回 true,
    const isEditing = (record: EditTableItemProps) => {
      return allRowsEditable ? true : record.key === editingKey;
    };

    // 组合 columns
    const getColumns = useMemoizedFn(() => {
      // 操作列，编辑、保存、取消、删除
      const optionColumn = [
        {
          dataIndex: 'operation',
          fixed: 'right',
          className: 'delete-action important-pr-3',
          render: (_: any, record: any) => {
            const editable = isEditing(record);

            return (
              <div
                className="flex justify-end"
                style={{ transform: 'translateY(-2px)' }}
              >
                {/* 所有行可编辑，只展示 删除 按钮 */}
                {allRowsEditable ? (
                  <Button
                    type="text"
                    className="important-pl-2 important-pr-2"
                    style={{ transform: 'translateY(2px)' }}
                    onClick={() => deleteHandle(record?.key)}
                  >
                    {editableProps?.deleteText ?? (
                      <DeleteOutlined
                        style={{ fontSize: 18 }}
                        className="cursor-pointer"
                      />
                    )}
                  </Button>
                ) : (
                  // 只有当前行可编辑，展示 编辑、保存、取消、删除 按钮
                  <>
                    {editable ? (
                      <>
                        <Button
                          className="important-pl-2 important-pr-2"
                          type="text"
                          onClick={() => save(record.key, record)}
                        >
                          {editableProps?.saveText ?? (
                            <SaveOutlined style={{ fontSize: 18 }} />
                          )}
                        </Button>
                        <Popconfirm
                          title="Sure to cancel?"
                          onConfirm={() => cancel(record.key)}
                        >
                          <Button
                            className="important-pl-2 important-pr-2"
                            type="text"
                            style={{
                              fontSize: 18,
                              transform: 'translateY(-4px)',
                            }}
                          >
                            {editableProps?.cancelText ?? (
                              <CloseCircleOutlined />
                            )}
                          </Button>
                        </Popconfirm>
                      </>
                    ) : (
                      <Button
                        className="important-pl-2 important-pr-2"
                        type="text"
                        // disabled={editingKey !== ''}
                        onClick={() => edit(record)}
                      >
                        <EditOutlined style={{ fontSize: 18 }} />
                      </Button>
                    )}
                    <Popconfirm
                      title="确认删除当前数据吗"
                      okText="确认"
                      cancelText="取消"
                      onConfirm={() => deleteHandle(record?.key)}
                    >
                      <Button
                        type="text"
                        className="important-pl-2 important-pr-2"
                        style={{ transform: 'translateY(2px)' }}
                        // onClick={() => deleteHandle(record)}
                      >
                        {editableProps?.deleteText ?? (
                          <DeleteOutlined
                            style={{ fontSize: 18 }}
                            className="cursor-pointer"
                          />
                        )}
                      </Button>
                    </Popconfirm>
                  </>
                )}
              </div>
            );
          },
        },
      ];

      // 拖拽排序列
      const sortColumn = [
        {
          key: 'sort',
          fixed: 'right',
          className: sortPosition === 'right' ? 'sort-column' : '',
        },
      ];

      const length = columns.length;
      const lastCol = columns[length - 1];
      let newColumns = [...columns];

      // 渲染内部的 Action 还是渲染自定义的 Action
      const renderRes = lastCol?.render?.();
      if (renderRes === null) {
        newColumns = columns.slice(0, length - 1);
        newColumns = newColumns.concat(optionColumn);
      }
      //  else if (renderRes !== null && renderRes?.$$typeof.toString() === 'Symbol(react.element)') {
      //   // TODO 自定义 Action 的处理
      // }

      newColumns =
        sortPosition === 'left'
          ? [...sortColumn, ...newColumns]
          : [...newColumns, ...sortColumn];

      newColumns = newColumns.map((col) => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,

          onCell: (record: EditTableItemProps) => ({
            record,
            valueType: col.valueType,
            dataIndex: col.dataIndex,
            title: col.title,
            formItemProps: col.formItemProps,
            formElementProps: col.formElementProps,
            editing: isEditing(record),
            onChange: (value: any) => {
              (record as any)[col.dataIndex] = value;

              allRowsEditable && save(record.key, record);
            },
            // onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => {
            //   record[col.dataIndex] = e.target.value;
            //  allRowsEditable && save(record.key, record);
            // },
          }),
        };
      });

      return newColumns;
    });

    // 拖拽
    const onDragEnd = useMemoizedFn(({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        setDataSource((previous) => {
          const activeIndex = previous.findIndex((i) => i.key === active.id);
          const overIndex = previous.findIndex((i) => i.key === over?.id);
          const dragResult = arrayMove(previous, activeIndex, overIndex);
          // 将拖拽后的数据保存到 form 上
          form.setFieldValue('dataSource', dragResult);
          return dragResult;
        });
      }
    });

    // 编辑行数据
    const edit = useMemoizedFn(
      (record: Partial<EditTableItemProps> & { key: React.Key }) => {
        const keys = Object.keys(record).filter(
          (key) => key !== 'key' && key !== 'dataSource',
        );
        const formValue: { [key: string]: any } = {};

        keys.forEach((key) => {
          formValue[key + '_' + record.key] = (record as any)[key];
        });

        form.setFieldsValue(formValue);

        setEditingKey(record.key);
      },
    );

    // 取消
    const cancel = async (key: string | number) => {
      form
        .validateFields(recordField)
        .then((values) => {
          setEditingKey('');
        })
        .catch((errorInfo) => {
          if (errorInfo.errorFields.length === recordField.length) {
            deleteHandle(key);
          }
        });
    };

    // 保存行数据
    const save = async (key: React.Key, record: any) => {
      try {
        // 校验特定字段

        const fields = recordField.map((item) => item + '_' + record.key);
        // const row = (await form.validateFields(fields)) as EditTableItemProps;
        const row = form.getFieldsValue(fields) as any;

        const newData = [...dataSource];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          // 已有行的保存

          const item = newData[index];
          const newRowData = recordField?.reduce((pre: any, cur) => {
            pre[cur] = row[cur + '_' + record.key];
            return pre;
          }, {});

          newData.splice(index, 1, {
            ...item,
            ...newRowData,
          });

          setDataSource(newData);
          setEditingKey('');
        } else {
          // 新增一行的保存

          newData.push(row);
          setDataSource(newData);
          setEditingKey('');
        }

        form.setFieldValue('dataSource', newData);
        errorTipVisible && checkFormValuesIsEmpty();
      } catch (error: any) {
        if (error.errorFields.length) {
          !errorTipVisible && setErrorTipVisible(true);
        }
        console.log('Validate Failed error info:', error);
      }
    };

    // 删除一行数据
    const deleteHandle = useMemoizedFn((key) => {
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
      form.setFieldValue('dataSource', newData);
      setEditingKey('');
    });

    // 新增一行
    const addNewRowHandle = useMemoizedFn(() => {
      let newRecord: any = {};
      let newData = [...dataSource];
      const record = (recordCreatorProps as IRecordCreatorProps)?.record?.();

      if (record?.id) {
        // 取传进来的 record

        setEditingKey(record?.id!?.toString());
        // 获取新增一行的 field key
        const keys = Object.keys(
          Object.assign(clonedeep(dataSource?.[0] || {}), record),
        );
        keys.forEach((key) => (newRecord[key] = record[key]));
        // 行的唯一 key
        newRecord['key'] = record?.id?.toString();
      } else {
        // 默认从 dataSource 中获取新增一行的 field key
        newRecord = addRow();
      }
      newData = [...newData, newRecord] as any[];

      setDataSource(newData);

      form.setFieldsValue({ ...newRecord });
    });

    const addRow = useMemoizedFn(() => {
      const key = generateId();

      setEditingKey(key);
      const record: any = {};
      const keys = Object.keys(dataSource?.[0] || {});
      keys.forEach((key) => (record[key] = ''));
      // 新增一行是默认生成唯一id
      // 行的唯一 key
      record['key'] = key;
      return record;
    });

    const renderAddNewRowBtn = useMemoizedFn(() => {
      return (
        <Button
          type="default"
          className="add-new-row-btn"
          style={(recordCreatorProps as IRecordCreatorProps)?.style || {}}
          onClick={addNewRowHandle}
          disabled={allRowsEditable ? false : editingKey !== ''}
        >
          {(recordCreatorProps as IRecordCreatorProps).icon}
          {(recordCreatorProps as IRecordCreatorProps).text}
        </Button>
      );
    });

    // 检查 Form Values 是否有未填写的项
    const checkFormValuesIsEmpty = () => {
      const formValues = form.getFieldValue('dataSource') as any[];
      const newFormValues = formValues?.reduce((pre, cur) => {
        const keys = Object.keys(cur);
        const newItem: any = {};
        keys.forEach((key) => {
          if (key !== 'sourceData' && key !== 'key') {
            newItem[key] = cur[key];
          }
        });
        pre.push(newItem);
        return pre;
      }, []);

      const result = newFormValues.every((item: any) => {
        const values = Object.values(item);

        if (values.includes('') || values.includes(undefined)) {
          return true;
        }
        return false;
      });

      if (result) {
        setErrorTipVisible(true);
      } else {
        setErrorTipVisible(false);
      }
    };

    return (
      <Form form={form} component={false}>
        <div className="drag-editable-table">
          {/* Add New Row Button */}
          {recordCreatorProps &&
            // 按钮位置在表格上面
            recordCreatorProps.position === 'top' &&
            // 最大行数
            (maxLength && dataSource.length >= maxLength ? false : true) &&
            renderAddNewRowBtn()}

          {/* Table Content */}
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              // rowKey array,需要注意的是，key 不能为 0,否则该行无法拖拽
              items={dataSource?.map((i) => i.key)}
              strategy={verticalListSortingStrategy}
            >
              <Table
                pagination={false}
                components={{
                  body: {
                    row: Row,
                    cell: EditableCell,
                  },
                }}
                rowKey="key"
                scroll={{ x: true, ...editableProps?.scroll }}
                columns={getColumns()}
                dataSource={dataSource || []}
              />
            </SortableContext>
          </DndContext>

          {/* Add New Row Button */}
          {recordCreatorProps &&
            // 按钮位置在表格下面
            recordCreatorProps.position === 'bottom' &&
            // 最大行数
            (maxLength && dataSource.length >= maxLength ? false : true) &&
            renderAddNewRowBtn()}

          {/* 错误提示 */}
          {errorTipVisible && (
            <div className="mt-2 errorTip">{errorMessage}</div>
          )}
        </div>
      </Form>
    );
  },
);

export default DragEditableTable;
