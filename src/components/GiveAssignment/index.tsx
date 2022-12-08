import { useMutation, useQuery } from "@apollo/client";
import { Button, Checkbox, Col, DatePicker, Form, InputNumber, notification, Row, Select, Spin } from "antd";
import { CreateExamClassDocument, GetClassByIdDocument, GetMyExamDocument } from "gql/graphql";
import moment from "moment";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import "./GiveAssignmanet.scss";

function GiveAssingment() {
    const { t } = useTranslation();
    const { classId } = useParams();
    const [allowReview, setAllowReview] = useState<Boolean>(false);

    // const { data, refetch } = useQuery(GetClassByIdDocument, {
    //     variables: {
    //         id: classId as string
    //     }
    // })

    const { data: examData, loading: examLoading, refetch: examRefetch } = useQuery(GetMyExamDocument);

    const [fireCreateExamClass] = useMutation(CreateExamClassDocument);

    const onFinish = (values: any) => {
        console.log(values);

        const fromDate = values.startTime;
        const endDate = values.endTime;

        if (values.isAllowReview) {
            setAllowReview(true);
        } else {
            setAllowReview(false);
        }

        if (endDate < fromDate) {
            notification.error({
                message: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu!"
            })
            return;
        }

        notification.destroy();
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
                message: 'Giao bài kiểm tra thành công',
            })
            fireCreateExamClass({
                variables: {
                    createExamClassInput: {
                        exam: values.exam,
                        classRoom: classId as string,
                        isAllowReview: allowReview as boolean,
                        minutes: values.timeMake,
                        dateFrom: fromDate.toISOString(),
                        dateEnd: endDate.toISOString(),
                    }
                }
            })
        } catch (error) {
            console.log(error);
            notification.destroy();
            notification.error({
                message: "Giao bài kiểm tra thất bại!"
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
                <Form.Item label={t('my_class.list_assignment')} name="exam" rules={[{ required: true, message: t("exam.choose_assignment") }]}>
                    <Select defaultValue={t('my_class.list_assignment')}>
                        {examData?.getMyExam.map((exam, index) => (
                            <Select.Option key={index} value={exam.id}>{exam.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <Form.Item label={t('my_class.start_date')} name="startTime" rules={[{ required: true, message: t("exam.val_startDate") }]}>
                            <DatePicker showTime />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={t('my_class.end_date')} name="endTime" rules={[{ required: true, message: t("exam.val_endDate") }]}>
                            <DatePicker showTime />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label={t("exam.work_time")} name="timeMake" rules={[{ required: true, message: t("exam.val_makeTime") }]}>
                    <InputNumber min={1} defaultValue={0} />
                </Form.Item>
                <Form.Item label={t("management.is_allow_review")} name="isAllowReview" valuePropName="checked">
                    <Checkbox checked={false} value={false}></Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="btn-give" htmlType="submit">{t("management.give_assignment")}</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default GiveAssingment;