import './CreateQuestion.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Form, Input } from 'antd';
import { useMemo, useState } from 'react';
import BreadCrumb from 'components/BreadCrumb';
import FilterTags, { IOptionTag } from 'components/FilterTags';
import { useTranslation } from 'react-i18next';
import { Editor } from '@tinymce/tinymce-react';
import { Checkbox, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const CreateQuestion = () => {
  const { t } = useTranslation();

  const [text, setText] = useState('');
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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <div className="site_wrapper">
      <div className="site_container">
        <BreadCrumb
          routes={[
            {
              name: t('navbar.home'),
              path: '/',
            },
            {
              name: t('navbar.question_management'),
              path: '/question',
            },
            {
              name: t('navbar.add_question'),
              path: '/create_question',
            },
          ]}
        />

        <div className="create_quession">
          <div className="action-navbar">
            <label>{t('my_quession.tags')}: </label>
            <FilterTags
              placeholder={t('my_quession.choose_tags')}
              isShowTagControl
              opts={tagOpts}
              onChange={handleChangeFilterTags}
            />
          </div>
          <div className="create_quession-content">
            <div className="editor">
              <label className="title_answer">Câu hỏi:</label>
              <Editor
                value={text}
                onInit={(evt, editor) => {
                  setText(editor.getContent({ format: 'text' }));
                }}
                onEditorChange={(newValue, editor) => {
                  setText(newValue);
                  setText(editor.getContent({ format: 'text' }));
                }}
                init={{
                  height: 400,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                }}
              />
              {/* <pre>{text}</pre> */}
            </div>
            <div className="choose_answer">
              <Checkbox>Chọn nhiều đáp án</Checkbox>
              <div className="point mt-2">
                <label htmlFor="">Điểm:</label>
                <InputNumber min={0} max={100} defaultValue={3} />
              </div>
              <div className="answers mt-2">
                <label htmlFor="" className="title_answer">
                  Đáp án:
                </label>

                <Form name="dynamic_form_item" onFinish={onFinish}>
                  <Form.List
                    name="names"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(
                              new Error('At least 2 passengers')
                            );
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...formItemLayout}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Nội dung không được để trống",
                                },
                              ]}
                              noStyle
                            >
                              <div className="quession_item">
                                <Avatar className="quession_item-sentence">
                                  1
                                </Avatar>
                                <TextArea
                                  className="quession_item-content"
                                  placeholder="Nhập câu hỏi"
                                  autoSize
                                />
                              </div>
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                          className='btn_add_quession-item'
                            type="dashed"
                            onClick={() => add()}
                            style={{ width: '20%' }}
                          >
                            Thêm câu trả lời
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateQuestion;
