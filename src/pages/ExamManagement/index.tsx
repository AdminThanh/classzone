import BreadCrumb from "components/BreadCrumb";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddIcon } from "utils/drawer";
import "./ExamManagement.scss";

export interface IListStudent {
    id: number,
    img: string,
    name: string,
    note: string,
    isCheck: boolean,
    total: number,
}

let dataStudent: IListStudent[] = [
    {
        id: 1,
        img: "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/120946730_352619426059311_851730369256431030_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rIy_dqzWHK0AX_BJsWh&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT82ZmCfcx_VdoVorAskrICvWUB2areOl-cQ-I4HNL8JuQ&oe=637BF31F",
        name: "Đào Đức Minh Khôi",
        note: "",
        isCheck: false,
        total: 5
    },
    {
        id: 2,
        img: "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/77183410_978855692486793_3641584607138152448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=fJIvoGOUX0QAX_NC4MW&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT__Iab7160RKdUacOrjiZH2Rym3UJ7JeLc0J5FMYY2Kgw&oe=637D33F2",
        name: "Lê Tuyền",
        note: "",
        isCheck: false,
        total: 5
    },
    {
        id: 3,
        img: "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/169157577_908675839887226_224514685520977440_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=QsfcB7Ptl1EAX_mzZfB&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT_SUdGUr41GJaAiAwXq3Oq1_ZjubMVlLpbrUJGq7VpCCQ&oe=637B9FFA",
        name: "Hoàng Yến",
        note: "",
        isCheck: false,
        total: 5
    },
]

function ExamManagement() {
    const [listStudent, setListStudent] = useState<any[]>(dataStudent);
    const { t } = useTranslation();

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
                <button type="button" className="create-exam primary"><AddIcon />{t('management.create_exam')}</button>
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
                    {listStudent.map((item) => (
                        <tr key={item.id}>
                            <td className="td-management">
                                <img src={item.img} alt="" className="avatar-img" />
                            </td>
                            {/* <td className="td-management"><img alt="" src={require(item.img)} className="avatar-img" /></td> */}
                            <td className="td-management"><p>{item.name}</p></td>
                            <td className="td-management"></td>
                            <td className="td-management"></td>
                            <td className="td-management">{item.total}/31</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default ExamManagement;