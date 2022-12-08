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
  notification,
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
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@apollo/client';
import {
  CreateQuestionDocument,
  GetQuestionByIdDocument,
  UpdateQuestionDocument,
} from 'gql/graphql';
import { useParams } from 'react-router-dom';

const CreateQuession = () => {
  const { t } = useTranslation();
  const [form] = useForm();
  const questionId = useParams();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const [fireCreateQuestion] = useMutation(CreateQuestionDocument);
  const [fireUpdateQuestion] = useMutation(UpdateQuestionDocument);

  const skip = questionId.questionId ? false : true;
  const { data, refetch } = useQuery(GetQuestionByIdDocument, {
    variables: {
      id: questionId.questionId as string,
    },
    skip,
  });

  useEffect(() => {
    form.setFieldsValue({
      question: data?.getQuestionById?.question,
      answer: data?.getQuestionById?.correctAnswer.map((aswr) => ({
        text: aswr.text,
        result: aswr.result,
      })),
      isMultiple: data?.getQuestionById?.isMultiple,
    });
  }, [data]);

  const handleQuestion = async (formData: any) => {
    console.log('Payload:', formData);

    if (questionId.questionId) {
      try {
        await fireUpdateQuestion({
          variables: {
            updateQuestionInput: {
              question: formData.question,
              correctAnswer: formData.answer,
              isMultiple: formData.isMultiple,
            },
            id: questionId.questionId as string,
          },
        });
        notification.success({
          key: 'success',
          message: t('action.edit_success'),
        });
        refetch();
      } catch (error) {
        notification.error({
          key: 'error',
          message: t('action.edit_error'),
        });
      }
    } else {
      try {
        await fireCreateQuestion({
          variables: {
            createQuestion: {
              question: formData.question,
              correctAnswer: formData.answer,
              isMultiple: formData.isMultiple || false,
              tags: formData.tag_ids,
            },
          },
        });
        form.resetFields();
        notification.destroy();
        notification.success({
          key: 'success',
          message: t('action.add_success'),
        });
      } catch (error) {
        notification.error({
          key: 'error',
          message: 'Tạo thất bại!',
        });
      }
    }
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

  const handleChooseCorrectAnswer = (e: any, index: any) => {
    const newValue = e.target.checked;
    const isMultiple = form.getFieldValue('isMultiple');
    const listAnswer = form.getFieldValue('answer');

    if (!isMultiple) {
      const hasResult = listAnswer.findIndex(
        (item: any, i: number) => item.result && i !== index
      );
      if (hasResult !== -1) {
        listAnswer[hasResult].result = false;
      }
      listAnswer[index].result = newValue;

      form.setFieldValue('answer', listAnswer);
      return;
    }

    let item = listAnswer[index];

    if (item) {
      item.result = newValue;
    }
  };

  const handleAllowMultipleChoice = () => {
    const answer = form.getFieldValue('answer');

    let indexChosen = undefined;
    let count = 0;
    if (answer) {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i].result) {
          indexChosen = i;
          count++;
        }

        answer[i].result = false;
      }
    }

    // indexChosen can is zero
    if (indexChosen !== undefined && count === 1) {
      answer[indexChosen].result = true;
    }

    form.setFieldValue('answer', answer);
  };

  console.log('Re-render');
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
              name: t('navbar.create_question'),
              path: '/create_question',
            },
          ]}
        />
        <div className="createQuession">
          <Form
            name="dynamic_form_nest_item"
            onFinish={handleQuestion}
            autoComplete="off"
            form={form}
          // initialValues={{
          //   answer: correctAnswer,
          //   isMultiple: isMultiple,
          // }}
          >
            <div className="action-navbar">
              <label>{t('my_quession.tags')}</label>
              <Form.Item name="tag_ids">
                <FilterTags
                  placeholder={t('my_quession.tags')}
                  isShowTagControl
                  opts={tagOpts}
                  onChange={handleChangeFilterTags}
                />
              </Form.Item>
            </div>

            <Form.Item
              name={['question']}
              rules={[{ required: true, message: t('my_quession.not_blank') }]}
              label={t('my_quession.quession')}
              className="quession"
            >
              <MyEditor question={data?.getQuestionById?.question as string} />
            </Form.Item>

            <Form.Item name="isMultiple" valuePropName="checked">
              <Checkbox onChange={handleAllowMultipleChoice}>
                {t('my_quession.choose_many')}
              </Checkbox>
            </Form.Item>

            <Form.List name="answer"

            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  <label>{t('my_quession.answer')}</label>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        className="check_result"
                        name={[name, 'result']}
                        {...restField}
                        valuePropName="checked"
                        initialValue={false}
                      >
                        <Checkbox
                          onChange={(e) => handleChooseCorrectAnswer(e, index)}
                          className="hidden"
                          value={key + 1}
                        >
                          {alphabet.charAt(index).toLowerCase()}
                        </Checkbox>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'text']}
                        rules={[
                          {
                            required: true,
                            message: t('my_quession.not_blank'),
                          },
                        ]}
                      >
                        <Input placeholder={t('my_quession.enter_answer')} />
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
                      {t('my_quession.add_quession')}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item className="btn_action">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  console.log('asd', form.getFieldsValue());
                }}
              >
                {t('my_quession.publish')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CreateQuession;
