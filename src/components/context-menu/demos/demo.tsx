import { RightOutlined } from '@ant-design/icons';
import { Button, Divider, Select, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { ContextMenu } from 'MO-UI';
import { SelectValue } from 'antd/es/select';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './demo.scss';

const tagsData = [
  {
    id: 3,
    name: '子弹类',
    color: 'primary',
  },
  {
    id: 7,
    name: '召唤物',
    color: 'orange',
  },
  {
    id: 8,
    name: 'BUFF特效',
    color: 'secondary',
  },
  {
    id: 9,
    name: '怪物',
    color: 'secondary',
  },
  {
    id: 10,
    name: '预警特效',
    color: 'green',
  },
  {
    id: 11,
    name: '全屏爆炸',
    color: 'orange',
  },
  {
    id: 12,
    name: '点名伤害',
    color: 'orange',
  },
  {
    id: 13,
    name: 'UI特效',
    color: 'primary',
  },
  {
    id: 14,
    name: '时装',
    color: 'red',
  },
];

const imageData = {
  fileName: '5186867718_06b2e9e551_b.jpg',
  modelPath:
    'Assets/ResourcesAB/Prefab/Models/Character/pet/pet3_zhenhundeng_011a',
  previewPath:
    'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
  url: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
};

const RIGHT_POSITION_STYLE = {
  width: '100%',
  position: 'absolute',
  right: '-200px',
  top: 0,
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  borderRadius: 6,
};

const LEFT_POSITION_STYLE = {
  width: '100%',
  position: 'absolute',
  left: '-180px',
  top: 0,
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
  borderRadius: 6,
};

const App: React.FC = () => {
  const menuRef = useRef(null);
  const imageMenuRef = useRef<any>(null);
  const selectRef = useRef<any>(null);

  const [selectVisible, setSelectVisible] = useState<boolean>(false);

  const [positionStyle, setPositionStyle] = useState<any>(RIGHT_POSITION_STYLE);

  const [menuVisible, setMenuVislble] = useState<boolean>(false);

  const [selectValue, setSclectValue] = useState<SelectValue>([]);

  useEffect(() => {
    getPositionStyle(imageMenuRef.current?.event);
  }, [selectVisible]);

  const getPositionStyle = (event: any) => {
    const clientWidth = document?.documentElement?.clientWidth;
    const clientX = event?.clientX;
    const menuWidth = document.getElementById('mo-context-menu')?.clientWidth;
    const selectWidth = document.getElementById('select-tag')?.clientWidth;

    if (
      clientWidth &&
      clientX &&
      menuWidth &&
      selectWidth &&
      clientWidth - clientX < menuWidth + selectWidth
    ) {
      setPositionStyle(LEFT_POSITION_STYLE);
    } else {
      setPositionStyle(RIGHT_POSITION_STYLE);
    }
    return positionStyle;
  };

  const copyPath = () => {
    const src = (menuRef.current as any)?.event?.target?.getAttribute('src');
    message.info(`复制成功: ${src}`);
  };

  const copyName = () => {
    const src = (menuRef.current as any)?.event?.target?.getAttribute('src');
    const arr = src.split('/');
    const name = arr[arr.length - 1];
    message.info(`复制成功: ${name}`);
    return name;
  };

  return (
    <>
      <ContextMenu
        ref={menuRef}
        visible={menuVisible}
        onClick={(event: MouseEvent) => {
          // // 使用 ContextMenu 组件对外暴露的 closeMenu 方法关闭自定义右键菜单
          // (menuRef.current as any)?.closeMenu();
          // // 在父组件中设置 state 的方式关闭自定义右键菜单
          // setMenuVislble(false);
        }}
        onContextMenu={(event: MouseEvent, visible: boolean) => {}}
        menu={
          <ul className="menu-container-ul menu-list-container">
            <li>
              <CopyToClipboard onCopy={copyName} text={imageData?.fileName}>
                <span>复制文件名</span>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard
                onCopy={copyPath}
                text={(menuRef.current as any)?.event?.target?.getAttribute(
                  'src',
                )}
              >
                <span>复制路径</span>
              </CopyToClipboard>
            </li>

            <li className="li-tagging">
              <span
                className="tagging"
                onMouseEnter={(
                  e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
                ) => {
                  setSelectVisible(true);
                }}
              >
                打标签
              </span>
              <RightOutlined className="iconRight" />
              {selectVisible && (
                <div id="select-tag" ref={selectRef} style={positionStyle}>
                  <Select
                    allowClear
                    showSearch
                    placeholder="请选择标签"
                    className="tagsSelect"
                    onFocus={() => {
                      setMenuVislble(true);
                    }}
                    onChange={(value: SelectValue) => {
                      setSclectValue(value);
                    }}
                    mode="multiple"
                    style={{ width: '100%' }}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '10px 0' }} />
                        <div className="selectCustomRender">
                          <Button
                            type="default"
                            size="small"
                            onClick={(e) => {
                              setMenuVislble(false);
                              setSelectVisible(false);
                              setSclectValue([]);
                            }}
                          >
                            取消
                          </Button>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                              setMenuVislble(false);
                              setSelectVisible(false);
                              message.info(
                                `您选择的标签是：${(selectValue as any[]).join(
                                  ',',
                                )}`,
                              );
                            }}
                          >
                            确定
                          </Button>
                        </div>
                      </>
                    )}
                    getPopupContainer={() => {
                      // 菜单渲染父节点。默认渲染到 body 上，
                      // 需要将菜单的渲染父节点设置为包裹 Select 的父容器，否则点击下拉菜单空白区域可能会导致自定义右键菜单关闭
                      return (
                        (document.getElementById(
                          'select-tag',
                        ) as HTMLElement) || document.body
                      );
                    }}
                  >
                    {tagsData?.length > 0 &&
                      tagsData.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          <div className="demo-option-label-item">
                            <span
                              style={{
                                display: 'inline-block',
                                backgroundColor: item.color,
                                padding: '0 10px',
                                borderRadius: 6,
                              }}
                            >
                              {item.name}
                            </span>
                          </div>
                        </Select.Option>
                      ))}
                  </Select>
                </div>
              )}
            </li>
          </ul>
        }
      >
        <img
          alt=""
          width={200}
          style={{ marginRight: 10 }}
          src="https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg"
          onContextMenu={(e: any) => {
            setSelectVisible(false);
          }}
          className="img-cover"
          defaultValue={'image1'}
        />

        <img
          alt=""
          width={200}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          onContextMenu={(e: any) => {
            setSelectVisible(false);
          }}
          className="img-cover"
          defaultValue={'image2'}
        />
      </ContextMenu>
    </>
  );
};

export default App;
