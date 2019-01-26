import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

function smile(value) {
  return <span key={uuidv1()} role="img" aria-label="">{value}</span>
}

function textToSmile(text) {
  switch(text) {
    case 'like':
      return '❤️';
    case 'follow':
      return '👤';
    case 'comment':
      return '💬'
    default:
      return '🙄'
  }
}

export default class UserCard extends Component {

  renderBots(bots) {
    let added = 0;
    const html = Object.keys(bots).map(bot => {
      if (bots[bot] !== null) {
        added += 1;
        return smile(textToSmile(bot));
      }
      return '';
    });
    if(added === 0)
      return "none";
    
    return html;
  }

  render() {
    return (
      <div className="brand-card">
        <div className="brand-card-header" style={{backgroundImage: `url(${this.props.avatar})`}}>
          <p className="widget-username">@{this.props.username}</p>
          {this.props.children}
        </div>
        <div className="brand-card-body">
          <div>
            <div className="text-value">{this.props.currentStats.followers}</div>
            <div className="text-uppercase text-muted small">Followers</div>
            <hr/>
            <div className="text-uppercase text-muted small">Running: {this.renderBots(this.props.bots)}</div>
          </div>
        </div>
      </div>
    );
  }
}
