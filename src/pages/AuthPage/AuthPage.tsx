import "./AuthPage.scss";
import { Tabs } from 'antd';
import Register from "components/Register/Register";
import Login from "components/Login/Login";

function AuthPage() {

    return (
        <div className="auth">
            <div className="auth-page">
                <div className="auth-content">
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Đăng ký" key="1">
                            <Register />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Đăng nhập" key="2">
                            <Login />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
            <img className="bg-right" src={require("assets/images/background/right-bg.png")} alt="" />
        </div>
    );
}

export default AuthPage;