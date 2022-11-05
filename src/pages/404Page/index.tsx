import { useNavigate } from "react-router-dom";
import "./404Page.scss";

function ErrorPage() {
    const navigate = useNavigate();

    return (<div className="error-page">
        <img className="bg-item" src={require('assets/images/icons/404 error.png')} alt="" />
        <div className="back-home">
            <p>Xin lỗi chúng tôi không thể tìm thấy trang bạn đang tìm kiếm</p>
            <button type="button" className="btn-back" onClick={() => navigate("/")}>Quay lại trang chủ</button>
        </div>
    </div>);
}


export default ErrorPage;