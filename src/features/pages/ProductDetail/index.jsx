import Info from './Info';
import Detail from './Detail';

export default function ProductDetail() {
  return (
    <>
      <div className='container'>
        <div className='gap_global flex flex-col'>
          <Info />
          <Detail />
        </div>
      </div>
    </>
  );
}
