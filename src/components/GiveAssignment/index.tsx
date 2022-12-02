import { Button, DatePicker, Form, InputNumber, Select, Space } from "antd";

import { useTranslation } from "react-i18next";
import "./GiveAssignmanet.scss";

const { RangePicker } = DatePicker;


function GiveAssingment() {
    const { t } = useTranslation();

    const onFinish = (values: any) => {
        console.log(values);
    };
    return (
        <div className="create-assignment">
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish}
            >
                <Form.Item label={t('my_class.list_assignment')} name="assignment">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={t('my_class.start_date')} name="startTime">
                    <RangePicker showTime />
                </Form.Item>
                <Form.Item label={t("exam.work_time")} name="timeMake">
                    <InputNumber min={1} defaultValue={3} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Button</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default GiveAssingment;