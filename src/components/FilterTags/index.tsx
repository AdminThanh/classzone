import { useMutation, useQuery } from '@apollo/client';
import { Form, notification, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { DeleteTagDocument, GetTagDocument } from 'gql/graphql';
import { useTranslation } from 'react-i18next';
import { BinIcon } from 'utils/drawer';
import TagControl from './components/TagControl';
import './FilterTags.scss';
import { useEffect, useMemo, useState } from 'react';
import Button from 'components/Button';

export interface IOptionTag {
  label: string;
  value: string;
}

interface IFilterTags {
  placeholder?: string;
  isShowTagControl?: boolean;
  opts?: any;
  listTags?: any;
  onChange?: (value: string[]) => void;
}

const FilterTags = (props: IFilterTags) => {
  const {
    isShowTagControl = false,
    placeholder = '',
    opts,
    listTags,
    onChange: handleChange,
  } = props;
  const [tagsOpt, setTagsOpt] = useState();
  const [form] = useForm();
  const { t } = useTranslation();

  const { data, refetch } = useQuery(GetTagDocument);
  const [fireDeleteTag] = useMutation(DeleteTagDocument);

  const handleRefetch = () => {
    refetch();
  };

  const handleDeleteTag = async (id: string) => {
    try {
      await fireDeleteTag({
        variables: {
          id: id,
        },
      });
      handleRefetch();
      notification.success({
        key: 'success',
        message: t('action.delete_success'),
      });
    } catch (error) {
      console.log(error);
      notification.error({
        key: 'error',
        message: t('action.delete_error'),
      });
    }
  };

  const datasss = ['03092ff4-892f-4945-bbf1-1d6efa4eaefe'];

  return (
    <Form form={form}>
      <Form.Item hasFeedback className="filter__tags">
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder={placeholder}
          onChange={handleChange}
          popupClassName="filter_popup"
          defaultActiveFirstOption={true}
          // defaultValue={datasss}
          {...(isShowTagControl
            ? {
                dropdownRender: (menu) => {
                  return (
                    <>
                      {menu}
                      <TagControl handleRefetch={handleRefetch} />
                    </>
                  );
                },
              }
            : {})}
        >
          {data?.getTag.map((opt) => (
            <Select.Option
              key={opt.id}
              className="filter__tagItem"
              value={opt.id}
            >
              <div className="filter__label">{opt.name}</div>
              <div className="filter__action">
                <BinIcon onClick={() => handleDeleteTag(opt.id)} />
              </div>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default FilterTags;
