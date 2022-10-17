import { Divider, Input, Typography } from 'antd';
import Button from 'components/Button';
import ColorPicker from 'components/ColorPicker';
import { useCallback, useState } from 'react';
import { ColorResult, RGBColor } from 'react-color';
import { useTranslation } from 'react-i18next';
import { convertHexAToRGBA } from 'utils/convert';

interface ITagValues {
  name: string;
  color: {
    hex: string;
    rgb: RGBColor;
  };
}

const TagControl = () => {
  const { t } = useTranslation();

  const [tagValues, setTagValues] = useState<ITagValues>({
    name: '',
    color: {
      hex: '#fff',
      rgb: {
        r: 0,
        g: 0,
        b: 0,
        a: 0,
      },
    },
  });

  const handleChangeTagName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValues({
      ...tagValues,
      name: e?.target?.value || '',
    });
  };

  const handleChangeTagColorUsingInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      if (
        newColor.length === 4 ||
        newColor.length === 5 ||
        newColor.length == 7 ||
        newColor.length === 9
      ) {
        // Preparation:
        let param = newColor;
        if (param.length === 4) {
          param = `#${param[1]}${param[1]}${param[2]}${param[2]}${param[3]}${param[3]}ff`;
        }
        if (param.length === 7) {
          param = `${param}ff`;
        }
        // Handling:
        const newColorInRGBA = convertHexAToRGBA(param);
        setTagValues({
          ...tagValues,
          color: {
            hex: newColor,
            rgb: {
              ...newColorInRGBA.rgb,
              a: (newColorInRGBA.rgb?.a?.toFixed(2) || 0) as number,
            },
          },
        });
      } else {
        setTagValues({
          ...tagValues,
          color: {
            hex: newColor,
            rgb: {
              r: 0,
              g: 0,
              b: 0,
              a: 0,
            },
          },
        });
      }
    },
    [tagValues]
  );

  const handleChangeTagColorUsingPicker = useCallback(
    (newColor: ColorResult) => {
      setTagValues({
        ...tagValues,
        color: {
          rgb: newColor.rgb,
          hex: newColor.hex,
        },
      });
    },
    [tagValues]
  );

  return (
    <div
      className="filter__tagControl"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <Divider style={{ margin: '8px 0' }} />
      <div className="dropdown-bottom-title">{t('tag.add_tag')}</div>
      <div className="ant-select-dropdown-input">
        <Input
          placeholder={t('tag.enter_tag_name')}
          value={tagValues.name}
          onChange={handleChangeTagName}
        />
      </div>
      <div className="tag__color">
        <Input
          placeholder={
            t('tag.enter_color_code') + ': #fd0, #fd0f, #ffdd00, #ffdd00ff'
          }
          value={tagValues.color.hex}
          onChange={handleChangeTagColorUsingInput}
        />
        <ColorPicker
          currColor={tagValues.color}
          // currColor={
          //   Object.keys(inputTag.tagColorRGBA).length
          //     ? inputTag.tagColorRGBA
          //     : 'unset'
          // }
          onChangeColor={handleChangeTagColorUsingPicker}
        />
      </div>
      <div className="dropdown-bottom-action-list">
        <Typography.Link
          className="btn-add-tag"
          // onClick={handleAddNewTag}
        >
          {/* <PlusOutlined /> {t('tag.add_tag')} */}
          <div className="tag__button">
            <Button title={t('tag.add_tag')} type="primary" />
          </div>
        </Typography.Link>
      </div>
    </div>
  );
};

export default TagControl;
