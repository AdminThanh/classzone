import clsx from 'clsx';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

interface IPropButton {
  title: string;
  icon?: React.ReactNode;
  type: 'primary' | 'second';
  htmlType?: 'button' | 'submit' | 'reset';
  linkTo?: string;
  linkToIsLocal?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  width?: string;
  className?: string;
}

const Button = (props: IPropButton) => {
  const {
    title = '',
    icon = null,
    type = '',
    htmlType = 'button',
    linkTo = '',
    linkToIsLocal = true,
    onClick = () => {},
    width = '',
    className = '',
    ...rest
  } = props;

  const convertClass = useMemo(
    () =>
      clsx({
        btn: true,
        'btn-primary': type === 'primary',
        'btn-second': type === 'second',
      }),
    []
  );

  const renderButtonContent = () => {
    return (
      <div className="btn__content">
        {icon && (
          <span className="btn__icon-wrapper">
            {icon && typeof icon === 'string' && (
              <img src={icon} className="btn__content-image" />
            )}
            {icon && React.isValidElement(icon) && <>{icon}</>}
          </span>
        )}
        <div>{title}</div>
      </div>
    );
  };

  if (linkTo) {
    if (linkToIsLocal) {
      return (
        <Link
          to={linkTo}
          className={convertClass}
          onClick={onClick}
          type={htmlType || 'button'}
          {...rest}
        >
          {renderButtonContent()}
        </Link>
      );
    } else {
      return (
        <a
          href={linkTo}
          className={convertClass}
          onClick={onClick}
          type={htmlType || 'button'}
          {...rest}
        >
          {renderButtonContent()}
        </a>
      );
    }
  }

  console.log("htmlType", htmlType)
  return (
    <button
      className={convertClass}
      onClick={onClick}
      type={htmlType || 'button'}
      {...rest}
    >
      {renderButtonContent()}
    </button>
  );
};

export default Button;
