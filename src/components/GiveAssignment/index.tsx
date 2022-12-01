import { useMutation, useQuery } from "@apollo/client";
import { Button, Checkbox, Col, DatePicker, Form, InputNumber, notification, Row, Select, Spin } from "antd";
import { CreateExamClassDocument, GetClassByIdDocument, GetMyExamDocument } from "gql/graphql";
import moment from "moment";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import "./GiveAssignmanet.scss";

function GiveAssingment() {
    const { t } = useTranslation();
    const { classId } = useParams();

    // const { data, refetch } = useQuery(GetClassByIdDocument, {
    //     variables: {
    //         id: classId as string
    //     }
    // })

    const { data: examData, refetch: examRefetch } = useQuery(GetMyExamDocument);

    const [fireCreateExamClass] = useMutation(CreateExamClassDocument);

    const onFinish = (values: any) => {
        console.log(values);

        const fromDate = values.startTime.format('DD-MM-YYYY HH:mm:ss');
        const endDate = values.endTime.format('DD-MM-YYYY HH:mm:ss');

        console.log(fromDate, endDate);

        notification.open({
            message: (
                <>
                    <Spin /> &nbsp; Giao bài kiểm tra
                </>
            )
        })
        try {
            notification.destroy();
            notification.success({
                message: 'Cập nhật thời khóa biểu thành công',
            })
            fireCreateExamClass({
                variables: {
                    createExamClassInput: {
                        exam: values.exam,
                        classRoom: classId as string,
                        isAllowReview: values.isAllowReview,
                        minutes: values.timeMake,
                        dateFrom: fromDate,
                        dateEnd: endDate,
                    }
                }
            })
        } catch (error) {
            console.log(error);
            notification.destroy();
            notification.error({
                message: "Giao bài tập thất bại!"
            })
        }
    };
    return (
        <div className="create-assignment">
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onFinish}
            >
                <Form.Item label={t('my_class.list_assignment')} name="exam">
                    <Select defaultValue={t('my_class.list_assignment')}>
                        {examData?.getMyExam.map((exam, index) => (
                            <Select.Option key={index} value={exam.id}>{exam.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item label={t('my_class.start_date')} name="startTime">
                            <DatePicker showTime />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={t('my_class.end_date')} name="endTime">
                            <DatePicker showTime />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={t("exam.work_time")} name="timeMake">
                    <InputNumber min={1} defaultValue={0} />
                </Form.Item>
                <Form.Item label={t("management.is_allow_review")} name="isAllowReview" valuePropName="checked">
                    <Checkbox checked={false}></Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{t("management.give_assignment")}</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default GiveAssingment;