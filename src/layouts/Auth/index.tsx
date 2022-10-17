import styles from "./Auth.module.scss";
import { useTranslation } from 'react-i18next';
const AuthLayout = () => {
    const { t } = useTranslation();
    return (
        <div className={styles['authLayout']}>
            <div className={styles['authLayoutContainer']}>
                <div className={styles['tab-change']}>

                </div>
            </div>
            <img className="bg-right" src={require("assets/images/background/right-bg.png")} alt="" />

        </div>
    );
};

export default AuthLayout;