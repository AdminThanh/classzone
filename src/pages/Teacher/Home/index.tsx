import BreadCrumb from 'components/BreadCrumb/BreadCrumb';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { decrease, increase } from 'redux/reducers/counterSlice';
import { RootState, useAppDispatch } from 'redux/store';
// import { t } from 'i18n';

const Home = () => {
  const state = useSelector((state: RootState) => state.counter.second);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  return (
    <div>
      Home Teacher: {state}
      <div>
        <button onClick={() => dispatch(increase())}>
          {t('count.increase')}
        </button>
        <button onClick={() => dispatch(decrease())}>
          {' '}
          {t('count.decrease')}
        </button>
      </div>
      <BreadCrumb />
      <div>
        <button
          onClick={() => {
            i18next.changeLanguage(i18next.language === 'vi' ? 'en' : 'vi');
          }}
        >
          Change lang
        </button>
      </div>
    </div>
  );
};

export default Home;
