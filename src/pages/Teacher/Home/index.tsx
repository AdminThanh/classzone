import { useSelector } from 'react-redux';
import { decrease, increase } from 'redux/reducers/counterSlice';
import { RootState, useAppDispatch } from 'redux/store';

const Home = () => {
  const state = useSelector((state: RootState) => state.counter.second);
  const dispatch = useAppDispatch();
  return (
    <div>
      Home Teacher: {state}
      <button onClick={() => dispatch(increase())}>Increase</button>
      <button onClick={() => dispatch(decrease())}>Decrease</button>
    </div>
  );
};

export default Home;
