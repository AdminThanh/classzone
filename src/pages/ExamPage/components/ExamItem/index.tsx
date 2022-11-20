import "./ExamItem.scss";
import { EditIcon } from "utils/drawer";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

function ExamItem(props: any) {
    const { name_exam, start_time, work_time, deadline, num_question, status, status_btn } = props;
    const { t } = useTranslation();

    return (<div className="exam-box">
        <img className="exam-img" src={require("assets/images/icons/class-img.png")} alt="" />
        <div className="exam-container">
            <h3 className="content-title">
                {name_exam}
            </h3>
            <div className="exam-detail">
                <p className="title-detail">{t("exam.start_time")} {start_time}</p>
                <p className="title-detail">{t("exam.deadline")}  {deadline}
                </p>
                <p className="title-detail">{t("exam.work_time")} {work_time}
                </p>
                <p className="title-detail">{t("exam.num_question")} {num_question}
                </p>
                <div className="title-detail">{t("exam.status")}
                    <p className={clsx("status-exam", { done: status === 1, not: status === 2, notStart: status === 3, hadScore: status === 4 })}>{status === 1 ? t("exam.status_done") : status === 2 ? t("exam.status_not") : status === 3 ? t("exam.status_score") : t("exam.status_notStart")}</p></div>
            </div>
            <div className="button-action">
                <button type="button" className={clsx("btn-make", { take: status_btn === 1, seen: status_btn === 2, disable: status_btn === 3 })}><EditIcon /> {status_btn === 2 ? t("exam.review") : t("exam.doing")}</button>
            </div>
        </div>
    </div>);
}

export default ExamItem;