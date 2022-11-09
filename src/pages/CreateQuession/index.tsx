import {
  CheckCircleOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Editor } from '@tinymce/tinymce-react';
import BreadCrumb from 'components/BreadCrumb';
import './CreateQuession.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import FilterTags, { IOptionTag } from 'components/FilterTags';
import { useForm } from 'antd/es/form/Form';
import MyEditor from './components/MyEditor';

const CreateQuession = () => {
  const [form] = useForm();

  const onFinish = (formData: any) => {
    console.log('Payload:', formData);
  };

  const tagOpts: IOptionTag[] = useMemo(
    () => [
      {
        label: 'HTML',
        value: '1',
      },
      {
        label: 'CSS',
        value: '2',
      },
      {
        label: 'ReactJS',
        value: '3',
      },
    ],
    []
  );

  const handleChangeFilterTags = (value: string[]) => {
    console.log('Change', value);
  };

  console.log("Re-render")
  return (
    <div className="createQuession">
      <button
        onClick={() => {
          console.log('asd', form.getFieldsValue());
        }}
      >
        A
      </button>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div className="action-navbar">
          <label>Tag</label>
          <Form.Item name="tag_ids">
            <FilterTags
              placeholder={'Tag'}
              isShowTagControl
              opts={tagOpts}
              onChange={handleChangeFilterTags}
            />
          </Form.Item>
        </div>

        <Form.Item
          name={'point'}
          rules={[{ required: true, message: 'Không được để trống' }]}
          label="Điểm"
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name={'question'}
          rules={[{ required: true, message: 'Không được để trống' }]}
          label="Câu hỏi"
          className="quession"
        >
          <MyEditor />
        </Form.Item>

        <Form.Item name="isCheck" valuePropName="checked">
          <Checkbox>Cho phép chọn nhiều đáp án</Checkbox>
        </Form.Item>

        <Form.List name="answer">
          {(fields, { add, remove }) => (
            <>
              <label>Đáp án</label>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    className="check_result"
                    name={[name, 'check_result']}
                    {...restField}
                    valuePropName="checked"
                  >
                    <Checkbox className="hidden">{key + 1}</Checkbox>
                  </Form.Item>

                  <Form.Item
                    name={[name, 'quession']}
                    {...restField}
                    rules={[{ required: true, message: 'Không được để trống' }]}
                  >
                    <Input placeholder="Câu trả lời" />
                  </Form.Item>
                  <DeleteOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm câu hỏi
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item className="btn_action">
          <Button type="primary" htmlType="submit">
            Xuất bản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default CreateQuession;
