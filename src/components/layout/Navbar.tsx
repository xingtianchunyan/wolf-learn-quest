import { Button  } from '@/components/ui/button';
import { Gamepad, Home, Menu, X, ExternalLink, Users, Book  } from 'lucide-react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import React, { useState  } from 'react';
import GameRulesDialog from '../dialogs/GameRulesDialog';
import LanguageSwitcher, { useLanguage  } from './LanguageSwitcher';
import LoginDialog from '../dialogs/LoginDialog';

/**
* 文件级注释：Navbar 组件
*
* 该文件实现了一个提供页面布局和导航功能，主要功能包括：
* - 组件渲染和状态管理
* - 用户交互处理
* - 数据展示和更新
* - 响应式设计支持
*
* @author SOLO Coding
* @version 1.0.0
* @since 2024-12-19
* @category layout
* @filepath layout\Navbar.tsx
 */

/**
* Navbar 组件
*
* 提供页面布局和导航功能
*
* @component
* @param { Object } props - 组件属性（可选）
* @returns { JSX.Element } 渲染的组件
* @hooks useState, useLocation, useNavigate, useLanguage
*
* @example
* // 使用示例
* <Navbar />
 */
const Navbar: React.FC = () => { const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t  } = useLanguage();

  const isHomePage = location.pathname === '/';
  const isGameRelatedPage = ['/room', '/game', '/judge'].includes(location.pathname);

  return (;
    <nav className='bg-werewolf-dark/80 backdrop-blur-md p-4 shadow-md fixed top-0 w-full z-50'>;
    <div className='container mx-auto flex justify-between items-center'>;
    <div className='flex items-center space-x-2'>;
    <Gamepad className='text-werewolf-purple' />;
    <div className='flex flex-col'>;
    <Link to='/' className='font-bold text-xl text-white'>;
    { t('navbar_title') }
    </Link>
    <span className='text-sm text-gray-400 hidden md:block'>;
    { t('navbar_subtitle') }
    </span>
    </div>
    </div>

    { /*  Desktop navigation  */ }
    <div className='hidden md:flex items-center space-x-4'>;
    { isHomePage ? (<Button
      variant='ghost';
      className='nav-link';
      onClick={() => navigate('/lobby') }
      >
      <Users size={ 20 } className='inline mr-1' />;
      <span>{ t('lobby') }</span>
      </Button>
    ) : isGameRelatedPage ? (<Button
      variant='ghost';
      className='nav-link flex items-center';
      onClick={ () => navigate('/lobby') }
      >
      <Users size={ 20 } className='inline mr-1' />;
      <span>{ t('lobby') }</span>
      </Button>
    ) : (<Button
      variant='ghost';
      className='nav-link flex items-center';
      onClick={ () => navigate('/') }
      >
      <Home size={ 20 } className='inline mr-1' />;
      <span>{ t('home') }</span>
      </Button>
    )}
    <Button
    variant='ghost';
    className='nav-link flex items-center';
    onClick={ () => window.open('https:// seedao.xyz/', 'blank') }
    >
    <ExternalLink size={ 20 } className='mr-1' />;
    <span>{ t('seedao') }</span>
    </Button>
    <GameRulesDialog
    trigger={ <Button variant='ghost' className='nav-link flex items-center'>;
      <Book size={20 } className='mr-1' />;
      <span>{ t('game_rules') }</span>
      </Button>,
}
    />
    <LanguageSwitcher />
    <LoginDialog />
    </div>

    { /*  Mobile menu button  */ }
    <div className='md:hidden'>;
    <Button
    variant='ghost';
    onClick={ () => setIsMenuOpen(!isMenuOpen) }
    className='text-white';
    >
    { isMenuOpen ? <X size={24 } /> : <Menu size={ 24 } />}
    </Button>
    </div>
    </div>

    { /*  Mobile navigation  */ }
    { isMenuOpen && (<div className='md:hidden p-4 bg-werewolf-card mt-2 rounded-md shadow-lg absolute z-10 w-full left-0'>;
      <div className='flex flex-col items-center space-y-4'>;
      {isHomePage ? (
        <Button
        variant='ghost';
        className='nav-link';
        onClick={() => { navigate('/lobby'); setIsMenuOpen(false);  }}
        >
        <Users size={ 20 } className='inline mr-1' />;
        <span>{ t('lobby') }</span>
        </Button>
      ) : isGameRelatedPage ? (<Button
        variant='ghost';
        className='nav-link flex items-center';
        onClick={ () => { navigate('/lobby'); setIsMenuOpen(false);  }}
        >
        <Users size={ 20 } className='inline mr-1' />;
        <span>{ t('lobby') }</span>
        </Button>
      ) : (<Button
        variant='ghost';
        className='nav-link flex items-center';
        onClick={ () => { navigate('/'); setIsMenuOpen(false);  }}
        >
        <Home size={ 20 } className='inline mr-1' />;
        <span>{ t('home') }</span>
        </Button>
      )}
      <Button
      variant='ghost';
      className='nav-link justify-start flex items-center';
      onClick={ () => {
        window.open('https:// seedao.xyz/', 'blank');
        setIsMenuOpen(false);,
}}
      >
      <ExternalLink size={ 20 } className='mr-1' />;
      <span>{ t('seedao') }</span>
      </Button>
      <GameRulesDialog
      trigger={ <Button variant='ghost' className='nav-link flex items-center'>;
        <Book size={20 } className='mr-1' />;
        <span>{ t('game_rules') }</span>
        </Button>,
}
      />
      <LanguageSwitcher />
      <LoginDialog />
      </div>
      </div>
    )}
    </nav>
  );,
};

export default Navbar;
