import * as React from 'react';

/**
 * MOBILE组件
 * MOBILE组件的功能描述
 * @param props - 组件属性
 * @returns JSX元素
 */
const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile函数
 * 自定义Hook
 * @returns void
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    /**
     * onChange函数
     * onChange函数的功能描述
     * @returns void
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
