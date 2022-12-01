import { useMutation, useQuery } from '@apollo/client';
import { notification, Spin } from 'antd';
import BreadCrumb from 'components/BreadCrumb';
import { GetAttendanceTodayDocument, GetClassByIdDocument, GetScheduleByClassDocument, UppdateAttendancesDocument } from 'gql/graphql';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import './Attendance.scss';

function Attendance() {
    const { t } = useTranslation();
    const { classId } = useParams();

    const { data, refetch } = useQuery(GetClassByIdDocument, {
        variables: {
            id: classId || ''
        }
    });

    const [dataStudentAttendance, setDataStudentAttendance] = useState([]);

    console.log(structuredClone(dataStudentAttendance));

    // const {
    //     data: scheduleData,
    // } = useQuery(GetScheduleByClassDocument, {
    //     variables: {
    //         id: classId || ''
    //     }
    // })

    const {
        data: attendanceData,
        loading: attendanceLoading,
        refetch: attendanceRefetch
    } = useQuery(GetAttendanceTodayDocument, {
        variables: {
            class_id: classId || ''
        }
    })


    const [fireUpdateAttendences] = useMutation(UppdateAttendancesDocument);

    // const handleCheckedAttendance = (id: string): void => {
    //     const newListStudent = structuredClone(dataStudentAttendance);
    //     newListStudent[id].is_present = !newListStudent[id].is_present;
    //     setDataStudentAttendance(newListStudent);
    // }

    // const handleChangeNote = (id: string, value: string): void => {
    //     setDataStudentAttendance({
    //         ...dataStudentAttendance,
    //         [id]: {
    //             ...dataStudentAttendance
    //         }
    //     });
    // };



    const handleSaveAttendance = (): void => {
        const payload: any = [];
        console.log(data);
        // const schedule_id = scheduleData?.getScheduleByClass?.find((schedule_id) => schedule_id.id);

        data?.getClassById?.students?.map((student) => {
            const indexOfAttendance = attendanceData?.getAttendanceToday.findIndex((attendance) => {
                console.log(attendance.user_id, student.id)
            })
            // const attendance = ;

            let note;
            if (indexOfAttendance && indexOfAttendance !== -1) {
                note = attendanceData?.getAttendanceToday[indexOfAttendance]
                console.log("note", note);
            }

            // console.log("attendance", attendance)
            const studentPayload = {
                user_id: student.id,
                // note:,
                // is_present: scheduleData?.getScheduleByClass[indexOfAttendance]?.is_present,

            }
            console.log(student);

            // const newAttendanceData: { [user_id: string]: any } = {};

            // newAttendanceData.is_present = true;
            // user_id && (newAttendanceData.is_present = user_id);
            // attdnc.note && (newAttendanceData.note = 'Xin đi trễ');
            // attdnc.is_present && (newAttendanceData.is_present = attdnc.is_present);

            // payload.push(newAttendanceData);
        })

        console.log(payload);

        // notification.open({
        //     message: (
        //         <>
        //             <Spin /> &nbsp; Cập nhật điểm danh
        //         </>
        //     )
        // });
        // try {
        //     notification.destroy();
        //     notification.success({
        //         message: "Cập nhật điểm danh thành công",
        //     });
        //     fireUpdateAttendences({
        //         variables: {
        //             attendanceClassInput: {
        //                 Attendance: payload,
        //             },
        //             schedule_id: schedule_id?.id as any,
        //         }
        //     })
        //     console.log(payload);
        // } catch (error) {
        //     notification.destroy();
        //     notification.error({
        //         message: "Có lỗi xảy ra khi cập nhật điểm danh"
        //     })
        // }
    };

    useEffect(() => {
        const newAttendanceData: any = {};
        attendanceData?.getAttendanceToday.forEach((att) => {
            if (att.user_id) {
                newAttendanceData[att.user_id] = {
                    user_id: att.user_id,
                    note: att.note,
                    is_present: att.is_present,
                }
            }
        })
    }, [attendanceData]);

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
                                {data ? (
                                    data?.getClassById?.students?.map((item) => (
                                        <tr key={item.id}>
                                            <td className="td-attendance">
                                                <img src={item.avatar ? item.avatar : require("assets/images/avatar/4.jpg")} alt="" className="avatar-img" />
                                            </td>
                                            <td className="td-attendance">
                                                <p>{item.firstName}</p>
                                            </td>
                                            <td className="td-attendance">
                                                <button
                                                    type="button"
                                                // onClick={() => handleCheckedAttendance(item.id)}
                                                >
                                                    <img
                                                        alt=""
                                                        src={require(true
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
                                                // onChange={(e) =>
                                                //     handleChangeNote(item.id, e.target.value)
                                                // }
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
