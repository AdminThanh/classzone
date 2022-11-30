import { useQuery } from '@apollo/client';
import BreadCrumb from 'components/BreadCrumb';
import { GetClassByIdDocument } from 'gql/graphql';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './Attendance.scss';

export interface IListStudent {
    id: string;
    avatar: string | null;
    lastName: string | null;
    firstName: string | null;
    content: string | null;
    is_learn_date: boolean | null;
    email: string | null;
}

// let dataStudent: IListStudent[] = [
//     {
//         id: 1,
//         img: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/120946730_352619426059311_851730369256431030_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rIy_dqzWHK0AX_BJsWh&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT82ZmCfcx_VdoVorAskrICvWUB2areOl-cQ-I4HNL8JuQ&oe=637BF31F',
//         name: 'Đào Đức Minh Khôi',
//         note: '',
//         isCheck: false,
//     },
//     {
//         id: 2,
//         img: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/77183410_978855692486793_3641584607138152448_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=fJIvoGOUX0QAX_NC4MW&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT__Iab7160RKdUacOrjiZH2Rym3UJ7JeLc0J5FMYY2Kgw&oe=637D33F2',
//         name: 'Lê Tuyền',
//         note: '',
//         isCheck: false,
//     },
//     {
//         id: 3,
//         img: 'https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-9/169157577_908675839887226_224514685520977440_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=QsfcB7Ptl1EAX_mzZfB&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT_SUdGUr41GJaAiAwXq3Oq1_ZjubMVlLpbrUJGq7VpCCQ&oe=637B9FFA',
//         name: 'Hoàng Yến',
//         note: '',
//         isCheck: false,
//     },
// ];

function Attendance() {
    const { t } = useTranslation();
    const { classId } = useParams();

    const { data, refetch } = useQuery(GetClassByIdDocument, {
        variables: {
            id: classId as string
        }
    });

    const [listStudent, setListStudent] = useState<IListStudent[] | undefined>();

    console.log(listStudent);
    const handleCheckedAttendance = (id: string): void => {
        const newListStudent = structuredClone(listStudent);
        newListStudent[id].isCheck = !newListStudent[id].isCheck;
        setListStudent(newListStudent);
    }

    const handleChangeNote = (id: string, value: string): void => {
        const newListStudent = structuredClone(listStudent);
        newListStudent[id].note = value;
        setListStudent(newListStudent);
    };

    const handleSaveAttendance = (): void => {
        const payload = listStudent;
        console.log('payload', payload);
    };

    return (
        <div className="site_wrapper">
            <div className="site_container">
                <div className="attendance-page">
                    <BreadCrumb
                        routes={[
                            {
                                name: t('bread_crumb.home'),
                                path: '/',
                            },
                            {
                                name: t('bread_crumb.attendance'),
                                path: '/attendance',
                            },
                        ]}
                    />
                    <div className="attendance-container">
                        <table className="attendance-table">
                            <thead>
                                <tr>
                                    <th>{t('attendance.img')}</th>
                                    <th>{t('attendance.name')}</th>
                                    <th>{t('attendance.activity')}</th>
                                    <th>{t('attendance.note')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listStudent ? (
                                    listStudent.map((item) => (
                                        <tr key={item.id}>
                                            <td className="td-attendance">
                                                <img src={item.avatar ? item.avatar : require("assets/images/avatar/4.jpg")} alt="" className="avatar-img" />
                                            </td>
                                            <td className="td-attendance">
                                                <p>{item.firstName}{item.lastName}</p>
                                            </td>
                                            <td className="td-attendance">
                                                <button
                                                    type="button"
                                                    onClick={() => handleCheckedAttendance(item.id)}
                                                >
                                                    <img
                                                        alt=""
                                                        src={require(item.is_learn_date
                                                            ? 'assets/images/icons/bee-green.png'
                                                            : 'assets/images/icons/bee-red.png')}
                                                        className="icon-bee"
                                                    />
                                                </button>
                                            </td>
                                            <td className="td-attendance">
                                                <input
                                                    type="text"
                                                    name="note"
                                                    className="input-note"
                                                    onChange={(e) =>
                                                        handleChangeNote(item.id, e.target.value)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))) : (
                                    <></>
                                )
                                }
                            </tbody>
                        </table>
                        <div className="submit-button">
                            <button
                                className="btn-submit"
                                type="button"
                                onClick={handleSaveAttendance}
                            >
                                {t('attendance.save')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Attendance;
