import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./404Page.scss";

function ErrorPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (<div className="error-page">
        <img className="bg-item" src={require('assets/images/icons/404 error.png')} alt="" />
        <div className="back-home">
            <p>{t('error_page.not_found')}</p>
            <button type="button" className="btn-back" onClick={() => navigate("/")}>{t('error_page.back_home')}</button>
        </div>
    </div>);
}


export default ErrorPage;