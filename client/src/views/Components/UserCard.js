import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  dataBox: PropTypes.func,
};

const defaultProps = {
  dataBox: () => ({ 
    username: 'kirillovmr',
    bg: 'https://image.flaticon.com/icons/svg/17/17004.svg',
    followers: '-'
  }),
};

class UserCard extends Component {
  render() {

    // eslint-disable-next-line
    const { children, className, cssModule, dataBox, ...attributes } = this.props;

    // demo purposes only
    const data = dataBox();

    const keys = Object.keys(data);
    const vals = Object.values(data);

    const classCard = 'brand-card';
    const classCardHeader = classNames(`${classCard}-header`);
    const classCardBody = classNames(`${classCard}-body`);
    const classes = mapToCssModules(classNames(classCard, className), cssModule);

    return (
      <div className={classes}>
        <div className={classCardHeader} style={{background: `url(${vals[1]})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
          <p className="widget-username">@{vals[0]}</p>
          {children}
        </div>
        <div className={classCardBody}>
          <div>
            <div className="text-value">{vals[2]}</div>
            <div className="text-uppercase text-muted small">{keys[2]}</div>
          </div>
        </div>
      </div>
    );
  }
}

UserCard.propTypes = propTypes;
UserCard.defaultProps = defaultProps;

export default UserCard;
