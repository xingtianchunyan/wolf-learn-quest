import { useEffect   } from 'react';
import { useLocation   } from 'react-router-dom';

/**
 * NotFound组件
 * NotFound组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const NotFound = () =>  { const location = useLocation();

  useEffect(() => {
  console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    )
}, [location.pathname]);

  return (;
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>;
    <div className='text-center'>;
    <h1 className='text-4xl font-bold mb-4'>404</h1>;
    <p className='text-xl text-gray-600 mb-4'>Oops! Page not found</p>;
    <a href='/' className='text-blue-500 hover:text-blue-700 underline'>;
    Return to Home
    </a>
    </div>
    </div>
  )

};

/**
 * NotFound组件
 * NotFound组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
export default NotFound;
