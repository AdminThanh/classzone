import BreadCrumb from "components/BreadCrumb";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AddIcon, CancelIcon, EditIcon } from "utils/drawer";
import "./ExamManagement.scss";

export interface IListExam {
    id: number,
    name_exam: string,
    class: string,
    status: string,
    had_done: number,
    total_exam: number,
}

let dataStudent: IListExam[] = [
    {
        id: 1,
        name_exam: "Đào Đức Minh Khôi",
        class: "B1",
        status: "Chưa giao",
        had_done: 5,
        total_exam: 10,
    },
    {
        id: 2,
        name_exam: "Lê Tuyền",
        class: "B1",
        status: "Chưa giao",
        had_done: 5,
        total_exam: 10,
    },
    {
        id: 3,
        name_exam: "Hoàng Yến",
        class: "B1",
        status: "Chưa giao",
        had_done: 5,
        total_exam: 10,
    },
]

function ExamManagement() {
    const [listExam, setListExam] = useState<any[]>(dataStudent);
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (<div className="management-page">
        <BreadCrumb routes={[
            {
                name: 'Quản lý bài kiểm tra',
                path: '/exam_management',
            },
        ]} />
        <div className="action-exam">
            <div className="name_class">Khóa học Tiếng anh</div>
            <div className="action">
                <button type="button" className="create-exam primary" onClick={() => navigate("/create_assignment")}><AddIcon />{t('management.create_exam')}</button>
                <button type="button" className="give-exam primary">{t('management.give_assignment')}</button>
            </div>
        </div>
        <div className="management-container">
            <table className="management-table">
                <thead>
                    <tr>
                        <th>{t('management.name_exam')}</th>
                        <th>{t('management.class')}</th>
                        <th>{t('management.status')}</th>
                        <th>{t('management.had_done')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listExam.map((item) => (
                        <tr key={item.id}>
                            <td className="td-management"><p>{item.name_exam}</p></td>
                            <td className="td-management"><p>{item.class}</p></td>
                            <td className="td-management"><p>{item.status}</p></td>
                            <td className="td-management">{item.had_done}/{item.total_exam}</td>
                            <td className="td-management"><EditIcon /> <CancelIcon /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default ExamManagement;