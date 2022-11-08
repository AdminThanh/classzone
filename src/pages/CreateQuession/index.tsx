import { CheckCircleOutlined, DeleteOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Form, Input, InputNumber, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Editor } from '@tinymce/tinymce-react';
import BreadCrumb from 'components/BreadCrumb';
import './CreateQuession.scss';
import React, { useRef } from 'react';

const CreateQuession = () => {

    const onFinish = (values: any) => {
        console.log('Payload:', values);
        console.log('question:', values.question.level.content);
        console.log(editorRef);
    };
    const editorRef = useRef(null);

    return (
        <div className="createQuession">
            <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">

                <Form.Item name="isCheck" valuePropName="checked">
                    <Checkbox>Cho phép chọn nhiều đáp án</Checkbox>
                </Form.Item>

                <Form.Item name={'point'} rules={[{ required: true, message: 'Không được để trống' }]} label="Điểm" >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item name={'question'} rules={[{ required: true, message: 'Không được để trống' }]} label="Câu hỏi">
                    <Editor
                        apiKey='7ad8eq7icu3n630t4u3ioq10q46dh4k70mpveov40xv5ofo9'
                        onInit={(evt: any, editor: any) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 200,
                            plugins: [
                                'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export'
                            ],
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            menubar: 'file edit view insert format tools table tc help',
                            toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                            autosave_ask_before_unload: true,
                            autosave_interval: '30s',
                        }}
                    />
                </Form.Item>

                <Form.List name="answer">
                    {(fields, { add, remove }) => (
                        <>
                            <label>Đáp án</label>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={name}
                                        rules={[{ required: true, message: 'Không được để trống' }]}
                                    >
                                        {/* <Checkbox className='hidden'>
                                        </Checkbox>
                                        <Avatar>{key}</Avatar> */}
                                        <Input placeholder="Câu trả lời" />
                                    </Form.Item>
                                    <DeleteOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Thêm câu hỏi
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item className='btn_action'>
                    <Button type="primary" htmlType="submit">
                        Xuất bản
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default CreateQuession; 