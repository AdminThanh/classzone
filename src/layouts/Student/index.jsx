import { useTransition } from "react";

const StudentLayout = () => {
    const { t } = useTransition();
  return (
    <div>
      StudentLayout
        {t("count.increase")}
    </div>
  );
};

export default StudentLayout;
