import BreadCrumb from "components/BreadCrumb";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Attendance.scss";

export interface IListStudent {
    id: number,
    img: string,
    name: string,
    note: string,
    isSelect: boolean,
    total: number,
}

let dataStudent: IListStudent[] = [
    {
        id: 1,
        img: "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/120946730_352619426059311_851730369256431030_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rIy_dqzWHK0AX_BJsWh&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT82ZmCfcx_VdoVorAskrICvWUB2areOl-cQ-I4HNL8JuQ&oe=637BF31F",
        name: "Đào Đức Minh Khôi",
        note: "",
        isSelect: false,
        total: 5
    },
    {
        id: 2,
        img: "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/77183410_978855692486793_3641584607138152448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=fJIvoGOUX0QAX_NC4MW&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT__Iab7160RKdUacOrjiZH2Rym3UJ7JeLc0J5FMYY2Kgw&oe=637D33F2",
        name: "Lê Tuyền",
        note: "",
        isSelect: false,
        total: 5
    },
    {
        id: 3,
        img: "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/169157577_908675839887226_224514685520977440_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=QsfcB7Ptl1EAX_mzZfB&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT_SUdGUr41GJaAiAwXq3Oq1_ZjubMVlLpbrUJGq7VpCCQ&oe=637B9FFA",
        name: "Hoàng Yến",
        note: "",
        isSelect: false,
        total: 5
    },
]

function Attendance() {
    const [listStudent, setListStudent] = useState<any[]>(dataStudent);
    const { t } = useTranslation();

    const handleCheckedAttendance = (id: number): void => {
        const newlistStudent = listStudent.map((item) => item.id === id ? { ...item, isSelect: !item.isSelect } : item);
        setListStudent(newlistStudent);
    }

    const handleChangeNote = (id: number, value: string): void => {
        const newlistStudent = listStudent.map((item) => item.id === id ? { ...item, note: value } : item);
        setListStudent(newlistStudent);
    }

    const handleSaveAttendance = (): void => {
        const payload = listStudent;
        console.log("payload", payload);
    }

    return (
        <div className="attendance-page">
            <BreadCrumb routes={[
                {
                    name: t('bread_crumb.home'),
                    path: '/',
                },
                {
                    name: t('bread_crumb.attendance'),
                    path: '/attendance',
                },
            ]} />
            <div className="attendance-container">
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>{t('attendance.img')}</th>
                            <th>{t('attendance.name')}</th>
                            <th>{t('attendance.activity')}</th>
                            <th>{t('attendance.note')}</th>
                            <th>{t('attendance.total')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStudent.map((item) => (
                            <tr key={item.id}>
                                <td className="td-attendance">
                                    <img src={item.img} alt="" className="avatar-img" />

                                </td>
                                {/* <td className="td-attendance"><img alt="" src={require(item.img)} className="avatar-img" /></td> */}
                                <td className="td-attendance"><p>{item.name}</p></td>
                                <td className="td-attendance"><button type="button" onClick={() => handleCheckedAttendance(item.id)}>
                                    <img alt="" src={require(item.isSelect ? "assets/images/icons/bee-green.png" : "assets/images/icons/bee-red.png")} className="icon-bee" />
                                </button></td>
                                <td className="td-attendance"><input type="text" name="note" className="input-note" onChange={(e) => handleChangeNote(item.id, e.target.value)} /></td>
                                <td className="td-attendance">{item.total}/31</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="submit-button">
                <button className="btn-submit" type="button" onClick={handleSaveAttendance}>{t('attendance.save')}</button>
            </div>
        </div>
    );
}

export default Attendance;