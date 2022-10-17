import { Dropdown } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import { ColorResult, RGBColor, SketchPicker } from 'react-color';
import { CaretDownOutlined } from '@ant-design/icons';
import './ColorPicker.scss';
import clsx from 'clsx';

interface IColorPicker {
  currColor: {
    hex: string;
    rgb: RGBColor;
  };
  defaultSelectedColor?: any;
  onChangeColor: (newColor: ColorResult) => void;
  defaultColorCollections?: any[];
}

const ColorPicker = (props: IColorPicker) => {
  const {
    currColor = 'unset',
    defaultSelectedColor = {
      hex: 'transparent',
      rgb: {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      },
    },
    defaultColorCollections = [
      { color: 'transparent', title: 'No fill' },
      '#1fbfb8',
      '#039fbe',
      '#1978a5',
      '#26495c',
      '#ced89e',
      '#adcF9f',
      '#76ba99',
      '#05716c',
      '#f24c4c',
      '#f47c7c',
      '#d71b3b',
      '#b20238',
      '#ffd24c',
      '#d7d716',
      '#f3ca20',
      '#ec9b3b',
      '#f57e7e',
      '#e75874',
      '#e52165',
    ],
    onChangeColor = () => {},
    // className = '',
    ...rest
  } = props;

  const [selectedColor, setSelectedColor] = useState<{
    hex: string;
    rgb: RGBColor;
  }>(defaultSelectedColor);

  const handleChangeSelectedColor = (newColor: ColorResult) => {
    setSelectedColor(newColor);
    onChangeColor(newColor);
  };

  useEffect(() => {
    // setSelectedColor(currColor);
    if (currColor !== 'unset') {
      const curr = `${currColor.rgb.r},${currColor.rgb.g},${currColor.rgb.b},${currColor.rgb.a}`;
      const selected = `${selectedColor.rgb.r},${selectedColor.rgb.g},${selectedColor.rgb.b},${selectedColor.rgb.a}`;
      if (currColor.hex !== selectedColor.hex && curr !== selected) {
        setSelectedColor(currColor);
      }
    }
  }, [currColor]);

  return (
    <div
      className="app-color-picker"
      onMouseDown={(e: any) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Dropdown
        trigger={['click']}
        overlay={
          <>
            <div className="color-picker-wrapper sketch-picker">
              <SketchPicker
                color={selectedColor.hex}
                onChange={handleChangeSelectedColor}
                // onChangeComplete={handleChangeSelectedColor}
                disableAlpha={false}
                presetColors={defaultColorCollections}
                //   width={250}
              />
            </div>
          </>
        }
        placement="bottomLeft"
      >
        <div className="toggle-btn">
          <div
            className={clsx({
              'color-preview': true,
              'no-color': selectedColor.rgb.a === 0,
            })}
            style={{
              backgroundColor: selectedColor.hex,
            }}
          />
          <div className="toggle-btn-icon">
            <CaretDownOutlined />
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default React.memo(ColorPicker);
